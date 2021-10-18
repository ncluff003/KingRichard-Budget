////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Middleware

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  My Middleware
const catchAsync = require(`./../Utilities/catchAsync`);

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

exports.validateSignup = catchAsync(async (request, response, next) => {
  console.log(request.body);
  // response.status(200).json({
  //   status: `Success`,
  //   message: `User Validated`,
  // });
  next();
});

exports.signup = catchAsync(async (request, response, next) => {
  const newUser = await User.create(request.body);
  request.user = newUser;

  // response.status(201).json({
  //   status: `Success`,
  //   data: {
  //     user: newUser,
  //   },
  // });
  response.status(201).render(`loggedIn`, {
    title: `Pure 'N' Spiration | ${request.user.firstname}'s Profile'`,
    data: {
      user: newUser,
      calendar: Calendar,
    },
  });
});
