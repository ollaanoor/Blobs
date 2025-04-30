const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const auth = require("../middlewares/auth.js");
const validate = require("../middlewares/validate.js");
const upload = require("../middlewares/upload.js");
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} = require("../../validators/authValidation.js");

router.post(
  "/register",
  upload.single("profilePicture"),
  validate(registerSchema),
  authController.register
);

router.post("/login", validate(loginSchema), authController.login);

router.put(
  "/update",
  auth,
  upload.single("profilePicture"),
  validate(updateProfileSchema),
  authController.updateProfile
);

router.get("/profile", auth, authController.getProfile);

router.post("/logout", authController.logout);

module.exports = router;
