// import react and the necessary hooks - useStates, useParams, and useEffect and axios
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Define the MovieDetails component
function MovieDetails() {
  // Use the useParams hook to get the movie ID from the URL
  const { _id } = useParams();

  // Set up state variables for the movie, favorites, and watch list
  const [movie, setMovie] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [watchList, setWatchList] = useState([]);

  // use the useEffect hook to fetch movie details from the TMDB API - make sure its axios
  useEffect(() => {
    const popularFilmsUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`;
    axios
      .get(popularFilmsUrl)
      .then((response) => {
        setMovie(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [_id]);

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
  // if

  //Render the MovieDetails Component
  return (
    <div className="movie-details">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`This is the poster for the movie titled ${movie.title}`}
      />
      <h1>{movie.title}</h1>
      <p>Rating: {movie.vote_average}</p>
      <p>Adult: {movie.adult ? "Yes" : "No"}</p>
      <p>Genres: {movie.genres?.map((genre) => genre.name).join(", ")}</p>
      <p>Synopsis: {movie.overview}</p>
      <button onClick={handleAddFavorite}>Add to Favorites</button>
      <button onClick={handleAddWatchList}>Add to Watch List</button>
    </div>
  );
}

export default MovieDetails;
