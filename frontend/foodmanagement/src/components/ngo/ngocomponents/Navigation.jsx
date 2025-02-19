import { Link } from "react-router-dom";
import { useState } from "react";
import "../ngostyles/Navigation.css";
import { FaUserCircle } from "react-icons/fa";

const Navigation = () => {
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
    console.log("User logged out");
  };

  return (
    <nav className="navbar">
      <div className="logo">NGO</div>
      <ul className="nav-links">
        <li><Link to="/ngo-dashboard">Dashboard</Link></li>
        <li><Link to="/live-tracking">Live Tracking</Link></li>
        <li><Link to="/food-management">Food Management</Link></li>
        <li><Link to="/waste-management">Waste Management</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/community">Community Hub</Link></li>
        <div className="profile">
          <FaUserCircle
            onClick={toggleProfileDropdown}
            className="profile-icon"
            size={28}
          />
          {profileDropdownVisible && (
            <div className="profile-options-dropdown">
              <Link to="/profile" className="profile-option">My Profile</Link>
              <Link to="/settings" className="profile-option">Settings</Link>
              <button onClick={handleLogout} className="profile-option">Logout</button>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;