import { auth, firestore, FieldValue } from "../firebaseConfig";
import { useState, useEffect } from "react";

export default function useFetchFavorites() {
  const [favorites, setFavorites] = useState([]);
  const fetchFavorites = async () => {
    if (auth.currentUser?.uid) {
      try {
        const favRef = firestore
          .collection("userfavorites")
          .doc(auth.currentUser?.uid);
        const doc = await favRef.get();
        if (doc.exists) {
          const favs = doc.data().favorites;
          debugger;
          setFavorites(favs);
          console.log("Favorites:", favs);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document: ", error);
      }
    }
  };
  useEffect(() => {
    fetchFavorites();
  }, [auth?.currentUser]);
  return { favorites };
}
