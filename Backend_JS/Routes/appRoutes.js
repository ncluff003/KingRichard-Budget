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
const userController = require(`./../Controllers/userController`);
const authController = require(`./../Controllers/authController`);
const userRouter = require('./userRoutes');

////////////////////////////////////////////
//  Routing Middleware
router.route(`/`).get(appController.renderApp).post(authController.login);
router.route('/user').post(userController.searchForUser);
router.use(`/users`, userRouter);

////////////////////////////////////////////
//  My Modules

////////////////////////////////////////////
//  Exported Router
module.exports = router;
