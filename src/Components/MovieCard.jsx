import React, { useState } from "react";
import MovieDetailsModal from "./MovieDetailsModal";
/**
 * Renders a single movie or TV show card.
 * @param {Object} props - Component props
 * @param {Object} props.singleMovie - Single movie or TV show object
 * @returns {JSX.Element} - Rendered MovieCard component
 */
export default function MovieCard({ singleMovie }) {
  const [hoverToggle, setHoverToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieId, setMovieId] = useState();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleClick = (movieId) => {
    setMovieId(movieId.id.replace("/title/", "").replace("/", ""));
    openModal();
  };
  return singleMovie.image?.url ? (
    <div>
      <div
        onClick={() => {
          handleClick(singleMovie);
        }}
        onMouseEnter={() => setHoverToggle(true)}
        onMouseLeave={() => setHoverToggle(false)}
        class={`cursor-pointer trasition duration-200 ease-in-out hover:scale-105 min-h-[280px] bg-black `}
      >
        {
          <img
            src={singleMovie.image.url}
            width="250"
            className={`h-[350px] ${hoverToggle ? "opacity-50" : ""}`}
          />
        }
        {hoverToggle === true ? (
          <h3 class="text-white fixed pl-2 text-md bottom-0 font-bold pb-2">
            {singleMovie.title}
          </h3>
        ) : null}
      </div>
      {isModalOpen && (
        <MovieDetailsModal
          movieId={movieId}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  ) : null;
}
