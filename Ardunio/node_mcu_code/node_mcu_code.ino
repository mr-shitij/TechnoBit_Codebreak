#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

WiFiClient client;

const char* ssid = "Evil";
const char* password = "DontAskMe";

String serverName = "http://192.168.201.200:3000/";

String vehicleNumber[] = {"MH12JM4343", "MH12JM4345", "MH12JM4346", "MH12JM4347", "MH12JM4348", "MH12JM4349"};
String nameWithModel[] = {"Test Vehicle 1", "Test Vehicle 2", "Test Vehicle 3", "Test Vehicle 3", "Test Vehicle 4", "Test Vehicle 5"} ;
String driverName[] = {"Driver 1", "Driver 2", "Driver 3", "Driver 3", "Driver 4", "Driver 5"} ;

double curLatitude[] = {1.234567, 1.234567, 1.234567, 1.334567, 1.634567, 1.634567};
double curLongitude[] = {2.345678, 2.345678, 2.345678, 2.345678, 2.345678, 2.345678};

double srcLatitude[] = {1.234567, 1.234567, 1.234567, 1.134567, 1.184567, 2.184567};
double srcLongitude[] = {2.345678, 2.345678, 2.345678, 2.345678, 2.345678, 2.345678};

double destLatitude[] = {2.345678, 2.345678, 2.345678, 2.445678, 2.445678, 2.445678};
double destLongitude[] = {3.456789, 3.456789, 3.456789, 3.456789, 3.456789, 3.456789};

double milage[] = {5, 20, 12, 6, 18};
double rpmEngine[] = {3606, 2606, 1606, 0, 3506};

int i = 0;

int getRandInRange(int max_number, int minimum_number) {
  return rand() % (max_number + 1 - minimum_number) + minimum_number;
}

void setup() {
  Serial.begin(115200); 

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}
void loop() {
   if(i == 5)
    i = 0;
   if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status 
    StaticJsonDocument<900> doc;
    
    doc["vehicleNumber"] = vehicleNumber[i];
    doc["nameWithModel"] = nameWithModel[i];
    doc["currSpeed"] = 0;
    doc["currAcceleration"] = 0;
    doc["enginePower"] = 100;
    doc["fuelUsed"] = 0;
    
    doc["mileage"] = milage[getRandInRange(0, 5)];
    doc["tyrePressure"] = 30;
    doc["rpmEngine"] = rpmEngine[getRandInRange(0, 5)];
    doc["pedalPosition"] = 0;
    doc["airFlowRate"] = 0;
    doc["coolantTemperature"] = 0;
    doc["driverName"] = driverName[i];
    doc["maintainenaceStatus"] = 1;
    doc["distanceTravelled"] = 0;
    doc["__v"] = 0;

    JsonObject currentLocation = doc.createNestedObject("currentLocation");
    currentLocation["latitude"] = curLatitude[i];
    currentLocation["longitude"] = curLongitude[i];
    
    JsonObject srcLocation = doc.createNestedObject("srcLocation");
    srcLocation["latitude"] = srcLatitude[i];
    srcLocation["longitude"] = srcLongitude[i];
    
    JsonObject destLocation = doc.createNestedObject("destLocation");
    destLocation["latitude"] = destLatitude[i];
    destLocation["longitude"] = destLongitude[i];
    
    
    String jsonString;
    serializeJson(doc, jsonString);
    Serial.println(jsonString);
 
    HTTPClient http;    //Declare object of class HTTPClient
 
    http.begin(client, serverName);      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
 
    int httpCode = http.POST(jsonString);   //Send the request
    String payload = http.getString();     //Get the response payload

    if (httpCode > 0) {
      String response = http.getString();
      Serial.println(response);
    } else {
      Serial.println("Error on HTTP request");
    }
    http.end();    
  } else {
    Serial.println("Error in WiFi connection");
  }
  delay(3000);  //Send a request every 3 seconds
  i++;
}

/*

"vehicleNumber": "MH12JM4343",
  "nameWithModel": "Test Vehicle 1",
  "currSpeed": 0,
  "currAcceleration": 0,
  "enginePower": 100,
  "fuelUsed": 0,
  "currentLocation": {
    "latitude": 1.234567,
    "longitude": 2.345678
  },
  "srcLocation": {
    "latitude": 1.234567,
    "longitude": 2.345678
  },
  "destLocation": {
    "latitude": 2.345678,
    "longitude": 3.456789
  },
  "mileage": 0,
  "tyrePressure": 30,
  "rpmEngine": "1000",
  "pedalPosition": 0,
  "airFlowRate": 0,
  "coolantTemperature": 0,
  "driverName": "Test Driver",
  "maintainenaceStatus": 1,
  "distanceTravelled": 0,
  "__v": 0
}
 
*/
