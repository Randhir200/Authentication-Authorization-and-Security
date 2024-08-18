const User = require("./../model/userModel");
const jwt = require("jsonwebtoken");

//signin token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
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
    return res.status(400).json({
      status: "Failed",
      error: errors,
    });
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
    const token = signToken(newUser.email);
    res.status(201).json({
      staus: "Success",
      message: "User logged in successfully",
      user: newUser,
      token,
    });
  } catch (err) {
    res.status(500).json({ staus: "Failed", error: err.message });
  }
};

module.exports = login;