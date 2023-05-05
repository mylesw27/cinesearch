import { Link } from "react-router-dom";
import DefaultPoster from "../assets/DefaultPoster.png";
import FavoritesButton from "./FavoritesButton";
import WatchlistButton from "./WatchlistButton";

export default function Card({ movie }) {
  const posterUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;
  const defaultPosterUrl = DefaultPoster;
  return (
    <Link to={`/movies/${movie.id}/details`}>
      <div className="card">
        <img
          src={posterUrl || defaultPosterUrl}
          alt={`This is the "${movie.title}" poster`}
        />
        {movie.title && <h2>{movie.title}</h2>}
        {movie.overview && <p>{movie.overview}</p>}
        <FavoritesButton movie={movie} />
        <WatchlistButton movie={movie} />
      </div>
    </Link>
  );
}
