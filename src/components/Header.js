
/*
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import "./Header.css"; // Custom CSS for styling

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleSearchChange = (e) => {
    const movie = movies.find((m) => m.title === e.target.value);
    if (movie && isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <div className="header-container">
      <div className="header-left">
      <Link className="" to="/">
          <span className="movie-icon">🎬</span>
          <span className="header-title">CINEWORLD</span>    
      </Link>
       
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Across Multiple Movies"
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="tabs-container">
        <div className="tabs">
          <Link className="tab" to="/movies">
            Movies
          </Link>
          {!isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <Link className="tab" to="/admin">
                Admin
              </Link>
              <Link className="tab" to="/auth">
                Auth
              </Link>
              <Link className="tab" to="/event">
                Events
              </Link>
            </>
          )}
          {isUserLoggedIn && (
            <>
              <Link className="tab" to="/user">
                Profile
              </Link>
              <button className="tab" onClick={() => logout(false)}>
                Logout
              </button>
            </>
          )}
          {isAdminLoggedIn && (
            <>
              <Link className="tab" to="/add">
                Add Movie
              </Link>
              <Link className="tab" to="/user-admin">
                Profile
              </Link>
              <button className="tab" onClick={() => logout(true)}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
*/

import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import "./Header.css"; // Custom CSS for styling

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleSearchChange = (e) => {
    const movie = movies.find((m) => m.title === e.target.value);
    if (movie && isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <div className="header-container">
      <div className="header-left">
        <div className="movie-icon">🎬</div>
        <div className="header-title">CINEWORLD</div>
      </div>
      <div className="search-bar">

      </div>
      <div className="tabs-container">
        <div className="tabs">
          <Link className="tab" to="/movies">
            Movies
          </Link>
          {!isAdminLoggedIn && !isUserLoggedIn && (
            <>
              {/* <Link className="tab" to="/admin">
                Admin
              </Link> */}
              <Link className="tab" to="/auth">
                Signup
              </Link>
              {/* <div className="dropdown">
                <button className="tab dropdown-btn">Events</button>
                <div className="dropdown-content">
                  <Link to="/events/football">Football</Link>
                  <Link to="/events/cricket">Cricket</Link>
                  <Link to="/events/comedy">Comedy</Link>
                  <Link to="/events/singing">Singing</Link>
                  <Link to="/events/dancing">Dancing</Link>
                </div>
              </div> */}
            </>
          )}
          {isUserLoggedIn && (
            <>
              <Link className="tab" to="/user">
                Profile
              </Link>
              <button className="tab" onClick={() => logout(false)}>
                Logout
              </button>
            </>
          )}
          {isAdminLoggedIn && (
            <>
              <Link className="tab" to="/add">
                Add Movie
              </Link>
              {/* <Link className="tab" to="/user-admin">
                Profile
              </Link> */}
              <button className="tab" onClick={() => logout(true)}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

