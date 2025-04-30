import React from "react";
import { NavLink } from "react-router";

export default function LandingNavbar() {
  return (
    <div>
      <nav className="navbar flex justify-between items-center px-6 md:px-20 py-4 shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-[#8a6bf1] flex items-center gap-2">
          <img src="/blobs-logo-color.svg" className="h-12" alt="logo" />
        </div>

        <ul className="flex gap-6 items-center font-medium text-lg">
          <li>
            <NavLink to="/home" className="hover:text-[#8a6bf1] transition">
              Home
            </NavLink>
          </li>

          {/* <li className="relative group cursor-pointer">
            <span className="hover:text-[#8a6bf1] transition">Join Us ▾</span>
            <div className="absolute top-8 left-0 bg-white shadow-lg rounded-xl hidden group-hover:block">
              <NavLink
                to="/register"
                className="block px-4 py-2 hover:bg-[#f4f0ff] rounded-t-xl"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="block px-4 py-2 hover:bg-[#f4f0ff] rounded-b-xl"
              >
                Login
              </NavLink>
            </div>
          </li> */}

          <li>
            <NavLink to="/" className="hover:text-[#8a6bf1] transition">
              Join Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
