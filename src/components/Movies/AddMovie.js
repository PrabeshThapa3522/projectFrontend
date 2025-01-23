
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
