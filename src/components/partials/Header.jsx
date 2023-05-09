import { Link } from "react-router-dom";
import MainSearch from "./MainSearch";
import { useEffect, useState } from "react";
import "./Header.css"
import axios from "axios";

export default function Header({ currentUser, handleLogout, setCurrentUser }) {
  const loggedIn = (
    <>
      {/* if the user is logged in... */}
      <Link to="/">
        <span onClick={handleLogout}>Logout</span>
      </Link>

      <Link to="/profile">Profile</Link>
    </>
  );

  const loggedOut = (
    <>
      {/* if the user is not logged in... */}
      <Link to="/register">Register</Link> {" | "}
      <Link to="/login">Login</Link>
    </>
  );

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser.image)
      // const userImage = axios.get(currentUser.image) 
    }
  })


  console.log(currentUser)
  return (
    <>
      <nav className="navbar navbar-light">
        <div className="logos">
          <a className="navbar-brand navbar-link" href="/movies">
            <img className="navbar-logo" src="/panda.png" alt="Panda eating popcorn which is the CineSearch logo" />
            <img className="navbar-name" src="/cinesearch_white.png" alt="Panda eating popcorn which is the CineSearch logo" />
          </a>
        </div>
        <MainSearch />
        <div>
          {currentUser ?
            <>
              <a className="navbar-brand navbar-link" href="/favorites">
                FAVORITES
              </a>
              {" | "}
              <a className="navbar-brand navbar-link" href="/watchlist">
                WATCHLIST
              </a>
              {" | "}
              <a className="navbar-brand navbar-link" href="/" onClick={handleLogout}>
                LOGOUT
              </a>
              {" | "}
              <a className="navbar-brand navbar-link" href="/profile">
                <>
                  {/* {currentUser.image ? img} */}
                </>
                PROFILE
              </a>
            </>
            :
            <>
              <a className="navbar-brand navbar-link" href="/register">
                REGISTER
              </a>
              {" | "}
              <a className="navbar-brand navbar-link" href="/login">
                LOGIN
              </a>
            </>
          }
        </div>

      </nav >
    </>
  );
}
