import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import LoadingSpinner from "../Components/Icons/LoadingSpinner";
import MovieList from "../Components/Movie/MovieList";
import { TypeContext } from "../Components/TypeContext";
import useFetchMediaByGenres from "../Hooks/useFetchMediaByGenres";
import pLimit from "p-limit";
/**
 * Renders the main movie or TV show page.
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - Search term for the movie or TV show
 * @param {boolean} props.toggle - Boolean value indicating whether to toggle between movie and TV show
 * @returns {JSX.Element} - Rendered MoviePage component
 */
export default function MoviePage({ searchTerm, toggle }) {
  const [isLoading, setloading] = useState(false);
  const { active, favorites, setFavoritesUpdated } = useContext(TypeContext);
  const [movies, setmovies] = useState([]);
  const [media, setmedia] = useState(null);
  const { data, loading, error } = useFetchMediaByGenres();
  const fetchMedia = async (searchTerm) => {
    setloading(true);
    let response = await axios.get(
      `https://online-movie-database.p.rapidapi.com/title/v2/find?title=${searchTerm}`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_MOVIE_API_KEY,
          "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
        },
      }
    );
    console.log("Movie API response: ", response.data.results);
    
    setmedia(response.data.results);
    setloading(false);
  };
  const fetchFavorites = async () => {
    setloading(true);
    const rateLimiter = pLimit(1);
    let userFavorites = await Promise.all(
      favorites.map(async (e) => {
        let response = await rateLimiter(() =>
          axios.get(
            `https://online-movie-database.p.rapidapi.com/title/get-details?tconst=${e}`,
            {
              headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_MOVIE_API_KEY,
                "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
              },
            }
          )
        );
        return response.data;
      })
    );
    setmedia(userFavorites);
    setloading(false);
  };
  useEffect(() => {
    if (active === "favorites") {
      setmedia(null);
      fetchFavorites();
    } else if (active === "movie") {
      setmedia(data);
    }
  }, [active, data]);
  useEffect(() => {
    active === "search" && fetchMedia(searchTerm)
  }, [toggle, searchTerm]);

  return !isLoading && !loading && media ? (
    <div>
      <MovieList
        movies={movies}
        favorites={favorites}
        setFavoritesUpdated={setFavoritesUpdated}
        media={media}
        data={media}
        active={active}
        search={searchTerm}
      />
    </div>
  ) : (
    <LoadingSpinner />
  );
}
