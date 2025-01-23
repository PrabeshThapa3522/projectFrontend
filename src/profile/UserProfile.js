
import React, { Fragment, useEffect, useState } from "react";
import { getUserBooking, getUserDetails, deleteBooking } from "../api-helpers/api-helpers";
import "./UserProfile.css"; // Import custom CSS

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        console.log(res);
        // Update the bookings after deletion (you may want to filter out the deleted booking)
        setBookings(bookings.filter((booking) => booking._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="user-profile-container">
      <Fragment>
        {user && (
          <div className="profile-info-container">
            <div className="profile-icon">
              <i className="fas fa-user-circle"></i> {/* FontAwesome icon for user */}
            </div>
            <div className="user-info">
              <div className="user-info-item">Name: {user.name}</div>
              <div className="user-info-item">Email: {user.email}</div>
            </div>
          </div>
        )}

        {bookings && (
          <div className="bookings-container">
            <h3 className="bookings-title">Bookings</h3>
            <div className="booking-list">
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-item">
                  <div className="booking-details">Movie: {booking.movie.title}</div>
                  <div className="booking-details">Seat: {booking.seatNumber}</div>
                  <div className="booking-details">Date: {new Date(booking.date).toDateString()}</div>
                  <button onClick={() => handleDelete(booking._id)} className="delete-button">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default UserProfile;

