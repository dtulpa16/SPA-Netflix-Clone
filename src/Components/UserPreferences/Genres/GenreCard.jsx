import React from "react";

export default function GenreCard({ genre }) {
  return (
    <div className=" bg-zinc-300 rounded-md">
      <h1 className="text-black text-lg">
        {genre.replace("-", " ")}
      </h1>
    </div>
  );
}
