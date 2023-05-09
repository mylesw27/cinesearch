// import react and the necessary hooks - useStates, useParams, and useEffect and axios
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WatchlistButton from "../partials/WatchlistButton";
import FavoritesButton from "../partials/FavoritesButton";
import Comments from "../partials/Comments";
import "./MovieDetails.css"

// Define the MovieDetails component
function MovieDetails({ currentUser }) {
  // Use the useParams hook to get the movie ID from the URL
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");
  const [watchObjId, setWatchObjId] = useState(null)
  const [objectId, setObjectId] = useState(null)
  // Set up state variables for the movie, favorites, and watch list
  const [movie, setMovie] = useState({});
  const [watchMovie, setWatchMovie] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/favorites`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        const favorites = response.data.result;
        setObjectId(favorites[0]._id)

      } catch (err) {
        console.log(err);
      }
    };

    checkFavorite();
  }, [jwt]);

  useEffect(() => {
    const checkWatch = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/watchlist`, {
          headers: {
            Authorization: `${jwt}`,
          },
        });
        const watch = response.data.result;
        setWatchObjId(watch[0]._id)

      } catch (err) {
        console.log(err);
      }
    };
    checkWatch();
  }, [jwt]);


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
    <>
      <div className="movie-details">
        {movie.poster_path && (
          <>
            <div className="backdropDiv">
              <img
                className="movie-backdrop"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={`This is the poster for the movie titled ${movie.title}`}

              />
              <div className="backdrop-gradient"></div>
            </div>
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`This is the poster for the movie titled ${movie.title}`}
            />
          </>
        )}
        <div className="movie-text">
          <h1>{movie.title}</h1>
          <h3><b>Rating:</b> {movie.vote_average}</h3>
          <p><b>Adult:</b> {movie.adult ? "Yes" : "No"}</p>
          <p><b>Genres:</b> {movie.genres?.map((genre) => genre.name).join(", ")}</p>
          <p><b>Synopsis:</b> {movie.overview}</p>
          <p><b>Movie run time:</b> {movie.runtime} minutes</p>
          <p className="stream-btn" onClick={toggleMenu} style={{ fontFamily: "Sigmar", fontWeight: "lighter", padding: "30px" }}>Click Here To Find Potential Streams</p>
          {/* <p>Movie Homepage: {movie.homepage}</p> */}
          {isMenuOpen && (
            <div className="movie-dropdown">
              {watchMovie?.map((provider) => (
                <div className="provider-image" key={provider.provider_id}>
                  {/* <p>{`${provider.provider_name}`}</p> */}
                  <a href={`${movie.homepage}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
        <br />
      </div>
      <div className="buttons">
        <FavoritesButton movie={movie} objectId={objectId} currentUser={currentUser} />
        <WatchlistButton movie={movie} watchObjId={watchObjId} currentUser={currentUser} />
      </div>
      <Comments movie={id} currentUser={currentUser} />
    </>
  );
}

export default MovieDetails;
