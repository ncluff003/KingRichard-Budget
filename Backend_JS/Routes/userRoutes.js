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
const budgetRouter = require(`./../Routes/budgetRoutes`);

////////////////////////////////////////////
//  Routing Middleware

router.route(`/signup`).post(authController.validateSignup, authController.signup);
router.route(`/login`).post(authController.login);
router.route(`/forgotPassword`).post(authController.forgotPassword, appController.renderApp);
router.route(`/resetPassword/:token`).get(authController.renderPasswordReset).patch(authController.resetPassword);

router.route('/me').get(authController.protect, userController.getMe);
router.route(`/:id`).get(authController.login).post(authController.login);
router.use(`/:id/budgets`, budgetRouter);
router.route(`/:id/logout`).get(authController.logout);
router.route(`/:id/updateMyPassword`).post(authController.protect, authController.updateMyPassword);
router.route(`/:id/updateMe`).patch(authController.protect, userController.updateMe);
router.route(`/:id/deactivateMe`).delete(authController.protect, userController.deactivateMe);
router.route(`/:id/deleteMe`).delete(authController.protect, userController.deleteMe);

// router.route(`/budgets`).post(authController.protect, budgetController.createBudget).get(authController.protect, budgetController.getBudget);
// router.route(`/budgets/:id`).get(authController.protect, budgetController.getBudget);

////////////////////////////////////////////
//  My Modules

////////////////////////////////////////////
//  Exported Router
module.exports = router;
