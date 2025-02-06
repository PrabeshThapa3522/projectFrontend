import axios from "axios";

// Set default headers for authorization
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

// Helper function to handle API requests
const apiRequest = async (method, url, data = null) => {
  try {
    const res = await axios({ method, url, data });
    return res.data;
  } catch (err) {
    console.error(`API Error: ${err}`);
    throw err;
  }
};

// Get all movies
export const getAllMovies = async () => {
  const id = localStorage.getItem("userId");
  return await apiRequest("get", `/movie?user=${id}`);
};

// User authentication (login/signup)
export const sendUserAuthRequest = async (data, signup) => {
  return await apiRequest("post", `/user/${signup ? "signup" : "login"}`, {
    name: signup ? data.name : "",
    email: data.email,
    password: data.password,
  });
};

// Admin authentication
export const sendAdminAuthRequest = async (data) => {
  return await apiRequest("post", "/admin/login", {
    email: data.email,
    password: data.password,
  });
};

// Get movie details
export const getMovieDetails = async (id) => {
  return await apiRequest("get", `/movie/${id}`);
};

// Create a new booking
export const newBooking = async (data) => {
  return await apiRequest("post", "/booking", {
    movie: data.movie,
    seatNumber: data.seatNumbers,
    date: data.date,
    user: localStorage.getItem("userId"),
  });
};

// Get user bookings
export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  return await apiRequest("get", `/user/bookings/${id}`);
};

// Delete a booking
export const deleteBooking = async (id) => {
  return await apiRequest("delete", `/booking/${id}`);
};

// Get user details
export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  return await apiRequest("get", `/user/${id}`);
};

// Add a new movie
export const addMovie = async (data) => {
  return await apiRequest("post", "/movie", {
    title: data.title,
    description: data.description,
    releaseDate: data.releaseDate,
    posterUrl: data.posterUrl,
    featured: data.featured, // Fixed typo
    actors: data.actors,
    admin: localStorage.getItem("adminId"),
  });
};

// Get admin details by ID
export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  return await apiRequest("get", `/admin/${adminId}`);
};
