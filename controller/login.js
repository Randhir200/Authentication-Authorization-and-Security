const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { response } = require("../utils/response");

//signin token
const signToken = (email, _id) => {
  return jwt.sign({email, _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const validateField = (filed, value, password) => {
  switch (filed) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        return "Email is required.";
      }
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
      break;
    case "password":
      if (!value) {
        return "Password is required.";
      }
      break;
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = [];

  // Validate each field
  ["email", "password"].forEach((field) => {
    const error = validateField(field, req.body[field], password);
    if (error) {
      errors.push(error);
    }
  });

  if (errors.length > 0) {
    return response(res, 'badRequest', errors);
  }

  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({
      $or: [{ email }],
    });

    if (!existingUser) {
      return res.status(400).json({
        status: "Failed",
        error: "User with this email does not exist",
      });
    }

    if (
      !(await existingUser.correctPassword(password, existingUser.password))
    ) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid password" });
    }
    
    const _id = new mongoose.Types.ObjectId(existingUser._id).toString();
    const token = signToken(email, _id);

    res.status(201).json({
      status: "Success",
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({ status: "Failed", error: err.message });
  }
};

module.exports = login;
