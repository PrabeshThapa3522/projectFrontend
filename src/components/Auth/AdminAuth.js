
// Without mui

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../helpers/api-helpers";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store/admin-slice";
import "./AdminAuth.css";

const AdminAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const onClose = () => {
    setOpen(false);
    navigate("/");
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRequestSent = (val) => {
    localStorage.removeItem("userId");
    localStorage.setItem("adminId", val.id);
    localStorage.setItem("token", val.token);
    dispatch(adminActions.login());
    setOpen(false);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminLogin(inputs)
      .then(onRequestSent)
      .catch((err) => console.log(err));
    setInputs({ email: "", password: "" });
  };

  if (!open) {
    return null; // Return nothing if the modal is closed
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-close">
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <h2 className="modal-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;


