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
const authController = require(`./../Controllers/authController`);

////////////////////////////////////////////
//  Routing Middleware
router.route(`/signup`).post(authController.validateSignup, authController.signup, authController.renderAppLoggedIn);
// router.route(`/about`).get(appController.introduceMe);
// router.route(`/projects`).get(appController.viewMyWork);
// router.route(`/contact`).get(appController.contactMe).post(messageController.validateEmail, messageController.emailMe);

////////////////////////////////////////////
//  My Modules

////////////////////////////////////////////
//  Exported Router
module.exports = router;
