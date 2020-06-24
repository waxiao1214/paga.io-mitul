/**
 *
 */

#include <deque>
#include <iostream>
#include <boost/bind.hpp>
#include <boost/asio.hpp>
#include <boost/asio/serial_port.hpp>
#include <boost/asio/read_until.hpp>
#include <boost/asio/streambuf.hpp>
#include <boost/thread.hpp>
#include <boost/date_time/posix_time/posix_time_types.hpp>
#include <string>

using namespace std;

typedef boost::function<void(const string&)> SerialReadCallback;

static const char kSerialDelimiterStr[] = "\r\n";
static const size_t kSerialDelimiterLen = strlen(kSerialDelimiterStr);

class PagaioSerialIO
{
public:
    PagaioSerialIO(
        boost::asio::io_service& io_service,
        unsigned int baud,
        const string& device,
        SerialReadCallback readCallback)
            : mReadCallback(readCallback),
              active_(true),
              io_service_(io_service),
              serialPort(io_service, device)
    {
        if (!serialPort.is_open())
        {
            cerr << "Failed to open serial port\n";
            return;
        }

        boost::asio::serial_port_base::baud_rate baud_option(baud);
        serialPort.set_option(baud_option);
        read_start();
    }

    /**
     * Write to the serial port.
     */
    void write(const string& msg)
    {
      // Let's also append the message delimiter to it.
      io_service_.post(boost::bind(&PagaioSerialIO::do_write, this, msg + kSerialDelimiterStr));
    }

    /**
     * Close the communication line.
     */
    void close()
    {
      io_service_.post(
          boost::bind(&PagaioSerialIO::do_close, this, boost::system::error_code()));
    }

    /**
     * Check if the socket is still active.
     */
    bool active()
    {
      return active_;
    }

private:

  void read_start()
  {
    boost::asio::async_read_until(serialPort, input_buffer_, kSerialDelimiterStr,
      [this](
        const boost::system::error_code& error,
        size_t bytes_transferred)
      {
        // Bail out if we're inactive.
        if (!active_) {
          std::cout << "Inactive" << std::endl;
          return;
        }

        // Or if there was some error.
        if (error) {
          std::cout << "Error" << std::endl;
          do_close(error);
        }

        // Verify streambuf contains more data beyond the delimiter. (e.g.
        // async_read_until read beyond the delimiter). If not, read again.
        if (input_buffer_.size() < bytes_transferred) {
          std::cout << "Bailing out due to bytes_transferred " <<
            input_buffer_.size() <<
            " < " <<
            bytes_transferred << std::endl;
          return;
        }

        // Extract up to the first delimiter.
        std::string command{
          buffers_begin(input_buffer_.data()),
          buffers_begin(input_buffer_.data()) + bytes_transferred - kSerialDelimiterLen};

        // Consume through the first delimiter so that subsequent async_read_until
        // will not reiterate over the same data.
        input_buffer_.consume(bytes_transferred);

        // Notify the new command and read again.
        mReadCallback(command);
        read_start();
      }
    );
  }

  void do_write(const string& msg)
  { // callback to handle write call from outside this class
    bool write_in_progress = !write_msgs_.empty(); // is there anything currently being written?
    write_msgs_.push_back(msg); // store in write buffer
    if (!write_in_progress) {
      write_start();
    }
  }

  void write_start()
  { // Start an asynchronous write and call write_complete when it completes or fails
          const string& msg = write_msgs_.front();
          boost::asio::async_write(serialPort,
                  boost::asio::buffer(msg),
                  boost::bind(&PagaioSerialIO::write_complete,
                          this,
                          boost::asio::placeholders::error));
  }

  void write_complete(const boost::system::error_code& error)
  { // the asynchronous read operation has now completed or failed and returned an error
          if (!error)
          { // write completed, so send next write data
                  write_msgs_.pop_front(); // remove the completed data
                  if (!write_msgs_.empty()) // if there is anthing left to be written
                          write_start(); // then start sending the next item in the buffer
          }
          else
                  do_close(error);
  }

  void do_close(const boost::system::error_code& error)
  { // something has gone wrong, so close the socket & make this object inactive
          if (error == boost::asio::error::operation_aborted) // if this call is the result of a timer cancel()
                  return; // ignore it because the connection cancelled the timer
          if (error)
                  cerr << "Error: " << error.message() << endl; // show the error message
          else
                  cout << "Error: Connection did not succeed.\n";
          cout << "Press Enter to exit\n";
          serialPort.close();
          active_ = false;
  }

public:
    SerialReadCallback mReadCallback;

private:
    bool active_; // remains true while this object is still operating
    boost::asio::io_service& io_service_; // the main IO service that runs this connection
    boost::asio::serial_port serialPort; // the serial port this instance is connected to
    deque<string> write_msgs_; // buffered write data
    boost::asio::streambuf input_buffer_;
};
