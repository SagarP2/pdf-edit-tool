import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import rocketImage from "./boy-with-rocket-light.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/App");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container12">
      <div className="left">
        <div className="image-container">
          <img src={rocketImage} alt="Illustration" />
        </div>
      </div>
      <div className="right">
        <div className="login-container">
          <h2>Welcome Back, Please login to your account.</h2>
          <br />
          {/*
          <div className="social-login">
            <button className="Google">Login with Google</button>
            <button className="facebook">Login with Facebook</button>
          </div>
          <p>– OR –</p>*/}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/*
            <div className="form-options">
              <a href="/">Forgot password</a>
            </div>*/}
            <br />
            <button type="submit">Login</button>
          </form>
          <button className="signup" onClick={() => navigate("/register")}>
            Create Account
          </button>
          <p className="terms">
            By signing up,
            <a href="/">Terms and Conditions</a> &{" "}
            <a href="/">Privacy policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
