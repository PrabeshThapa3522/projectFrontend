/*import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState('');
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => alert(`${inputs.seatNumber} seat have been book for ${JSON.stringify(movie.title)} movie`))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
            Book TIckets Of Movie: {movie.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={3}
              width="50%"
              marginRight={"auto"}
            >
              <img
                width="80%"
                height={"300px"}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Starrer:
                  {movie.actors.map((actor) => " " + actor + " ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display="flex"
                  flexDirection={"column"}
                >
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type={"number"}
                    margin="normal"
                    variant="standard"
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
*/

// This is without mui

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import "./Booking.css"; // Assuming you have created the CSS file

const Booking = () => {
  const [movie, setMovie] = useState('');
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => alert(`${inputs.seatNumber} seat has been booked for the movie ${movie.title}`))
      .catch((err) => console.log(err)); // Corrected this line
  };

  return (
    <div className="booking-container">
      {movie && (
        <Fragment>
          <h2 className="movie-title">Book Tickets for Movie: {movie.title}</h2>
          <div className="movie-info">
            <div className="movie-details">
              <img
                className="movie-poster"
                src={movie.posterUrl}
                alt={movie.title}
              />
              <div className="movie-description">
                <p>{movie.description}</p>
                <p><strong>Starring:</strong> {movie.actors.join(", ")}</p>
                <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
              </div>
            </div>
            <div className="booking-form">
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label className="form-label">Seat Number</label>
                  <input
                    className="form-input"
                    name="seatNumber"
                    type="number"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Booking Date</label>
                  <input
                    className="form-input"
                    name="date"
                    type="date"
                    value={inputs.date}
                    onChange={handleChange}
                  />
                </div>
                <button className="submit-btn" type="submit">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
