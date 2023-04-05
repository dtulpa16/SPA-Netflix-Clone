import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
/**
 * Renders a list of movies or TV shows.
 * @param {Object} props - Component props
 * @param {Array} props.movies - List of movie or TV show objects
 * @param {Array} props.favorites - List of favorite movie or TV show IDs
 * @param {Function} props.setFavoritesUpdated - Function to update favorite movie or TV show IDs
 * @param {Array} props.media - List of movie or TV show objects grouped by genre
 * @returns {JSX.Element} - Rendered MovieList component
 */
export default function MovieList({
  movies,
  favorites,
  setFavoritesUpdated,
  media = null,
  data,
}) {
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(6);
  useEffect(() => {
    console.log("MEDIA: ", media);
    if (media) {
      let moviesByGenre;
      try {
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
        let customFavsReponse = [{ genre: "favorites", movies: [] }];
        moviesByGenre = media.map((genreObj) => {
          
          customFavsReponse[0].movies.push({
            genre: "favorites",
            movie: { movie: genreObj },
          });
        });
        debugger
        moviesByGenre = customFavsReponse
      }
      // debugger;
      console.log("MOVIESBYGENRE: ", moviesByGenre);
      setMoviesByGenre(moviesByGenre);
    }
  }, [media, data]);
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const indexOfLastMovie = (currentPage + 1) * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;

  const currentMoviesByGenre =
    moviesByGenre.length > 0 && media
      ? moviesByGenre.map((genre) => {
          return {
            genre: genre.genre,
            movies: genre.movies.slice(indexOfFirstMovie, indexOfLastMovie),
          };
        })
      : null;

  return (
    currentMoviesByGenre?.length > 0 && (
      <div className="flex flex-wrap gap-10 justify-center p-10">
        {currentMoviesByGenre &&
          currentMoviesByGenre.map((movies, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold mb-4">{movies.genre}</h2>
              <div className="flex flex-wrap gap-4">
                {movies.movies.map((element, i) => {
                  return (
                    <MovieCard
                      key={element.movie.movie.id}
                      singleMovie={element.movie.movie}
                      favorites={favorites}
                      setFavoritesUpdated={setFavoritesUpdated}
                      genre={element.genre}
                    />
                  );
                })}
              </div>
            </div>
          ))}

        {currentMoviesByGenre[0].movies.length > moviesPerPage && (
          <ReactPaginate
            previousLabel={
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
            }
            nextLabel={
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
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            }
            breakLabel={"..."}
            pageCount={Math.ceil(
              currentMoviesByGenre[0].movies.length / moviesPerPage
            )}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item disabled"}
            breakLinkClassName={"page-link"}
          />
        )}
      </div>
    )
  );
}
