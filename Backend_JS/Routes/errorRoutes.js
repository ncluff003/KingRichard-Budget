////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules
const express = require('express');

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Middleware
const router = express.Router({ mergeParams: true });

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  My Middleware
const appController = require(`../Controllers/appController`);
const authController = require(`../Controllers/authController`);
const userController = require(`../Controllers/userController`);
const budgetController = require(`../Controllers/budgetController`);
const errorController = require(`../Controllers/errorController`);

////////////////////////////////////////////
//  Routing Middleware

router.route(`/`).get(authController.protect, errorController.renderError);

////////////////////////////////////////////
//  My Modules

////////////////////////////////////////////
//  Exported Router
module.exports = router;
