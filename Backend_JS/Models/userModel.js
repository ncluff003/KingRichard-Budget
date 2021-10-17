const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, `Every user needs to give their first name.`],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, `Every user needs to give their last name.`],
  },
  username: {
    type: String,
    trim: true,
    required: [true, `Every user must have a username`],
  },
  password: {
    type: password,
    required: [true, `Every user must choose a password`],
  },
  passwordConfirmed: {
    type: password,
    required: [true, `Please confirm your chosen password`],
  },
  email: {
    type: email,
    trim: true,
    required: [true, `Every user must give an email address`],
  },
});

const User = new mongoose.model(`User`, userSchema);

module.exports = User;
