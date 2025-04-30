const joi = require("joi");

const registerSchema = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

const updateProfileSchema = joi.object({
  username: joi.string().min(3),
  email: joi.string().email(),
  password: joi.string().min(6),
  confirmPassword: joi.string().valid(joi.ref("password")).when("password", {
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.forbidden(),
  }),
  profilePicture: joi.string().uri(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
};
