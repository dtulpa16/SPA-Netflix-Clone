import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import MoviePage from "./Pages/MoviePage";
import { TypeContext } from "./Components/TypeContext";
import Login from "./Components/Authentication/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Components/Authentication/Register";
import useAuth from "./Hooks/useAuth";
import useFetchFavorites from "./Hooks/useFetchFavorites";
import UserGenres from "./Components/UserPreferences/Genres/UserGenres";

/**
 * The main component of the application that renders the navbar and movie page.
 * @component
 */
function App() {
  const [searchTerm, setsearchTerm] = useState();
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("movie");
  const { favorites, setFavoritesUpdated } = useFetchFavorites();
  const { user } = useAuth();
  const [authDisplay, setAuthDisplay] = useState(null);

  const contextValue = {
    active,
    setActive,
    setAuthDisplay,
    user,
    favorites,
    setFavoritesUpdated,
  };

  return (
    <TypeContext.Provider value={contextValue}>
      <div className="bg-[#141414] h-full min-h-screen text-white">
        {authDisplay === "login" && <Login />}
        {authDisplay === "reg" && <Register />}
        <NavBar
          setsearchTerm={setsearchTerm}
          setToggle={setToggle}
          toggle={toggle}
        />

        {authDisplay === "genreSelect" && <UserGenres />}
        <MoviePage
          searchTerm={searchTerm}
          toggle={toggle}
          favorites={favorites}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </TypeContext.Provider>
  );
}

export default App;
