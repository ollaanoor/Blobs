import React from "react";
import Footer from "../components/footer";
import { NavLink } from "react-router";
import LandingNavbar from "../components/LandingNavbar";

export default function LandingPage() {
  return (
    <>
      {/* <div className="flex flex-col gap-10 justify-center items-center px-6 md:px-20 py-20">
        <div className="text-center md:w-1/2">
          <img
            src="/blobs-logo-violet3.svg"
            className="mx-auto mb-10 w-40 md:w-52"
          />
          <h1 className="text-4xl md:text-5xl font-medium hidden md:block">
            Step out of your bubble <br className="hidden md:block" />
            and share your thoughts...
          </h1>
        </div>
        <div className="flex gap-10">
          <NavLink
            to="/register"
            className=" btn btn-xl rounded-xl bg-[#8a6bf1] text-white"
          >
            Sign up
          </NavLink>
          <NavLink
            to="login"
            className="btn btn-xl rounded-xl bg-[#8a6bf1] text-white"
          >
            Log in
          </NavLink>
        </div>
      </div> */}

      <div className="min-h-screen text-gray-800">
        <LandingNavbar />

        <div className="flex flex-col gap-12 justify-center items-center px-6 md:px-20 py-20 text-center">
          <div className="md:w-2/3">
            <img
              src="/blobs-logo-color.svg"
              className="mx-auto mb-10 w-40 md:w-52"
              alt="Blobs Logo"
            />
            <h1 className="text-4xl md:text-5xl font-semibold">
              Step out of your bubble <br /> and share your thoughts...
            </h1>
            <p className="text-lg mt-6 text-gray-500">
              Blobs is a platform where ideas grow, skills are exchanged, and
              creativity blossoms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <NavLink
              to="/register"
              className="btn btn-xl rounded-xl bg-[#8a6bf1] text-white px-8 py-3 hover:bg-[#7c5ae1] transition shadow-lg"
            >
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className="btn btn-xl rounded-xl bg-white border border-[#8a6bf1] text-[#8a6bf1] px-8 py-3 hover:bg-[#f4f0ff] transition shadow-lg"
            >
              Log in
            </NavLink>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
