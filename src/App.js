import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import MoviePage from "./Pages/MoviePage";
import { TypeContext } from "./Components/TypeContext";
import Login from "./Components/Authentication/Login";
/**
 * The main component of the application that renders the navbar and movie page.
 * @component
 */
function App() {
  const [searchTerm, setsearchTerm] = useState();
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("movie");

  const contextValue = {
    active,
    setActive,
  };

  return (
    <TypeContext.Provider value={contextValue}>
      <div className="bg-[#141414] h-full min-h-screen text-white">
        <Login />
        {/* <NavBar
          setsearchTerm={setsearchTerm}
          setToggle={setToggle}
          toggle={toggle}
        />
        <MoviePage searchTerm={searchTerm} toggle={toggle} /> */}
      </div>
    </TypeContext.Provider>
  );
}

export default App;
