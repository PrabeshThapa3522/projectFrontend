import React, { Fragment, useEffect, useState } from "react";
import { getUserBooking, getUserDetails, deleteBooking } from "../api-helpers/api-helpers";
import "./UserProfile.css"; // Import custom CSS

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState();

  // UseEffect hook to fetch user details and bookings
  useEffect(() => {
    // Fetch bookings
    getUserBooking()
      .then((res) => {
        console.log(res.bookings); // Log to inspect the structure of bookings
        setBookings(res.bookings); // Update the bookings state
      })
      .catch((err) => console.log(err));

    // Fetch user details
    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        console.log(res);
        // Update the bookings after deletion
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
              <div className="user-info-item"><strong>Name:</strong> {user.name}</div>
              <div className="user-info-item"><strong>Email:</strong> {user.email}</div>
            </div>
          </div>
        )}

        {bookings.length > 0 ? (
          <div className="bookings-container">
            <h3 className="bookings-title">Your Bookings</h3>
            <div className="booking-list">
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-item">
                  <div className="booking-details"><strong>Movie:</strong> {booking.movie.title}</div>
                  <div className="booking-details"><strong>Seat:</strong> {booking.seatNumber}</div>
                  <div className="booking-details"><strong>Date:</strong> {new Date(booking.date).toDateString()}</div>

                  {/* Show Time and Theater */}
                  <div className="booking-details">
                    <strong>Show Time:10:00 AM</strong> 
                  </div>
                  <div className="booking-details">
                    <strong>Theater:RK Cinemas</strong> 
                  </div>

                  
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="no-bookings">No bookings available.</p>
        )}
      </Fragment>
    </div>
  );
};

export default UserProfile;
