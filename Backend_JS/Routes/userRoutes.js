////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const express = require('express');
const multer = require('multer');

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

// BEFORE LOGGING IN
router.route(`/Signup`).post(authController.validateSignup, authController.signup);
// I may be able to remove this `Login` route altogether.
router.route(`/Login`).post(authController.login);
router.route(`/ForgotPassword`).post(authController.forgotPassword, appController.renderApp);
router.route(`/ResetPassword/:token`).get(authController.renderPasswordReset).patch(authController.resetPassword);

// AFTER LOGGING IN
router.route(`/:id`).get(authController.login).post(authController.login);
router.route('/:id/Me').get(authController.protect, userController.getMe);
router.route(`/:id/Logout`).get(authController.logout);
router.route(`/:id/UpdateMyPassword`).post(authController.protect, authController.valudateUserPasswordUpdate, authController.updateMyPassword);
router.route(`/:id/UpdateMe`).patch(authController.protect, userController.uploadUserPhoto, userController.resizeUserPhoto, authController.validateUserUpdate, userController.updateMe);
router.route(`/:id/DeactivateMe`).delete(authController.protect, userController.deactivateMe);
router.route(`/:id/DeleteMe`).delete(authController.protect, userController.deleteMe);

// RE-ROUTE TO BUDGET ROUTER WHEN INSIDE ONE OF YOUR BUDGETS
router.use(`/:id/Budgets`, budgetRouter);

// router.route(`/budgets`).post(authController.protect, budgetController.createBudget).get(authController.protect, budgetController.getBudget);
// router.route(`/budgets/:id`).get(authController.protect, budgetController.getBudget);

////////////////////////////////////////////
//  My Modules

////////////////////////////////////////////
//  Exported Router
module.exports = router;

// button--extra-small | This is the class for Update Photo Button.

// I placed this class here because it will be using a user route to upload the photo for the user.
