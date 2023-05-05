import React from "react";
import Card from "./Card";

export default function ListView({ movies }) {
  return (
    <div className="list-view">
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
