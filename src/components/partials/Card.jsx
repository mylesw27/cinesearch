import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';
import DefaultPoster from '../assets/DefaultPoster.png';
import FavoritesButton from './FavoritesButton';
import WatchlistButton from './WatchlistButton';
import './Card.css';

function Cards({ movie }) {
  const posterUrl = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;
  const defaultPosterUrl = DefaultPoster;

  return (
    <div className="frame">
      <div className="card-container">
        <Card className="card bg-dark text-white" key='myKey'>
          <Link to={`/movies/${movie.id}/details`}>
            <Card.Img key='the movie-id' className="card-img-top" src={posterUrl || defaultPosterUrl} alt="Card image" />
          </Link>
        </Card>
      </div>
      <h1 className="title">{movie.title}</h1>
    </div>
  );
}

export default Cards;