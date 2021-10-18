const mongoose = require(`mongoose`);
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: [true, `Every user needs to give their first name.`],
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, `Every user needs to give their last name.`],
  },
  username: {
    type: String,
    trim: true,
    required: [true, `Every user must have a username`],
    unique: [true, `A user has used that username already.`],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, `Every user must give an email address`],
    unique: [true, `Your email must be unique`],
    validate: [validator.isEmail, `Please provide a valid email.`],
  },
  emailConfirmed: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, `Every user must confirm their email address`],
    validate: [validator.isEmail, `Please repeat your valid email above.`],
  },
  password: {
    type: String,
    required: [true, `Every user must choose a password`],
    minlength: 8,
  },
  passwordConfirmed: {
    type: String,
    required: [true, `Please confirm your chosen password`],
    minlength: 8,
  },
  photo: {
    type: String,
  },
});

const User = new mongoose.model(`User`, userSchema);

module.exports = User;
