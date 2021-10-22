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
//  My Functions

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

////////////////////////////////////////////
//  Exported Controllers

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.renderAppLoggedIn = catchAsync(async (request, response, next) => {
  const { username, password } = request.locals;

  // Check if Username & Password Exist
  if (!username || !password) return next(new AppError(`Please provide username and password!`), 400);
  // Check if User exists right along with Username & Password is correct.
  const user = await User.findOne({ username }).select('+password');
  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError(`Incorrect username or password`), 401);

  const token = signToken(user._id);
  response.status(200).render(`loggedIn`, {
    title: `King Richard | Home`,
    token,
    data: {
      user: user,
      calendar: Calendar,
    },
  });
});

/*
  What is my issue?
    Honestly, over my response, it returns the html in response.data, but does not render it.
*/
exports.login = catchAsync(async (request, response, next) => {
  const { loginUsername, loginPassword } = request.body;
  const username = loginUsername;
  const password = loginPassword;
  console.log(loginUsername, loginPassword, username, password);

  // Check if Username & Password Exist
  if (!username || !password) return next(new AppError(`Please provide username and password!`), 400);
  // Check if User exists right along with Username & Password is correct.
  const user = await User.findOne({ username }).select('+password');
  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError(`Incorrect username or password`), 401);

  const token = signToken(user._id);

  // response.locals.user = user;
  // response.locals.token = token;
  // response.status(200).json({
  //   status: `Success`,
  //   token,
  // });

  response.status(200).render(`loggedIn`, {
    title: `King Richard | Home`,
    token,
    data: {
      user: user,
      calendar: Calendar,
    },
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

  const token = signToken(newUser._id);

  // response.status(201).json({
  //   token,
  //   data: {
  //     user: newUser,
  //     calendar: Calendar,
  //   },
  // });

  response.status(201).render(`loggedIn`, {
    title: `King Richard | Home`,
    token,
    data: {
      user: newUser,
      calendar: Calendar,
    },
  });
});

exports.resetPassword = catchAsync(async (request, response, next) => {});

// I will need to put this as part of the login form.
exports.forgotPassword = catchAsync(async (request, response, next) => {
  const email = request.body.forgottenEmail;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError(`There is no user with that email address.`, 404));
  console.log(user);

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  next();
});
