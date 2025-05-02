import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import Footer from "../components/footer";
import Header from "../components/header";
import { useUser } from "../contexts/UserContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const { loggedUser, setLoggedUser } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const login = async (form) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/api/auth/login`,
        {
          ...form,
        },
        {
          withCredentials: include,
        }
      );

      setLoggedUser(data.user);
      // Redirect user to home page
      // navigate("/");
    } catch (error) {
      setError("root.serverError", {
        type: "400",
        message: "Incorrect username or password.",
      });
      console.log("Could not login. Try again");
    }
  };

  useEffect(() => {
    if (loggedUser) {
      navigate("/", { replace: true });
    }
  }, [loggedUser]);

  return (
    <>
      {/* <div className="h-screen bg-cover bg-center bg-no-repeat bg-[url(/public/bg.png)]"> */}
      <Header />
      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-20 gap-12">
        <div className="text-center md:w-1/2">
          <img
            src="/blobs-logo-color.svg"
            className="mx-auto mb-5 w-40 md:w-52"
          />
          <h1 className="text-4xl md:text-5xl font-medium hidden md:block">
            Step out of your bubble <br className="hidden md:block" />
            and share your thoughts...
          </h1>
        </div>

        <div className="w-full md:w-1/3">
          <fieldset className="bg-[#8a6bf115] rounded-2xl p-6 sm:p-10 flex flex-col gap-5 shadow-md">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#8a6bf1] mb-4 text-center md:text-left">
              Login
            </h2>

            <label className="label text-lg font-semibold">Username</label>
            <input
              type="text"
              name="username"
              {...register("username", {
                required: "Username is required.",
              })}
              onChange={() => clearErrors(["username", "root.serverError"])}
              className={`input input-lg input-bordered w-full text-lg rounded-xl ${
                errors.username ? "input-error" : ""
              } `}
              placeholder="username"
              required
            />
            {errors.username && (
              <p className="text-error text-sm font-semibold mt-1">
                {errors.username.message}
              </p>
            )}

            <label className="label text-lg font-semibold mt-2">Password</label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: "Password is required.",
              })}
              onChange={() => clearErrors(["password", "root.serverError"])}
              className={`input input-lg input-bordered w-full text-lg rounded-xl ${
                errors.password ? "input-error" : ""
              } `}
              placeholder="password"
              required
            />
            {errors.password && (
              <p className="text-error text-sm font-semibold mt-1">
                {errors.password.message}
              </p>
            )}

            {errors.root?.serverError && (
              <p className="text-error text-sm font-semibold mt-1">
                {errors.root.serverError.message}
              </p>
            )}
            <button
              onClick={handleSubmit(login)}
              className="btn rounded-3xl text-white bg-[#8a6bf1] btn-lg mt-4 hover:shadow-lg"
            >
              Login
            </button>

            <div className="text-center md:text-left">
              <span className="text-lg text-gray-400 font-bold mr-2">
                Don't have an account?
              </span>
              <NavLink
                to="/register"
                className="text-lg text-[#8a6bf1] font-medium hover:underline"
              >
                Sign up
              </NavLink>
            </div>
          </fieldset>
        </div>
      </div>

      <Footer />
      {/* </div> */}
    </>
  );
}
