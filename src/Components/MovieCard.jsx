import React from 'react'

export default function MovieCard({singleMovie}) {
  return (
    <div>
      <img src={singleMovie?.image?.url} width="200" height="150"/>
      <h3 className="text-left max-w-[200px] max-h-[20px] overflow-hidden">{singleMovie.title}</h3> 
    </div>
  )
}
