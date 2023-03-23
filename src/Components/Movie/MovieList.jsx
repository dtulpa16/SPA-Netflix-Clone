import MovieCard from "./MovieCard";
import React, { useContext} from "react";
import { TypeContext } from "../TypeContext";
/**
 * Renders a list of movies or TV shows.
 * @param {Object} props - Component props
 * @param {Array} props.movies - List of movie or TV show objects
 * @returns {JSX.Element} - Rendered MovieList component
 */
export default function MovieList({ movies }) {
  const { favorites } = useContext(TypeContext);

  return (
    <div className="flex flex-wrap gap-10 justify-center p-10">
      {movies.map((el) => (
        <MovieCard singleMovie={el} favorites={favorites}/>
      ))}
    </div>
  );
}
