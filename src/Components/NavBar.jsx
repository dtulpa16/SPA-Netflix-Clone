import React from 'react'

export default function NavBar() {
  return (
    <div><nav class="bg-black text-white">
    <div class="container mx-auto flex justify-between items-center py-4">
      <h1 class="text-red-500 font-bold text-xl">CineSpot</h1>
      <form class="flex items-center">
        <input class="px-4 py-1 rounded-l-full w-full focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-900 text-white" type="text" placeholder="Search..."/>
        <button class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r-full">
          <svg class="w-5 h-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.707 13.293l3.997 3.998a1 1 0 0 1-1.414 1.414l-3.998-3.997a8.5 8.5 0 1 1 1.414-1.414zM9.5 15A5.5 5.5 0 1 0 9.5 4a5.5 5.5 0 0 0 0 11z"/></svg>
        </button>
      </form>
    </div>
  </nav></div>
  )
}
