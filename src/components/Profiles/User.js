
import React, { useEffect, useState } from "react";
import { getUserBookings, deleteBooking } from "../../helpers/api-helpers";
import { useNavigate } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import "./User.css"; // Add custom styles here

const User = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const onResReceived = (res) => {
    setBookings(res.bookings);
  };

  useEffect(() => {
    getUserBookings()
      .then(onResReceived)
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="user-container">
      <div className="user-profile">
        <PersonRoundedIcon className="user-icon" />
        <div className="user-name">
          Name: {bookings.length > 1 && bookings[0].user.name}
        </div>
      </div>
      <div className="user-bookings">
        <h3>Bookings</h3>
        <div className="bookings-list">
          {bookings &&
            bookings.map((booking, index) => (
              <div key={index} className="booking-item">
                <div className="booking-info">
                  <span>Movie: {booking.movie.title}</span>
                  <span>Seat: {booking.seatNumber}</span>
                  <span>Date: {new Date(booking.date).toDateString()}</span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(booking._id)}
                >
                  <DeleteForeverOutlined />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default User;

