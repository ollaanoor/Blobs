import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import Footer from "../components/footer";
import Header from "../components/header";
import { useUser } from "../contexts/UserContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function RegisterPage() {
  const { loggedUser } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const profilePicture = watch("profilePicture");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    if (data.profilePicture?.[0]) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    try {
      await axios.post(`${baseURL}/api/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Redirect user to login
      navigate("/login");
    } catch (error) {
      setError("root.serverError", {
        type: "500",
        message: "The username or email already exists.",
      });
      console.log("Could not register. Try again");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loggedUser) {
      navigate("/", { replace: true });
    }
  }, [loggedUser]);

  return (
    <div>
      <Header className="fixed" />
      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-16 gap-12">
        <div className="text-center md:w-1/2 hidden md:block">
          <img
            src="/blobs-logo-color.svg"
            className="mx-auto mb-6 w-32 md:w-44"
          />
          <h1 className="text-3xl md:text-5xl font-medium hidden md:block">
            Step out of your bubble <br className="hidden md:block" />
            and share your thoughts...
          </h1>
        </div>

        <div className="w-full md:w-[40%]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="bg-[#8a6bf115] rounded-2xl p-6 sm:p-10 flex flex-col gap-5 shadow-md"
          >
            <h2 className="text-lg sm:text-4xl font-bold text-[#8a6bf1] text-center md:text-left">
              Create an account
            </h2>

            <div className="flex flex-col items-center gap-3">
              <img
                className="rounded-full h-28 w-28 border-2 border-gray-400 object-cover"
                src={
                  profilePicture?.[0]
                    ? URL.createObjectURL(profilePicture[0])
                    : "https://i.ibb.co/vvssHm4Q/Unknown-person.jpg"
                }
                alt="Profile Preview"
              />
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                {...register("profilePicture")}
                className="file-input file-input-sm rounded-lg w-23"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="label text-md font-bold">Username</label>
              <input
                type="text"
                name="username"
                {...register("username", { required: "Username is required" })}
                onChange={() => clearErrors(["username", "root.serverError"])}
                className={`input input-lg input-bordered w-full text-md rounded-xl ${
                  errors.username ? "input-error" : ""
                } `}
                placeholder="username"
              />
              {errors.username && (
                <p className="text-error text-sm font-semibold">
                  {errors.username.message}
                </p>
              )}

              <label className="label text-md font-bold">Email</label>
              <input
                type="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                onChange={() => clearErrors(["email", "root.serverError"])}
                className={`input input-lg input-bordered w-full text-md rounded-xl ${
                  errors.email ? "input-error" : ""
                } `}
                placeholder="xyz@mail.com"
              />
              {errors.email && (
                <p className="text-error text-sm font-semibold">
                  {errors.email.message}
                </p>
              )}

              <label className="label text-md font-bold">Password</label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                onChange={() => clearErrors(["password", "root.serverError"])}
                className={`input input-lg input-bordered w-full text-md rounded-xl ${
                  errors.password ? "input-error" : ""
                } `}
                placeholder="password"
              />
              {errors.password && (
                <p className="text-error text-sm font-semibold">
                  {errors.password.message}
                </p>
              )}

              <label className="label text-md font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                onChange={() =>
                  clearErrors(["confirmPassword", "root.serverError"])
                }
                className={`input input-lg input-bordered w-full text-md rounded-xl ${
                  errors.confirmPassword ? "input-error" : ""
                } `}
                placeholder="confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-error text-sm font-semibold">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {errors.root?.serverError && (
              <p className="text-error text-sm font-semibold mt-1">
                {errors.root.serverError.message}
              </p>
            )}
            <button
              type="submit"
              className="btn rounded-3xl text-white bg-[#8a6bf1] btn-lg mt-4 hover:shadow-lg transition"
            >
              Sign up
              {loading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>

            <div className="text-center md:text-left mt-2">
              <span className="text-md text-gray-400 font-bold mr-2">
                Already have an account?
              </span>
              <NavLink
                to="/login"
                className="text-md text-[#8a6bf1] font-medium hover:underline"
              >
                Log in
              </NavLink>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
