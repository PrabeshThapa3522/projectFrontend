import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Add custom styles for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-section">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-text">
            Welcome to MovieTickets, your one-stop destination for booking
tickets to the latest blockbuster movies. Enjoy a seamless and hassle-free
experience with us!
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/movies" className="footer-link">Movies</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <p className="footer-text">
            Email: support@movietickets.com<br />
            Phone: +1 234 567 890<br />
            Address: 123 Movie Lane, Hollywood, CA
          </p>
          <div className="footer-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MovieTickets. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
