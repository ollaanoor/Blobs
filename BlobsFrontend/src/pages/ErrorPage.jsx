import React from "react";
import { NavLink } from "react-router";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-manrope text-center">
      <img
        src="/error.png"
        alt="Blobs Logo"
        className="w-40 mb-6 animate-none md:animate-bounce"
      />
      <h1 className="text-5xl font-bold text-[#8a6bf1] mb-4">Oopsie!</h1>
      <p className="text-2xl font-semibold mb-4">Page not found.</p>
      <p className="text-lg mb-6">You got lost in the blob.</p>
      <NavLink
        to="/"
        className="bg-[#8a6bf1] btn btn-xl text-lg text-white px-6 py-3 rounded-2xl hover:bg-[#8a6bf1dd] transition shadow-lg"
      >
        Take me home
      </NavLink>
    </div>
  );
}
