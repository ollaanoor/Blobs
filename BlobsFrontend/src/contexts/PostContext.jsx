import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const PostContext = createContext();

export const PostProvider = ({ children }) => {

  // API Calls
  const createPost = async (title, content, image) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const { data: post } = await axios.post(
        `${baseURL}/api/posts`,
        formData,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          withCredentials: true,
        }
      );
      //   setPosts((prevPosts) => [post, ...prevPosts]);
      //   setPosts([post, ...posts]);
      // console.log("API Response:", post);
      return post;
    } catch (error) {
      console.log("Could not post. Try again");
    }
  };

  const deletePost = async (postId) => {
    try {
      const { data } = await axios.delete(
        `${baseURL}/api/posts/${postId}`,
        {
          withCredentials: true,
        }
      );
      //   const newPosts = posts.filter((post) => post._id != postId);
      //   setPosts(newPosts);
      return true;
    } catch (error) {
      console.log("Could not delete post. Try again");
    }
  };

  const updatePost = async (title, content, image, id, imageRemoved) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (image && image instanceof File) {
      formData.append("image", image);
    }

    if (imageRemoved) {
      formData.append("imageRemoved", true);
    }

    try {
      const { data: post } = await axios.put(
        `${baseURL}/api/posts/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      //   const updatedPosts = posts.map((p) => (p._id === post._id ? post : p));
      //   setPosts(updatedPosts);

      return post;
    } catch (error) {
      console.log("Could not post. Try again");
    }
  };

  return (
    <PostContext.Provider
      value={{
        createPost,
        deletePost,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostAPI = () => useContext(PostContext);
