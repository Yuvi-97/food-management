import React from 'react';
import { FaTwitter, FaFacebook, FaYoutube, FaEnvelope, FaPhone } from 'react-icons/fa';
import { AiOutlineAppstore, AiOutlineBook, AiOutlineSafety } from 'react-icons/ai';
import './Footer.css'; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <h2>Food Rescue Network</h2>
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li><a href="#mission"><AiOutlineSafety /> Our Mission</a></li>
            <li><a href="#how-it-works"><AiOutlineAppstore /> How It Works</a></li>
            <li><a href="#partners"><AiOutlineAppstore /> Our Partners</a></li>
            <li><a href="#faq"><AiOutlineAppstore /> FAQs</a></li>
            <li><a href="#careers"><AiOutlineAppstore /> Careers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Get Involved</h4>
          <ul>
            <li><a href="#donate-food"><AiOutlineAppstore /> Donate Food</a></li>
            <li><a href="#volunteer"><AiOutlineAppstore /> Volunteer</a></li>
            <li><a href="#partner-with-us"><AiOutlineAppstore /> Partner with Us</a></li>
            <li><a href="#sponsor"><AiOutlineAppstore /> Become a Sponsor</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#food-safety"><AiOutlineBook /> Food Safety Guidelines</a></li>
            <li><a href="#waste-reduction-tips"><AiOutlineBook /> Waste Reduction Tips</a></li>
            <li><a href="#sustainability"><AiOutlineAppstore /> Sustainability Reports</a></li>
            <li><a href="#developer-portal"><AiOutlineAppstore /> Developer API</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><a href="#support"><FaPhone /> Support Center</a></li>
            <li><a href="#feedback"><AiOutlineBook /> Feedback</a></li>
            <li><a href="#emergency-hotline"><AiOutlineSafety /> Emergency Hotline</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-social">
          <a href="https://twitter.com/FoodRescue" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a>
          <a href="https://facebook.com/FoodRescue" target="_blank" rel="noopener noreferrer"><FaFacebook /> Facebook</a>
          <a href="https://youtube.com/FoodRescue" target="_blank" rel="noopener noreferrer"><FaYoutube /> YouTube</a>
        </div>
        <p>&copy; 2024 Food Rescue Network. All rights reserved.</p>
        <div className="footer-links">
          <a href="#terms">Terms of Service</a> | <a href="#privacy">Privacy Policy</a> | <a href="#accessibility">Accessibility</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
