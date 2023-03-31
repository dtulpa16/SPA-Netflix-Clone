import React,{useState} from "react";
import GenresMapper from "./GenresMapper";

export default function UserGenres() {
  const [preferredGenres, setPreferredGenres] = useState([]);
  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black opacity-50 z-10`}
      ></div>
      <div className="flex items-center h-screen fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="p-10 bg-white rounded shadow-md z-20">
          <h1 className="mb-4 text-3xl font-bold text-black">
            Select your favorite genres
          </h1>
          <GenresMapper/>
        </div>
      </div>
    </div>
  );
}
