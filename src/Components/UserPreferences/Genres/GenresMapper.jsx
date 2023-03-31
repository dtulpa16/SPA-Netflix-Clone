import React from "react";
import GenreCard from "./GenreCard";
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
  return (
    <div className="flex flex-wrap min-w-[320px] md:max-w-[450px] min-h-[400px] gap-2">
      {genres.map((el) => {
        return <GenreCard genre={el} />;
      })}
    </div>
  );
}
