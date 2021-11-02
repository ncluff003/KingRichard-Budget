////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const express = require('express');

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Middleware
const router = express.Router();

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  My Middleware
const appController = require(`./../Controllers/appController`);
const authController = require(`./../Controllers/authController`);

////////////////////////////////////////////
//  Routing Middleware
router
  .route(`/signup`)
  .post(authController.validateSignup, authController.signup);
router
  .route(`/login`)
  .get(authController.renderAppLoggedIn)
  .post(authController.login, authController.renderAppLoggedIn);
router
  .route(`/forgotPassword`)
  .post(authController.forgotPassword, appController.renderApp);
router.route(`/resetPassword/:token`).patch(authController.resetPassword);
// router.route(`/about`).get(appController.introduceMe);
// router.route(`/projects`).get(appController.viewMyWork);
// router.route(`/contact`).get(appController.contactMe).post(messageController.validateEmail, messageController.emailMe);

////////////////////////////////////////////
//  My Modules

////////////////////////////////////////////
//  Exported Router
module.exports = router;
