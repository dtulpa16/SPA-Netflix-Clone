import React, { useContext, useRef, useState, useEffect } from "react";

import { auth, provider } from "../../firebaseConfig";
import { SearchBar, UserAvatar, DropdownMenu } from "./NavBarComponents";
import { TypeContext } from "../TypeContext";
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
      toggleDropdown();
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
      toggleDropdown();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
            <SearchBar
              setsearchTerm={setsearchTerm}
              toggle={toggle}
              setToggle={setToggle}
              form={form}
            />
            <div className="relative">
              <UserAvatar user={user} toggleDropdown={toggleDropdown} />
              {dropdownOpen && (
                <DropdownMenu
                  user={user}
                  signInWithGoogle={signInWithGoogle}
                  signUpWithGoogle={signUpWithGoogle}
                  toggleDropdown={toggleDropdown}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
