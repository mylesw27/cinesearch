import { Link } from "react-router-dom";
 import DefaultPoster from "../assets/DefaultPoster.png";
 import Card from 'react-bootstrap/Card';
import FavoritesButton from "./FavoritesButton";
import WatchlistButton from "./WatchlistButton";
import "./Card.css"

// export default function Card({ movie }) {
//   const posterUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;
//   const defaultPosterUrl = DefaultPoster;
//   return (
//     <div className="card">
//       <Link to={`/movies/${movie.id}/details`}>
//         <div>
//           <img
//             src={posterUrl || defaultPosterUrl}
//             alt={`This is the "${movie.title}" poster`}
//           />
//           <div class="carousel-caption d-none d-md-block">
//             <h5>{movie.title}</h5>
//             <p>{movie.overview}</p>
//           </div>
          // <FavoritesButton movie={movie} />
          // <WatchlistButton movie={movie} />
//         </div>
//       </Link>
//     </div>
//   );
// }



function Cards({ movie }) {

  const posterUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;

  const defaultPosterUrl = DefaultPoster;

  

  return (
    <>
      <div className="card-container">
        <Card className="card bg-dark text-white">
          <Link to={`/movies/${movie.id}/details`}>
            <Card.Img className="pictures" src={posterUrl} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>{movie.title}</Card.Title>
            </Card.ImgOverlay>
          </Link>
        </Card>
      </div>
      <div className="buttons">
        <FavoritesButton movie={movie} /><WatchlistButton movie={movie} />
      </div>
      </>
  );
}

export default Cards;