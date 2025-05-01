import React, { useEffect } from "react";
import Footer from "../components/footer";
import { NavLink, useNavigate } from "react-router";
import Header from "../components/header";
import { useUser } from "../contexts/UserContext";

export default function LandingPage() {
  const { loggedUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      navigate("/", { replace: true });
    }
  }, [loggedUser]);

  return (
    <>
      <div className="min-h-screen text-gray-800">
        <Header />

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
