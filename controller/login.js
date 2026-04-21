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
const validateField = (field, value) => {  // Remove unused password param
  switch (field) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return "Email is required.";
      if (!emailRegex.test(value)) return "Please enter a valid email address.";
      break;
    case "password":
      if (!value) return "Password is required.";
      if (value.length < 8) return "Password must be at least 8 characters.";  // Add strength check
      break;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];

  ["email", "password"].forEach((field) => {
    const error = validateField(field, req.body[field]);  // Remove password param
    if (error) errors.push(error);
  });

  if (errors.length > 0) {
    return response(res, 'badRequest', errors);
  }

  try {
    const existingUser = await User.findOne({ email });

    // Generic error message to prevent email enumeration
    if (!existingUser || !(await existingUser.correctPassword(password, existingUser.password))) {
      return response(res, 'unauthorized', 'Invalid email or password');
    }

    const token = signToken(email, existingUser._id.toString());  // Simplified ObjectId handling
    return response(res, 'created', 'User logged in successfully', { token });
  } catch (err) {
    return response(res, 'internalError', err.message);
  }
};
};

module.exports = login;
