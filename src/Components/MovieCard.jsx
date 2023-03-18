import React, { useState } from "react";
/**
 * Renders a single movie or TV show card.
 * @param {Object} props - Component props
 * @param {Object} props.singleMovie - Single movie or TV show object
 * @returns {JSX.Element} - Rendered MovieCard component
 */
export default function MovieCard({ singleMovie }) {
  const [hoverToggle, setHoverToggle] = useState(false);
  // const [hoverToggle, setHoverToggle] = useState(false);
   return singleMovie.image?.url ? (
    <div
      onMouseEnter={() => setHoverToggle(true)}
      onMouseLeave={() => setHoverToggle(false)}
      class={`trasition duration-200 ease-in-out hover:scale-105 min-h-[280px] bg-black `}
    >
      {<img
        src={singleMovie.image.url}
        width="250"
        className={`h-[350px] ${hoverToggle ? "opacity-50 drop-shadow-sm shadow-sm shadow-gray-100" : ""}`}
      />}
      {hoverToggle === true ? (
        <h3 class="text-white fixed pl-2 text-md bottom-0 font-bold pb-2">
          {singleMovie.title}
        </h3>
      ) : null}
    </div> 
  ): null
}
