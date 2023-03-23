import React from "react";
import MovieCard from "./MovieCard";
/**
 * Renders a list of movies or TV shows.
 * @param {Object} props - Component props
 * @param {Array} props.movies - List of movie or TV show objects
 * @returns {JSX.Element} - Rendered MovieList component
 */
export default function MovieList({ movies }) {
  return (
    <div className="flex flex-wrap gap-10 justify-center p-10">
      {movies.map((el) => (
        <MovieCard singleMovie={el}/>
      ))}
    </div>
  );
}
