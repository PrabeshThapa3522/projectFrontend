
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../../helpers/api-helpers";
import CradLayout from "./CradLayout";
import "./HomeLayout.css"; // Add your custom styles here

const HomeLayout = () => {
  const [movies, setMovies] = useState();
  
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-layout">
      <div className="banner">
        <img
          src="https://www.glenbrookcinema.com.au/imagesDB/movies/MufasaTheLionKingSlidePG.jpg"
          alt="Mufasa"
          className="banner-img"
        />
      </div>
      
      <div className="title-container">
  <h2 className="title">Latest Releases</h2>
</div>
<div className="movies-container">
  {movies &&
    movies.slice(0, 4).map((movie, index) => (
      <CradLayout
        id={movie._id}
        title={movie.title}
        releaseDate={movie.releaseDate}
        posterUrl={movie.posterUrl}
        description={movie.description}
        key={index}
      />
    ))}
</div>

      <div className="view-all">
        <Link to="/movies" className="view-all-btn">
          View All Movies
        </Link>
      </div>
    </div>
  );
};

export default HomeLayout;


