import axios from "axios";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Header() {
  const { loggedUser, setLoggedUser } = useUser();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        `${baseURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      setLoggedUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-md mb-10">
        <div className="flex-1 ml-10">
          <Link to="/" className="cursor-pointer text-3xl pacifico-regular">
            <img className="h-12" src="/blobs-logo-color.svg" />
          </Link>
        </div>

        <div className="flex gap-6 items-center font-medium text-lg mr-10">
          <div>
            <NavLink to="/" className="hover:text-[#8a6bf1] transition">
              Home
            </NavLink>
          </div>

          {!loggedUser && (
            <div>
              <NavLink to="/joinUs" className="hover:text-[#8a6bf1] transition">
                Join Us
              </NavLink>
            </div>
          )}

          {loggedUser && (
            <div className="flex-none mr-5">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="profile picture"
                      src={loggedUser.profilePicture}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink
                      to={`/profile/${loggedUser.username}`}
                      // state={{ userId: props.loggedUser._id }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#8a6bf1"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                      Profile
                    </NavLink>
                  </li>

                  <li>
                    <a onClick={logout}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#8a6bf1"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        />
                      </svg>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
