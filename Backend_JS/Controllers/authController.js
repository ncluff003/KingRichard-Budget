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
const crypto = require('crypto');

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`./../Utilities/catchAsync`);
const AppError = require(`./../Utilities/appError`);
const sendEmail = require(`./../Utilities/Email`);

////////////////////////////////////////////
//  Routing Middleware

////////////////////////////////////////////
//  My Modules
const Validate = require(`./../Models/validatorModel`);
const Calendar = require(`./../Utilities/Calendar`);
////////////////////////////////////////////
//  My Models
const User = require(`./../Models/userModel`);
const { patch } = require('../App');

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
  const formBody = request.body;
  console.log(request.body);
  if (!Validate.isName(formBody.firstname)) return next(new AppError(`First name must be only letters.`, 400));
  if (!Validate.isName(formBody.lastname)) return next(new AppError(`Last name must be only letters.`, 400));
  if (!Validate.isUsername(formBody.username))
    return next(new AppError(`Username must start with a capital and contain letters and/or numbers..`, 400));
  if (!Validate.isEmail(formBody.email)) return next(new AppError(`Please provide a valid email address.`, 400));
  if (!Validate.isEmail(formBody.emailConfirmed))
    return next(new AppError(`Please provide a valid email address.`, 400));
  if (!Validate.is_Eight_Character_One_Upper_Lower_Number_Special(formBody.password))
    return next(
      new AppError(
        `Passwords must contain at least 8 characters, amongst them being at least 1 capital letter, 1 lower case letter, 1 number, & 1 special symbol.  The special symbols may be the following: !, @, $, &, -, _, and &.`,
        400,
      ),
    );
  if (!Validate.is_Eight_Character_One_Upper_Lower_Number_Special(formBody.passwordConfirmed))
    return next(
      new AppError(
        `Passwords must contain at least 8 characters, amongst them being at least 1 capital letter, 1 lower case letter, 1 number, & 1 special symbol.  The special symbols may be the following: !, @, $, &, -, _, and &.`,
        400,
      ),
    );
  console.log(`Signup Successful.`);
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

  await new sendEmail(newUser).sendWelcome();

  response.status(201).render(`loggedIn`, {
    title: `King Richard | Home`,
    token,
    data: {
      user: newUser,
      calendar: Calendar,
    },
  });
});

exports.resetPassword = catchAsync(async (request, response, next) => {
  console.log(request.body);
  // Get User Based On Token
  const hashedToken = crypto.createHash('sha256').update(request.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If User Exists & Token Not Expired, Set New Password
  if (!user) return next(new AppError(`Token is invalid or has expired`, 400));

  // Update ChangedPasswordAt Property For New User
  user.password = request.body.password;
  user.passwordConfirmed = request.body.passwordConfirmed;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // Log In User
  const token = signToken(user._id);

  request.user = user;

  // response.status(200).json({
  //   status: `Success`,
  //   token: token,
  //   protocol: `${request.protocol}`,
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

exports.renderPasswordReset = catchAsync(async (request, response, next) => {
  console.log(request.params);
  const resetToken = request.params.token;
  const resetURL = `${request.protocol}://${request.get('host')}/users/resetPassword/${resetToken}`;
  console.log(request.url);

  console.log(resetURL);
  response.status(200).render('resetPassword', {
    title: `King Richard | Reset Password`,
    data: {
      token: resetToken,
      url: resetURL,
    },
  });
  console.log(response.data, response.body);
  console.log(`I ran again!`);
});

// I will need to put this as part of the login form.
exports.forgotPassword = catchAsync(async (request, response, next) => {
  const email = request.body.forgottenEmail;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError(`There is no user with that email address.`, 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  console.log(user);
  console.log(request);
  // request.patch()
  try {
    const resetURL = `${request.protocol}://${request.get('host')}/users/resetPassword/${resetToken}`;
    await new sendEmail(user, resetURL).sendResetPassword();

    return response.status(200).json({
      status: `Success`,
      message: `Token Sent To Email`,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError(`There was an error sending the email.  Try again later.`, 500));
  }

  next();
});
