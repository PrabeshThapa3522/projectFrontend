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



import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import "./Booking.css";

const Booking = () => {
  const [movie, setMovie] = useState("");
  const [inputs, setInputs] = useState({ date: "" });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const id = useParams().id;

  const seatCategories = [
    { label: "Gold", price: 150, rows: ["A", "B", "C"] },
    { label: "Silver", price: 200, rows: ["D", "E", "F"] },
    { label: "Platinum", price: 300, rows: ["G", "H", "I"] },
  ];
  const columnsPerRow = 10;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSeatSelection = (seat, price) => {
    if (selectedSeats.some((s) => s.seat === seat)) {
      setSelectedSeats((prevSeats) =>
        prevSeats.filter((s) => s.seat !== seat)
      );
      setTotalPrice((prevPrice) => prevPrice - price);
    } else {
      setSelectedSeats((prevSeats) => [...prevSeats, { seat, price }]);
      setTotalPrice((prevPrice) => prevPrice + price);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const seatNumbers = selectedSeats.map((s) => s.seat);
    newBooking({ ...inputs, movie: movie._id, seatNumbers, totalPrice })
      .then((res) => {
        setShowPopup(true); // Show popup on success
      })
      .catch((err) => console.log(err));
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
            <div className="seating-arrangement">
              {seatCategories.map((category) => (
                <div key={category.label} className="seat-category">
                  <h3>{category.label} Section (Rs {category.price})</h3>
                  <div className="seat-rows">
                    {category.rows.map((row) => (
                      <div key={row} className="seat-row">
                        {Array.from({ length: columnsPerRow }).map((_, columnIndex) => {
                          const seat = `${row}${columnIndex + 1}`;
                          const isSelected = selectedSeats.some(
                            (s) => s.seat === seat
                          );
                          return (
                            <button
                              key={seat}
                              className={`seat ${isSelected ? "selected" : ""}`}
                              onClick={() =>
                                handleSeatSelection(seat, category.price)
                              }
                            >
                              {seat}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="booking-form">
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label className="form-label">Selected Seats</label>
                  <input
                    className="form-input"
                    name="seatNumbers"
                    type="text"
                    value={selectedSeats.map((s) => s.seat).join(", ")}
                    readOnly
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Total Price</label>
                  <input
                    className="form-input"
                    name="totalPrice"
                    type="text"
                    value={`Rs ${totalPrice}`}
                    readOnly
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

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Booking Successful!</h3>
            <p>
              Your seats ({selectedSeats.map((s) => s.seat).join(", ")}) have
              been booked for {movie.title} at ₹{totalPrice}.
            </p>
            <button
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
*/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import "./Booking.css";

const Booking = () => {
  const [inputs, setInputs] = useState({
    date: "",
  });
  const today = new Date().toISOString().split("T")[0];
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(""); // Error state for form validation
  const [isLoading, setIsLoading] = useState(false);

  const id = useParams().id;

  const seatCategories = [
    { label: "", price:200, rows: ["A", "B", "C","D", "E", "F","G", "H", "I"] },
    // { label: "Gold", price: 150, rows: ["A", "B", "C"] },
    // { label: "Silver", price: 200, rows: ["D", "E", "F"] },
    // { label: "Platinum", price: 300, rows: ["G", "H", "I"] },
  ];
  const columnsPerRow = 10;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSeatSelection = (seat, price) => {
    if (selectedSeats.some((s) => s.seat === seat)) {
      setSelectedSeats((prevSeats) => prevSeats.filter((s) => s.seat !== seat));
      setTotalPrice((prevPrice) => prevPrice - price);
    } else {
      setSelectedSeats((prevSeats) => [...prevSeats, { seat, price }]);
      setTotalPrice((prevPrice) => prevPrice + price);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!selectedSeats.length) {
      setError("Please select at least one seat.");
      return;
    }

    if (!inputs.date) {
      setError("Please select a valid date.");
      return;
    }

    const seatNumbers = selectedSeats.map((s) => s.seat);

    // Set loading state before making the API call
    setIsLoading(true);
    setError(""); // Clear any previous error

    try {
      const response = await newBooking({
        ...inputs,
        movie: movie._id,
        seatNumbers,
        totalPrice,
      });

      // setIsLoading(false); // Reset loading state after the response

      if (response) {
        // Redirect user to eSewa login page
        const newWindow = window.open("", "_blank");

        if (newWindow) {
          // Write the HTML content into the new window
          newWindow.document.open();
          newWindow.document.write(response);
          newWindow.document.close();
        } else {
          console.error("Failed to open a new window.");
        }
      } else {
        throw new Error("Booking failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false); // Reset loading state after error
      setError("There was an issue with your booking.");
      console.error("Booking failed:", error);
    }
  };

  return (
    <div className="booking-container">
      {movie ? (
        <div>
          <h2>Book Tickets for Movie: {movie.title}</h2>

          {/* Movie Poster and Description Section */}
          <div className="movie-details">
            <img
              className="movie-poster"
              src={movie.posterUrl}
              alt={movie.title}
              style={{ width: "100%", height: "400px" }}
            />
            <div className="movie-description">
              <p>{movie.description}</p>
              <p>
                <strong>Starring:</strong> {movie.actors.join(", ")}
              </p>
              <p>
                <strong>Release Date:</strong>{" "}
                {new Date(movie.releaseDate).toDateString()}
              </p>
            </div>
          </div>

          {/* Seat Selection Section */}
          <div className="seating-arrangement">
            {seatCategories.map((category) => (
              <div key={category.label} className="seat-category">
                <div className="screen">
                  <h2>this side screen</h2>
                </div>
                <h3>
                  {category.label} Price (Rs {category.price})
                </h3>
                <div className="seat-rows">
                  {category.rows.map((row) => (
                    <div key={row} className="seat-row">
                      {Array.from({ length: columnsPerRow }).map(
                        (_, columnIndex) => {
                          const seat = `${row}${columnIndex + 1}`;
                          const isSelected = selectedSeats.some(
                            (s) => s.seat === seat
                          );
                          return (
                            <button
                              key={seat}
                              className={`seat ${isSelected ? "selected" : ""}`}
                              onClick={() =>
                                handleSeatSelection(seat, category.price)
                              }
                            >
                              {seat}
                            </button>
                          );
                        }
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Display error message */}
            <div className="booking_form">
              <div className="form-field">
                <div className="form-field-label">
                  <label>Selected Seats</label>
                  <label>Total Price</label>
                  <label>Booking Date</label>
                </div>
                <div className="form-field-input">
                  <input
                    className="form_field_input"
                    type="text"
                    value={selectedSeats.map((s) => s.seat).join(", ")}
                    readOnly
                  />
                  <input
                    className="form_field_input"
                    type="text"
                    value={`Rs ${totalPrice}`}
                    readOnly
                  />
                  <input
                    className="form_field_input"
                    type="date"
                    name="date" // Ensure this matches the state key
                    value={inputs.date}
                    min={today} // Disable dates below today
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button className="btn" type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Buy Ticket"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default Booking;
