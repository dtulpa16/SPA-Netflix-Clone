import React, { useState } from "react";
import GenreCard from "./GenreCard";
import { auth, firestore,FieldValue } from "../../../firebaseConfig";
import { TypeContext } from "../../TypeContext";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
const genres = [
  "comedy",
  "horror",
  "romance",
  "thriller",
  "sci-fi",
  "drama",
  "action",
  "adventure",
  "animation",
  "biography",
  "crime",
  "documentary",
  "family",
  "fantasy",
  "film-noir",
  "game-show",
  "history",
  "music",
  "musical",
  "mystery",
  "news",
  "reality-tv",
  "sport",
  "talk-show",
  "war",
  "western",
];

export default function GenresMapper() {
  const { setAuthDisplay } = useContext(TypeContext);
  const [selected, setSelected] = useState([]);
  const [user] = useAuthState(auth);
  const saveSelectedGenres = async () => {
    if (user && selected.length > 0) {
  
      try {
        if (user && selected.length > 0) {
          const userRef = firestore
          .collection("userGenres")
          .doc(user.uid);
          await userRef.set(
            {
              genres: selected,
            },
            { merge: true }
          )
          console.log("Selected genres saved to Firestore database.");
    
          setAuthDisplay("movie");
        }
      } catch (error) {
        console.error("Error saving selected genres: ", error);
      }
    }
  };
  const addToSelected = (genre) => {
    setSelected([...selected, genre]);
  };
  return (
    <div className="flex flex-wrap min-w-[320px] md:max-w-[450px] min-h-[400px] gap-4 items-start p-2">
      {genres.map((el) => {
        return <GenreCard genre={el} addToSelected={addToSelected} />;
      })}
      <button
        className="bg-green-500 hover:scale-105 p-2 px-4 text-lg flex flex-row items-center gap-2 rounded-md right"
        onClick={saveSelectedGenres}
      >
        <h1>Done</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
}
