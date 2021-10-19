////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const dotenv = require('dotenv');
const jwt = require(`jsonwebtoken`);
////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Middleware

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`./../Utilities/catchAsync`);
const AppError = require(`./../Utilities/appError`);

////////////////////////////////////////////
//  Routing Middleware

////////////////////////////////////////////
//  My Modules
const Validate = require(`./../Models/validatorModel`);
const Calendar = require(`./../Utilities/Calendar`);
////////////////////////////////////////////
//  My Models
const User = require(`./../Models/userModel`);
////////////////////////////////////////////
//  Exported Controllers
exports.renderAppLoggedIn = catchAsync(async (request, response, next) => {
  response.status(200).render(`loggedIn`, {
    title: `Pure 'N' Spiration | ${request.user.firstname}'s Profile'`,
  });
});
exports.login = catchAsync(async (request, response, next) => {
  const { loginUsername, loginPassword } = request.body;
  console.log(loginUsername, loginPassword, request.body);

  // Check if Username & Password Exist
  if (!loginUsername || !loginPassword) return next(new AppError(`Please provide username and password!`), 400);
  // Check if User exists right along with Username & Password is correct.
  const user = User.findOne({ username: username }).select('+password');

  const token = '';
  response.status(200).json({
    status: `Success`,
    token,
  });
});

exports.validateSignup = catchAsync(async (request, response, next) => {
  console.log(request.body);
  // response.status(200).json({
  //   status: `Success`,
  //   message: `User Validated`,
  // });
  next();
});

exports.signup = catchAsync(async (request, response, next) => {
  const formBody = request.body;
  const newUser = await User.create({
    firstname: formBody.firstname,
    lastname: formBody.lastname,
    username: formBody.username,
    email: formBody.email,
    emailConfirmed: formBody.emailConfirmed,
    password: formBody.password,
    passwordConfirmed: formBody.passwordConfirmed,
  });
  request.user = newUser;

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  response.status(201).json({
    token,
    data: {
      user: newUser,
      calendar: Calendar,
    },
  });

  // response.status(201).render(`loggedIn`, {
  //   title: `King Richard | Home`,
  //   token,
  //   data: {
  //     user: newUser,
  //     calendar: Calendar,
  //   },
  // });
});
