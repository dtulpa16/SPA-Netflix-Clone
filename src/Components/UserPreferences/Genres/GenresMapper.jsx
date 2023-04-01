import React,{useState} from "react";
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
  const [selected, setSelected] = useState([]);
  
  const addToSelected = (genre) =>{
   setSelected([...selected, genre])
   console.log([...selected, genre])
  }
  return (
    <div className="flex flex-wrap min-w-[320px] md:max-w-[450px] min-h-[400px] gap-4 items-start p-2">
      {genres.map((el) => {
        return <GenreCard genre={el} addToSelected={addToSelected}/>;
      })}
    </div>
  );
}