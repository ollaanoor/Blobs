const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const post = mongoose.model("post", PostSchema);

module.exports = post;
