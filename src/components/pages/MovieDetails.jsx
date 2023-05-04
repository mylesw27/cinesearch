// import react and the necessary hooks - useStates, useParams, and useEffect and axios
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import FavoritesButton from "../FavoritesButton";


// Define the MovieDetails component
function MovieDetails() {
  // Use the useParams hook to get the movie ID from the URL
  const { id } = useParams();

  // Set up state variables for the movie, favorites, and watch list
  const [movie, setMovie] = useState({});
  const [watchMovie, setWatchMovie] = useState([])
  const [favorites, setFavorites] = useState([]);
  const [watchList, setWatchList] = useState([]);

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
    const movieWatchUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    axios
      .get(movieWatchUrl)
      .then((response) => {
        setWatchMovie(response.data.results.US.flatrate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // Define the handleAddFavorite function to add the movie to the favorites list
  const handleAddFavorite = () => {
    if (!favorites.includes(movie)) {
      setFavorites([...favorites, movie]);
      //Wait for STUB to be done on backend and then I need to set up POST to go to the favorite reference
      console.log('added to favorites-list')
    }
  };

  //Define the handleAddWatchList function to add the movie to the watch list
  const handleAddWatchList = () => {
    if (!watchList.includes(movie)) {
      setWatchList([...watchList, movie]);
      //Wait for STUB to be done on backend and then I need to set up POST to go to the watchList reference
      console.log('added to watch-list')
    }
  };
  // if the movie is not already in the watch list, add it
  console.log(movie)
  console.log(watchMovie)
// const origin = movie.production_companies[0].origin_country

  //Render the MovieDetails Component
  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`This is the poster for the movie titled ${movie.title}`}
      />
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={`This is the poster for the movie titled ${movie.title}`}
      />
      <h1>{movie.title}</h1>
      <p>Rating: {movie.vote_average}</p>
      <p>Adult: {movie.adult ? "Yes" : "No"}</p>
      <p>Genres: {movie.genres?.map((genre) => genre.name).join(", ")}</p>
      <p>Synopsis: {movie.overview}</p>
      <p>Movie Rating: {movie.certification}</p>
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
      <FavoritesButton/>
      <button onClick={handleAddWatchList}>Add to Watch List</button>
      <Comments />
    </div>
  );
      }  


export default MovieDetails;
