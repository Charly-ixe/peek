#!/usr/bin/env python

import signal
import time
import sys
import requests

from pirc522 import RFID

import RPi.GPIO as GPIO

run = True
rdr = RFID()
util = rdr.util()
util.debug = True
headers = {'Accept': 'application/json'}

def end_read(signal,frame):
    global run
    print("\nCtrl+C captured, ending read.")
    run = False
    rdr.cleanup()
    GPIO.cleanup()
    sys.exit()

signal.signal(signal.SIGINT, end_read)

print("Starting Peek scan")
while run:
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(37, GPIO.OUT)
    GPIO.output(37, GPIO.LOW)
    rdr.wait_for_tag()

    (error, data) = rdr.request()
    if not error:
        print("\nDetected: " + format(data, "02x"))

    (error, uid) = rdr.anticoll()
    if not error:
        # requests.post('http://192.168.43.190:3030/peeks', data = {'user_card_id': str(uid[0])+","+str(uid[1])+","+str(uid[2])+","+str(uid[3])}, headers = headers)
        print("Card read UID: "+str(uid[0])+","+str(uid[1])+","+str(uid[2])+","+str(uid[3]))
        GPIO.output(37, GPIO.HIGH)
        time.sleep(2)
        GPIO.output(37, GPIO.LOW)
        print("Setting tag")
        util.set_tag(uid)
        print("\nAuthorizing")
        #util.auth(rdr.auth_a, [0x12, 0x34, 0x56, 0x78, 0x96, 0x92])
        util.auth(rdr.auth_b, [0x74, 0x00, 0x52, 0x35, 0x00, 0xFF])
        print("\nReading")
        util.read_out(4)
        print("\nDeauthorizing")
        util.deauth()

        time.sleep(1)
