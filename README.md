# IoT Watering System

A university project that monitors temperature using Raspberry Pi sensors and displays data through a web dashboard.

## Technologies

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: EJS templates
- **Hardware**: Raspberry Pi, DHT11 temperature sensor
- **Authentication**: Passport.js

## How it Works

1. Raspberry Pi reads temperature data from DHT11 sensor using Python script
2. Temperature readings are stored in MongoDB cloud database
3. Express server provides web dashboard with authentication
4. Users can log in to view current temperature readings

## Setup

1. Install dependencies: `npm install` (in server directory)
2. Create `.env` file with MongoDB credentials (see `.env.example`)
3. Run server: `npm start`
4. Run temperature sensor script on Raspberry Pi: `python read_temp_raspberry.py`