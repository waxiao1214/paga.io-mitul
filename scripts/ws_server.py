#!/usr/bin/env python

# WS server that sends messages at random intervals

import asyncio
import copy
import json
import math
import uuid
import websockets

from datetime import datetime
from transitions import Machine

TOTAL_DISTANCE = 0.0
TEST_DATA = {
    "type": "status",
    "data": {
        "timestamp": 1,
        "bpm": 1,
        "propulsion_arm": 0,
        "total_distance": 0.0,
        "paddle_distance": 1.0,
        "propulsion_duration": 1.0,
        "power_sx": 1,
        "power_dx": 1,
        "speed": 1
    }
}

# Define the Pagaiergometro FSM.
class Pagaiergometro(object):
    pass

pagaioFSM = Pagaiergometro()

machine = Machine(
    model=pagaioFSM,
    states=[
        'idle',
        'training',
        'training_paused',
        'recovering',
        'paused',
    ],
    transitions=[
        { 'trigger': 'set', 'source': 'idle', 'dest': 'idle' },
        { 'trigger': 'start', 'source': 'idle', 'dest': 'training' },
        { 'trigger': 'pause', 'source': 'training', 'dest': 'training_paused' },
        { 'trigger': 'resume', 'source': 'training_paused', 'dest': 'training' },
        { 'trigger': 'stop', 'source': 'training_paused', 'dest': 'idle' },
    ],
    initial='idle'
)

def handle_and_validate_pairing_msg(cmd):
    machine_id = None
    try:
        machine_id = uuid.UUID(cmd['payload']['machineId'])
    except KeyError:
        print("`machineId` not found")
        return
    except ValueError:
        print("Invalid `machineId`")
        return

    session_id = None
    try:
        session_id = uuid.UUID(cmd['payload']['sessionId'])
    except KeyError:
        print("`sessionId` not found")
        return
    except ValueError:
        print(f"Invalid `sessionId`")
        return

    print(f"Session {session_id} started on {machine_id}")


def handle_and_validate_setup_msg(cmd):
    # TODO validate the message.

    session_id = None
    try:
        session_id = uuid.UUID(cmd['payload']['sessionId'])
    except KeyError:
        print("`sessionId` not found")
        return
    except ValueError:
        print(f"Invalid `sessionId`")
        return

    print(f"Execise started for {session_id}")

    # Setup the simulation.
    global TOTAL_DISTANCE
    TOTAL_DISTANCE = 0.0
    pagaioFSM.set() # $CMD,55..
    pagaioFSM.start() # $CMD,51

def handle_and_validate_pause_msg(cmd):
    # TODO validate the message.

    session_id = None
    try:
        session_id = uuid.UUID(cmd['payload']['sessionId'])
    except KeyError:
        print("`sessionId` not found")
        return
    except ValueError:
        print(f"Invalid `sessionId`")
        return

    print(f"Execise started for {session_id}")

    pagaioFSM.pause() # $CMD,52

def handle_and_validate_resume_msg(cmd):
    # TODO validate the message.

    session_id = None
    try:
        session_id = uuid.UUID(cmd['payload']['sessionId'])
    except KeyError:
        print("`sessionId` not found")
        return
    except ValueError:
        print(f"Invalid `sessionId`")
        return

    print(f"Execise started for {session_id}")

    pagaioFSM.resume() # $CMD,53

def handle_and_validate_stop_msg(cmd):
    # TODO validate the message.

    session_id = None
    try:
        session_id = uuid.UUID(cmd['payload']['sessionId'])
    except KeyError:
        print("`sessionId` not found")
        return
    except ValueError:
        print(f"Invalid `sessionId`")
        return

    print(f"Execise started for {session_id}")

    pagaioFSM.pause() # $CMD,54


def parse_incoming_message(msg):
    cmd = {}
    try:
        cmd = json.loads(msg)
    except ValueError:
        print(f"Invalid JSON message received: {msg}")
        return


    # General message format:
    # { messageType: "", payload: {...}}
    msg_type = cmd['messageType']
    print(f"Received message: {msg_type}")

    if msg_type == 'pairing':
        handle_and_validate_pairing_msg(cmd)
    elif msg_type == 'setup':
        handle_and_validate_setup_msg(cmd)
    elif msg_type == 'pause':
        handle_and_validate_pause_msg(cmd)
    elif msg_type == 'setup':
        handle_and_validate_resume_msg(cmd)
    elif msg_type == 'setup':
        handle_and_validate_stop_msg(cmd)
    else:
        print(f"Unknown message: {msg_type}")

def get_data():
    MAX_PADDLE_POWER = 1500.0

    ts = datetime.timestamp(datetime.now())
    sin_ts = math.sin(ts)

    global TOTAL_DISTANCE

    new_data = copy.deepcopy(TEST_DATA)
    new_data["data"]["timestamp"] = ts
    new_data["data"]["speed"] = sin_ts
    new_data["data"]["paddle_distance"] *= abs(sin_ts)
    TOTAL_DISTANCE += new_data["data"]["paddle_distance"]
    new_data["data"]["total_distance"] = TOTAL_DISTANCE

    # Simulate the power_sx using the positive sin, dx using the negative.
    if sin_ts > 0:
        new_data["data"]["propulsion_arm"] = 2 # Left
        new_data["data"]["power_sx"] = abs(sin_ts * MAX_PADDLE_POWER)
        new_data["data"]["power_dx"] = 0
    else:
        new_data["data"]["propulsion_arm"] = 1 # Right
        new_data["data"]["power_sx"] = 0
        new_data["data"]["power_dx"] = abs(sin_ts * MAX_PADDLE_POWER)

    return new_data

def create_status_message(data):
    msg = {}
    msg["messageType"] = "status"
    payload = {
        "distanceInMeters": data["data"]["total_distance"],
        "averageSpeedMetersSeconds": data["data"]["speed"],
        "bpm": 3,
        "powerLeft": data["data"]["power_sx"],
        "powerRight": data["data"]["power_dx"]
    }
    msg["payload"] = payload
    return json.dumps(msg)

async def consumer_handler(websocket, path):
    async for message in websocket:
        parse_incoming_message(message)

async def producer_handler(websocket, path):
    while True:
        if pagaioFSM.state == 'training':
            new_data = create_status_message(get_data())
            print("Sending {}".format(new_data))
            await websocket.send(new_data)
        await asyncio.sleep(0.03) # 30ms

async def handler(websocket, path):
    consumer_task = asyncio.ensure_future(
        consumer_handler(websocket, path))
    producer_task = asyncio.ensure_future(
        producer_handler(websocket, path))
    done, pending = await asyncio.wait(
        [consumer_task, producer_task],
        return_when=asyncio.FIRST_COMPLETED,
    )
    print("--- 11 ---")
    for task in pending:
        task.cancel()

start_server = websockets.serve(handler, "127.0.0.1", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()