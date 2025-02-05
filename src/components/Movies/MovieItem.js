
import React from "react";
import { Link } from "react-router-dom";
import "./MovieItem.css"; // Add your custom styles here

const MovieItem = ({ title, releaseDate, posterUrl, id, percentage }) => {
  return (
    <div className="movie-item">
      <div className="movie-item-card ">
        <img className="movie-item-img " src={posterUrl} alt={title} />
        <div className="movie-item-content">
          <h5 className="movie-item-title">{title}</h5>
          <p className="movie-item-release-date" style={{
            marginBottom:0
          }}>{releaseDate}</p>
          <p className="movie-item-release-date"  style={{
            marginBottom:0
          }}>Preference Percentage: {percentage}%</p>
        </div>
        <div className="movie-item-actions">
          <Link to={`/booking/${id}`} className="movie-item-button">
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;

