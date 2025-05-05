import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function EditProfileForm(props) {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const profilePicture = watch("profilePicture");

  //   const defaultForm = {
  //     username: "",
  //     email: "",
  //     image: "",
  //   };
  //   const [form, setForm] = useState(defaultForm);
  const [imageRemoved, setImageRemoved] = useState(false);
  const dialogRef = props.modalRef;

  //   const handleImageChange = (e) => {
  //     setImageRemoved(false);
  //     const file = e.target.files[0];
  //     if (file) {
  //       setForm({ ...form, image: file });
  //     }
  //   };

  const removeImage = () => {
    setImageRemoved(true);
  };

  const exitUpdate = () => {
    setImageRemoved(false);
    clearErrors();
    reset();
    // setForm(() => ({ ...defaultForm }));
    dialogRef.current?.close();
  };

  //   const handleUpdate = async (data) => {
  //     setLoading(true);
  //     const formData = new FormData();

  //     formData.append("username", data.username);
  //     formData.append("email", data.email);
  //     if (data.password) {
  //       formData.append("password", data.password);
  //       formData.append("confirmPassword", data.confirmPassword);
  //     }
  //     if (data.profilePicture?.[0]) {
  //       formData.append("profilePicture", data.profilePicture[0]);
  //     }

  //     try {
  //       const { data } = await axios.put(`${baseURL}/api/auth/update`, formData, {
  //         withCredentials: true,
  //       });

  //       setLoggedUser(data.user);
  //       navigate(`/profile/${data.user.username}`);
  //       setLoading(false);
  //       dialogRef.current?.close();
  //     } catch (error) {
  //       setError("root.serverError", {
  //         type: "500",
  //         message: "The username or email already exists.",
  //       });
  //       console.log("Could not update. Try again");
  //     }
  //   };

  const handleUpdate = async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);

    if (data.password) {
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
    }
    if (data.profilePicture?.[0]) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    try {
      await props.handleProfileUpdate(formData);

      // Navigate to the updated profile page
      navigate(`/profile/${data.username}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
      dialogRef.current?.close();
    }
  };

  useEffect(() => {
    if (loggedUser) {
      reset({
        username: loggedUser.username,
        email: loggedUser.email,
      });
    }
  }, [loggedUser]);

  return (
    <div>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-5xl rounded-2xl">
          <h3 className="font-bold text-lg flex gap-2">
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit profile
          </h3>

          <div className="flex flex-col gap-5 items-center justify-between my-2">
            <div className="flex flex-col items-center gap-3 mx-auto">
              <img
                className="rounded-full h-28 w-28 border-2 border-gray-400 object-cover"
                src={
                  imageRemoved
                    ? "https://i.ibb.co/vvssHm4Q/Unknown-person.jpg"
                    : profilePicture instanceof FileList &&
                      profilePicture.length > 0
                    ? URL.createObjectURL(profilePicture[0])
                    : loggedUser?.profilePicture
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

            <div className="flex flex-col gap-4 w-full">
              <label className="label text-lg font-bold">Username</label>
              <input
                type="text"
                name="username"
                {...register("username", {
                  required: "Username is required",
                })}
                onChange={() => clearErrors(["username", "root.serverError"])}
                className={`input input-lg input-bordered w-full text-lg rounded-xl ${
                  errors.username ? "input-error" : ""
                } `}
                placeholder="username"
              />
              {errors.username && (
                <p className="text-error text-md font-semibold">
                  {errors.username.message}
                </p>
              )}

              <label className="label text-lg font-bold">Email</label>
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
                className={`input input-lg input-bordered w-full text-lg rounded-xl ${
                  errors.email ? "input-error" : ""
                } `}
                placeholder="xyz@mail.com"
              />
              {errors.email && (
                <p className="text-error text-md font-semibold">
                  {errors.email.message}
                </p>
              )}

              <label className="label text-lg font-bold">Password</label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                onChange={() => clearErrors(["password", "root.serverError"])}
                className={`input input-lg input-bordered w-full text-lg rounded-xl ${
                  errors.password ? "input-error" : ""
                } `}
                placeholder="password"
              />
              {errors.password && (
                <p className="text-error text-md font-semibold">
                  {errors.password.message}
                </p>
              )}

              <label className="label text-lg font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                {...register("confirmPassword", {
                  validate: (value) => {
                    if (watch("password")) {
                      if (!value) return "Please confirm your password";
                      if (value !== watch("password"))
                        return "Passwords do not match";
                    }
                    return true;
                  },
                })}
                onChange={() =>
                  clearErrors(["confirmPassword", "root.serverError"])
                }
                className={`input input-lg input-bordered w-full text-lg rounded-xl ${
                  errors.confirmPassword ? "input-error" : ""
                } `}
                placeholder="confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-error text-md font-semibold">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {errors.root?.serverError && (
              <p className="text-error text-md font-semibold mt-1">
                {errors.root.serverError.message}
              </p>
            )}

            <button
              onClick={handleSubmit(handleUpdate)}
              //   className="btn text-white text-lg bg-[#8a6bf1] hover:bg-[#8a6bf1dd] rounded-2xl h-[50px] w-[100px]"
              className="btn text-white text-lg bg-[#8a6bf1] hover:bg-[#8a6bf1dd] rounded-2xl h-[50px] w-full sm:w-[100px]"
            >
              Save
              {loading && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
            </button>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  exitUpdate();
                }}
                className="btn btn-sm btn-circle btn-ghost hover:bg-[#8a6bf166] absolute right-2 top-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
