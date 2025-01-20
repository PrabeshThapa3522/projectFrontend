/*import React from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  import { Link } from "react-router-dom";


const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card sx={{ 
        margin:2,
        width: 250, 
        height: 320, 
        borderRadius:5, 
        ":hover":{
        boxShadow:"10px 10px 20px #ccc"
    } }}>
     <img height={"50%"} width="100%" src={posterUrl} alt={title}/>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {new Date(releaseDate).toDateString()}
      </Typography>
    </CardContent>
    <CardActions>
      <Button  
      LinkComponent={Link}
          to={`/booking/${id}`} 
          sx={{margin:"auto"}} size="small" >Book Now</Button>
    </CardActions>
  </Card>
  );
}

export default MovieItem;


import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 320,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img height={"50%"} width="100%" src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          LinkComponent={Link}
          to={`/booking/${id}`}
          sx={{
            margin: "auto",
            bgcolor: "#2b2d42",
            ":hover": {
              bgcolor: "#121217",
            },
          }}
          size="small"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
*/

// This is without mui

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
