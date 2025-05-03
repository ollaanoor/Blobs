import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreatePost(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
    }
  };

  const removeImage = () => {
    setForm({ ...form, image: "" });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const cancelCreatePost = () => {
    clearErrors();
    reset({ title: form.title, content: form.content });
    setForm({
      title: "",
      content: "",
      image: "",
    });
  };

  const handleCreate = async () => {
    setLoading(true);
    await props.createPost(form.title, form.content, form.image);
    setLoading(false);
    setForm({
      title: "",
      content: "",
      image: "",
    });
  };

  return (
    <>
      <textarea
        rows="1"
        maxLength="50"
        name="title"
        {...register("title", {
          maxLength: {
            value: 50,
            message: "Max title length reached.",
          },
        })}
        value={form.title}
        onChange={handleChange}
        className="rounded-lg p-3 w-full outline-white textarea-lg md:textarea-xl font-semibold mt-3 resize-none"
        placeholder="Add a title"
      ></textarea>
      {errors.title && (
        <p className="text-error text-md font-semibold mt-1">
          {errors.title.message}
        </p>
      )}
      <textarea
        rows="3"
        maxLength="800"
        name="content"
        {...register("content", {
          required: "Content is required.",
          maxLength: {
            value: 800,
            message: "Max content length reached.",
          },
        })}
        value={form.content}
        onChange={handleChange}
        className="textarea textarea-ghost outline-white w-full textarea-lg md:textarea-xl mt-3 resize-none"
        placeholder="Drop your thoughts..."
      ></textarea>
      {errors.content && (
        <p className="text-error text-md font-semibold mt-1">
          {errors.content.message}
        </p>
      )}

      {form.image && (
        <div className="relative">
          <img
            className="ml-4 rounded-2xl h-20 w-35"
            src={URL.createObjectURL(form.image)}
          />
          <button
            onClick={removeImage}
            className="btn btn-sm btn-circle absolute left-30 top-1"
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
        </div>
      )}
      <div className="divider"></div>
      <div className="flex items-center justify-between">
        <label className="flex gap-2 items-center cursor-pointer px-4 py-2 rounded-xl hover:scale-[1.05] transition bg-[#8a6bf138]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#8a6bf1"
            className="size-6 md:size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span className="text-[#8a6bf1] font-medium hidden md:block">
            Add Image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        <div className="flex gap-1 md:gap-5">
          {(form.title || form.content || form.image) && (
            <button
              onClick={cancelCreatePost}
              className="btn text-[#8a6bf1] text-md md:text-lg bg-white hover:bg-[#8a6bf138] rounded-2xl h-[40px] md:h-[50px] w-[90px] md:w-[100px]"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSubmit(handleCreate)}
            className="btn text-white text-md md:text-lg bg-[#8a6bf1] hover:bg-[#8a6bf1dd] rounded-2xl h-[40px] md:h-[50px] w-[90px] md:w-[100px]"
          >
            Post
            {loading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
