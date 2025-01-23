
  // This is without mui

  import React from "react";
import { Link } from "react-router-dom";
import "./CardLayout.css"; // Add your custom styles here

const CardLayout = ({ title, description, releaseDate, posterUrl, id }) => {
  return (
    <div className="card">
      <img
        className="card-img"
        src={posterUrl}
        alt={title}
      />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-release-date">{new Date(releaseDate).toDateString()}</p>
      </div>
      <div className="card-actions">
        <Link to={`/booking/${id}`} className="card-button">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default CardLayout;

