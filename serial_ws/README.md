sudo apt-get install cmake libboost1.62-dev libboost-system1.62-dev libboost-thread1.62-dev libssl-dev
stty -F /dev/serial0 raw

virtual serial: https://stackoverflow.com/a/19733677/261698
-- socat -d -d pty,raw,echo=0 pty,raw,echo=0
-- cat < /dev/pts/0
-- echo "Test" > /dev/pts/1


for NUM in `seq 1 1 10`; do echo -n -e "\$PAGDATA,$NUM\r\n" > /dev/serial0; done