import React from "react";
import NavbarSearchButtonIcon from "./NavbarSearchButtonIcon";

export default function NavBar({setsearchTerm, setToggle, toggle}) {
  
  function handleSubmit(event){
      event.preventDefault()
      setToggle(!toggle)
  }

  return (
    <div>
      <nav class="bg-black text-white">
        <div class="container mx-auto flex justify-between items-center py-4 md:px-10 px-2">
          <h1 class="text-red-500 font-bold md:text-3xl text-lg">MovieMania</h1>
          <form class="flex items-center" onSubmit={handleSubmit}>
            <input
            onChange={(event)=>setsearchTerm(event.target.value)}
              class="md:px-4 px-2 py-1 rounded-l-full md:w-full w-40 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-900 text-white"
              type="text"
              placeholder="Search..."
            />
            <button class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r-full">
              <NavbarSearchButtonIcon />
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}
