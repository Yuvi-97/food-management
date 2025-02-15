import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
// import logoImage from "../../assets/1.png";
import ImageSlider from "../ImageSlider/imageslider";
import "./Header.css";

const Header = ({ role }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (date) => {
    const optionsDate = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = date.toLocaleDateString([], optionsDate);
    const formattedTime = date.toLocaleTimeString([], optionsTime);

    return `${formattedDate} ${formattedTime}`; // Concatenate without a comma
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const renderLinks = () => {
    if (role === "donor") {
      return (
        <>
          <Link to="/donate">Donate Food</Link>
          <Link to="/my-donations">My Donations</Link>
        </>
      );
    } else if (role === "ngo") {
      return (
        <>
          <Link to="/requests">Food Requests</Link>
          <Link to="/received-food">Received Food</Link>
        </>
      );
    } else if (role === "admin") {
      return (
        <>
          <Link to="/manage-donations">Manage Donations</Link>
          <Link to="/manage-ngos">Manage NGOs</Link>
          <Link to="/analytics">Analytics</Link>
        </>
      );
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1>Food Management</h1>
        </div>
        <nav className="header-center">
          <ul>
            <Link to="/">Home</Link>
            {renderLinks()}
          </ul>
        </nav>
        <div className="header-right">
          <p className="cur">{formatDateTime(currentDateTime)}</p>
          <div className="notification">
            <FaBell onClick={toggleDropdown} className="notification-icon" />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/notifications">Notifications</Link>
                <Link to="/settings">Settings</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Add some margin below the header for spacing */}
      <div style={{ marginTop: "40px" }}>
        {/* Add the ImageSlider component here */}
        <ImageSlider />
      </div>
    </>
  );
};

export default Header;
