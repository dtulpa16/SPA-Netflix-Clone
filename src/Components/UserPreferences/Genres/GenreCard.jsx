import React, { useState } from "react";

export default function GenreCard({ genre, addToSelected }) {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className=" bg-zinc-300 rounded-md h-min flex flex-row gap-1 px-1 pr-2 hover:scale-105 hover:cursor-pointer transition-all duration-75 hover:bg-red-500 items-center"
      onClick={() => addToSelected(genre)}
    >
      {!hover ? (
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
            d="M12 4.5v15m7.5-7.5h-15"
            stroke="currentColor"
            className="text-black"
          />
        </svg>
      ) : (
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
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}

      <h1 className="text-black text-lg">{genre.replace("-", " ")}</h1>
    </div>
  );
}
