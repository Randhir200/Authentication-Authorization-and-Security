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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
