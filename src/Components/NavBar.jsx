import React, { useContext, useRef } from "react";
import NavbarSearchButtonIcon from "./NavbarSearchButtonIcon";
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
  function handleSubmit(event) {
    event.preventDefault();
    setToggle(!toggle);
    form.current.value = "";
  }

  return (
    <div>
      <nav class="bg-black text-white">
        <div class="container mx-auto flex justify-between items-center py-4 md:px-10 px-2">
          <h1 class="text-red-500 font-bold md:text-3xl text-lg">
            {window.innerWidth > 800 ? "MovieMania" : "MM"}
          </h1>
          <div className="flex flex-row flex-wrap md:gap-8 gap-2 items-center">
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
            <form ref={form} class="flex items-center" onSubmit={handleSubmit}>
              <input
                onChange={(event) => setsearchTerm(event.target.value)}
                class="md:px-4 px-2 py-1 rounded-l-full md:w-full w-36 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-900 text-white"
                type="text"
                placeholder="Search..."
              />

              <button class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r-full">
                <NavbarSearchButtonIcon />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
