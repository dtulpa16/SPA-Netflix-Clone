import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import LoadingSpinner from "../Components/Icons/LoadingSpinner";
import MovieList from "../Components/Movie/MovieList";
import { TypeContext } from "../Components/TypeContext";
/**
 * Renders the main movie or TV show page.
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - Search term for the movie or TV show
 * @param {boolean} props.toggle - Boolean value indicating whether to toggle between movie and TV show
 * @returns {JSX.Element} - Rendered MoviePage component
 */
export default function MoviePage({ searchTerm, toggle }) {
  const [loading, setloading] = useState(false);
  const { active } = useContext(TypeContext);
  const [movies, setmovies] = useState([]);

  const fetchMedia = async (
    searchTerm = active === "movie" ? "Lord Of The Rings" : "The Office"
  ) => {
    setloading(true);
    let response = await axios.get(
      `https://online-movie-database.p.rapidapi.com/title/v2/find?title=${searchTerm}&titleType=${
        active === "movie" ? "movie" : "tvSeries"
      }`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_MOVIE_API_KEY,
          "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
        },
      }
    );
    console.log("Movie API response: ", response.data.results);
    setmovies(response.data.results);
    setloading(false);
  };

  useEffect(() => {
    fetchMedia(searchTerm);
  }, [toggle, active]);

  return !loading ? (
    <div>
      <h1 className="font-bold text-center md:text-2xl top-4 text-md cursor-pointer relative duration-100">
        {active === "movie" ? "Movies" : "TV Shows"}
      </h1>
      <MovieList movies={movies} />
    </div>
  ) : (
    <LoadingSpinner />
  );
}
