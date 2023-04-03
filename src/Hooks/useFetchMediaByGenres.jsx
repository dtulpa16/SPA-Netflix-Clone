import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebaseConfig";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
export default function useFetchMediaByGenres() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
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
  useEffect(() => {
    fetchGenres();
  }, [user]);
  return { data, loading, error };
}
const fetchMediaByGenre = async (genres) => {
  try {
    let customResponse = genres.reduce((obj, genre) => {
      obj[genre] = [];
      return obj;
    }, {});
    debugger;
    await Promise.all(
      genres.map(async (e) => {
        let response = await axios
          .get(
            `https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=${e}&limit=6`,
            {
              headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_MOVIE_API_KEY,
                "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
              },
            }
          )
          .then((response) =>
            response.data.map((el) =>
              customResponse[e].push(el.replace("/title/", "").replace("/", ""))
            )
          );
      })
    );
    console.log([customResponse]);
    return [customResponse];
  } catch (er) {
    console.log("Error fetching media by genre: ", er);
  }
};
