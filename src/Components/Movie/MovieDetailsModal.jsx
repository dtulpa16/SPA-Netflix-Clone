import axios from "axios";
import React, { useEffect, useState } from "react";
/**
 * MovieDetailsModal is a functional component that renders a modal
 * displaying movie details, including title, genres, ratings, and a trailer.
 *
 * @component
 * @param {string} movieId - The movie ID used to fetch movie details and the trailer.
 * @param {boolean} isModalOpen - A boolean to control the modal's visibility.
 * @param {function} closeModal - A function to close the modal when invoked.
 *
 * @example
 * <MovieDetailsModal
 *   movieId="12345"
 *   isModalOpen={true}
 *   closeModal={() => setIsModalOpen(false)}
 * />
 */
export default function MovieDetailsModal({
  movieId,
  isModalOpen,
  closeModal,
}) {
  const [movie, setMovie] = useState();
  const [trailerKey, setTrailerKey] = useState("");
  const [videoToggle, setVideoToggle] = useState(false);
  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      let response = await axios.get(
        `https://online-movie-database.p.rapidapi.com/title/get-meta-data?ids=${movieId}&region=US`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_MOVIE_API_KEY,
            "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
          },
        }
      );
      console.log(response.data[movieId]);
      let movie = response.data[movieId];
      setMovie(response.data[movieId]);
      fetchTrailer(movie);
    } catch (er) {
      console.log(er);
    }
  };

  const fetchTrailer = async (movie) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${movie.title.title} trailer&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet&type=video&maxResults=6`
      );
       ;
      setTrailerKey(response.data.items[0].id.videoId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    movie &&
    trailerKey && (
      <div>
        <div
          className={`fixed top-0 left-0 h-full bg-black opacity-50 z-10 ${
            isModalOpen ? "block" : "hidden"
          }`}
          onClick={() => closeModal()}
        ></div>

        <div
          className={`fixed top-1/2 left-1/2 min-w-[350px] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 z-20 ${
            isModalOpen ? "block" : "hidden"
          }`}
        >
          <div className="ease-in-out flex flex-col md:flex-row justify-between items-center mb-4">
            <h1
              onClick={() => {
                closeModal();
              }}
              className="hover:cursor-pointer hover:text-red-500 absolute top-1 text-xl font-semibold right-3 text-gray-700"
            >
              X
            </h1>
            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
              <img
                src={movie.title.image.url}
                alt={movie.title.title}
                className="w-full h-auto md:float-left md:mr-4"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-bold text-red-500">
                {movie.title.title}
              </h2>
              <div className="flex flex-wrap mb-4">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-200 text-gray-700 py-1 px-2 rounded-full mt-3 mr-2 mb-2"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="bg-red-500 max-w-fit text-white py-1 px-2 rounded-full">
                {movie.ratings.rating}/10
              </div>
              <br />
              <div className="bg-red-500 p-2 rounded-md max-w-max hover:cursor-pointer hover:scale-[1.03] duration-75">
                <a
                  href={movie.metacritic.metacriticUrl}
                  className="text-white text-md no-underline"
                >
                  Click here to see reviews!
                </a>
              </div>
              {!videoToggle &&
                <button
                  onClick={() => setVideoToggle(!videoToggle)}
                  className="bg-red-500 mt-4 p-2 rounded-md max-w-max hover:cursor-pointer hover:scale-[1.03] duration-75"
                >
                  Watch Trailer
                </button>
              }
              {videoToggle && (
                <div className="mt-4">
                  <iframe
                    title="Movie Trailer"
                    width="70%"
                    height="232"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
