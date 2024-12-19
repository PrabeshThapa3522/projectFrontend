/*import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { getAllMovies } from "../../helpers/api-helpers";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { adminActions } from "../../store/admin-slice";
const Header = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllMovies()
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  const handleChange = (e, val) => {
    setSelectedMovie(val);
    const movie = data.find((mov) => mov.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width="20%">
          <Link to="/" style={{ color: "white" }}>
            <MovieCreationIcon />
          </Link>
        </Box>
        <Box width="50%" marginRight={"auto"} marginLeft="auto">
          <Autocomplete
            onChange={handleChange}
            sx={{ borderRadius: 10, width: "40%", margin: "auto" }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={data.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  borderRadius: 2,
                  input: { color: "white" },
                  bgcolor: "#2b2d42",
                  padding: "6px",
                }}
                variant="standard"
                placeholder="Search Across Multiple Movies"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box>
        <Box display="flex">
          <Tabs
            onChange={(e, val) => setValue(val)}
            value={value}
            textColor="inherit"
          >
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                {" "}
                <Tab to="/auth" LinkComponent={NavLink} label="Auth" />
                <Tab to="/admin" LinkComponent={NavLink} label="Admin" />
              </>
            )}

            {isUserLoggedIn && (
              <>
                {" "}
                <Tab LinkComponent={Link} to="/user" label="user" />
                <Tab
                  onClick={() => dispatch(userActions.logout())}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}

            {isAdminLoggedIn && (
              <>
                {" "}
                <Tab LinkComponent={Link} to="/profile" label="Profile" />
                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                <Tab
                  onClick={() => dispatch(adminActions.logout())}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
*/

// This is without material ui

import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { adminActions } from "../../store/admin-slice";
import { getAllMovies } from "../../helpers/api-helpers";
import "./Header.css"; // Add your custom styles here

const Header = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllMovies()
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e, val) => {
    setSelectedMovie(val);
    const movie = data.find((mov) => mov.title === val);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <i className="movie-icon">🎬</i> {/* You can use any icon here */}
        </Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Across Multiple Movies"
          list="movies"
          onChange={(e) => handleChange(e, e.target.value)}
        />
        <datalist id="movies">
          {data.map((movie) => (
            <option key={movie._id} value={movie.title} />
          ))}
        </datalist>
      </div>
      <nav className="nav-links">
        <ul>
          {!isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <li>
                <NavLink to="/auth" className="nav-link">
                  Auth
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin" className="nav-link">
                  Admin
                </NavLink>
              </li>
            </>
          )}

          {isUserLoggedIn && (
            <>
              <li>
                <NavLink to="/user" className="nav-link">
                  User
                </NavLink>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => dispatch(userActions.logout())}
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {isAdminLoggedIn && (
            <>
              <li>
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/add" className="nav-link">
                  Add Movie
                </NavLink>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => dispatch(adminActions.logout())}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
