import serial.tools.list_ports as portlist
import serial

ser = serial.Serial( port="COM130", baudrate=9600, bytesize=8, timeout=2, stopbits=serial.STOPBITS_ONE )
ser.write(b'\x16M\rallena1!') #enable all symbols
ser.read(10)
ser.write(b'\x16M\rcbrena0!') #disable OCR
ser.read(10)

ser.write(b'\x16T\r') #trigger

r = ser.readline() 
code = r.decode('utf8')
print(code)

ser.write(b'\x16U\r') #release trigger