/*import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Link } from "react-router-dom";
  
  const CradLayout = ({ title, description, releaseDate, posterUrl, id }) => {
    return (
      <Card
        sx={{
          width: 250,
          height: 320,
          borderRadius: 5,
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <img
          component="img"
          height="50%"
          width="100%"
          src={posterUrl}
          alt={title}
        />
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
            LinkComponent={Link}
            to={`/booking/${id}`}
            fullWidth
            variant="contained"
            sx={{
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
              borderRadius: 5,
            }}
          >
            Book Now
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default CradLayout;
  */

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
