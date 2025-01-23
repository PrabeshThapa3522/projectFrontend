/*import {
    Box,
    Button,
    Checkbox,
    FormLabel,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { addMovie } from "../../api-helpers/api-helpers";
  const labelProps = {
    mt: 1,
    mb: 1,
  };
  const AddMovie = () => {
    const [inputs, setInputs] = useState({
      title: "",
      description: "",
      posterUrl: "",
      releaseDate: "",
      featured: false,
    });
    const [actors, setActors] = useState([]);
    const [actor, setActor] = useState("");
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs, actors);
      addMovie({ ...inputs, actors })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            width={"50%"}
            padding={10}
            margin="auto"
            display={"flex"}
            flexDirection="column"
            boxShadow={"10px 10px 20px #ccc"}
          >
            <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
              Add New Movie
            </Typography>
            <FormLabel sx={labelProps}>Title</FormLabel>
            <TextField
              value={inputs.title}
              onChange={handleChange}
              name="title"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Description</FormLabel>
            <TextField
              value={inputs.description}
              onChange={handleChange}
              name="description"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Poster URL</FormLabel>
            <TextField
              value={inputs.posterUrl}
              onChange={handleChange}
              name="posterUrl"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Release Date</FormLabel>
            <TextField
              type={"date"}
              value={inputs.releaseDate}
              onChange={handleChange}
              name="releaseDate"
              variant="standard"
              margin="normal"
            />
            <FormLabel sx={labelProps}>Actor</FormLabel>
            <Box display={"flex"}>
              <TextField
                value={actor}
                name="actor"
                onChange={(e) => setActor(e.target.value)}
                variant="standard"
                margin="normal"
              />
              <Button
                onClick={() => {
                  setActors([...actors, actor]);
                  setActor("");
                }}
              >
                Add
              </Button>
            </Box>
            <FormLabel sx={labelProps}>Featured</FormLabel>
            <Checkbox
              name="fetaured"
              checked={inputs.featured}
              onClick={(e) =>
                setInputs((prevSate) => ({
                  ...prevSate,
                  featured: e.target.checked,
                }))
              }
              sx={{ mr: "auto" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "30%",
                margin: "auto",
                bgcolor: "#2b2d42",
                ":hover": {
                  bgcolor: "#121217",
                },
              }}
            >
              Add New Movie
            </Button>
          </Box>
        </form>
      </div>
    );
  };
  
  export default AddMovie;
  */

// This is without mui

import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
import "./AddMovie.css"; // Add your custom styles here

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="add-movie-container">
      <form onSubmit={handleSubmit} className="add-movie-form">
        <h2 className="form-title">Add New Movie</h2>

        <label className="form-label">Title</label>
        <input
          type="text"
          value={inputs.title}
          onChange={handleChange}
          name="title"
          className="form-input"
        />

        <label className="form-label">Description</label>
        <input
          type="text"
          value={inputs.description}
          onChange={handleChange}
          name="description"
          className="form-input"
        />

        <label className="form-label">Poster URL</label>
        <input
          type="text"
          value={inputs.posterUrl}
          onChange={handleChange}
          name="posterUrl"
          className="form-input"
        />

        <label className="form-label">Release Date</label>
        <input
          type="date"
          value={inputs.releaseDate}
          onChange={handleChange}
          name="releaseDate"
          className="form-input"
        />

        <label className="form-label">Actor</label>
        <div className="actor-input-container">
          <input
            type="text"
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            name="actor"
            className="form-input"
          />
          <button
            type="button"
            onClick={() => {
              setActors([...actors, actor]);
              setActor("");
            }}
            className="add-actor-button"
          >
            Add
          </button>
        </div>

        <label className="form-label">Featured</label>
        <input
          type="checkbox"
          name="featured"
          checked={inputs.featured}
          onChange={(e) =>
            setInputs((prevState) => ({
              ...prevState,
              featured: e.target.checked,
            }))
          }
          className="form-checkbox"
        />

        <button type="submit" className="submit-button">
          Add New Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
