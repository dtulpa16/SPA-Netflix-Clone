import React from "react";

export default function LoadingSpinner() {
  return (
    <div class="flex justify-center items-center h-screen">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}
