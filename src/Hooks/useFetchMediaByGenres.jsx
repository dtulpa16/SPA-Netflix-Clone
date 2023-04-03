import React, { useState, useEffect } from "react";
import { auth, firestore, FieldValue } from "../firebaseConfig";

import { useAuthState } from "react-firebase-hooks/auth";
export default function useFetchMediaByGenres() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const fetchGenres = async () => {
    try {
      if (user) {
        debugger
        const genreRef = firestore.collection("userGenres").doc(user.uid);
        const doc = await genreRef.get();
        if (doc.exists) {
          const userGenres = doc.data().genres;
          debugger;
          setData(userGenres);
          console.log("genres:", userGenres);
        } else {
          setError(true);
          console.log("No such document!");
        }
      }
    } catch (error) {
      console.error("Error saving selected genres: ", error);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  return { data, loading,error };
}
