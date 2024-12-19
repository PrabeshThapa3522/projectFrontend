/*import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { getAdmidData } from "../../helpers/api-helpers";
const Admin = () => {
  const [admin, setAdmim] = useState();
  const onResReceived = (res) => {
    setAdmim(res.admin);
  };
  useEffect(() => {
    getAdmidData()
      .then(onResReceived)
      .catch((err) => console.log(err));
  }, []);
  console.log(admin);
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
          width="200px"
          textAlign={"center"}
          border="1px solid #ccc"
          borderRadius={10}
        >
          Email: {admin && admin.email}
        </Typography>
      </Box>
      <Box width="70%" display="flex" flexDirection={"column"}>
        <Typography
          variant="h3"
          fontFamily={"verdana"}
          textAlign="center"
          padding={2}
        >
          Added Movies
        </Typography>

        <Box margin="auto" display="flex" flexDirection={"column"} width="80%">
          <List>
            {admin &&
              admin.addedMovies.map((movie, index) => (
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
                    Movie: {movie.title}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Releasing: {new Date(movie.releaseDate).toDateString()}
                  </ListItemText>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
*/

// This is without mui

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
