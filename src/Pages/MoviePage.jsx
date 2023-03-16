import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieList from "../Components/MovieList";

export default function MoviePage({searchTerm, toggle}) {
  const [movies, setmovies] = useState([]);

  const fetchMovies = async (searchTerm = "The Hobbit") => {
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
    setmovies(response.data.results);
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [toggle]);

  return (
    <div>
      <MovieList movies={movies}/>
    </div>
  );
}
