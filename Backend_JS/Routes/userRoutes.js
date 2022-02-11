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
const userController = require(`./../Controllers/userController`);
const budgetController = require(`./../Controllers/budgetController`);

////////////////////////////////////////////
//  Routing Middleware
router.route('/me').get(authController.protect, userController.getMe);
router.route(`/signup`).post(authController.validateSignup, authController.signup);
router.route(`/login`).post(authController.login);
router.route(`/logout`).get(authController.logout);
router.route(`/forgotPassword`).post(authController.forgotPassword, appController.renderApp);
router.route(`/resetPassword/:token`).get(authController.renderPasswordReset).patch(authController.resetPassword);
router.route(`/updateMyPassword`).post(authController.protect, authController.updateMyPassword);
router.route(`/updateMe`).patch(authController.protect, userController.updateMe);
router.route(`/deactivateMe`).delete(authController.protect, userController.deactivateMe);
router.route(`/deleteMe`).delete(authController.protect, userController.deleteMe);
// router.route(`/about`).get(appController.introduceMe);
// router.route(`/projects`).get(appController.viewMyWork);
// router.route(`/contact`).get(appController.contactMe).post(messageController.validateEmail, messageController.emailMe);
router.route(`/budgets`).post(authController.protect, budgetController.createBudget).get(authController.protect, budgetController.getBudget);
router.route(`/budgets/:id`).get(authController.protect);

////////////////////////////////////////////
//  My Modules

////////////////////////////////////////////
//  Exported Router
module.exports = router;
