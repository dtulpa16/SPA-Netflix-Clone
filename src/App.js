import { useState,useEffect } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import MoviePage from "./Pages/MoviePage";
import { TypeContext } from "./Components/TypeContext";
import Login from "./Components/Authentication/Login";
import { auth } from './firebaseConfig';
import Register from "./Components/Authentication/Register";
/**
 * The main component of the application that renders the navbar and movie page.
 * @component
 */
function App() {
  const [searchTerm, setsearchTerm] = useState();
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("movie");
  const [user, setUser] = useState(null);

  const contextValue = {
    active,
    setActive,
    user
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <TypeContext.Provider value={contextValue}>
      <div className="bg-[#141414] h-full min-h-screen text-white">
        {/* <Login />
        <Register/> */}
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
