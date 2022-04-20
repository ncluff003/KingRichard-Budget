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

// router.route(`/`).post(authController.protect, budgetController.createBudget).get(authController.protect, budgetController.getBudgets);
router.route(`/`).post(authController.protect, budgetController.createBudget);
router.route(`/RetrieveBudget`).get(authController.protect, budgetController.retrieveBudgetInfo);

router.route(`/:id/Dashboard`).get(authController.protect, budgetController.getBudgetDashboard);
router
  .route(`/:id/Budget-Management`)
  .get(authController.protect, budgetController.getBudgetManagement)
  .patch(authController.protect, budgetController.updateMyBudget)
  .delete(authController.protect, budgetController.deleteBudget);
router.route(`/:id/Edit-Category-Goals`).get(authController.protect, budgetController.getEditCategoryGoals).patch(authController.protect, budgetController.updateMyBudget);
router.route(`/:id/Manage-Categories`).get(authController.protect, budgetController.getManageCategories).patch(authController.protect, budgetController.updateMyBudget);
router.route(`/:id/Allocate-Income`).get(authController.protect, budgetController.getAllocateIncome);
router.route(`/:id/Transaction-Planner`).get(authController.protect, budgetController.getTransactionPlanner);
router.route(`/:id/Investment-Planner`).get(authController.protect, budgetController.getInvestmentPlanner);
router.route(`/:id/Debt-Manager`).get(authController.protect, budgetController.getDebtManager);
router.route(`/:id/Recent-Transactions`).get(authController.protect, budgetController.getRecentTransactions);
router.route(`/:id/Account-Management`).get(authController.protect, budgetController.getAccountManagement);
router.route(`/:id/Invite-Users`).get(authController.protect, budgetController.getInviteUsers);

////////////////////////////////////////////
//  My Modules

////////////////////////////////////////////
//  Exported Router
module.exports = router;
