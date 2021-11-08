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

////////////////////////////////////////////
//  My Functions

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const createAndSendToken = (user, statusCode, method, request, response, template, title, optionalData, status, message) => {
  const token = signToken(user.id);
  if (method === `json`) {
    return response.status(statusCode).json({
      status: `${status}`,
      message: `${message}`,
    });
  }
  if (method === `render`) {
    return response.status(statusCode).render(`${template}`, {
      title: title,
      token,
      data: {
        user: user,
        ...optionalData,
      },
    });
  }
};

////////////////////////////////////////////
//  Exported Controllers

exports.getMe = catchAsync(async (request, response, next) => {
  const user = await User.findById(request.user.id);
  const userInfo = [user.communicationPreference, user.latterDaySaint];
  return userInfo;
});

exports.updateMe = catchAsync(async (request, response, next) => {
  // CREATE ERROR IF USER TRIES TO POST PASSWORD DATA
  if (request.body.password || request.body.passwordConfirmed) {
    return next(new AppError(`This route is not for password updates.  Please use /updateMyPassword route.`, 400));
  }
  // UPDATE USER DOCUMENT
  const filteredBody = filterObj(
    request.body,
    'firstname',
    'lastname',
    'username',
    'email',
    'emailConfirmed',
    'phone',
    'phoneConfirmed',
    'communicationPreference',
    'photo',
    'latterDaySaint',
  );
  const updatedUser = await User.findByIdAndUpdate(request.user.id, filteredBody, { new: true, runValidators: true });
  createAndSendToken(updatedUser, 200, `render`, request, response, `loggedIn`, `King Richard | Home`, { calendar: Calendar });
});

exports.deactivateMe = catchAsync(async (request, response, next) => {
  await User.findByIdAndUpdate(request.user.id, { active: false });
  response.status(204).render(`base`, {
    title: `King Richard`,
    status: `Success`,
    data: null,
  });
});

exports.deleteMe = catchAsync(async (request, response, next) => {
  await User.findByIdAndDelete(request.user.id);
  response.status(204).json({
    status: 'Success',
    message: 'Deleted',
  });
});
