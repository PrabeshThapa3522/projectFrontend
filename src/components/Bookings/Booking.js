import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import "./Booking.css";

const Booking = () => {
  // Optionally initialize with today's date.
  const today = new Date().toISOString().split("T")[0];
  const [inputs, setInputs] = useState({ date: today, showTimes: [], theaters: [] });
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prebooked, setPrebooked] = useState([]);

  const { id } = useParams();

  const seatCategories = [
    {
      label: "Regular",
      price: 200,
      rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    },
  ];
  const columnsPerRow = 10;

  // Load movie details
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if(movie?.bookedSeats){
      setPrebooked(movie?.bookedSeats ?? [])
    }
  }, [movie])


  // Load booked seats for the selected movie, date, show time, and theater.
  useEffect(() => {
    if (!inputs.date || !inputs.showTimes.length || !inputs.theaters.length) {
      setBookedSeats([]); // Reset if one of the keys is missing
      return;
    }
    const updatedBookedSeats = [];
    inputs.showTimes.forEach((showTime) => {
      inputs.theaters.forEach((theater) => {
        const storageKey = `bookedSeats_${id}_${inputs.date}_${showTime}_${theater}`;
        const savedBookedSeats = JSON.parse(localStorage.getItem(storageKey)) || [];
        updatedBookedSeats.push(...savedBookedSeats);
      });
    });
    setBookedSeats(updatedBookedSeats);
  }, [id, inputs.date, inputs.showTimes, inputs.theaters]);

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
    const { name, value } = e.target;
    if (name === "showTimes" || name === "theaters") {
      const options = Array.from(e.target.selectedOptions, (option) => option.value);
      setInputs((prevState) => ({
        ...prevState,
        [name]: options,
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSeats.length)
      return setError("Please select at least one seat.");
    if (!inputs.date)
      return setError("Please select a valid date.");

    const seatNumbers = selectedSeats.map((s) => s.seat);
    setIsLoading(true);
    setError("");

    try {
      const response = await newBooking({
        ...inputs,
        movie: movie._id,
        seatNumbers,
        totalPrice,
      });

      if (response) {
        inputs.showTimes.forEach((showTime) => {
          inputs.theaters.forEach((theater) => {
            const storageKey = `bookedSeats_${id}_${inputs.date}_${showTime}_${theater}`;
            const updatedSeats = [...bookedSeats, ...seatNumbers];
            localStorage.setItem(storageKey, JSON.stringify(updatedSeats));
          });
        });

        setSelectedSeats([]);
        setTotalPrice(0);

        // Redirect to eSewa for payment (or display the payment page)
        const newWindow = window.open("", "_blank");
        if (newWindow) {
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
      setIsLoading(false);
      setError("There was an issue with your booking.");
      console.error("Booking failed:", error);
    }
  };

  return (
    <div className="booking-container">
      {movie ? (
        <div className="book">
          <div className="book1">
            <h2 className="moviename">Book Tickets for Movie: {movie.title}</h2>
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
          </div>

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
                          const isBooked = bookedSeats.includes(seat) || prebooked.includes(seat);
                          const isSelected = selectedSeats.some(
                            (s) => s.seat === seat
                          );
                          return (
                            <button
                              key={seat}
                              className={`seat ${
                                isBooked
                                  ? "booked"
                                  : isSelected
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                !isBooked &&
                                handleSeatSelection(seat, category.price)
                              }
                              disabled={isBooked}
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

          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <div className="booking_form">
              <div className="form-field">
                <div className="form-field-label">
                  <label>Selected Seats</label>
                  <label>Total Price</label>
                  <label>Booking Date</label>
                  <label>Show Time</label>
                  <label>Theater</label>
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
                    name="date"
                    value={inputs.date}
                    min={today}
                    onChange={handleChange}
                  />
                  
                    <p>10:00 AM</p>
                   
                  
                 <p>RK Cinemas</p>
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
