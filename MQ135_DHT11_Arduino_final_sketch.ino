#include <MQ135.h>
#include <DHT.h>

/* Air Quality Monitoring System (MQ135 and DHT11 sensors)

   This program uses the MQ135 sensor to measure air quality in PPM and
   a DHT11 sensor to provide temperature and humidity for correction.

   Sensor Connections:
   - MQ135: Analog pin A2
   - DHT11: Digital pin 2

   Uses the Adafruit DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library
   Adapted from: https://github.com/NuclearPhoenixx/MQ135
*/

#define MQ135_PIN A2   // MQ135 connected to analog pin A2
#define DHT_PIN 2      // DHT sensor connected to digital pin 2
#define DHT_TYPE DHT11 // Define the DHT sensor type (DHT11)

MQ135 mq135Sensor(MQ135_PIN);
DHT dht(DHT_PIN, DHT_TYPE);

float temperature, humidity; // Variables to store DHT sensor readings

void setup() {
  Serial.begin(9600); // Start serial communication for output
  dht.begin();        // Initialize the DHT sensor
}

void loop() {
  // Read data from the DHT sensor
  humidity = dht.readHumidity();
  temperature = dht.readTemperature();

  // Validate the DHT sensor readings
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Error: Could not read temperature or humidity data.");
    return; // Exit the loop if readings are invalid
  }

  // Retrieve data from the MQ135 sensor
  float rZero = mq135Sensor.getRZero();
  float correctedRZero = mq135Sensor.getCorrectedRZero(temperature, humidity);
  float resistance = mq135Sensor.getResistance();
  float ppm = mq135Sensor.getPPM();
  float correctedPPM = mq135Sensor.getCorrectedPPM(temperature, humidity);

  // Output sensor data to the Serial Monitor
  Serial.print("RZero: ");
  Serial.print(rZero);
  Serial.print("\t Corrected RZero: ");
  Serial.print(correctedRZero);
  Serial.print("\t Resistance: ");
  Serial.print(resistance);
  Serial.print("\t PPM: ");
  Serial.print(ppm);
  Serial.print(" ppm");
  Serial.print("\t Corrected PPM: ");
  Serial.print(correctedPPM);
  Serial.println(" ppm");
  Serial.print((int)temperature); Serial.print(" *C, "); 
  Serial.print((int)humidity); Serial.println(" H");

  delay(3000); // Short delay before the next measurement cycle
}
