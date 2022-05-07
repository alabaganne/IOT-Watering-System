import Adafruit_DHT
import requests
from pymongo import MongoClient

CONNECTION_STRING = 'mongodb+srv://alabaganne:ala50101959@cluster0.xga5n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
db = MongoClient(CONNECTION_STRING)
 
# Set sensor type : Options are DHT11,DHT22 or AM2302
sensor=Adafruit_DHT.DHT11
 
# Set GPIO sensor is connected to
gpio=17
 
# Use read_retry method. This will retry up to 15 times to
# get a sensor reading (waiting 2 seconds between each retry).
humidity, temperature = Adafruit_DHT.read_retry(sensor, gpio)
 
# Reading the DHT11 is very sensitive to timings and occasionally
# the Pi might fail to get a valid reading. So check if readings are valid.
if humidity is not None and temperature is not None:
  	# print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
	temps.insert({
		"value": temperature
	})
else:
	print('Failed to get reading. Try again!')