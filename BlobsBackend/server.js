require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app.js");

const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
module.exports = app;