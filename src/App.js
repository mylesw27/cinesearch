import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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
import SearchMovies from "./components/pages/SearchMovies"
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem("jwt");
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token));
    } else {
      setCurrentUser(null);
    }
  }, []); // happen only once - no _id needed

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

  return (
    <Router>
      <Header
        handleLogout={handleLogout}
      />
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
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <Favorites listName={"Favorites"} currentUser={currentUser} />
            }
          />

          <Route
            path="/watchlist"
            element={
              <Watchlist listName={"Watchlist"} currentUser={currentUser} />
            }
          />

          <Route
            path="/search/*"
            element={<SearchMovies />}
          />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
