import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { useUser } from "../contexts/UserContext";
import { usePostAPI } from "../contexts/PostContext";

import Header from "../components/header";
import CreatePost from "../components/CreatePost";
import Posts from "../components/posts";
import EditProfileForm from "../components/EditProfileForm";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function ProfilePage() {
  const navigate = useNavigate();
  const modalRef = useRef();

  // Contexts
  const { loggedUser } = useUser();
  const { createPost, deletePost, updatePost } = usePostAPI();

  // States
  const [userProfile, setUserProfile] = useState();
  const [userPosts, setUserPosts] = useState([]);

  // Infinite Scroll States
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const lastPost = userPosts[userPosts.length - 1];
  const cursor = lastPost?.createdAt;
  const query = { limit: 10 };
  if (cursor) query.cursor = cursor;

  const params = useParams();

  // Check if the profile page is showing the logged in user's profile
  const isAuthUser = params.username === loggedUser?.username;

  const fetchUserProfile = async () => {
    if (!isAuthUser) {
      try {
        const { data } = await axios.get(
          `${baseURL}/api/users/name/${params.username}`,
          {
            withCredentials: true,
          }
        );
        setUserProfile(data);
        return data;
      } catch (err) {
        console.log("User not found.");
        return;
      }
    } else {
      setUserProfile(loggedUser);
      return loggedUser;
    }
  };

  const fetchUserPosts = async (userId) => {
    try {
      const { data } = await axios.get(`${baseURL}/api/posts/${userId}`, {
        params: query,
        withCredentials: true,
      });
      // setUserPosts(data.reverse());
      setUserPosts((prev) => [...prev, ...data.posts]);
      // setUserPosts([ ...userPosts, ...data.posts ]);
      if (page === 1) setTotalPosts(() => data.total);
    } catch (err) {
      console.log("No posts found.");
    }
  };

  useEffect(() => {
    const init = async () => {
      const user = await fetchUserProfile();
      if (user) {
        await fetchUserPosts(user._id);
      } else {
        navigate("/error");
      }
    };

    init();

    // if (isAuthUser && params.username !== loggedUser?.username) {
    //   navigate(`/profile/${loggedUser.username}`);
    // }
  }, [page, loggedUser]);

  const handleCreatePost = async (content, image) => {
    try {
      const newPost = await createPost(content, image);
      setUserPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      console.log("Error creating post", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      const newPosts = userPosts.filter((post) => post._id != postId);
      setUserPosts(newPosts);
    } catch (error) {
      console.log("Error deleting post", error);
    }
  };

  const handleUpdatePost = async (content, image, postId, imageRemoved) => {
    try {
      const updatedPost = await updatePost(
        content,
        image,
        postId,
        imageRemoved
      );
      const updatedPosts = userPosts.map((p) =>
        p._id === updatedPost._id ? updatedPost : p
      );
      setUserPosts(updatedPosts);
    } catch (error) {
      console.log("Error updating post", error);
    }
  };

  return (
    <div>
      <Header />
      {userProfile && (
        <div className="flex items-center gap-3 mx-auto w-[70%]">
          <div className="avatar">
            <div className="w-25 rounded-full">
              <img src={userProfile.profilePicture} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="card-title text-3xl">{userProfile.username}</h2>
            {isAuthUser && (
              <div
                className="flex gap-2 bg-[#8a6bf138] btn rounded-xl"
                onClick={() => modalRef.current?.showModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#8a6bf1"
                  className="size-4"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>

                <span className="text-[#8a6bf1] text-sm font-semibold">
                  Edit Profile
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      {isAuthUser && (
        <div className="card bg-base-100 w-[70%] h-fit shadow-sm mx-auto my-5 rounded-4xl">
          <div className="card-body">
            <CreatePost loggedUser={loggedUser} createPost={handleCreatePost} />
          </div>
        </div>
      )}
      <div className="divider w-[70%] mx-auto text-gray-400 font-bold">
        {params.username + "'s posts"}
      </div>

      <InfiniteScroll
        dataLength={userPosts.length}
        next={() => {
          // console.log("Fetching more posts...");
          setPage((prev) => prev + 1);
        }}
        hasMore={userPosts.length < totalPosts}
        loader={
          <h4 className="text-center my-5 text-[#8a6bf1] bg-[#8a6bf144] w-fit mx-auto p-2 rounded-xl font-bold">
            Loading more...
          </h4>
        }
        endMessage={
          <p className="my-5 text-[#8a6bf1] bg-[#8a6bf144] w-fit mx-auto p-2 rounded-xl font-bold">
            No posts to show
          </p>
        }
      >
        {userPosts.map((post) => (
          <Posts
            key={post._id}
            post={post}
            deletePost={handleDeletePost}
            updatePost={handleUpdatePost}
          />
        ))}
      </InfiniteScroll>

      <EditProfileForm modalRef={modalRef}></EditProfileForm>
    </div>
  );
}
