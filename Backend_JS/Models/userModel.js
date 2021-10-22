const mongoose = require(`mongoose`);
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
    select: false,
  },
  passwordConfirmed: {
    type: String,
    required: [true, `Please confirm your chosen password`],
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: `The passwords are not the same.`,
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  photo: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  // Only runs if password is modified, and this also only runs on SAVE rather than UPDATE.
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConfirmed = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimeStamp;
  }
  // False means NOT changed.
  return false;
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(36).toString(`hex`);

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = new mongoose.model(`User`, userSchema);

module.exports = User;
