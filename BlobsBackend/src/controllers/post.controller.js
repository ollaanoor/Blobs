const Post = require("../models/post.model.js");
const uploadToImgBB = require("../../utils/uploadToImgBB");

const getAllPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const cursor = req.query.cursor;
    const query = cursor ? { createdAt: { $lt: cursor } } : {};
    // const skip = parseInt(req.query.skip);
    const total = await Post.countDocuments();

    const posts = await Post.find(query)
      .sort({ createdAt: -1 }) // newest first
      // .skip(skip)
      .limit(limit);
    res.status(200).json({ posts, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getPostById = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

const getPostByUserId = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const cursor = req.query.cursor;
    const query = cursor
      ? { user: req.params.id, createdAt: { $lt: cursor } }
      : { user: req.params.id };
    // const skip = parseInt(req.query.skip);
    const total = await Post.countDocuments({ user: req.params.id });

    const posts = await Post.find(query)
      .sort({ createdAt: -1 }) // newest first
      // .skip(skip)
      .limit(limit);
    // const post = await Post.find({ user: req.user._id });
    res.status(200).json({ posts, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    let image = null;

    if (req.file) {
      const { url } = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname
      );
      image = url;
    }

    if (!req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const post = new Post({
      ...req.body,
      image,
      user: req.user._id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.user.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to edit this post" });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  if (req.file) {
    const { url } = await uploadToImgBB(req.file.buffer, req.file.originalname);
    post.image = url;
  } else if (req.body.imageRemoved === "true") {
    post.image = "";
  }

  const updated = await post.save();
  res.status(200).json(updated);
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.user.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this post" });
  }

  await post.deleteOne();
  res.status(200).json({ message: "Post deleted" });
};

module.exports = {
  getAllPosts,
  // getPostById,
  getPostByUserId,
  createPost,
  updatePost,
  deletePost,
};
