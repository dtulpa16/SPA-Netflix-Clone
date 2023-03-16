import axios from "axios";
import React, { useEffect } from "react";

export default function MoviePage() {
  const fetchMovies = async (searchTerm = "The Hobbit") => {
    try {
      let response = await axios.get(
        `https://online-movie-database.p.rapidapi.com/title/v2/find?title=${searchTerm}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_MOVIE_API_KEY,
            "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
          },
        }
      );
      console.log("Movie API response: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  
  return <div>MoviePage</div>;
}
