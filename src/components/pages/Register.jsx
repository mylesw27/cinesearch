import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Register.css"
import { Link } from "react-router-dom"
import loginandregister from "../assets/loginandregister.jpg"

export default function Register(props) {
  // state for the controlled form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // submit event handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // post form data to the backend
      const reqBody = {
        name,
        email,
        password,
        userName,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`,
        reqBody
      );

      // save the token in localstorage
      const { token } = response.data;
      localStorage.setItem("jwt", token);

      // decode the token
      const decoded = jwt_decode(token);

      // set the user in App's state to be the decoded token
      props.setCurrentUser(decoded);
    } catch (err) {
      console.warn(err);
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  // useEffect for conditionally navigating
  useEffect(() => {
    if (props.currentUser) {
      navigate("/profile");
    }
  }, [props.currentUser, navigate]);

  return (
    <div>
      <div className="hero-links">
        <i className="bi bi-list hamburger" />
        <Link to="/" className="home-nav">Home</Link>
        <Link to="/login" className="login-nav">Login</Link>
      </div>
      <div className="register-container">
        <h1 className="register-title" >Register for your account today!</h1>

        <p>{msg}</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="label-name-register">
            Name:
          </label>
          <input
            className="register-inputs"
            type="text"
            id="name"
            placeholder="enter your name..."
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <label htmlFor="userName" className="label-name-register">
            Username:
          </label>
          <input
            className="register-inputs"
            type="text"
            id="userName"
            placeholder="create your username..."
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />

          <label htmlFor="email" className="label-email-register">
            Email:
          </label>
          <input
            className="register-inputs"
            type="email"
            id="email"
            placeholder="enter your email..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label htmlFor="password" className="label-password-register">
            Password:
          </label>
          <input
            className="register-inputs"
            type="password"
            id="password"
            placeholder="create your password..."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="off"
          />

          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
