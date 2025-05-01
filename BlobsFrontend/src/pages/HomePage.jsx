import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { useUser } from "../contexts/UserContext";
import { usePostAPI } from "../contexts/PostContext";

import Header from "../components/header";
import Posts from "../components/posts";
import CreatePost from "../components/CreatePost";
import { Link } from "react-router";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function HomePage() {
  const { loggedUser } = useUser();
  const { createPost, deletePost, updatePost } = usePostAPI();

  const [posts, setPosts] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const lastPost = posts[posts.length - 1];
  const cursor = lastPost?.createdAt;
  const query = { limit: 10 };
  if (cursor) query.cursor = cursor;

  useEffect(() => {
    axios
      .get(`${baseURL}/api/posts`, {
        params: query,
        withCredentials: true,
      })
      .then((res) => {
        // setPosts(res.data.reverse());
        setPosts((prev) => [...prev, ...res.data.posts]);
        // setPosts([ ...posts, ...res.data.posts ]);
        if (page === 1) setTotalPosts(() => res.data.total);
      })
      .catch((err) => console.error(err));
  }, [page]);

  const handleCreatePost = async (title, content, image) => {
    try {
      const newPost = await createPost(title, content, image);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      console.log("Error creating post", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      const newPosts = posts.filter((post) => post._id != postId);
      setPosts(newPosts);
    } catch (error) {
      console.log("Error deleting post", error);
    }
  };

  const handleUpdatePost = async (
    title,
    content,
    image,
    postId,
    imageRemoved
  ) => {
    try {
      const updatedPost = await updatePost(
        title,
        content,
        image,
        postId,
        imageRemoved
      );
      const updatedPosts = posts.map((p) =>
        p._id === updatedPost._id ? updatedPost : p
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error updating post", error);
    }
  };

  return (
    <>
      <Header />
      <div className="">
        {loggedUser && (
          <div className="card bg-base-100 w-full md:w-[70%] h-fit shadow-sm mx-auto my-5 md:*:rounded-4xl">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-12 rounded-full ml-2">
                    <img src={loggedUser.profilePicture} />
                  </div>
                </div>
                <h2 className="card-title text-xl">{loggedUser.username}</h2>
              </div>
              <CreatePost createPost={handleCreatePost} />
            </div>
          </div>
        )}

        <div className="divider w-full md:w-[70%] mx-auto text-gray-400 font-bold">
          Blobs
        </div>

        {/* {posts.map((post) => (
        <Posts
          loggedUser={loggedUser}
          key={post._id}
          post={post}
          deletePost={handleDeletePost}
          updatePost={handleUpdatePost}
        />
      ))} */}

        <InfiniteScroll
          dataLength={posts.length}
          next={() => {
            // console.log("Fetching more posts...");
            setPage((prev) => prev + 1);
          }}
          hasMore={posts.length < totalPosts}
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
          {posts.map((post) => (
            <Posts
              key={post._id}
              post={post}
              deletePost={handleDeletePost}
              updatePost={handleUpdatePost}
            />
          ))}
        </InfiniteScroll>
        {!loggedUser && (
          <div className="btn btn-circle w-15 h-15 bg-[#8a6bf1] hover:bg-[#8a6bf1dd] fixed right-10 bottom-10">
            <Link to="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="white"
                className="size-8"
              >
                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
