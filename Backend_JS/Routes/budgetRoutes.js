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
const appController = require(`./../Controllers/appController`);
const authController = require(`./../Controllers/authController`);
const userController = require(`./../Controllers/userController`);
const budgetController = require(`./../Controllers/budgetController`);

////////////////////////////////////////////
//  Routing Middleware

router.route(`/`).post(authController.protect, budgetController.createBudget).get(authController.protect, budgetController.getBudgets);
router.route(`/:id`).get(authController.protect, budgetController.getBudget);

////////////////////////////////////////////
//  My Modules

////////////////////////////////////////////
//  Exported Router
module.exports = router;
