// import react and the necessary hooks - useStates, useParams, and useEffect and axios
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WatchlistButton from "../partials/WatchlistButton";
import FavoritesButton from "../partials/FavoritesButton";
import Comments2 from "../partials/Comments2";

// Define the MovieDetails component
function MovieDetails() {
  // Use the useParams hook to get the movie ID from the URL
  const { id } = useParams();

  // Set up state variables for the movie, favorites, and watch list
  const [movie, setMovie] = useState({});
  const [watchMovie, setWatchMovie] = useState([]);
  console.log('hello')

  useEffect(() => {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
    const movieWatchUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

    Promise.all([axios.get(movieDetailsUrl), axios.get(movieWatchUrl)])
      .then(([movieResponse, watchResponse]) => {
        setMovie(movieResponse.data);
        setWatchMovie(watchResponse.data.results.US.flatrate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //Render the MovieDetails Component
  return (
    <div className="movie-details">
      {movie.poster_path && (
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`This is the poster for the movie titled ${movie.title}`}
        />
      )}
      <h1>{movie.title}</h1>
      <p>Rating: {movie.vote_average}</p>
      <p>Adult: {movie.adult ? "Yes" : "No"}</p>
      <p>Genres: {movie.genres?.map((genre) => genre.name).join(", ")}</p>
      <p>Synopsis: {movie.overview}</p>
      <p>Movie run time: {movie.runtime} minutes</p>
      <p>Movie Homepage: {movie.homepage}</p>
      {watchMovie?.map((provider) => (
        <div key={provider.provider_id}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${provider.logo_path}`}
            alt={provider.provider_name}
          />
          <p>{provider.provider_name}</p>
        </div>
      ))}
      <br />
      <FavoritesButton movie={movie} />
      <WatchlistButton movie={movie} />
      <Comments2 movie={id} />
    </div>
  );
}

export default MovieDetails;
