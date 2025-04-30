import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import Header from "../components/header";
import Posts from "../components/posts";
import CreatePost from "../components/CreatePost";
import { usePostAPI } from "../contexts/PostContext";

export default function HomePage() {
  const { loggedUser } = useUser();
  const { createPost, deletePost, updatePost } = usePostAPI();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts", {
        withCredentials: true,
      })
      .then((res) => setPosts(res.data.reverse()))
      .catch((err) => console.error(err));
  }, []);

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

  console.log(posts);

  return (
    <>
      <Header loggedUser={loggedUser} />

      {loggedUser && (
        <div className="card bg-base-100 w-[70%] h-fit shadow-sm mx-auto my-5 rounded-4xl">
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

      <div className="divider w-[70%] mx-auto text-gray-400 font-bold">
        Blobs
      </div>

      {posts.map((post) => (
        <Posts
          loggedUser={loggedUser}
          key={post._id}
          post={post}
          deletePost={handleDeletePost}
          updatePost={handleUpdatePost}
        />
      ))}
    </>
  );
}
