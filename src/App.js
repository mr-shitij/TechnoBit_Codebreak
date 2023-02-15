import React, { useState } from "react";
import axios from "axios";

function App() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleData, setVehicleData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vehicle/vehicleNumber/${vehicleNumber}`);
      setVehicleData(response.data);
    } catch (error) {
      console.error(error);
      setVehicleData(null);
    }
  };

  return (
    <div>
      <h1>Vehicle Search</h1>
      <div>
        <label>Vehicle Number:</label>
        <input
          type="text"
          value={vehicleNumber}
          onChange={(event) => setVehicleNumber(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {vehicleData && (
        <div>
          <h2>Vehicle Details</h2>
          <p>
            <strong>Vehicle Number:</strong> {vehicleData.vehicleNumber}
          </p>
          <p>
            <strong>Name with Model:</strong> {vehicleData.nameWithModel}
          </p>
          <p>
            <strong>Total Capacity:</strong> {vehicleData.totalcapacity}
          </p>
          <p>
            <strong>Available Capacity:</strong> {vehicleData.availableCapacity}
          </p>
          <p>
            <strong>Current Speed:</strong> {vehicleData.currSpeed}
          </p>
          <p>
            <strong>Current Acceleration:</strong> {vehicleData.currAcceleration}
          </p>
          <p>
            <strong>Engine Power:</strong> {vehicleData.enginePower}
          </p>
          <p>
            <strong>Fuel Used:</strong> {vehicleData.fuelUsed}
          </p>
          <p>
            <strong>Current Location:</strong> {JSON.stringify(vehicleData.currentLocation)}
          </p>
          <p>
            <strong>Source Location:</strong> {JSON.stringify(vehicleData.srcLocation)}
          </p>
          <p>
            <strong>Destination Location:</strong> {JSON.stringify(vehicleData.destLocation)}
          </p>
          <p>
            <strong>Mileage:</strong> {vehicleData.mileage}
          </p>
          <p>
            <strong>Tyre Pressure:</strong> {vehicleData.tyrePressure}
          </p>
          <p>
            <strong>RPM Engine:</strong> {vehicleData.rpmEngine}
          </p>
          <p>
            <strong>Current Pedal Position:</strong> {vehicleData.pedalPosition}
          </p>
          <p>
            <strong>Air Flow Rate:</strong> {vehicleData.airFlowRate}
          </p>
          <p>
            <strong>Coolant Temperature:</strong> {vehicleData.coolantTemperature}
          </p>
          <p>
            <strong>Driver Name:</strong> {vehicleData.driverName}
          </p>
          <p>
            <strong>Maintenance Status:</strong> {vehicleData.maintainenaceStatus}
          </p>
          <p>
            <strong>Distance Travelled:</strong> {vehicleData.distanceTravelled}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
