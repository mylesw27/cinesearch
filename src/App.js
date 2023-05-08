import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import Welcome from "./components/pages/Welcome";
import "./App.css";
import jwt_decode from "jwt-decode";
import Favorites from "./components/pages/Favorites";
import Watchlist from "./components/pages/Watchlist";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import MovieDetails from "./components/pages/MovieDetails";
import Movies from "./components/pages/Movies";
import SearchMovies from "./components/pages/SearchMovies";
import "bootstrap/dist/css/bootstrap.css";
function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

// useEffect -- if the user navigates away form the page, we will log them back in
useEffect(() => {
  // check to see if token is in storage
  const token = localStorage.getItem("jwt");
  if (token) {
    // if so, we will decode it and set the user in app state
    const decoded = jwt_decode(token);
    setCurrentUser(decoded);

    // fetch the user data from the server
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${decoded._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        // update the currentUser state with the username and image of the authenticated user
        const { userName, image } = response.data;
        setCurrentUser(prevUser => ({ ...prevUser, userName, image }));
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    setCurrentUser(null);
  }
}, []);


  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem("jwt")) {
      // if so, delete it
      localStorage.removeItem("jwt");
      // set the user in the App state to be null
      setCurrentUser(null);
    }
  };

  console.log(currentUser)

  return (
    <Router>
      <Header handleLogout={handleLogout} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route
            path="/register"
            element={
              <Register
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/movies"
            element={
              <Movies
                handleLogout={handleLogout}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/movies/:id/details"
            element={
              <MovieDetails
                handleLogout={handleLogout}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
                handleLogout={handleLogout}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                msg={msg}
                setMsg={setMsg}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                listName={"Favorites"}
                handleLogout={handleLogout}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="/watchlist"
            element={
              <Watchlist
                listName={"Watchlist"}
                handleLogout={handleLogout}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route path="/search/*" element={<SearchMovies />} />
        </Routes>
      </div>
      <Footer className="footer"/>
    </Router>
  );
}

export default App;
