const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const uploadToImgBB = require("../../utils/uploadToImgBB.js");

// Register
exports.register = async (req, res) => {
  try {
    let profilePicUrl = null;

    if (req.file) {
      const { url } = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname
      );
      profilePicUrl = url;
    } else {
      profilePicUrl = "https://i.ibb.co/vvssHm4Q/Unknown-person.jpg";
    }

    const user = new User({ ...req.body, profilePicture: profilePicUrl });
    await user.save();

    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });
    // res.status(201).json({ token, user });
    res.status(201).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", message: err.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    console.log(updates);
    
    if (updates.email) {
      const existingEmailUser = await User.findOne({
        email: updates.email,
        _id: { $ne: req.user },
      });
      if (existingEmailUser) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }
    
    if (updates.username) {
      const existingUsernameUser = await User.findOne({
        username: updates.username,
        _id: { $ne: req.user },
      });
      if (existingUsernameUser) {
        return res.status(409).json({ message: "Username already in use" });
      }
    }

    if (req.file) {
      const { url } = await uploadToImgBB(
        req.file.buffer,
        req.file.originalname
      );
      updates.profilePicture = url;
    }

    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { $set: updates },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
