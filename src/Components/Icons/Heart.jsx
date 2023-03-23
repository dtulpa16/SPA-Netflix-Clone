import React from 'react';
function Heart({ filled }) {
    return (
      <svg
        className={`${
          filled ? 'text-red-500' : 'text-red-500 stroke-current'
        } absolute top-2 right-2 w-8 h-8 z-10 overflow-visible`}
        viewBox="0 0 24 24"
        fill={`${filled ? 'currentColor' : 'none'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.84 4.61c-1.18-1.03-2.65-1.55-4.17-1.55-1.54 0-3.04.54-4.18 1.58l-1.49 1.32-1.49-1.32c-2.31-1.97-5.99-1.97-8.3 0s-2.34 5.15-.02 7.16l9.18 7.77 9.18-7.77c1.16-.98 1.85-2.37 1.87-3.93.02-1.56-.68-3.01-1.87-4z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }
  
  export default Heart;