import React, { useState } from "react";

const LocationPicker = ({ onSelectLocation }) => {
  const [location, setLocation] = useState({ lat: "", lng: "", address: "" });
  const [error, setError] = useState("");

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude, address: "" });

        if (onSelectLocation) {
          onSelectLocation({ lat: latitude, lng: longitude });
        }
      },
      (error) => {
        setError("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div>
      <h3>Select Your Location</h3>
      <button onClick={getCurrentLocation}>📍 Use Current Location</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {location.lat && (
        <div>
          <p><strong>Latitude:</strong> {location.lat}</p>
          <p><strong>Longitude:</strong> {location.lng}</p>
          <label>Address (optional):</label>
          <input
            type="text"
            value={location.address}
            onChange={(e) => setLocation({ ...location, address: e.target.value })}
            placeholder="Enter your address"
          />
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
