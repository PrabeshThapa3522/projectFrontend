
import React from "react";
import { Link } from "react-router-dom";
import "./MovieItem.css"; // Add your custom styles here

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <div className="movie-item">
      <div className="movie-item-card ">
        <img className="movie-item-img " src={posterUrl} alt={title} />
        <div className="movie-item-content">
          <h5 className="movie-item-title">{title}</h5>
          <p className="movie-item-release-date">{new Date(releaseDate).toDateString()}</p>
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

