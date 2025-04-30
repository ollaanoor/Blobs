const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes = require("./src/routes/auth.routes.js");
const userRoutes = require("./src/routes/user.routes.js");
const postRoutes = require("./src/routes/post.routes.js");

const frontURL = process.env.FRONT_URI;

const cors = require("cors");
app.use(
  cors({
    origin: frontURL,
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
