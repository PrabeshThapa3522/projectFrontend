import React from "react";
import { useSelector } from "react-redux"; // Access the login status from Redux
import { Link, useNavigate } from "react-router-dom";
import "./MovieItem.css"; // Add your custom styles here

const MovieItem = ({ title, releaseDate, posterUrl, id, percentage }) => {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn); // Accessing the user login status

  const handleBookClick = () => {
    if (!isUserLoggedIn) {
      // If the user is not logged in, redirect them to the login page
      navigate("/auth"); // Redirect to the login page (adjust path if needed)
    }
  };

  return (
    <div className="movie-item">
      <div className="movie-item-card">
        <img className="movie-item-img" src={posterUrl} alt={title} />
        <div className="movie-item-content">
          <h5 className="movie-item-title">{title}</h5>
          <p className="movie-item-release-date" style={{ marginBottom: 0 }}>
            {releaseDate}
          </p>
          <p className="movie-item-release-date" style={{ marginBottom: 0 }}>
            Preference Percentage: {percentage}%
          </p>
        </div>
        <div className="movie-item-actions">
          {isUserLoggedIn ? (
            <Link to={`/booking/${id}`} className="movie-item-button">
              Book
            </Link>
          ) : (
            <button className="movie-item-button" onClick={handleBookClick}>
              Login to Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
