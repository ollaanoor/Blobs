const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/name/:username", userController.getUserByUsername);

module.exports = router;
