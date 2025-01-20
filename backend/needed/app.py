from flask import Flask, jsonify
from datetime import datetime
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import time

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  #Enable Cross-Origin Resource Sharing (CORS) for all routes


app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///aaldb.sqlite3"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the SensorData model
class SensorData(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    temperature = db.Column(db.Integer, nullable=False)
    humidity = db.Column(db.Integer, nullable=False)
    air_quality = db.Column(db.Float, nullable=False)

    def __init__(self, timestamp, temperature, humidity, air_quality):
        self.timestamp = timestamp
        self.temperature = temperature
        self.humidity = humidity
        self.air_quality = air_quality

# Function to write a random number to 'data.txt' every second
@app.route('/')
def read_data_from_file():
    #while True:
        # Write the numbers to 'data.txt'
    with open("current_data.csv", "r") as file:
        line = file.readline()
        data_parts=line.split(",")
        print(data_parts)
        timestamp = data_parts[0]
        temp = data_parts[1]
        hum = data_parts[2]
        air_q = data_parts[3]            
        
        return jsonify({"timestamp": timestamp, "temperature": temp, "air_quality_level": air_q, "air_humidity_level": hum})

# Function to read historical data from a CSV file and insert it into the database
def insert_historical_data():
     # Open the CSV file and read all lines
    with open("historical_data.csv", "r") as file:
        lines = file.readlines()

        for line in lines:
            start_time = time.time()
            data_parts = line.strip().split(",")
            if len(data_parts) == 4:
                timestamp = datetime.strptime(data_parts[0], "%Y-%m-%d %H:%M:%S")
                temp = int(data_parts[1])
                hum = int(data_parts[2])
                air_q = float(data_parts[3])

                sensor_data = SensorData(
                    timestamp=timestamp,
                    temperature=temp,
                    humidity=hum,
                    air_quality=air_q
                )
                
                db.session.add(sensor_data)
                db.session.commit()

                end_time = time.time()

                print(f"inserted record in {end_time - start_time} seconds")


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        insert_historical_data()  # Insert historical data
    app.run(debug=True)
