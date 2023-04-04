import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebaseConfig";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import pLimit from "p-limit";

// Custom hook to fetch media by genres
export default function useFetchMediaByGenres() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  // Function to fetch genres for the authenticated user
  const fetchGenres = async () => {
    setLoading(true);
    try {
      if (user) {
        const genreRef = firestore.collection("userGenres").doc(user.uid);
        const doc = await genreRef.get();
        if (doc.exists) {
          const userGenres = doc.data().genres;
          debugger;
          let mediaResponse = await fetchMediaByGenre(userGenres);
          setData(mediaResponse);
          console.log("genres:", userGenres);
        } else {
          setError(true);
          console.log("No such document!");
        }
      }
    } catch (error) {
      console.error("Error saving selected genres: ", error);
    }
    setLoading(false);
  };
  // Fetch genres on component mount or when the user object changes
  useEffect(() => {
    fetchGenres();
  }, [user]);
  return { data, loading, error };
}
// Function to fetch media by genre
const fetchMediaByGenre = async (genres) => {
  try {
    let customResponse = {};
    if (genres.length > 0) {
      customResponse = genres.reduce((obj, genre) => {
        obj[genre] = [];
        return obj;
      }, {});
    }
    const rateLimiter = pLimit(1);

    const response = await rateLimiter(() =>
      axios.get(
        `https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=${genres.join(
          ","
        )}&limit=12`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_MOVIE_API_KEY,
            "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
          },
        }
      )
    );
    debugger;
    const movieDetails = await Promise.all(
      response.data.map(async (item) => {
        let detailsResponse = await rateLimiter(() =>
          axios.get(
            `https://online-movie-database.p.rapidapi.com/title/get-details?tconst=${item
              .replace("/title/", "")
              .replace("/", "")}`,
            {
              headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_MOVIE_API_KEY,
                "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
              },
            }
          )
        );
        return detailsResponse.data;
      })
    );
    debugger;
    movieDetails.forEach((item, index) => {
      customResponse[genres[index]]?.push(item);
    });
    debugger;
    return customResponse;
  } catch (er) {
    console.log("Error fetching media by genre: ", er);
  }
};
