# paga.io
TODO

## Setup
TODO

1. On Raspbian, install `pigpio` using the following bash commands:
    ```
    sudo apt-get update
    sudo apt-get install pigpio python-pigpio python3-pigpio
    ```
2. Run `pigpiod -v` to check that it's working.
3. Install the `pip` package manager with `sudo apt-get install python3-pip`.
4. Install the additional dependencies with `sudo apt-get install libatlas3-base`.
5. From the project directory, run `pip install -r requirements.txt` to install the Python dependencies.

## Testing the PWM
Before using the GPIO pins to generate the PWM signals, the `pigpiod` daemon must be up and running. To do that, issue the `sudo pigpiod` command.
The PWM signals can be generated using `scripts/pwm_test.py`. For example, to generate a
50Hz PWM with a duty cycle of 0.5 on GPIO 18, the following command can be used:

    ```
    python3 scripts/pwm_test.py --pin 18 --duty-cycle 0.5 --frequency 50
    ```

Moreover, to continuously vary the PWM duty cycle according to a positive sine wave, run:

    ```
    python3 scripts/pwm_test.py --pin 18 --frequency 50 --sin 5.0
    ```

The `CTRL+C` key combination can be used to stop the generation of the signal.

## Testing the machine simuator
First, make sure all the dependencies are installed by running `pip install -r requirements.txt`.

    ```
    python3 scripts/ws_server.py
    ```

Then, using [`wscat`](https://github.com/websockets/wscat), you can check that the simulator is working and accepting connections.

    ```
    wscat -c ws://localhost:8765/status
    ```

