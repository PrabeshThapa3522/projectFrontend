
import React, { useEffect, useState } from "react";
import { getAdmidData } from "../../helpers/api-helpers";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import "./Admin.css"; // Add custom styles here

const Admin = () => {
  const [admin, setAdmin] = useState();
  const onResReceived = (res) => {
    setAdmin(res.admin);
  };
  
  useEffect(() => {
    getAdmidData()
      .then(onResReceived)
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-profile">
        <PersonRoundedIcon className="admin-icon" />
        <div className="admin-email">
          Email: {admin && admin.email}
        </div>
      </div>
      <div className="admin-movies">
        <h3>Added Movies</h3>
        <div className="movies-list">
          {admin && admin.addedMovies.map((movie, index) => (
            <div key={index} className="movie-item">
              <div className="movie-title">
                Movie: {movie.title}
              </div>
              <div className="movie-release">
                Releasing: {new Date(movie.releaseDate).toDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
