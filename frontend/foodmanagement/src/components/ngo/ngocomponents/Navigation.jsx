import { Link } from "react-router-dom";
import "../ngostyles/Navigation.css";

const Navigation = () => (
  <nav className="navbar">
    <div className="logo">NGO</div>
    <ul className="nav-links">
      <li><Link to="/ngo-dashboard">Dashboard</Link></li>
      <li><Link to="/live-tracking">Live Tracking</Link></li>
      <li><Link to="/food-management">Food Management</Link></li>
      <li><Link to="/waste-management">Waste Management</Link></li>
      <li><Link to="/reports">Reports</Link></li>
      <li><Link to="/chatbot">Chatbot</Link></li>
      <li><Link to="/">Log out</Link></li>
    </ul>
  </nav>
);
export default Navigation;