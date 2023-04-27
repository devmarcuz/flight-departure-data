import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Login.css";

const Login = ({ isLogin, setIsLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [navigate, isLogin]);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!isEmail(email)) {
      toast.error("Invalid email", toastOptions);
      return false;
    } else {
      setIsLogin(true);
    }
  };

  return (
    <div className="container-login">
      <div className="form-container">
        <h1 className="logo">Flight Departures</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
          <button type="submit" className="submit-btn">
            Log In
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
