import React from "react";
import Card from "./Card";
import "./ListView.css"

export default function ListView({ movies }) {
  return (
    <div className="list-view">
      <div className="list-view">
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
      </div>
    </div>
  );
}
