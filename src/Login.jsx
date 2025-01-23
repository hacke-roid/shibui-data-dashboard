import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      let userLogin = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`,
        {
          email: user.username,
          password: user.password,
        }
      );
      console.log(userLogin);
      if (userLogin.status === 200) {
        localStorage.setItem("token", userLogin.data.token);
        alert("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { username, password } = user;

  return (
    <div className="login-page">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input
              type="email"
              name="username"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
