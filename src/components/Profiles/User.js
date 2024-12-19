/*import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { DeleteForeverOutlined } from "@mui/icons-material/";

import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { deleteBooking, getUserBookings } from "../../helpers/api-helpers";
import { useNavigate } from "react-router-dom";
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
  console.log(bookings);
  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <Box width="100%" display={"flex"}>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        width="30%"
      >
        <PersonRoundedIcon sx={{ fontSize: "20rem" }} />
        <Typography
          padding={1}
          width="100px"
          textAlign={"center"}
          border="1px solid #ccc"
          borderRadius={10}
        >
          Name: {bookings.length > 1 && bookings[0].user.name}
        </Typography>
      </Box>
      <Box width="70%" display="flex" flexDirection={"column"}>
        <Typography
          variant="h3"
          fontFamily={"verdana"}
          textAlign="center"
          padding={2}
        >
          Bookings
        </Typography>

        <Box margin="auto" display="flex" flexDirection={"column"} width="80%">
          <List>
            {bookings &&
              bookings.map((booking, index) => (
                <ListItem
                  sx={{
                    bgcolor: "#00d386",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                  }}
                  key={index}
                >
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Movie: {booking.movie.title}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Seat: {booking.seatNumber}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Date: {new Date(booking.date).toDateString()}
                  </ListItemText>
                  <IconButton
                    onClick={() => handleDelete(booking._id)}
                    color="error"
                  >
                    <DeleteForeverOutlined />
                  </IconButton>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
*/

// This is without mui

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
