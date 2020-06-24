#include <algorithm>
#include <boost/lockfree/spsc_queue.hpp>
#include <boost/lexical_cast.hpp>
#include <iostream>
#include <iterator>
#include <limits>
#include <stdlib.h>
#include <string>
#include <sstream>

#include <pigpio.h>

#include "serial.hpp"
#include "server_ws.hpp"

using MessageQueue =
  boost::lockfree::spsc_queue<string, boost::lockfree::capacity<1024>>;
using std::string;
using std::vector;
using WsServer = SimpleWeb::SocketServer<SimpleWeb::WS>;

// The IDS of the supported pagaio commands.
const int SUPPORTED_PAGAIO_CMDS[] = { 0, 1, 2, 50, 51, 52, 53, 54, 55 };

/**
 * Utility function to split a string on a delimiter.
 *
 * @param input the input string
 * @param delimiter the character delimiter to split the string on
 * @param result the output vector holding the splitted data
 */
void SplitStringOn(const string& input, const char delimiter, vector<string>& result) {
  stringstream ss(input);
  while (ss.good())
  {
    string substr;
    getline(ss, substr, delimiter);
    result.push_back(substr);
  }
}

/**
 * Get an uint32_t out of a string.
 *
 * @param input the input string
 * @param result the output uint32_t
 * @param min the optional minimum value the parsed value can have
 * @param max the optional maximum value the parsed value can have
 * @return true if the function was able to extract an uint32_t from the
 *         string and the value sits within the provided [min, max] range
 */
bool ParseAndValidateIntRange(
  const string& input,
  uint32_t& result,
  uint32_t min = 0,
  uint32_t max = std::numeric_limits<uint32_t>::max()) {
  unsigned long val = strtoul(input.c_str(), nullptr, 10);

  if (val < min || val > max) {
    return false;
  }

  result = val;
  return true;
}

/**
 * Validates and transforms a command to a stringified JSON command.
 *
 * The JSON format of the command is the following:
 *
 * {
 *   type: "status", // or "reply"
 *   data: {} // object containing the command data
 * }
 * @param inputData the command string
 * @param outputJSON the output stringified JSON string
 */
bool TransformToJSON(const string& inputData, string& outputJSON) {
  // Start by tokenizing the string.
  vector<string> tokens;
  SplitStringOn(inputData, ',', tokens);

  size_t numTokens = tokens.size();
  if (numTokens < 2) {
    // We expect at least the command name and some data.
    return false;
  }

  // TODO: Refactor and move single commadn parsing logic away from this
  // function.

  // This is a reply coming from the firmware to some command we sent.
  if (tokens[0].compare("$CMD") == 0) {
    // This command should have the format "$CMD,<cmd_id>,<OK|ERROR>".
    if (numTokens != 3) {
      return false;
    }

    // We support ids from SUPPORTED_PAGAIO_CMDS.
    int cmdId = atoi(tokens[1].c_str());
    if (std::find(std::begin(SUPPORTED_PAGAIO_CMDS), std::end(SUPPORTED_PAGAIO_CMDS), cmdId)
      == std::end(SUPPORTED_PAGAIO_CMDS)) {
      return false;
    }

    bool wasOk = tokens[2].compare("OK") == 0;

    // Reply should be {"type":"reply", "data": {"commandId": <id>, "ok": <true|false>} }
    outputJSON = "{\"type\": \"reply\", \"data\": {\"commandId\": ";
    outputJSON += std::to_string(cmdId) + ", \"ok\": ";
    outputJSON += wasOk ? "true" : "false";
    outputJSON += "}}";

    return true;
  } else if (tokens[0].compare("$STATUS") == 0) {
    // This command should have the format
    // "$STATUS,<timestamp>,<bpm>,<propulsion_arm>,<total_dist>,<paddle_dist>,
    // <propulsion_duration_s>,<power_dx>,<power_sx>,<speed>"
    if (numTokens != 10) {
      return false;
    }

    uint32_t timestamp;
    uint32_t bpm;
    uint32_t propulsion_arm;
    uint32_t total_distance;
    uint32_t paddle_distance;
    uint32_t propulsion_duration_s;
    uint32_t power_sx;
    uint32_t power_dx;
    uint32_t speed;
    if (!ParseAndValidateIntRange(tokens[1], timestamp) ||
      !ParseAndValidateIntRange(tokens[2], bpm, 0, 1000) ||
      !ParseAndValidateIntRange(tokens[3], propulsion_arm, 0, 3) ||
      !ParseAndValidateIntRange(tokens[4], total_distance) ||
      !ParseAndValidateIntRange(tokens[5], paddle_distance, 0, 1000) ||
      !ParseAndValidateIntRange(tokens[6], propulsion_duration_s, 0, 10000) ||
      !ParseAndValidateIntRange(tokens[7], power_dx, 0, 1500) ||
      !ParseAndValidateIntRange(tokens[8], power_sx, 0, 1500) ||
      !ParseAndValidateIntRange(tokens[9], speed, 0, 1500)) {
      // We failed to parse some values. Return false and discard this
      // status update.
      return false;
    }

    outputJSON = "{\"type\": \"status\", \"data\": {";
    outputJSON += "\"timestamp\": " + std::to_string(timestamp) + ",";
    outputJSON += "\"bpm\": " + std::to_string(bpm) + ",";
    outputJSON += "\"propulsion_arm\": " + std::to_string(propulsion_arm) + ",";
    outputJSON += "\"total_distance\": " + std::to_string(total_distance) + ",";
    outputJSON += "\"paddle_distance\": " + std::to_string(paddle_distance) + ",";
    outputJSON += "\"propulsion_duration\": " + std::to_string(propulsion_duration_s) + ",";
    outputJSON += "\"power_dx\": " + std::to_string(power_dx) + ",";
    outputJSON += "\"power_sx\": " + std::to_string(power_sx) + ",";
    outputJSON += "\"speed\": " + std::to_string(speed);
    outputJSON += "}}";
    return true;
  }

  return false;
}

/**
 * Filter commands coming from the serial port.
 *
 * @param command the incoming command
 * @return false if the command must be discarded, true otherwise.
 */
bool ShouldProcessCommand(const string& cmd) {
  // Don't process empty commands.
  if (cmd.empty()) {
    return false;
  }

  // Commands always start with the '$' character.
  if (cmd.front() != '$') {
    return false;
  }

  // Whitelist commands that we support, coming from the serial link.
  if (cmd.rfind("$CMD") == 0 || cmd.rfind("$STATUS") == 0) {
    return true;
  }

  return false;
}

/**
 * Called whenever data is available on the serial link.
 *
 * @param incomingData the data that was read from the link
 * @param endpoitn the websocket server endpoint the app is connected to
 */
void OnSerialDataAvailable(const string& incomingData, WsServer::Endpoint& endpoint) {
  // Ignore debug status commands sent by the STM.
  if (!ShouldProcessCommand(incomingData)) {
    return;
  }

  string jsonCmd;
  if (!TransformToJSON(incomingData, jsonCmd)) {
    cout << "Malformed command: " << incomingData << "\n";
    return;
  }

  for(auto& conn : endpoint.get_connections()) {
    cout << "To WS: " << jsonCmd << "\n";
    conn->send(jsonCmd);
  }
}

/**
 * Called whenever data is coming in from a websocket connection.
 *
 * @param inputConnection the connection the message was received on
 * @param inputMessage the message that was received
 * @param serialPortQueue the serial port queue to dispatch the message to, if needed
 */
void OnWebsocketDataAvailable(
  shared_ptr<WsServer::Connection> inputConnection,
  shared_ptr<WsServer::InMessage> inputMessage,
  MessageQueue& serialPortQueue
) {
  auto msg = inputMessage->string();
  // TODO: input should be JSON. Validate and convert to a lower level message.
  serialPortQueue.push(msg);
}

/**
 * Application entry point.
 */
int main(int argc, char* argv[]) {
  if (argc != 3)
  {
    cerr << "Usage: serial2ws <baud> <device>\n";
    return 1;
  }

  if (gpioInitialise() < 0)
  {
    cerr << "Failed to initialize GPIO" << endl;
    return -1;
  }

  // GPIO5 governs if the rest of the hardware is ON or OFF. We need
  // to keep it to low.
  gpioSetMode(5, PI_OUTPUT);
  gpioWrite(5, 0);

  MessageQueue queueToWs, queueToSerial;
  WsServer server;
  server.config.port = 8765;

  auto &status_endpoint = server.endpoint["^/status/?$"];
  status_endpoint.on_message = [&queueToSerial](shared_ptr<WsServer::Connection> inputConnection,
                                                shared_ptr<WsServer::InMessage> inputMessage) {
    OnWebsocketDataAvailable(inputConnection, inputMessage, queueToSerial);
  };

  // Start WS-server
  thread server_thread([&server]() {
    server.start();
  });


  try
  {
    boost::asio::io_service io_service;
    PagaioSerialIO pagaioSerial(io_service,
                                boost::lexical_cast<unsigned int>(argv[1]),
                                argv[2],
                                [&status_endpoint](const string& incomingData) {
                                  OnSerialDataAvailable(incomingData, status_endpoint);
                                });

    // Run the IO service as a separate thread, so the main thread can block on standard input
    boost::thread t(boost::bind(&boost::asio::io_service::run, &io_service));
    while (pagaioSerial.active())
    {
      string inputMessage;
      if (queueToSerial.pop(inputMessage)) {
        cout << "To Serial: " << inputMessage << "\n";
        pagaioSerial.write(inputMessage);
      } else {
        // No message was popped, so let's wait for 100ms. This is needed
        // in order to not have the CPU go crazy while the app is open doing
        // nothing.
        boost::this_thread::sleep(boost::posix_time::milliseconds(100));
      }
    }
    pagaioSerial.close();
    t.join();
    server_thread.join();
  }
  catch (exception& e)
  {
    cerr << "Exception: " << e.what() << "\n";
  }

  // Clean up GPIO related resources.
  gpioTerminate();

  return 0;
}
