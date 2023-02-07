#https://pypi.org/project/mrz/

import serial
from mrz.checker.td1 import TD1CodeChecker, get_country
from mrz.checker.td3 import TD3CodeChecker, get_country
import sys


def retriveInformationCard(mrz):
    mrz_list = [mrz[idx:idx + 30] for idx in range(0, len(mrz), 30)]
    td1_check = TD1CodeChecker(mrz_list[0]+'\n'+mrz_list[1]+'\n'+mrz_list[2])

    fields = td1_check.fields()

    print(fields.name,fields.surname,fields.sex,get_country(fields.country),fields.birth_date)

def retriveInformationPassport(mrz):
    mrz_list = [mrz[idx:idx + 44] for idx in range(0, len(mrz), 44)]

    td1_check = TD3CodeChecker(mrz_list[0]+'\n'+mrz_list[1])

    fields = td1_check.fields()

    print(fields.name,fields.surname,fields.sex,get_country(fields.country), fields.birth_date)

try:
    ser = serial.Serial( port="COM130", baudrate=9600, bytesize=8, timeout=60, stopbits=serial.STOPBITS_ONE )
except:
    print ('error while opening serial port')

ser.write(b'\x16M\rallena0!') #disable all symbols
ser.read(10)
ser.write(b'\x16M\rocrena1!') #enable OCR
ser.read(10)
ser.write(b'\x16M\rocrats2!') #enable td1 and td2 MRZ
ser.read(10)

ser.write(b'\x16T\r') #trigger command SYN T CR

# r = ser.readline() #wait timeout before exit
if sys.argv[1] == 'card':
    r = ser.read(92) #wait timeout before exit
else:
    r = ser.read(89) #wait timeout before exit
line = r.decode('utf8')

ser.write(b'\x16U\r') #release trigger command SYN U CR

if(sys.argv[1] == 'card'):
    retriveInformationCard(line)
else:
    retriveInformationPassport(line)

