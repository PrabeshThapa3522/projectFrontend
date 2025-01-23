
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
