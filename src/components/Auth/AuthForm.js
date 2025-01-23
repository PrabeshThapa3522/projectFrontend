
// This is without mui
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthForm.css"; // Assuming you've created the CSS file for styling

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  return (
    <div className="auth-modal">
      <div className="auth-header">
        <Link to="/" className="close-button">
          &times;
        </Link>
      </div>
      <h2 className="auth-title">{isSignup ? "Signup" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-form-container">
          {!isAdmin && isSignup && (
            <>
              <label className="auth-label">Name</label>
              <input
                value={inputs.name}
                onChange={handleChange}
                type="text"
                name="name"
                className="auth-input"
              />
            </>
          )}
          <label className="auth-label">Email</label>
          <input
            value={inputs.email}
            onChange={handleChange}
            type="email"
            name="email"
            className="auth-input"
          />
          <label className="auth-label">Password</label>
          <input
            value={inputs.password}
            onChange={handleChange}
            type="password"
            name="password"
            className="auth-input"
          />
          <button type="submit" className="auth-submit-button">
            {isSignup ? "Signup" : "Login"}
          </button>
          {!isAdmin && (
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="auth-toggle-button"
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
