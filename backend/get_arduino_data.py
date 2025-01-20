import serial
import csv
import time

arduino_port = "COM5"  # Replace with your Arduino's port
baud_rate = 9600       # Match the baud rate in the Arduino code
ser = serial.Serial(arduino_port, baud_rate)

historical_file = "historical_data.csv"
current_file = "current_data.csv"

def save_historical_data(timestamp, temperature, humidity, ppm):
    # with open("C:/Users/ahmed/Downloads/mydata/historical_data.csv", "a", newline="") as csvfile:
    with open("historical_data.csv", "a", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([timestamp, temperature, humidity, ppm])

def save_current_data(timestamp, temperature, humidity, ppm):
    # with open("C:/Users/ahmed/Downloads/mydata/current_data.csv", "w", newline="") as csvfile:
    with open("current_data.csv", "w", newline="") as csvfile:

        writer = csv.writer(csvfile)
        writer.writerow([timestamp, temperature, humidity, ppm])

print("Listening to Arduino...")
while True:
    try:
        line = ser.readline().decode("utf-8").strip()
        print(line)  # Debug: View raw data
        
        # Parse data
        if "Corrected PPM" in line:
            parts = line.split("\t")
            ppm = float(parts[-1].split(":")[1].replace("ppm", "").strip())
            line = ser.readline().decode("utf-8").strip()
            temp_humid = line.split(", ")
            temperature = int(temp_humid[0].split(" ")[0])
            humidity = int(temp_humid[1].split(" ")[0])

            # Save data
            timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
            save_historical_data(timestamp, temperature, humidity, ppm)
            save_current_data(timestamp, temperature, humidity, ppm)
            print(f"Saved: {timestamp}, Temp: {temperature}, Humidity: {humidity}, PPM: {ppm}")
    except KeyboardInterrupt:
        print("Stopped by user.")
        ser.close()
        break
    except Exception as e:
        print(f"Error: {e}")
