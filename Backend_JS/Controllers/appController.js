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

////////////////////////////////////////////
//  Routing Middleware

////////////////////////////////////////////
//  My Modules
const Calendar = require(`./../Utilities/Calendar`);

////////////////////////////////////////////
//  MY FUNCTIONS

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
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

exports.renderApp = catchAsync(async (request, response) => {
  response.status(200).render(`base`, {
    title: `King Richard`,
    errorMessage: '',
    successMessage: '',
  });
});

exports.renderAppLoggedIn = catchAsync(async (request, response) => {
  const user = request.user.id;
  console.log(user);
  createAndSendToken(user, 200, `render`, request, response, `loggedIn`, `King Richard | Home`, { calendar: Calendar });
});

exports.introduceMe = catchAsync(async (request, response) => {
  response.status(200).render(`about`, {
    title: `Pure 'N' Spiration | About Me`,
    errorMessage: '',
    successMessage: '',
  });
});

exports.viewMyWork = catchAsync(async (request, response) => {
  response.status(200).render(`projects`, {
    title: `Pure 'N' Spiration | My Work`,
    errorMessage: '',
    successMessage: '',
  });
});

exports.contactMe = catchAsync(async (request, response) => {
  response.status(200).render(`contact`, {
    title: `Pure 'N' Spiration | Contact Me`,
    errorMessage: '',
    successMessage: '',
  });
});
