import React from "react";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <div className="flex flex-wrap gap-8 justify-center p-10">
      {movies.map((el) => (
        <MovieCard singleMovie={el} />
      ))}
    </div>
  );
}
