import React, { useContext, useRef, useState } from "react";

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
  const { active, setActive, user } = useContext(TypeContext);
  const form = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  /**
   * Handles user sign up with Google authentication.
   */
  const signUpWithGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
      toggleDropdown();
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * Handles user sign in with Google authentication.
   */
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
      toggleDropdown();
    } catch (error) {
      console.error(error);
    }
  };
 /**
   * Toggles the state of the dropdown menu.
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <nav className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-center py-4 md:px-10 px-2">
          <h1 onClick={() => setActive("movie")} className="text-red-500 font-bold md:text-3xl text-lg cursor-pointer">
            {window.innerWidth > 800 ? "MovieMania" : "MM"}
          </h1>
          <div className="flex flex-row flex-wrap md:gap-8 gap-3 items-center">

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
