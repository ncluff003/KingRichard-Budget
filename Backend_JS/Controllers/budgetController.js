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
console.log(Calendar);

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
    console.log({ ...optionalData });
    console.log(request, response);
    return response.status(statusCode).render(`${template}`, {
      title: title,
      token,
      data: {
        ...optionalData,
        user: user,
      },
    });
  }
};

////////////////////////////////////////////
//  Exported Controllers
exports.getBudget = catchAsync(async (request, response, next) => {
  const user = await User.findById(request.user.id);
  console.log(user);
  const budget = await Budget.findById(user.budgets[user.budgets.length - 1]);
  console.log(budget);
  createAndSendToken(
    user,
    201,
    `render`,
    request,
    response,
    `./Budget/budgetLanding`,
    `King Richard | ${budget.name}`,
    { budget: budget, calendar: Calendar },
    200,
    `Success`,
  );
});

exports.createBudget = catchAsync(async (request, response, next) => {
  const budgetBody = request.body;
  let budget = budgetBody.budget;
  const user = await User.findById(request.user.id);
  budget = await Budget.create({
    name: budget.name,
    createdAt: new Date(),
    lastUpdated: new Date(),
    associatedUsers: user.id,
    budgetAdmins: user.id,
    accounts: budget.accounts,
    mainCategories: budget.mainCategories,
  });
  user.budgets.push(budget.id);

  // Save embedded budget into the user.
  await user.save({ validateBeforeSave: false });
  createAndSendToken(user, 201, `render`, request, response, `./Budget/budgetLanding`, `King Richard | ${budget.name}`, { budget: budget }, 200, `Success`);
});
