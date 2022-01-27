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

exports.createBudget = catchAsync(async (request, response, next) => {
  console.log(request.body);
  const budgetBody = request.body;
  let budget = budgetBody.budget;
  console.log(budgetBody, budgetBody.budget);
  budget.accounts.forEach((a) => {
    console.log(a.name);
  });
  console.log(budget.accounts);
  const user = await User.findById(request.user.id);
  // const userInfo = [user.communicationPreference, user.latterDaySaint];
  user.budgets.push(
    (budget = await Budget.create({
      name: budget.name,
      createdAt: new Date(),
      lastUpdated: new Date(),
      associatedUsers: user.id,
      budgetAdmins: user.id,
      accounts: budget.accounts,
      mainCategories: budget.mainCategories,
    })),
  );
  // await user.save({ validateBeforeSave: false }); -- This is so I can save the changes to the user to have their budgets embedded into them.
  console.log(user, user.budgets, user.budgets[user.budgets.length - 1].name);
  response.status(200).json({
    status: `Success`,
    data: {
      user: user,
      budget: budget,
    },
  });
  // response.status(500).json({
  //   status: `Error`,
  //   message: `This route has not yet been defined`,
  // });
});
