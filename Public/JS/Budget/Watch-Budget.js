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
import * as API from './../Application/_API-Calls';

export const _watchBudget = async () => {
  console.log(`WATCHING YOUR BUDGET`);
  /////////////////////////////
  // GET USER
  let person = new Person.Person(``, ``, ``, ``, ``, ``, ``, ``);
  const userInfo = await person._getPersonData();
  const user = userInfo.data.data.user;
  let placeholderUser = await person._getPersonData();

  ////////////////////////////////////////////
  // GET INFO FOR UTILITY OBJECT
  let countryInfo = await API.getCountryInformation();
  let locale = `${countryInfo.languages[0].iso639_1}-${countryInfo.alpha2Code}`;

  let dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  // let utilityObject = {
  //   money: new Intl.NumberFormat(`ar-SA`, {
  //     style: `currency`,
  //     currency: `SAR`,
  //     minimumFractionDigits: 2,
  //   }),
  //   date: new Intl.DateTimeFormat(`ar-SA`, dateOptions),
  // };

  /*
    Things that must be done with the user interface displaying correctly for the corresponding user.

    MUSTDO: Income previews should immediately preview the `$0.00` with the user's numbers before income is entered.
    MUSTDO: The Calendar should display with their language of the numbers and the date items. 
    MUSTDO: Dates will need to correspond to the way they are displayed in users country.
    MUSTDO: Current month values must be displayed in user's native language and format.
    -- NOTE -- Dates will need to be not done right now until I can devote far more resources into updating the wholle budget's functions to accomodate for that.  That includes making the classes far more flexible than they are, which will take a lot of time.

  */

  let utilityObject = {
    money: new Intl.NumberFormat(`en-US`, {
      style: `currency`,
      currency: `USD`,
      minimumFractionDigits: 2,
    }),
    date: new Intl.DateTimeFormat(locale, dateOptions),
    currencySymbol: `$`,
  };
  // let utilityObject = {
  //   money: new Intl.NumberFormat(locale, {
  //     style: `currency`,
  //     currency: countryInfo.currencies[0].code,
  //     minimumFractionDigits: 2,
  //   }),
  //   date: new Intl.DateTimeFormat(locale, dateOptions),
  //   currencySymbol: countryInfo.currencies[0].symbol,
  // };

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
  Dashboard.setupBudgetDashboard(user, currentBudget, budget, utilityObject);
  ////////////////////////////////////////////
  // WATCH BUDGET MANAGEMENT PAGE
  Manager._setupBudgetManagement(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH EDIT CATEGORY GOALS PAGE
  Editer._watchEditCategoryGoals(currentBudget, budget, user, utilityObject);
  ////////////////////////////////////////////
  // WATCH MANAGE CATEGORIES PAGE
  Categories._watchManageCategories(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  Income._watchIncomeAllocation(currentBudget, budget, user, utilityObject);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  Planner._watchTransactionPlanner(currentBudget, budget, user, utilityObject);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  Investment._watchInvestmentPlanner(currentBudget, budget, user, utilityObject);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  Debt._watchDebtManager(currentBudget, budget, user, utilityObject);
  ////////////////////////////////////////////
  // WATCH RECENT TRANSACTIONS
  Recent._watchRecentTransactions(currentBudget, budget, user, utilityObject);
  ////////////////////////////////////////////
  // WATCH ACCOUNT MANAGEMENT
  Account._watchAccountManagement(currentBudget, budget, user, utilityObject);
};
