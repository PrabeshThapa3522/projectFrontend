/*import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../../helpers/api-helpers";
import CradLayout from "./CradLayout";

const HomeLayout = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(movies);
  return (
    <Box width="100%" height="100vh" marginTop={2} margin="auto">
      <Box margin={"auto"} width="80%" height="40%" padding={2} display="flex">
        <img
          src="https://i.ytimg.com/vi/yEinBUJG2RI/maxresdefault.jpg"
          alt="Rocketry"
          width="100%"
          height="100%"
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        gap={5}
        margin="auto"
        width="80%"
        flexWrap={"wrap"}
        display="flex"
        justifyContent={"center"}
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <CradLayout
                id={movie._id}
                title={movie.title}
                releaseDate={movie.releaseDate}
                posterUrl={movie.posterUrl}
                description={movie.description}
                key={index}
              />
            ))}
      </Box>
      <Box display={"flex"} padding={5} margin="auto">
        <Button
          variant="outlined"
          LinkComponent={Link}
          to="/movies"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomeLayout;
*/

// This is without mui

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


