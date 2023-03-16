import React from 'react'
import NavbarSearchButtonIcon from './NavbarSearchButtonIcon'

export default function NavBar() {
  return (
    <div><nav class="bg-black text-white">
    <div class="container mx-auto flex justify-between items-center py-4">
      <h1 class="text-red-500 font-bold text-xl">CineSpot</h1>
      <form class="flex items-center">
        <input class="px-4 py-1 rounded-l-full w-full focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-900 text-white" type="text" placeholder="Search..."/>
        <button class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r-full">
        <NavbarSearchButtonIcon/>
        </button>
      </form>
    </div>
  </nav></div>
  )
}
