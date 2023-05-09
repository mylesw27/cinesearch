import React, { useState, useEffect } from 'react';
import "./FrontPage.css"
import MainSearch from '../MainSearch';
import { Link } from 'react-router-dom';
import cinesearchlogo from '../assets/cinesearchlogo.png';

const FrontPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>

          {/* Navigation Bar */}

      {/* Hero Section */}
      <section className="hero-section">
      <div className="hero-links">
    <Link to="/login" className="login-nav">Login</Link>
    <Link to="/register" className="register-nav">Register</Link>
  </div>
  <div className='hero-background'></div>
  <div className="hero-content">
    <img src={cinesearchlogo} alt="Logo" className="logo" />
    <h1>Discover Your Next Favorite Movie</h1>
    <p>Explore thousands of movies and find the perfect one for you.</p>
    <MainSearch/>
  </div>
</section>


      {/* Features Section */}
      <section className="features-section">
      <h2>Features for Logged In Users:</h2>
      <ul className="features-list">
        <li>
          <div className="feature">
          <i class="bi bi-eye-fill">
            <p>Save the best movies to your watchlist or favorite movies.</p>
            </i>
          </div>
        </li>
        <li>
          <div className="feature">
          <i class="bi bi-text-center">
            <p>Get the relevant and up-to-date details for movies of the past and future.</p>
            </i>
          </div>
        </li>
        <li>
          <div className="feature">
          <i class="bi bi-chat-left-text-fill">
            <p>Checkout comments and threads with other movie buffs.</p>
            </i>
          </div>
        </li>
        <li>
          <div className="feature">
          <i class="bi bi-collection-play-fill">
            <p>See where the movies you're interested in are streaming</p>
            </i>
          </div>
        </li>
      </ul>
    </section>

      {/* Movie Section */}
      <section className="movie-section">
  <h2>Popular Movies:</h2>
  <div className="movie-list">
    {movies.map(movie => (
      <div key={movie.id} className="movie-card">
        <Link to={`/movies/${movie.id}/details`}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <div className="movie-info">
          <h3><strong>{movie.title}</strong></h3>
          <p><strong>Release date:</strong> {movie.release_date}</p>
          <p><strong>User rating:</strong> {movie.vote_average}</p>
        </div>
        </Link>
      </div>
    ))}
  </div>
</section>

    </div>
  );
};


export default FrontPage;
