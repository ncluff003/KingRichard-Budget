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

////////////////////////////////////////////
//  Exported Controllers
exports.renderApp = catchAsync(async (request, response) => {
  response.status(200).render(`base`, {
    title: `Pure 'N' Spiration | Home`,
    errorMessage: '',
    successMessage: '',
  });
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
