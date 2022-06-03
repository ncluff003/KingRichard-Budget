import * as Budget from '../Classes/Budget';
import * as Person from '../Classes/Person';
import * as Account from './_Account-Management';
import * as Dashboard from './_Dashboard';
import * as Manager from './_Budget-Management';
import * as Editer from './_Edit-Category-Goals';
import * as Categories from './_Manage-Categories';
import * as Income from './_Income-Allocation';
import * as Planner from './_Transaction-Planner';
import * as Investment from './_Investment-Planner';
import * as Debt from './_Debt-Manager';
import * as Recent from './_Recent-Transactions';

export const _watchBudget = async () => {
  console.log(`WATCHING YOUR BUDGET`);
  /////////////////////////////
  // GET USER
  let person = new Person.Person(``, ``, ``, ``, ``, ``, ``, ``);
  const userInfo = await person._getPersonData();
  const user = userInfo.data.data.user;
  let placeholderUser = await person._getPersonData();

  ////////////////////////////////////////////
  // GET BUDGET INFORMATION
  let currentBudget;
  user.budgets.forEach((b) => {
    if (b._id === window.location.pathname.split('/')[5]) currentBudget = b;
  });
  let budget = Budget.startToCreate();
  budget._buildPlaceHolderBudget(currentBudget, user);

  if (!currentBudget) return;
  ////////////////////////////////////////////
  // SETTING UP THE BUDGET DASHBOARD
  Dashboard.setupBudgetDashboard(user, currentBudget, budget);
  ////////////////////////////////////////////
  // WATCH BUDGET MANAGEMENT PAGE
  Manager._setupBudgetManagement(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH EDIT CATEGORY GOALS PAGE
  Editer._watchEditCategoryGoals(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH MANAGE CATEGORIES PAGE
  Categories._watchManageCategories(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  Income._watchIncomeAllocation(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  Planner._watchTransactionPlanner(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  Investment._watchInvestmentPlanner(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  Debt._watchDebtManager(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH RECENT TRANSACTIONS
  Recent._watchRecentTransactions(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH ACCOUNT MANAGEMENT
  Account._watchAccountManagement(currentBudget, budget, user);
};
