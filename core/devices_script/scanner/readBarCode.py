import serial.tools.list_ports as portlist
import serial

try:
    ser = serial.Serial( port="COM130", baudrate=9600, bytesize=8, timeout=30, stopbits=serial.STOPBITS_ONE )
except:
    print('error while opening serial port')

ser.write(b'\x16M\rallena1!') #enable all symbols
ser.read(10)
ser.write(b'\x16M\rocrena0!') #disable OCR
ser.read(10)

ser.write(b'\x16T\r') #trigger

# r = ser.readline() 
r = ser.read(16) 
code = r.decode('utf8')
print(code)

ser.write(b'\x16U\r') #release trigger