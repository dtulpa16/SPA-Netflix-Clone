import React, { useState } from "react";

export default function GenreCard({ genre, addToSelected, selected }) {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${
        active || selected.includes(genre) ? "bg-green-500" : "bg-zinc-300"
      }  rounded-md h-min flex flex-row gap-1 px-1 pr-2 hover:scale-105 hover:cursor-pointer transition-all duration-150 hover:bg-green-500 items-center`}
      onClick={() => {
        addToSelected(genre);
        setActive(!active ? false : true);
        setHover(!hover);
      }}
    >
      {!hover && !active && !selected.includes(genre) ? (
        <AddIcon />
      ) : (
        <CheckIcon />
      )}

      <h1 className="text-black text-lg font-semibold capitalize">
        {genre.replace("-", " ")}
      </h1>
    </div>
  );
}
export const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
        stroke="currentColor"
        className="text-black transition-all duration-100"
      />
    </svg>
  );
};
export const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 bg-green-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
        className=" text-white transition-all duration-100"
      />
    </svg>
  );
};
