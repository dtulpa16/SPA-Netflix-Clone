import MovieCard from "./MovieCard";
import React from "react";

/**
 * Renders a list of movies or TV shows.
 * @param {Object} props - Component props
 * @param {Array} props.movies - List of movie or TV show objects
 * @returns {JSX.Element} - Rendered MovieList component
 */
export default function MovieList({ movies, favorites, setFavoritesUpdated }) {


  return (
    <div className="flex flex-wrap gap-10 justify-center p-10">
    {console.log("MOVIES IN MOVIELIST: ", movies)}
      {movies?.map((el) => (
        <MovieCard singleMovie={el} favorites={favorites} setFavoritesUpdated={setFavoritesUpdated}/>
      ))}
    </div>
  );
}
