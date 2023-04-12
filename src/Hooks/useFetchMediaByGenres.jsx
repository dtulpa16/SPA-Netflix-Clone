import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebaseConfig";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import MediaData from "../MediaData.js";

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
          let mediaResponse = await fetchMediaByGenre(userGenres);
          setData(mediaResponse);
          console.log("genres:", userGenres);
        } else {
          setError(true);
          console.log("No such document!");
        }
      }
      if (!user) {
        let mediaResponse = await fetchMediaByGenre(["action","comedy","thriller","fantasy","animation"]);
        setData(mediaResponse);
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
    let customResponse = [];
    genres.forEach((genre) => {
      const mediaData = MediaData[genre] || [];
      const genreObj = {
        [genre]: [],
      };
      mediaData.forEach((movie) => {
        genreObj[genre].push({
          movie: movie,
        });
      });
      customResponse.push(genreObj);
    });

    console.log(customResponse);
    return customResponse;
  } catch (er) {
    console.log("Error fetching media by genre: ", er);
  }
};
// const fetchMediaByGenre = async (genres) => {
//   try {
//     let customResponse = {};
//     if (genres.length > 0) {
//       customResponse = genres.reduce((obj, genre) => {
//         obj[genre] = [];
//         return obj;
//       }, {});
//     }
//     let genre = genres.map((item, index)=>{
//       const genreIndex = index % genres.length;
//       customResponse[genres[genreIndex]]?.push(MediaData[item]);
//     })
//     debugger
//     // movieDetails.forEach((item, index) => {
//     //   const genreIndex = index % genres.length;
//     //   customResponse[genres[genreIndex]]?.push(item);
//     // });
//     debugger;
//     return customResponse;
//   } catch (er) {
//     console.log("Error fetching media by genre: ", er);
//   }
// };
