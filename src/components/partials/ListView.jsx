import React from "react";
import Card from "./Card";
import "./ListView.css"

export default function ListView({ movies }) {
  return (
    <div className="list-view" key='movieCard'>
      <div className="list-view" key='movie-card'>
      {movies.map((movie,i) => (
        <div key={`keyMovie${i}`}>
        <Card key={movie.id} movie={movie} />
        </div>
      ))}
      </div>
    </div>
  );
}
