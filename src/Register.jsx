// src/Register.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import dotenv from  'dotenv'


const Register = () => {
  console.log(process.env.REACT_APP_BACKEND_URL);
  const [register, setRegister] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    cotp: "",
  });
  const [message, setMessage] = useState("");
  const [isOtpHover, setIsOtpHover] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleRegister = async () => {
    try {
      console.log(process.env.REACT_APP_BACKEND_URL);
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/verify`,
        {
          email: register.username,
          cotp: register.cotp,
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleClick = async () => {
    try {
      if (password !== confirmPassword) {
        return alert("Password do not match");
      } else {
        console.log(process.env.REACT_APP_BACKEND_URL);

        let response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/register`,
          {
            email: register.username,
            password: register.password,
          }
        );
        console.log(response);
        setIsOtpHover(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { username, password, confirmPassword, cotp } = register;

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
        />
        {isOtpHover && (
          <input
            type="text"
            name="cotp"
            value={cotp}
            onChange={handleInputChange}
            placeholder="OTP"
            required
          />
        )}
        {!isOtpHover ? (
          <button onClick={handleClick}>Generate Otp</button>
        ) : (
          <>
            <button onClick={handleRegister}>Register</button>
            <br />
            <button onClick={handleClick}>Resend Otp</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
