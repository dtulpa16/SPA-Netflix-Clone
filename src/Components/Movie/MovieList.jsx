import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

/**
 * Renders a list of movies or TV shows.
 *
 * @param {Object} props - Component props
 * @param {Array} props.movies - List of movie or TV show objects
 * @param {Array} props.favorites - List of favorite movie or TV show IDs
 * @param {Function} props.setFavoritesUpdated - Function to update favorite movie or TV show IDs
 * @param {Array} props.media - List of movie or TV show objects grouped by genre
 * @param {Array} props.data - Array of data
 * @returns {JSX.Element} - Rendered MovieList component
 */
export default function MovieList({
  movies,
  favorites,
  setFavoritesUpdated,
  media = null,
  data,
  active,
  search = null,
}) {
  // Initialize state variables
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(6);
  const [currentMoviesByGenre, setcurrentMoviesByGenre] = useState([]);
  // Use effect to update state variables when media or data changes
  useEffect(() => {
    console.log("MEDIA: ", media);
    if (media) {
      let moviesByGenre;
      try {
        // Convert media object to an array of objects with genre and movie properties
        moviesByGenre = media.map((genreObj) => {
          const genre = Object.keys(genreObj)[0];
          const movies = genreObj[genre].map((movie) => {
            return {
              genre: genre,
              movie: movie,
            };
          });
          return {
            genre: genre,
            movies: movies,
          };
        });
      } catch (er) {
        // If there is an error, create a custom response object with a "favorites" genre
        let customFavsReponse = [{ genre: "favorites", movies: [] }];
        console.log("SEARCH: ", search);
        moviesByGenre = media.map((genreObj) => {
          // Add each movie in the media object to the "favorites" genre
          customFavsReponse[0].movies.push({
            genre: search ? search : "favorites",
            movie: { movie: genreObj },
          });
        });
        // Set the moviesByGenre state variable to the custom response object
        moviesByGenre = customFavsReponse;
      }
      console.log("MOVIESBYGENRE: ", moviesByGenre);
      // Set the moviesByGenre state variable
      setMoviesByGenre(moviesByGenre);

      let currentMoviesByGenre =
        moviesByGenre?.length > 0 && media
          ? moviesByGenre.map((genre) => {
              return {
                genre: genre.genre,
                movies: genre.movies.slice(indexOfFirstMovie, indexOfLastMovie),
              };
            })
          : null;
      setcurrentMoviesByGenre(currentMoviesByGenre);
      console.log("CURRENT GENRE:: ", currentMoviesByGenre);
    }
  }, [media, data, search]);
  // Calculate index of last and first movie on current page
  let indexOfLastMovie = (currentPage + 1) * moviesPerPage;
  let indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  // Slice movies by genre to show only movies for the current page

  console.log("MoviesByGenre", moviesByGenre);
  // Handler for pagination page clicks
  const handlePageClick = ({ selected: selectedPage }, genre, index) => {
    let genreToUpdate = moviesByGenre.filter((el) => el.genre === genre);
    indexOfLastMovie = (selectedPage + 1) * moviesPerPage;
    indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    let newArr =
      genreToUpdate?.length > 0 && media
        ? genreToUpdate.map((genre) => {
            return {
              genre: genre.genre,
              movies: genre.movies.slice(indexOfFirstMovie, indexOfLastMovie),
            };
          })
        : null;

    let finalArr = currentMoviesByGenre;
    finalArr[index] = newArr[0];
    setcurrentMoviesByGenre(finalArr);
    setCurrentPage(selectedPage);
  };

  // Render the MovieList component
  return (
    currentMoviesByGenre &&
    currentMoviesByGenre?.length > 0 && (
      <div className="flex flex-wrap gap-10 justify-center p-10 pt-16">
        {currentMoviesByGenre &&
          currentMoviesByGenre.map((movies, index) => (
            <div key={index}>
              {console.log("LENGTH: ", movies.movies.length)}
              <h2 className="text-2xl font-bold mb-4 capitalize">
                {active === "search" ? search : movies.genre.replace("-", " ")}
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {movies.movies.map((element, i) => (
                  <MovieCard
                    key={element.movie.movie.id}
                    singleMovie={element.movie.movie}
                    favorites={favorites}
                    setFavoritesUpdated={setFavoritesUpdated}
                    genre={element.genre}
                  />
                ))}
              </div>
              {movies.movies.length >= moviesPerPage && (
                <ReactPaginate
                  previousLabel={
                    <div className="flex items-center justify-center w-8 h-8 text-white rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#EF4444"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.25 4.5l-7.5 7.5 7.5 7.5"
                        />
                      </svg>
                    </div>
                  }
                  nextLabel={
                    <div className="flex items-center justify-center w-8 h-8 text-white rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#EF4444"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  }
                  breakLabel={<span className="mx-2">...</span>}
                  pageCount={Math.ceil(
                    moviesByGenre[index]?.movies.length / moviesPerPage
                  )}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  onPageChange={(data) =>
                    handlePageClick(data, moviesByGenre[index]?.genre, index)
                  }
                  containerClassName="flex items-center  gap-2 mt-1 align-center justify-center"
                  pageClassName="page-item"
                  pageLinkClassName="page-link px-3 py-1 rounded-lg bg-gray-300 text-gray-600 hover:bg-red-500 z-10"
                  activeClassName="bg-red-500 rounded-lg text-white px-1 py-[6px] pt-[7px]"
                  previousClassName="page-item"
                  previousLinkClassName="page-link px-3 py-1 rounded-lg  text-gray-600 hover:text-white z-10"
                  nextClassName="page-item"
                  nextLinkClassName="page-link px-3 py-1 rounded-lg text-gray-600 hover:text-white z-10"
                />
              )}
            </div>
          ))}
      </div>
    )
  );
}
