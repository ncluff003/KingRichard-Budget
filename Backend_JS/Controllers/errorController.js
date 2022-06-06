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

exports.renderError = catchAsync(async (request, response, next) => {
  let budget = request.budget;
  console.log(request.calendar, request.user, budget, request.error);
  const user = await User.findById(request.user.id);

  if (!Validate.isBudgetName(budget.name)) {
    let error = new AppError(`Budget Name Used Invalid Characters.`, 400);
    createAndSendToken(user, 400, `render`, request, response, `error`, `King Richard | Invalid Budget Name`, { budget: budget, calendar: Calendar, error: error }, 400, `Failure`);
  }
});

const handleValidationErrorDB = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid Input Data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (error) => {
  console.log(error);
  // const value = error.errmsg.match(/(["'])(\\?.)*?\1)/)[0]; -- No Longer Needed.
  const key = Object.keys(error.keyValue)[0];
  const value = Object.values(error.keyValue)[0];
  const message = `Duplicate Field Value In ${key}: Please use another value than ${value}.`;
  return new AppError(message, 400);
};

const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}.`;
  return new AppError(message, 400);
};

const sendErrorDev = (error, response) => {
  response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error: error,
  });
};

const sendError = (error, response) => {
  if (error.isOperational) {
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    console.error(`Error 💥:`, error);
    response.status(500).json({
      status: `Error`,
      message: `Something went very wrong`,
    });
  }
};

exports.GlobalErrorHandler = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || `Error`;

  if (process.env.NODE_ENV === `development`) {
    let errorCopy = { ...error };
    console.log(errorCopy);
    if (errorCopy.name === `CastError`) {
      errorCopy = handleCastErrorDB(errorCopy);
    }
    if (errorCopy.code === 11000) {
      errorCopy = handleDuplicateFieldsDB(errorCopy);
    }
    if (errorCopy._message === `User validation failed` || errorCopy._message === `Budget validation failed` || errorCopy._message === `Validation failed`) {
      errorCopy = handleValidationErrorDB(errorCopy);
    }
    sendErrorDev(errorCopy, response);
  } else if (process.env.NODE_ENV === `production`) {
    let errorCopy = { ...error };
    if (errorCopy.name === `CastError`) {
      errorCopy = handleCastErrorDB(errorCopy);
    }
    if (errorCopy.code === 11000) {
      errorCopy = handleDuplicateFieldsDB(errorCopy);
    }
    if (errorCopy._message === `User validation failed` || errorCopy._message === `Budget validation failed` || errorCopy._message === `Validation failed`) {
      errorCopy = handleValidationErrorDB(errorCopy);
    }

    sendError(errorCopy, response);
  }
};
