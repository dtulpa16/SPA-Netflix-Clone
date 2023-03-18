import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import MoviePage from "./Pages/MoviePage";
import { TypeContext } from "./Components/TypeContext";
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
      <div className="bg-[#141414] h-full text-white">
        <NavBar
          setsearchTerm={setsearchTerm}
          setToggle={setToggle}
          toggle={toggle}
        />
        <MoviePage searchTerm={searchTerm} toggle={toggle} />
      </div>
    </TypeContext.Provider>
  );
}

export default App;
