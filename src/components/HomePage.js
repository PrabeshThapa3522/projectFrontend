
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import "./HomePage.css";  // Import custom CSS for styling

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))  // Ensure the response contains 'movies'
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <div className="banner-container">
        <img
          src="https://www.glenbrookcinema.com.au/imagesDB/movies/MufasaTheLionKingSlidePG.jpg"
          alt="Mufasa"
          className="banner-image"
        />
      </div>

      <div className="latest-releases">
        <h2>Latest Releases</h2>
      </div>

      <div className="movies-container">
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie._id}  // Use '_id' here
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </div>

      <div className="view-all-button-container">
        <Link to="/movies" className="view-all-button">
          View All Movies
        </Link>
      </div>
    </div>
  );
};

export default HomePage;


