import React, { useState } from "react";
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
export default function MovieCard({
  singleMovie,
  favorites,
  setFavoritesUpdated,
  genre = null
}) {
  const [hoverToggle, setHoverToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    favorites.includes(singleMovie?.id?.replace("/title/", "").replace("/", ""))
  );
  const [movieId, setMovieId] = useState();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleClick = (movieId) => {
    setMovieId(movieId?.id?.replace("/title/", "").replace("/", ""));
    openModal();
  };
  return singleMovie.image?.url && favorites ? (
    <div>

      <div
        onMouseEnter={() => setHoverToggle(true)}
        onMouseLeave={() => setHoverToggle(false)}
        class={`relative cursor-pointer trasition duration-200 ease-in-out hover:scale-105 md:min-h-[280px] min-h-[180px] bg-black `}
      >
        {
          <img
            onClick={() => {
              handleClick(singleMovie);
            }}
            src={singleMovie.image.url}
          
            className={`md:h-[350px] md:w-[250px] min-w-[140px] max-w-[140px] h-[180px] ${hoverToggle ? "opacity-50" : ""}`}
          />
        }
        <div
          onClick={() =>
            handleFavorite(
              singleMovie,
              setIsFavorite,
              favorites,
              setFavoritesUpdated
            )
          }
        >
          <Heart filled={isFavorite ? true : false} />
        </div>
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
/**
 * Handles adding and removing a movie from the user's favorites list in Firestore
 * @param {Object} movieId - The movie ID to add or remove from favorites
 * @param {Function} setIsFavorite - A state setter function to set the favorite status of the movie
 * @param {Array} favorites - An array of the user's current favorite movie IDs
 */
const handleFavorite = async (
  movieId,
  setIsFavorite,
  favorites,
  setFavoritesUpdated
) => {
  // Extract the movie ID from the movie object
  movieId = movieId.id.replace("/title/", "").replace("/", "");

  // Check if the user is authenticated
  if (auth.currentUser) {
    const userRef = firestore
      .collection("userfavorites")
      .doc(auth.currentUser.uid);
    // Check if the movie is already in the user's favorites list
    if (favorites.includes(movieId)) {
      try {
        // Remove the movie from the user's favorites list in Firestore
        await userRef.update({
          favorites: FieldValue.arrayRemove(movieId),
        });
        toast.success("Removed from Favorites!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // Set the favorite status of the movie to false
        setIsFavorite(false);
        setFavoritesUpdated(true);
      } catch (er) {
        console.log(er);
      }
    } else {
      try {
        // Add the movie to the user's favorites list in Firestore
        await userRef.set(
          {
            favorites: FieldValue.arrayUnion(movieId),
          },
          { merge: true }
        );
        // Display a success toast notification
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
        // Set the favorite status of the movie to true
        setIsFavorite(true);
        // Trigger fetching of favorite movies to rerun
        setFavoritesUpdated(true);
        console.log("Movie added to favorites");
      } catch (error) {
        console.error("Error adding movie to favorites: ", error);
      }
    }
  } else {
    toast.error("Please login to favorite a movie", {
      position: "top-right",
      autoClose: 1500,
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
