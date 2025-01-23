
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import "./Booking.css";

const Booking = () => {
  const [movie, setMovie] = useState(null);
  const [inputs, setInputs] = useState({ date: "" });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(""); // Error state for form validation
  const [isLoading, setIsLoading] = useState(false);

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

      setIsLoading(false); // Reset loading state after the response

      if (response && response.bookingId) {
        // Prepare the data for eSewa payment
        const paymentData = {
          amt: totalPrice,
          psc: 0,
          pdc: 0,
          txAmt: 0,
          tAmt: totalPrice,
          pid: response.bookingId, // Booking ID or transaction ID
          su: `${process.env.FRONTEND_URL}/payment/callback?status=Success`, // Success URL
          fu: `${process.env.FRONTEND_URL}/payment/callback?status=Failure`, // Failure URL
        };

        // Generate eSewa payment URL
        const esewaUrl = new URL("https://uat.esewa.com.np/epay/main"); // For testing in UAT

        Object.keys(paymentData).forEach((key) =>
          esewaUrl.searchParams.append(key, paymentData[key])
        );

        // Redirect user to eSewa login page
        window.location.href = esewaUrl.toString();
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
              style={{ width: "300px", height: "auto" }}
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
                <h3>
                  {category.label} Section (Rs {category.price})
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
                              className={`seat ${
                                isSelected ? "selected" : ""
                              }`}
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
            <div className="form-field">
              <label>Selected Seats</label>
              <input
                type="text"
                value={selectedSeats.map((s) => s.seat).join(", ")}
                readOnly
              />
            </div>
            <div className="form-field">
              <label>Total Price</label>
              <input type="text" value={`Rs ${totalPrice}`} readOnly />
            </div>
            <div className="form-field">
              <label>Booking Date</label>
              <input
                type="date"
                name="date" // Ensure this matches the state key
                value={inputs.date}
                onChange={handleChange}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Buy Ticket"}
            </button>
          </form>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default Booking;





