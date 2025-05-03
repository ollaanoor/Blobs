import axios from "axios";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import EditPostForm from "./EditPostForm";
import { NavLink } from "react-router";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Posts(props) {
  const { loggedUser } = useUser();
  
  if (!props.post) return null;
  
  let date = new Date(props.post.createdAt);
  let createdAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const [user, setUser] = useState({});
  const modalRef = useRef();
  // const getUserbyId = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:3000/api/users/${props.post.user}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(data);
  //   } catch (error) {
  //     console.log("Could not find user.");
  //   }
  // };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/users/${props.post.user}`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="card bg-base-100 w-full md:w-[70%] h-fit max-h-[800px] shadow-sm mx-auto my-3 md:my-5 md:rounded-4xl">
        <div className="card-body w-full">
          {loggedUser && loggedUser._id == props.post.user && (
            <div className="dropdown dropdown-end absolute top-4 right-5 hover:bg-[#8a6bf150] transition p-1 rounded-full">
              <label tabIndex={0} className="" role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#8a6bf1"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="#8a6bf1"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu menu-lg p-2 absolute top-10 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a
                    onClick={() =>
                      modalRef.current?.showModal()
                    }
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit post
                  </a>
                </li>
                <li>
                  <a onClick={() => props.deletePost(props.post._id)}>
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Delete post
                  </a>
                </li>
              </ul>
            </div>
          )}

          <div className="flex justify-between items-center gap-3 mt-5">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={user.profilePicture} />
              </div>
              <h2 className="card-title text-xl font-bold mx-3">
                <NavLink
                  to={`/profile/${user.username}`}
                  // state={{ userId: user._id }}
                >
                  {user.username}
                </NavLink>
              </h2>
            </div>
            <div className="justify-end ml-6">
              <span className="text-gray-400 font-medium">{createdAt}</span>
              {props.post.createdAt != props.post.updatedAt && (
                <div className="text-gray-400 font-medium flex gap-1 justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Edited</span>
                </div>
              )}
            </div>
          </div>
          {props.post.title && (
            <p className="text-lg font-semibold mt-3 ml-2 truncate max-w-[95%]">
              {props.post.title}
            </p>
          )}
          <p className="text-lg font-normal mt-3 ml-2 truncate-3-lines max-w-[95%]">
            {props.post.content}
          </p>
        </div>
        {props.post.image && (
          <div className="">
            <img
              className="w-full max-h-[400px] object-cover rounded-4xl p-3"
              src={props.post.image}
              alt="img"
            />
          </div>
        )}

        {/* <div className="flex gap-5 ml-8 my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#8a6bf1dd"
            className="size-6 hover:scale-[1.15] transition"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#8a6bf1dd"
            className="size-6 hover:scale-[1.15] transition"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
        </div> */}
      </div>

      <EditPostForm
        modalRef={modalRef}
        post={props.post}
        updatePost={props.updatePost}
      ></EditPostForm>
    </>
  );
}
