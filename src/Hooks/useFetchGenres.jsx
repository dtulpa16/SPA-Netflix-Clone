import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useFetchGenres() {
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
    setLoading(false);
  };
  // Fetch genres on component mount or when the user object changes
  useEffect(() => {
    fetchGenres();
  }, [user]);
  return { data, loading, error };
}
