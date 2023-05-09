import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { Link } from "react-router-dom";
export default function Login({ currentUser, setCurrentUser }) {
  // state for the controlled form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  // submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // post fortm data to the backend
      const reqBody = {
        email,
        password,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`,
        reqBody
      );
      // save the token in localstorage
      const { token } = response.data;
      localStorage.setItem("jwt", token);
      // decode the token
      const decoded = jwt_decode(token);
      // set the user in App's state to be the decoded token
      setCurrentUser(decoded);
    } catch (err) {
      console.warn(err);
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };
  useEffect(() => {
    if (currentUser) {
      navigate("/movies");
    }
  }, [currentUser, navigate]);
  return (
    //
    <div>
    <div className="hero-links">
    <i className="bi bi-list hamburger" />
    <Link to="/" className="home-nav">Home</Link>
    <Link to="/register" className="register-nav">Register</Link>
  </div>
  {/* // LOGIN information */}
<div className="login-container">
  <h1 className="login-title">Login to Your Account:</h1>
  <p className="msg"></p>
  <form className="login-form">
    <label for="email" className="label-email-login">
      Email:
    </label>
    <input
      type="email"
      id="email"
      placeholder="your email..."
      required
    />
    <label for="password" className="label-password-login">
      Password:
    </label>
    <input
      type="password"
      id="password"
      placeholder="password..."
      required
      autoComplete="off"
    />
    <button type="submit" className="btn-login">
      Login
    </button>
  </form>
</div>
</div>
  );
}