import React, { useState } from "react";

export default function GenreCard({ genre, addToSelected }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className=" bg-zinc-300 rounded-md h-min flex flex-row items-center"
      onClick={() => addToSelected(genre)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
          stroke="currentColor"
          className="text-black"
        />
      </svg>

      <h1 className="text-black text-lg">{genre.replace("-", " ")}</h1>
    </div>
  );
}
