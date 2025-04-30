const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");
const postController = require("../controllers/post.controller.js");
const upload = require("../middlewares/upload.js");
const validate = require("../middlewares/validate.js");
const {
  postSchema,
  updatePostSchema,
} = require("../../validators/postValidation.js");

router.get("/", postController.getAllPosts);

// router.get("/:id", postController.getPostById);
router.get("/:id", postController.getPostByUserId);
// router.get("/", auth, postController.getPostByUserId);

router.post(
  "/",
  auth,
  upload.single("image"),
  validate(postSchema),
  postController.createPost
);

router.put(
  "/:id",
  auth,
  upload.single("image"),
  validate(updatePostSchema),
  postController.updatePost
);

router.delete("/:id", auth, postController.deletePost);

module.exports = router;
