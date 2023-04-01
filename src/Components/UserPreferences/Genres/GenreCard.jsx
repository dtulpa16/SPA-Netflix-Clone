import React,{useState} from "react";

export default function GenreCard({ genre,addToSelected }) {
  const [active, setActive] = useState(false);
  
  return (
    <div
      className=" bg-zinc-300 rounded-md h-min flex flex-row items-center"
      onClick={() => addToSelected(genre)}
    >
      <h1 className="text-black text-lg">{genre.replace("-", " ")}</h1>
    </div>
  );
}
