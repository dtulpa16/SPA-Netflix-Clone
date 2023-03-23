import React, { useEffect, useState } from "react";
import Heart from "../Icons/Heart";
import { auth, firestore, FieldValue } from "../../firebaseConfig";
import MovieDetailsModal from "./MovieDetailsModal";
import { toast } from "react-toastify";
/**
 * Renders a single movie or TV show card.
 * @param {Object} props - Component props
 * @param {Object} props.singleMovie - Single movie or TV show object
 * @returns {JSX.Element} - Rendered MovieCard component
 */
export default function MovieCard({ singleMovie, favorites }) {
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
        onMouseEnter={() => setHoverToggle(true)}
        onMouseLeave={() => setHoverToggle(false)}
        class={`cursor-pointer trasition duration-200 ease-in-out hover:scale-105 min-h-[280px] bg-black `}
      >
        {
          <img
            onClick={() => {
              handleClick(singleMovie);
            }}
            src={singleMovie.image.url}
            width="250"
            className={`h-[350px] ${hoverToggle ? "opacity-50" : ""}`}
          />
        }
        {hoverToggle === true ? (
          <div>
            <h3 class="text-white fixed pl-2 text-md bottom-0 font-bold pb-2">
              {singleMovie.title}
            </h3>
            <div onClick={() => addToFavorites(singleMovie)}>
              <Heart
                filled={
                  favorites.includes(
                    singleMovie.id.replace("/title/", "").replace("/", "")
                  )
                    ? true
                    : false
                }
              />
            </div>
          </div>
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

const addToFavorites = async (movieId) => {
  movieId = movieId.id.replace("/title/", "").replace("/", "");
  if (auth.currentUser) {
    const userRef = firestore
      .collection("userfavorites")
      .doc(auth.currentUser.uid);
    debugger;
    try {
      await userRef.set(
        {
          favorites: FieldValue.arrayUnion(movieId),
        },
        { merge: true }
      );
      toast.success("Added To Favorites!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("Movie added to favorites");
    } catch (error) {
      console.error("Error adding movie to favorites: ", error);
    }
  } else {
    toast.error("Please login to favorite a movie", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.error("User is not authenticated");
  }
};
