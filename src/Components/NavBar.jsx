import React, { useContext, useRef, useState, useEffect } from "react";
import NavbarSearchButtonIcon from "./NavbarSearchButtonIcon";
import { auth, provider } from "../firebaseConfig";
import { TypeContext } from "./TypeContext";
/**
 * A functional component that renders the application navbar.
 * @component
 * @param {function} setsearchTerm - A function to handle search input changes.
 * @param {function} setToggle - A function to cause the useEffect in Movie Page to re-run and fetch media based off of search term.
 */
export default function NavBar({ setsearchTerm, setToggle, toggle }) {
  const { active, setActive } = useContext(TypeContext);
  const form = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const signUpWithGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
      toggleDropdown()
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setToggle(!toggle);
    form.current.value = "";
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
      toggleDropdown()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <nav className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-center py-4 md:px-10 px-2">
          <h1 className="text-red-500 font-bold md:text-3xl text-lg">
            {window.innerWidth > 800 ? "MovieMania" : "MM"}
          </h1>
          <div className="flex flex-row flex-wrap md:gap-8 gap-3 items-center">
            <h1
              onClick={() => setActive("movie")}
              className={`${
                active === "movie"
                  ? "text-red-500 underline underline-offset-4 duration-100"
                  : "text-white "
              } font-bold md:text-lg text-xs cursor-pointer hover:text-red-500 relative duration-100`}
            >
              Movies
            </h1>
            <h1
              onClick={() => setActive("tv")}
              className={`${
                active === "tv"
                  ? "text-red-500 underline underline-offset-4 duration-100"
                  : "text-white "
              } font-bold md:text-lg text-xs cursor-pointer hover:text-red-500 relative duration-100`}
            >
              TV Shows
            </h1>
            <form
              ref={form}
              className="flex items-center"
              onSubmit={handleSubmit}
            >
              <input
                onChange={(event) => setsearchTerm(event.target.value)}
                className="md:px-4 px-2 py-1 rounded-l-full md:w-full w-36 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-900 text-white"
                type="text"
                placeholder="Search..."
              />

              <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r-full">
                <NavbarSearchButtonIcon />
              </button>
            </form>
            <div className="relative">
              <img
                onClick={toggleDropdown}
                src={
                  user?.photoURL ||
                  "https://via.placeholder.com/40/000000/FFFFFF/?text=MM"
                }
                alt="User"
                className="h-10 w-10 object-cover rounded-full cursor-pointer"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                  {!user ? (
                    <>
                      <button
                        onClick={() => signInWithGoogle()}
                        className="w-full py-2 px-4 hover:bg-gray-200 text-left"
                      >
                        Sign in with Google
                      </button>
                      <button
                        onClick={() => signUpWithGoogle()}
                        className="w-full py-2 px-4 hover:bg-gray-200 text-left"
                      >
                        Sign up with Google
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        auth.signOut();
                        toggleDropdown();
                      }}
                      className="w-full py-2 px-4 hover:bg-gray-200 text-left"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
