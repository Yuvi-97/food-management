import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "./Header.css";
// import logoImage from "../../assets/1.png";
import ImageSlider from "../ImageSlider/imageslider";

const Header = ({ role }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDateTime(new Date()), 60000);
    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (date) => {
    return `${date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    })} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const toggleProfileDropdown = () => setProfileDropdownVisible(!profileDropdownVisible);
  const handleLogout = () => { localStorage.clear(); window.location.href = "/"; };

  const renderLinks = () => {
    if (role === "donor") return (
      <ul>
        <li><Link to="/donate">Donate Food</Link></li>
        <li><Link to="/my-donations">My Donations</Link></li>
      </ul>
    );
    if (role === "ngo") return (
      <ul>
        <li><Link to="/requests">Food Requests</Link></li>
        <li><Link to="/received-food">Received Food</Link></li>
      </ul>
    );
    if (role === "admin") return (
      <ul>
        <li><Link to="/manage-donations">Manage Donations</Link></li>
        <li><Link to="/manage-ngos">Manage NGOs</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    );
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1>Food Management</h1>
        </div>
        <nav className="header-center">{renderLinks()}</nav>
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
          <div className="profile">
            <FaUserCircle onClick={toggleProfileDropdown} className="profile-icon" size={24} />
            {profileDropdownVisible && (
              <div className="profile-options-dropdown">
                <Link to="/profile" className="profile-option">My Profile</Link>
                <Link to="/settings" className="profile-option">Settings</Link>
                <button onClick={handleLogout} className="profile-option">Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Image Slider appears immediately below the header */}
      <div style={{ marginTop: "20px" }}>
        <ImageSlider />
      </div>
    </>
  );
};

export default Header;
