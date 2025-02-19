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
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude, address: "Fetching address..." });

        if (onSelectLocation) {
          onSelectLocation({ lat: latitude, lng: longitude });
        }

        // Fetch address using reverse geocoding
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.display_name) {
              setLocation({ lat: latitude, lng: longitude, address: data.display_name });
            } else {
              setLocation({ lat: latitude, lng: longitude, address: "Address not found" });
            }
          })
          .catch(() => setError("Failed to fetch address"));
      },
      () => {
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
          {/* <p><strong>Latitude:</strong> {location.lat}</p>
          <p><strong>Longitude:</strong> {location.lng}</p> */}
          <label>Address:</label>
          <input
            type="text"
            value={location.address}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
