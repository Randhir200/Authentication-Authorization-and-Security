const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'must have user name'],
  },
  email: {
    type: String,
    require: [true, 'must have email'],
    validate: [validator.isEmail, 'provide valid email'],
    unique: true,
  },
  photo: String,

  password: {
    type: String,
    required: [true, 'enter password'],
    minLength: 4,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'enter confirm password'],
    validate: {
      // this is only works on create and  save!!!
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

// make a instance here to .compare password between candidate(normal) password with userPassword(dcrypt) password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
