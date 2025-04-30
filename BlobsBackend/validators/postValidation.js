const joi = require("joi");

const postSchema = joi.object({
  title: joi.string().allow("").optional(),
  content: joi.string().required().messages({
    "string.empty": "Content is required",
  }),
});

const updatePostSchema = joi.object({
  title: joi.string().allow("").optional(),
  content: joi.string().messages({
    "string.empty": "Content is required",
  }),
  imageRemoved: joi.string().valid("true", "false").optional(),
});

module.exports = { postSchema, updatePostSchema };
