import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function EditPostForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const defaultForm = {
    title: props.post.title,
    content: props.post.content,
    image: props.post.image,
  };
  const [form, setForm] = useState(defaultForm);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [loading, setLoading] = useState(false);

  const dialogRef = props.modalRef;

  const handleImageChange = (e) => {
    setImageRemoved(false);
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
    }
  };

  const removeImage = () => {
    setImageRemoved(true);
    setForm(() => ({ ...form, image: "" }));
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const exitUpdate = () => {
    setImageRemoved(false);
    clearErrors();
    reset({ title: props.post.title, content: props.post.content });
    setForm(() => ({ ...defaultForm }));
    dialogRef.current?.close();
  };

  const handleUpdate = async () => {
    setLoading(true);
    await props.updatePost(
      form.title,
      form.content,
      form.image,
      props.post._id,
      imageRemoved
    );
    setLoading(false);
    dialogRef.current?.close();
  };

  return (
    <div>
      <dialog ref={dialogRef} id={props.post._id} className="modal">
        <div className="modal-box w-11/12 max-w-5xl rounded-2xl">
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
            Edit post
          </h3>
          <textarea
            rows="1"
            maxLength="100"
            name="title"
            {...register("title", {
              maxLength: {
                value: 100,
                message: "Max title length reached.",
              },
            })}
            onChange={handleChange}
            defaultValue={form.title}
            className="textarea w-full textarea-xl mt-3 resize-none rounded-2xl"
          ></textarea>
          {errors.title && (
            <p className="text-error text-md font-semibold mt-1">
              {errors.title.message}
            </p>
          )}

          <textarea
            rows="3"
            maxLength="1000"
            name="content"
            {...register("content", {
              required: "Content is required.",
              maxLength: {
                value: 1000,
                message: "Max content length reached.",
              },
            })}
            onChange={handleChange}
            defaultValue={form.content}
            className="textarea w-full textarea-xl mt-3 resize-none rounded-2xl"
          ></textarea>
          {errors.content && (
            <p className="text-error text-md font-semibold mt-1">
              {errors.content.message}
            </p>
          )}

          {!imageRemoved && (form.image || defaultForm.image) && (
            <div className="relative">
              <img
                className="my-4 rounded-2xl h-20 w-37"
                src={
                  !imageRemoved && form.image instanceof File
                    ? URL.createObjectURL(form.image)
                    : form.image || null
                }
              />
              <button
                onClick={removeImage}
                className="btn btn-sm btn-circle absolute left-28 top-1"
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

          <div className="flex items-center justify-between my-4">
            <label className="flex gap-2 items-center cursor-pointer px-4 py-2 rounded-xl hover:scale-[1.05] transition bg-[#8a6bf138]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#8a6bf1"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span className="text-[#8a6bf1] font-medium">Edit Image</span>
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <button
              onClick={handleSubmit(handleUpdate)}
              className="btn text-white text-lg bg-[#8a6bf1] hover:bg-[#8a6bf1dd] rounded-2xl h-[50px] w-[100px]"
            >
              Edit
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
