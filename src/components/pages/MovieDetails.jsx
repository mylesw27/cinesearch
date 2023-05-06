// import react and the necessary hooks - useStates, useParams, and useEffect and axios
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import FavoriteButton from "../partials/FavoritesButton";
import "./MovieDetails.css"


// Define the MovieDetails component
function MovieDetails() {
  // Use the useParams hook to get the movie ID from the URL
  const { id } = useParams();

  // Set up state variables for the movie, favorites, and watch list
  const [movie, setMovie] = useState({});
  const [watchMovie, setWatchMovie] = useState([]);

  // use the useEffect hook to fetch movie details from the TMDB API - make sure its axios
  useEffect(() => {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
    axios
      .get(movieDetailsUrl)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // WATCH LIST - JUST A TEST
  useEffect(() => {
    const movieWatchUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(movieWatchUrl)
      .then((response) => {
        setWatchMovie(response.data.results.US.flatrate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //Render the MovieDetails Component
  return (
    <div className="movie-details">
      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`This is the poster for the movie titled ${movie.title}`}
      />
      <img
        className="movie-backdrop"
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={`This is the poster for the movie titled ${movie.title}`}
      />
      <h1 className="movie-title">{movie.title}</h1>
      <p className="movie-rating" >Rating: {movie.vote_average}</p>
      <p className="movie-adult">Adult: {movie.adult ? "Yes" : "No"}</p>
      <p className="movie-genre">Genres: {movie.genres?.map((genre) => genre.name).join(", ")}</p>
      <p className="movie-synopsis">Synopsis: {movie.overview}</p>
      <p className="movie-certification">Movie Rating: {movie.certification}</p>
      <p className="movie-homepage">Movie Homepage: {movie.homepage}</p>
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
      <FavoriteButton movie={movie}/>
      <Comments />
    </div>
  );
}

export default MovieDetails;
