# paga.io - PWM toolbox
#

import argparse
import numpy as np
import pigpio
import time

# Frequency and duty cycle constants, taken from
# https://github.com/joan2937/pigpio/blob/934874be2fa34a525beb33e8cb75e378df587860/pigpio.py#L1957-L1959
MAX_PWM_FREQUENCY_HZ = 125000000
# The PWM frequency is supposed to work reliably up to 30Mhz according to the docs.
PWM_FREQUENCY_RELIABLE_TRESHOLD = 30000000
MAX_PWM_DUTY_CYCLE = 1000000


def parse_command_line():
    print("paga.io - PWM experimentation toolbox")
    parser = argparse.ArgumentParser()
    parser.add_argument('--pin', required=False, type=int, choices=(13, 18), default=18,
                        help="The GPIO pin (13/18) to enable the PWM on (default 18).")
    parser.add_argument('--frequency', required=False, type=int, default=50,
                        help="The frequency of the PWM, in Hertz (default 50).")
    # Add mutually exclusive options for the PWM signal generation.
    pwm_exec_group = parser.add_mutually_exclusive_group()
    pwm_exec_group.add_argument('--sin', type=float,
                                help='Change the duty-cycle according to a sin function with the provided degrees per frame.')
    pwm_exec_group.add_argument('--duty-cycle', required=False, default=0.5,
                                type=lambda x: float(x) if 0.0 <= float(x) <= 1.0
                                               else parser.error("Invalid duty cycle"),
                                help="The duty cycle of the PWM, a ratio between 0.0 and 1.0 (default 0.5).")
    return parser.parse_args()


def generate_pwm(pi, frequency, duty_cycle, pin, silent_mode=False):
    """Generate an hardware PWM on a GPIO pin.

    :param frequency: the frequency in Hz of the PWM.
    :param duty_cycle: the duty cycle [0.0, 1.0].
    :param pin: the hardware GPIO pin number.
    :param silent_mode: just set the PWM, do not report back.
    """
    if frequency >= PWM_FREQUENCY_RELIABLE_TRESHOLD:
        print("{} is greater than the maximum suggested threshold {}. The PWM might not be reliable"
              .format(frequency, PWM_FREQUENCY_RELIABLE_TRESHOLD))

    res = pi.hardware_PWM(pin, frequency, int(duty_cycle * MAX_PWM_DUTY_CYCLE))
    if res:
        # Ok, some error was returned. Let's print it.
        print("Failed to set the hardware PWM with error: {}".format(res))

    # Make sure that the PWM was correctly set.
    if not silent_mode:
        print("RPi reports a PWM with frequency {} and duty cycle {} on GPIO {}"
              .format(pi.get_PWM_frequency(pin), pi.get_PWM_dutycycle(pin) / MAX_PWM_DUTY_CYCLE, pin))


def generate_sin(pi, frequency, pin, step):
    """Continuously generate an hardware PWM on a GPIO pin, according
    to a sin wave.

    :param frequency: the frequency in Hz of the PWM.
    :param duty_cycle: the duty cycle [0.0, 1.0].
    :param pin: the hardware GPIO pin number.
    :param step: the amount of degrees per frame.
    """
    print("Generating a sine wave. Press CTRL+C to abort.")
    try:
        last_update_time = time.time()
        deg_angle = 0.0
        while True:
            # Compute the delta time since the last update.
            current_time = time.time()
            delta_time = current_time - last_update_time
            last_update_time = current_time

            # Add the delta time to the angle. Wrap around if needed
            # (we don't care too much about float precision here).
            deg_angle += step * delta_time
            if deg_angle >= 360.0:
                deg_angle = 0.0

            # Compute the new duty cycle and set the PWM.
            new_duty_cycle = np.abs(np.sin(deg_angle * np.pi / 180.0))
            generate_pwm(pi, frequency, new_duty_cycle, pin, silent_mode=True)
    except KeyboardInterrupt:
        print("Aborting.")
        return


def main(args):
    print("Connecting to the GPIO daemon...")
    pi = pigpio.pi()
    if not pi.connected:
        print("Cannot connect to the GPIO daemon.")
        return

    # Get the hardware revision for the RPi, for debugging
    # purposes.
    print("Hardware revision: {}".format(pi.get_hardware_revision()))

    # Generate the PWM.
    print("Generating a PWM with frequency {}Hz, duty cycle {:.2f} on GPIO {}"
          .format(args.frequency, args.duty_cycle, args.pin))
    if args.sin is not None:
        generate_sin(pi, args.frequency, args.pin, args.sin)
    else:
        generate_pwm(pi, args.frequency, args.duty_cycle, args.pin)

    print("Closing the connection to the GPIO daemon.")
    pi.stop()


if __name__ == "__main__":
    args = parse_command_line()
    main(args)
