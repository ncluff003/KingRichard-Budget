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
const Budget = require(`./../Models/budgetModel`);

////////////////////////////////////////////
//  My Functions

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, method, request, response, template, title, optionalData, status, message) => {
  const calendar = Calendar;
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
        ...optionalData,
        calendar: calendar,
        user: user,
      },
    });
  }
};

exports.GlobalErrorHandler = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || `Error`;
  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

exports.renderError = catchAsync(async (request, response, next) => {
  let budget = request.budget;
  console.log(request.calendar, request.user, budget, request.error);
  const user = await User.findById(request.user.id);

  if (!Validate.isBudgetName(budget.name)) {
    let error = new AppError(`Budget Name Used Invalid Characters.`, 400);
    createAndSendToken(user, 400, `render`, request, response, `error`, `King Richard | Invalid Budget Name`, { budget: budget, calendar: Calendar, error: error }, 400, `Failure`);
  }
});
