/*import React, { useEffect, useState } from "react";
import { Box, Typography , Button} from "@mui/material";
import MovieItem from "./Movies/MovieItem";
import { getAllMovies } from "../api-helpers/api-helpers";
import {Link} from 'react-router-dom';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  console.log(movies)
  return (
    < Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
        <img
          src="https://web.nepalnews.com/storage/story/1024/ANI_202309111217441694440218_1024.jpg"
          alt="Puspa2"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
     <Box display="flex" width="80%" justifyContent={"center"} flexwrap="wrap">
     {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
     </Box>
     <Box display="flex" padding={5} margin="auto" > 
        <Button 
         LinkComponent={Link}
          to="/movies"
           variant="outlined" sx={{margin:"auto", color:"#2b2d42"}}> 
            View All Movies
             </Button>
     </Box>
      </Box>
  );
}

export default HomePage;


import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
        <img
           src="https://web.nepalnews.com/storage/story/1024/ANI_202309111217441694440218_1024.jpg"
          alt="Puspa2"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
*/
// This is without material ui

import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import "./HomePage.css";  // Import custom CSS for styling

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <div className="banner-container">
        <img
          src="https://web.nepalnews.com/storage/story/1024/ANI_202309111217441694440218_1024.jpg"
          alt="Puspa2"
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
                id={movie.id}
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
