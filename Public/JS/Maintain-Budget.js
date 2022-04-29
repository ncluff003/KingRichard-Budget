import * as Updating from './Update-User';
import * as Calendar from './FrontEnd-Calendar';
import * as Budgeting from './Manage-Budget';
import * as Budget from './Budget';
import * as Edit from './Budget-Creation';
import * as Categories from './Budget-Categories';

// Class of the 'days' on the Calendar.
// bill-calendar-container__calendar-container__calendar__days__single-day

const _watchCategoryForSelection = () => {
  const e = event;
  e.preventDefault();
  const mainCategories = document.querySelectorAll('.main-category__alt');
  const mainCategoryIcon = document.querySelector('.main-category-display__category-information__icon');
  const mainCategoryText = document.querySelector('.main-category-display__category-information__text');
  const clicked = e.target;
  mainCategories.forEach((mc) => {
    if (mc.firstChild.nodeName === '#text') mc.removeChild(mc.firstChild);
  });
  let icon = clicked.closest('section').firstChild;

  mainCategoryIcon.classList.remove(mainCategoryIcon.classList[3]);
  mainCategoryIcon.classList.add(icon.classList[1]);
  mainCategoryText.textContent = icon.nextSibling.textContent;
  let index = clicked.closest('section').dataset.category;
  const subCategories = document.querySelectorAll('.sub-category');
  subCategories.forEach((sc, i) => {
    sc.classList.add('closed');
    sc.classList.remove('open');
    if (sc.dataset.category === `${index}`) {
      sc.classList.remove('closed');
      sc.classList.add('open');
    }
  });
};

export const _watchForMainCategorySelection = () => {
  console.log(`Watching your selection! 👀`);
  const mainCategories = document.querySelectorAll('.main-category__alt');

  const mainCategoryIcon = document.querySelector('.main-category-display__category-information__icon');
  const mainCategoryText = document.querySelector('.main-category-display__category-information__text');
  console.log(mainCategoryIcon.classList, mainCategoryText.textContent);

  mainCategories.forEach((mc) => {
    mc.removeEventListener(`click`, _watchCategoryForSelection);
    mc.addEventListener('click', _watchCategoryForSelection);
  });
};

const watchForBudgetDeletion = () => {
  const budgetDeleteButton = document.querySelectorAll(`.button--extra-extra-small__wide`)[1];
  const budgetId = window.location.pathname.split('/')[5];
  const userId = window.location.pathname.split('/')[3];
  budgetDeleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    Budgeting.deleteMyBudget(budgetId, userId);
  });
};

const watchForBudgetExit = () => {
  const submitButtons = document.querySelectorAll(`.button--extra-extra-small__wide`);
  console.log(submitButtons);
  const exitButton = document.querySelectorAll(`.button--extra-extra-small__wide`)[0];
  const userId = window.location.pathname.split('/')[3];
  exitButton.addEventListener('click', (e) => {
    e.preventDefault();
    Budgeting.exitBudget(userId);
  });
};

const setMainCategoryTitle = (mainCategory, title) => {
  return (mainCategory.title = title);
};

export const fillSubCategoryArray = (updateObject, index) => {
  let mainCategoryIndex = index;
  let tempArray = Array.from(document.querySelectorAll(`.sub-category-display__sub-category[data-subcategory="${index}"]`));
  tempArray.forEach((temp, i) => {
    let title = temp.firstChild.nextSibling.firstChild.textContent;
    let goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
    let amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
    let amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
    let percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
    updateObject.mainCategories[index].subCategories.push(
      Object.fromEntries([
        [`title`, title],
        [`goalAmount`, goalAmount],
        [`amountSpent`, amountSpent],
        [`amountRemaining`, amountRemaining],
        [`percentageSpent`, percentageSpent],
      ])
    );
    if (updateObject.mainCategories[mainCategoryIndex] === undefined) return;
    if (updateObject.mainCategories[mainCategoryIndex].subCategories.length === tempArray.length) {
      mainCategoryIndex++;
      updateObject.mainCategories[mainCategoryIndex].subCategories = [];
      console.log(`Onto the next index...`);
      return mainCategoryIndex;
    }
    if (index === tempArray.length) {
      mainCategoryIndex++;
    }
  });
};

const buildUpdateObject = (budget, user, customObject, budgetName, customProperties, objects) => {
  let budgetUpdateObject = {
    budgetId: budget._id,
    userId: user._id,
  };

  if (customObject === `Accounts`) {
    budgetUpdateObject.name = budgetName;
    budgetUpdateObject.accounts = {};
    customProperties.forEach((c, i) => {
      budgetUpdateObject.accounts[c] = objects[i];
    });
  }

  if (customObject === `Main Categories`) {
    // budget.mainCategories would be the Custom Properties
    const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
    const mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
    const mainCategoryObject = {};
    const subCategoryObject = {};
    console.log(customProperties);
    let emptyArray = [];
    budgetUpdateObject.mainCategories = [];
    let mainCategoryIndex = 0;
    let subCategoryIndex = 0;
    let entries = [];
    const subCategoriesSplitArray = [];
    let subCategorySubArray = [];

    // EVERYTHING DONE IN THIS 'FOREACH' IS DONE 3 TIMES!!!
    customProperties.forEach((cp, i) => {
      budgetUpdateObject.mainCategories.push(
        Object.fromEntries([
          [`title`, mainCategoryTitles[i].textContent],
          [`subCategories`, emptyArray],
        ])
      );
      if (budgetUpdateObject.mainCategories.length === customProperties.length) {
        return (mainCategoryIndex = 0);
      }
    });
    budgetUpdateObject.mainCategories.forEach((mc, i) => {
      fillSubCategoryArray(budgetUpdateObject, i);
    });
    console.log(budgetUpdateObject);
  }

  return budgetUpdateObject;
};

const getSubCategoryTiming = (budget, category) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let wording;
  if (category.timingOptions.paymentCycle === `Weekly`) {
    let day = days[new Date(`${category.timingOptions.dueDates[0]}`).getDay()];
    wording = `Due every ${day} of the month.`;
    return wording;
  }
  if (category.timingOptions.paymentCycle === `Bi-Weekly`) {
    let date = new Date(`${category.timingOptions.dueDates[0]}`);
    let day = date.getDate();
    let endDigit = Number(date.getDate().toString().split('')[date.getDate().toString().length - 1]);
    let dayEnding;
    dayEnding = Edit.calculateDayEnding(endDigit, dayEnding, date);
    wording = `Due ${days[date.getDay()]}, the ${day}${dayEnding} of ${months[date.getMonth()]}.`;
    return wording;
  }
  if (category.timingOptions.paymentCycle === `Bi-Monthly`) {
    let dayOne, dayTwo, dayEnding, dayEndingTwo;
    category.timingOptions.dueDates[0].forEach((dd, i) => {
      if (i === 0) {
        dayOne = new Date(`${dd}`);
      }
      if (i === 1) {
        dayTwo = new Date(`${dd}`);
      }
    });
    let endDigit = Number(dayOne.getDate().toString().split('')[dayOne.getDate().toString().length - 1]);
    let endDigitTwo = Number(dayTwo.getDate().toString().split('')[dayTwo.getDate().toString().length - 1]);
    dayEnding = Edit.calculateDayEnding(endDigit, dayEnding, dayOne.getDate());
    dayEndingTwo = Edit.calculateDayEnding(endDigit, dayEndingTwo, dayTwo.getDate());
    wording = `Due the ${dayOne.getDate()}${dayEnding} & ${dayTwo.getDate()}${dayEndingTwo}, of ${months[dayOne.getMonth()]}`;
    return wording;
  }
  if (category.timingOptions.paymentCycle === `Monthly`) {
    let date = new Date(`${category.timingOptions.dueDates[0]}`);
    let day = date.getDate();
    let endDigit = Number(date.getDate().toString().split('')[date.getDate().toString().length - 1]);
    let dayEnding;
    dayEnding = Edit.calculateDayEnding(endDigit, dayEnding, date);
    wording = `Due ${days[date.getDay()]}, the ${day}${dayEnding} of ${months[date.getMonth()]}.`;
    return wording;
  }
};

const getSinglePercentageSpent = (spent, total) => {
  let percentage = (spent / total).toFixed(2);
  if (isNaN(percentage)) percentage = (0.0).toFixed(2);
  return percentage;
};

const getOverallPercentageSpent = (total, part) => {
  let percent = (part / total).toFixed(2);
  if (percent === NaN) percent = 0;
  return percent;
};

const getOverallSpent = (subCategories, overall) => {
  let arrayOfTotals = [];
  subCategories.forEach((sc, i) => {
    let subCategoryTotal = Number(sc.firstChild.nextSibling.nextSibling.firstChild.textContent);
    sc.firstChild.nextSibling.nextSibling.firstChild.textContent === `$${sc.firstChild.nextSibling.nextSibling.firstChild.textContent.split('$')[1]}`
      ? (subCategoryTotal = Number(sc.firstChild.nextSibling.nextSibling.firstChild.textContent.split('$')[1]))
      : (subCategoryTotal = 0);
    arrayOfTotals.push(subCategoryTotal);
  });
  let initialValue = 0;
  overall = arrayOfTotals.reduce((previous, current) => Number(previous) + Number(current), initialValue);
  return overall;
};

const getOverallBudget = (subCategories, overall) => {
  let arrayOfTotals = [];
  subCategories.forEach((sc, i) => {
    const subCategoryTotal = sc.firstChild.nextSibling.nextSibling.firstChild.value;
    arrayOfTotals.push(subCategoryTotal);
  });
  let initialValue = 0;
  overall = arrayOfTotals.reduce((previous, current) => Number(previous) + Number(current), initialValue);
  return overall;
};

export const updateBudget = (categoryType, action, budget, placeholderBudget, user) => {
  if (categoryType === `Main Categories`) {
    console.log(categoryType);
    if (action === `Add`) {
      console.log(`Adding...`);
      placeholderBudget._addMainCategory(`${element}`, mainCategoryTitle);
    }
    if (action === `Delete`) {
      console.log(`Deleting...`);
    }
  }
  if (categoryType === `Sub Categories`) {
    console.log(categoryType);
    if (action === `Add`) {
      console.log(`Adding...`);
    }
    if (action === `Delete`) {
      console.log(`Deleting...`);
    }
  }
};

const displayTransaction = (container, plan) => {
  console.log(container, plan);
  container.insertAdjacentElement('afterbegin', plan);
};

const buildTransaction = (options) => {
  console.log(options);
};

const createPlannedTransaction = (accountSelect, budget, placeholderBudget, user) => {
  console.log(`Creating Plan...`);
  const transactionDisplay = document.querySelector('.transaction-plan-display');
  let numSections;
  let sectionStart = 0;
  if (accountSelect.value === `Expense Fund`) {
    const transactionPlan = document.createElement('section');
    numSections = 12;
    while (sectionStart < numSections) {
      const transactionPlanPart = document.createElement('section');
      transactionPlanPart.classList.add(`transaction-plan__part`);
      transactionPlan.insertAdjacentElement('beforeend', transactionPlanPart);
      sectionStart++;
    }
    displayTransaction(transactionDisplay, transactionPlan);
    console.log(accountSelect.value);
    transactionPlan.classList.add('transaction-plan');
  }
  if (accountSelect.value === `Savings Fund`) {
    console.log(accountSelect.value);
  }
  if (accountSelect.value === `Debt`) {
    const altTransactionPlan = document.createElement('section');
    numSections = 13;
    while (sectionStart < numSections) {
      const transactionPlanPart = document.createElement('section');
      transactionPlanPart.classList.add(`transaction-plan__alt__part`);
      altTransactionPlan.insertAdjacentElement('beforeend', transactionPlanPart);
      sectionStart++;
    }
    console.log(accountSelect.value);
    altTransactionPlan.classList.add('transaction-plan__alt');
    displayTransaction(transactionDisplay, altTransactionPlan);
  }
  if (accountSelect.value === `Surplus`) {
    console.log(accountSelect.value);
  }
};

const checkSelectedTiming = () => {
  const transactionPlanSections = document.querySelectorAll('.form__section--transaction-plan');
  const formSelectSections = document.querySelectorAll('.form__section--select');
  console.log(formSelectSections);
  console.log(formSelectSections[2].firstChild.nextSibling.nextSibling, formSelectSections[2].firstChild.nextSibling.nextSibling.value);
  if (formSelectSections[2].firstChild.nextSibling.nextSibling.value === `Bi-Monthly` || formSelectSections[2].firstChild.nextSibling.nextSibling.value === `Bi-Annually`) {
    transactionPlanSections[4].classList.remove('closed');
    transactionPlanSections[4].classList.add('open');
  }
  if (formSelectSections[2].firstChild.nextSibling.nextSibling.value !== `Bi-Monthly` && formSelectSections[2].firstChild.nextSibling.nextSibling.value !== `Bi-Annually`) {
    transactionPlanSections[4].classList.remove('open');
    transactionPlanSections[4].classList.add('closed');
  }
};

const showTransactionPlanOptions = (array, allOptions) => {
  allOptions.forEach((optionArray, i) => {
    optionArray.forEach((arrayItem, i) => {
      arrayItem.classList.remove('open');
      arrayItem.classList.add('closed');
    });
  });
  console.log(array);
  array.forEach((arrayItem, i) => {
    if (i === 0) return;
    arrayItem.classList.remove('closed');
    arrayItem.classList.add('open');
    if (i === 1) {
      arrayItem.removeEventListener('click', checkSelectedTiming);
      arrayItem.addEventListener('click', checkSelectedTiming);
    }
  });
};

const setupTransactionPlanning = (budget, placeholderBudget, user) => {
  const transactionPlanCreationContainer = document.querySelector('.transaction-plan-creation');
  const transactionRows = document.querySelectorAll('.form__row--transaction');

  const expenseTransactionOptionsArray = [];
  const savingsTransactionOptionsArray = [];
  const debtTransactionOptionsArray = [];
  const surplusTransactionOptionsArray = [];
  const commonTransactionOptionsArray = [expenseTransactionOptionsArray, savingsTransactionOptionsArray, debtTransactionOptionsArray, surplusTransactionOptionsArray];

  const accountOptions = document.querySelectorAll('.form__select__option');
  const transactionPlanAccountOptions = [accountOptions[0], accountOptions[1], accountOptions[2], accountOptions[3]];

  const transactionPlanSections = document.querySelectorAll('.form__section--transaction-plan');
  const accountSelectionContainers = document.querySelectorAll('.form__select--accounts');
  const formSelectSections = document.querySelectorAll('.form__section--select');

  const submitPlanButton = document.querySelector('.button--extra-extra-small__transaction-plan');

  commonTransactionOptionsArray.forEach((array) => {
    pushIntoArray(
      [
        transactionPlanSections[4],
        formSelectSections[2],
        transactionPlanSections[0],
        transactionPlanSections[1],
        transactionPlanSections[2],
        transactionPlanSections[3],
        transactionPlanSections[6],
        formSelectSections[1],
        accountSelectionContainers[5],
      ],
      array
    );
  });

  pushIntoArray([accountSelectionContainers[1], transactionPlanSections[5]], expenseTransactionOptionsArray);
  pushIntoArray([accountSelectionContainers[2], transactionPlanSections[5]], savingsTransactionOptionsArray);
  pushIntoArray([accountSelectionContainers[3], formSelectSections[3], accountSelectionContainers[6]], debtTransactionOptionsArray);
  pushIntoArray([accountSelectionContainers[4]], surplusTransactionOptionsArray);

  console.log(commonTransactionOptionsArray);
  console.log(transactionPlanSections, accountSelectionContainers);

  transactionPlanAccountOptions.forEach((ao) => {
    if (ao) {
      ao.addEventListener('click', (e) => {
        if (ao.value === `Expense Fund`) {
          showTransactionPlanOptions(expenseTransactionOptionsArray, commonTransactionOptionsArray);
          if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
            transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
          }
        }
        if (ao.value === `Savings Fund`) {
          showTransactionPlanOptions(savingsTransactionOptionsArray, commonTransactionOptionsArray);
          if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
            transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
          }
        }
        if (ao.value === `Debt`) {
          showTransactionPlanOptions(debtTransactionOptionsArray, commonTransactionOptionsArray);
          if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
            transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
          }
        }
        if (ao.value === `Surplus`) {
          showTransactionPlanOptions(surplusTransactionOptionsArray, commonTransactionOptionsArray);
          if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
            transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
          }
        }
      });
    }
  });

  if (submitPlanButton) {
    submitPlanButton.addEventListener('click', (e) => {
      createPlannedTransaction(accountSelectionContainers[0], budget, placeholderBudget, user);
    });
  }
};

const startPlanning = (budget, placeholderBudget, user) => {
  const transactionPlanCreationContainer = document.querySelector('.transaction-plan-creation');
  transactionPlanCreationContainer.classList.toggle('closed');
  transactionPlanCreationContainer.classList.toggle('open');
  // The same button must reset the extended transaction class to the original size.
  // if (transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
  //   transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
  // }
};

const _watchTransactionPlanner = (budget, placeholderBudget, user) => {
  console.log(`Planning...`);

  const borderlessButtons = document.querySelectorAll('.button--borderless');
  const startPlanningButton = borderlessButtons[2];

  const accountSelection = document.querySelectorAll('.form__select--accounts')[0];
  if (startPlanningButton) {
    startPlanningButton.addEventListener('click', (e) => {
      e.preventDefault();
      startPlanning(budget, placeholderBudget, user);
    });
  }

  setupTransactionPlanning(budget, placeholderBudget, user);

  const altMediumInputs = document.querySelectorAll('.form__input--medium__alt');
  console.log(altMediumInputs);
  const currentDate = altMediumInputs[0];
  currentDate.value = new Date();
  console.log(currentDate);
};

const _watchIncomeAllocation = (budget, placeholderBudget, user) => {
  const incomeAllocationContainer = document.querySelector('.container--allocate-income');
  const unAllocatedTotal = document.querySelector('.un-allocated-account-total');
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  if (incomeAllocationContainer) {
    console.log(`Allocating...`);
    unAllocatedTotal.textContent = money.format(unAllocatedTotal.textContent);
    const allocateIncomeButton = document.querySelector('.button--small-purple');
    allocateIncomeButton.addEventListener('click', (e) => {
      e.preventDefault();
      // INITIALIZE NEEDED VARIABLES
      let unAllocatedAmount = Number(unAllocatedTotal.textContent.split('$')[1].split(',').join(''));
      let totalAllocationAmount = 0;
      // SELECT INPUTS FOR INCOME ALLOCATION
      const allocationInputs = document.querySelectorAll('.form__input');

      // GET TOTAL AMOUNT OF ALL INPUTS
      allocationInputs.forEach((ai, i) => {
        // ADD VALUE TO CURRENT TOTAL
        totalAllocationAmount += Number(ai.value);
      });

      // DOUBLE CHECK TO MAKE SURE ALLOCATED AMOUNT DOES NOT EXCEED UN-ALLOCATED INCOME
      totalAllocationAmount <= unAllocatedAmount
        ? (unAllocatedTotal.textContent = money.format(unAllocatedAmount - totalAllocationAmount))
        : alert(`You do not have all that money! Please lower one of your accounts amounts!`);

      // INITIALIZE SEPARATE ACCOUNTS ALLOCATED TOTALS
      let monthlyBudgetAllocation, emergencyFundAllocation, savingsFundAllocation, expenseFundAllocation, debtAllocation, investmentFundAllocation;

      // GET EACH SEPARATE ACCOUNTS ALLOCATED INCOME
      monthlyBudgetAllocation = allocationInputs[0].value;
      emergencyFundAllocation = allocationInputs[1].value;
      savingsFundAllocation = allocationInputs[2].value;
      expenseFundAllocation = allocationInputs[3].value;
      debtAllocation = allocationInputs[4].value;
      investmentFundAllocation = allocationInputs[5].value;

      // DOUBLE CHECK IF IT IS A NUMBER
      if (isNaN(monthlyBudgetAllocation)) monthlyBudgetAllocation = 0;
      if (isNaN(emergencyFundAllocation)) emergencyFundAllocation = 0;
      if (isNaN(savingsFundAllocation)) savingsFundAllocation = 0;
      if (isNaN(expenseFundAllocation)) expenseFundAllocation = 0;
      if (isNaN(debtAllocation)) debtAllocation = 0;
      if (isNaN(investmentFundAllocation)) investmentFundAllocation = 0;

      const updateObject = {
        budgetId: budget._id,
        userId: user._id,
        user: user,
        accounts: {
          unAllocated: {
            amount: Number(unAllocatedTotal.textContent.split('$')[1].split(',').join('')),
          },
          monthlyBudget: {
            amount: Number(monthlyBudgetAllocation) + budget.accounts.monthlyBudget.amount,
          },
          emergencyFund: {
            emergencyFundGoal: placeholderBudget.accounts.emergencyFund.emergencyFundGoal,
            emergencyGoalMeasurement: placeholderBudget.accounts.emergencyFund.emergencyGoalMeasurement,
            emergencyFundGoalTiming: placeholderBudget.accounts.emergencyFund.emergencyFundGoalTiming,
            amount: Number(emergencyFundAllocation) + budget.accounts.emergencyFund.amount,
          },
          savingsFund: {
            savingsGoal: placeholderBudget.accounts.savingsFund.savingsGoal,
            savingsPercentage: placeholderBudget.accounts.savingsFund.savingsPercentage,
            amount: Number(savingsFundAllocation) + budget.accounts.savingsFund.amount,
          },
          expenseFund: {
            amount: Number(expenseFundAllocation) + budget.accounts.expenseFund.amount,
          },
          surplus: {
            amount: placeholderBudget.accounts.surplus.amount,
          },
          investmentFund: {
            investmentGoal: placeholderBudget.accounts.investmentFund.investmentGoal,
            investmentPercentage: placeholderBudget.accounts.investmentFund.investmentPercentage,
            amount: Number(investmentFundAllocation) + budget.accounts.investmentFund.amount,
          },
          debt: {
            debtAmount: placeholderBudget.accounts.debt.debtAmount,
            amount: Number(debtAllocation) + budget.accounts.debt.amount,
          },
        },
      };

      console.log(updateObject);

      placeholderBudget._updateBudget(`Update`, `Allocate Income`, { updateObject: updateObject }, `Allocate-Income`);

      allocationInputs.forEach((ai) => {
        ai.value = '';
      });
    });
  }
};

const _watchForBudgetCategoryUpdates = (budget, placeholderBudget, user) => {
  console.log(`We are WAITING...`);

  const mainCategoryDeleteButton = document.querySelector('.button--medium-main-category-deletion');
  const categoryIcon = document.querySelector('.main-category-display__category-information__icon');
  const categoryTitle = document.querySelector('.main-category-display__category-information__text');
  let categoryIndex, index;
  let budgetMainCategoryLength = placeholderBudget.mainCategories.length;
  const subCategories = document.querySelectorAll('.sub-category');

  mainCategoryDeleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    categoryIcon.classList.remove(categoryIcon.classList[3]);
    let mainCategories = document.querySelectorAll('.main-category__alt');
    placeholderBudget.mainCategories.forEach((mc) => {
      if (mc.title === categoryTitle.textContent) {
        categoryIndex = placeholderBudget.mainCategories.indexOf(mc);
        mainCategories[categoryIndex].remove();
        placeholderBudget.mainCategories = placeholderBudget.mainCategories.filter((category) => {
          if (category.title !== mc.title) return category;
        });
      }
    });
    mainCategories = document.querySelectorAll('.main-category__alt');
    mainCategories.forEach((mc, i) => {
      mc.dataset.category = i;
    });
    if (categoryIndex === 0) {
      // GLITCH: CLICKING THE MAIN CATEGORIES ON THE LEFT MAKES ALL SUB CATEGORIES GO WONKY.
      subCategories.forEach((sc) => {
        if (Number(sc.dataset.category) === categoryIndex) {
          sc.remove();
        }
        if (sc.dataset.category > categoryIndex) {
          sc.dataset.category = sc.dataset.category - 1;
        }
      });

      // CODE BELOW COULD BE PUT INTO A FUNCTION TO FOLLOW D.R.Y. PRINCIPLE.
      if (placeholderBudget.mainCategories[categoryIndex]) {
        categoryIcon.classList.add(placeholderBudget.mainCategories[categoryIndex].icon);
        categoryTitle.textContent = placeholderBudget.mainCategories[categoryIndex].title;
      }
      subCategories.forEach((sc, i) => {
        sc.classList.add('closed');
        sc.classList.remove('open');
        if (sc.dataset.category === `${categoryIndex}`) {
          sc.classList.remove('closed');
          sc.classList.add('open');
        }
      });
      budgetMainCategoryLength = budgetMainCategoryLength - 1;
    }

    if (categoryIndex > 0 && categoryIndex < placeholderBudget.mainCategories.length) {
      subCategories.forEach((sc) => {
        if (Number(sc.dataset.category) === categoryIndex) {
          sc.remove();
        }
        if (sc.dataset.category > categoryIndex) {
          sc.dataset.category = sc.dataset.category - 1;
        }
      });
      categoryIndex--;
      categoryIcon.classList.add(placeholderBudget.mainCategories[categoryIndex].icon);
      categoryTitle.textContent = placeholderBudget.mainCategories[categoryIndex].title;
      subCategories.forEach((sc, i) => {
        sc.classList.add('closed');
        sc.classList.remove('open');
        if (sc.dataset.category === `${categoryIndex}`) {
          sc.classList.remove('closed');
          sc.classList.add('open');
        }
      });
      budgetMainCategoryLength = budgetMainCategoryLength - 1;
    }

    if (categoryIndex === budgetMainCategoryLength - 1) {
      subCategories.forEach((sc) => {
        if (Number(sc.dataset.category) === categoryIndex) {
          sc.remove();
        }
      });
      if (placeholderBudget.mainCategories.length === 0) {
        categoryTitle.textContent = ``;
      }
      categoryIndex--;
      if (placeholderBudget.mainCategories[categoryIndex]) {
        categoryIcon.classList.add(placeholderBudget.mainCategories[categoryIndex].icon);
        categoryTitle.textContent = placeholderBudget.mainCategories[categoryIndex].title;
      }
      subCategories.forEach((sc, i) => {
        sc.classList.add('closed');
        sc.classList.remove('open');
        if (sc.dataset.category === `${categoryIndex}`) {
          sc.classList.remove('closed');
          sc.classList.add('open');
        }
      });
      budgetMainCategoryLength = budgetMainCategoryLength - 1;
    }
  });

  // ADJUST: WE NEED TO MAKE SURE IT IS POSSIBLE FOR THE EXISTING SUB CATEGORIES TO BE REMOVED AS WELL AS MADE INTO SURPLUS AS WELL, IF NEEDED.
  subCategories.forEach((sc, i) => {
    const surplusSwitch = sc.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling;
    surplusSwitch.addEventListener('click', (e) => {
      e.preventDefault();

      // GET TARGET OF CLICK
      const clicked = e.target;
      surplusSwitch.classList.toggle('sub-category-controller__surplus-container__switch__alt--switched');
      surplusSwitch.firstChild.firstChild.classList.toggle('fa-times');
      surplusSwitch.firstChild.firstChild.classList.toggle('fa-check');
      const categoryNumber = Number(clicked.closest('.sub-category').dataset.category);

      placeholderBudget.mainCategories.forEach((mc, i) => {
        if (mc.title === categoryTitle.textContent) index = i;
      });

      const subCategoriesArray = [...document.querySelectorAll('.sub-category')];
      const subArray = subCategoriesArray.filter((sc, i) => {
        return Number(sc.dataset.category) === index; // This is the Main Category's Index.
      });
      placeholderBudget._updateSubCategory(`Creation`, `Surplus`, { mainIndex: categoryNumber, subIndex: subArray.indexOf(clicked.closest('.sub-category')) });
    });
    const surplusCategoryTrashIcon = surplusSwitch.parentElement.nextSibling;

    surplusCategoryTrashIcon.addEventListener('click', (e) => {
      e.preventDefault();
      const clicked = e.target;
      const selectedSubCategory = clicked.closest('.sub-category');

      placeholderBudget.mainCategories.forEach((mc, i) => {
        if (mc.title === categoryTitle.textContent) index = i;
      });

      /////////////////////////////
      // DELETE SUB CATEGORY
      const subCategoriesArray = [...document.querySelectorAll('.sub-category')];
      let subArray = subCategoriesArray.filter((sc, i) => {
        return Number(sc.dataset.category) === index;
      });
      const categoryNumber = Number(clicked.closest('.sub-category').dataset.category);

      /////////////////////////////
      // REMOVE DOM ELEMENT
      selectedSubCategory.remove();

      placeholderBudget._deleteSubCategory(categoryNumber, subArray.indexOf(selectedSubCategory));
    });
  });

  const updateCategoryButton = document.querySelectorAll('.button--large__thin')[0];
  updateCategoryButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(`Updating...`);
    placeholderBudget._updateBudget(
      `Update`,
      `Manage Categories`,
      {
        updateObject: {
          budgetMainCategories: budget.mainCategories,
          budgetId: budget._id,
          userId: user._id,
          user: user,
          mainCategories: placeholderBudget.mainCategories,
        },
      },
      `Manage-Categories`
    );
  });
};

const _watchManageCategories = (budget, placeholderBudget, user) => {
  const mediumContainers = document.querySelectorAll('.container--medium');
  const manageCategoryContainer = mediumContainers[0];
  let icon, index;
  let subCategoryIndex = 0;
  if (manageCategoryContainer) {
    Categories.createCategories(icon, index);
    Categories._watchCreateCategoryButton(icon, placeholderBudget);
    Edit.setupSubCategoryCreation(placeholderBudget, subCategoryIndex);
    _watchForMainCategorySelection(budget, placeholderBudget, user);
    _watchForBudgetCategoryUpdates(budget, placeholderBudget, user);
  }
};

const _watchEditCategoryGoals = (budget, placeholderBudget, user) => {
  const editCategoryGoalsContainer = document.querySelectorAll('.container--large')[0];
  if (editCategoryGoalsContainer) {
    const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
    const timingFunctionContainer = document.querySelector('.timing-container');
    const editCategoryGoalsSubmit = document.querySelector('.button--large__thin');
    // On load, retrieve the proper timings and dates for the correct sub-categories.

    const mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
    let allCategories = [];
    placeholderBudget.mainCategories.forEach((mct, i) => {
      budget.mainCategories[i].subCategories.forEach((sc, i) => {
        allCategories.push(sc);
      });
    });

    allCategories.forEach((c, i) => {
      if (c.timingOptions.paymentCycle) {
        let timing = getSubCategoryTiming(budget, c);
        if (subCategories[i]) {
          if (subCategories[i].firstChild.nextSibling.firstChild.nextSibling) subCategories[i].firstChild.nextSibling.firstChild.nextSibling.textContent = timing;
        }
      }
    });

    Edit.setupTimingFunctionContainer(timingFunctionContainer);
    let clickedItem, selectedTiming;
    let subCategoryIndex = 0;
    Edit.watchForSettingTiming(placeholderBudget, subCategoryIndex, clickedItem, selectedTiming, `Full Budget`);

    const money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    const individualPayments = document.querySelectorAll('.individual-payment');
    const overallBudget = document.querySelectorAll('.budget-single-goal-summary__amount');
    individualPayments.forEach((ip, i) => {
      let overallSpent = overallBudget[1];
      let overallRemaining = overallBudget[2];
      let overallPercentageSpent = overallBudget[3];
      let total = getOverallBudget(subCategories, overallBudget[0]);
      let part = getOverallSpent(subCategories, overallSpent);
      if (total - part < 0) {
        overallRemaining.classList.add('negative');
        overallRemaining.classList.remove('positive');
      }
      if (total - part === 0) {
        overallRemaining.classList.remove('positive');
        overallRemaining.classList.remove('negative');
      }
      if (total - part > 0) {
        overallRemaining.classList.add('positive');
        overallRemaining.classList.remove('negative');
      }
      let remainingValue = ip.closest('section').nextSibling.nextSibling.firstChild;
      if (Number(remainingValue.textContent.split('$')[1]) > 0) {
        remainingValue.classList.add('positive');
        remainingValue.classList.remove('negative');
      }
      if (Number(remainingValue.textContent.split('$')[1]) === 0) {
        remainingValue.classList.remove('positive');
        remainingValue.classList.remove('negative');
      }
      if (Number(remainingValue.textContent.split('$')[1]) < 0) {
        remainingValue.classList.remove('positive');
        remainingValue.classList.add('negative');
      }
      ip.addEventListener('keyup', (e) => {
        e.preventDefault();
        let spent = ip.closest('section').nextSibling.firstChild;
        let remaining = ip.closest('section').nextSibling.nextSibling.firstChild;
        let percentageSpent = ip.closest('section').nextSibling.nextSibling.nextSibling.firstChild;
        let total = getOverallBudget(subCategories, overallBudget[0]);
        let part = getOverallSpent(subCategories, overallSpent);
        let percentage = getOverallPercentageSpent(total, part);
        overallBudget[0].textContent = money.format(getOverallBudget(subCategories, overallBudget[0]));
        overallSpent.textContent = money.format(part);
        overallRemaining.textContent = money.format(total - part);
        overallPercentageSpent.textContent = `${percentage}%`;
        spent.textContent = money.format(spent.textContent.split('$')[1]);
        remaining.textContent = money.format(ip.value - Number(spent.textContent.split('$')[1]));
        if (total - part < 0) {
          overallRemaining.classList.add('negative');
          overallRemaining.classList.remove('positive');
        }
        if (total - part === 0) {
          overallRemaining.classList.remove('positive');
          overallRemaining.classList.remove('negative');
        }
        if (total - part > 0) {
          overallRemaining.classList.add('positive');
          overallRemaining.classList.remove('negative');
        }
        if (!Number(remaining.textContent.startsWith('-'))) {
          remaining.classList.add('positive');
          remaining.classList.remove('negative');
        }
        if (Number(remaining.textContent.split('$')[1]) === 0) {
          remaining.classList.remove('positive');
          remaining.classList.remove('negative');
        }
        if (Number(remaining.textContent.startsWith('-'))) {
          remaining.classList.remove('positive');
          remaining.classList.add('negative');
          console.log(remaining.classList, Number(remaining.textContent.split('$')[1]));
        }
        percentageSpent.textContent = `${getSinglePercentageSpent(Number(spent.textContent.split('$')[1]), ip.value)}%`;
      });
      ip.addEventListener('blur', (e) => {
        e.preventDefault();
        ip.value = Number(ip.value).toFixed(2);
      });
    });
    if (editCategoryGoalsSubmit) {
      editCategoryGoalsSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        let updateObject = {};
        updateObject.budgetId = budget._id;
        updateObject.userId = user._id;
        updateObject.mainCategories = [];
        const mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');

        let mainCategoryIndex = 0;
        let subCategoryIndex = 0;

        let emptyArray = [];
        let temporaryObject;

        budget.mainCategories.forEach((bmc, i) => {
          temporaryObject = Object.fromEntries([
            [`title`, placeholderBudget.mainCategories[i].title],
            [`icon`, placeholderBudget.mainCategories[i].icon],
            [`subCategories`, emptyArray],
          ]);
          updateObject.mainCategories[i] = temporaryObject;

          let tempArray = Array.from(document.querySelectorAll(`.sub-category-display__sub-category[data-subcategory="${i}"]`));
          let mainCategoryIndex = i;
          tempArray.forEach((temp, i) => {
            let title = temp.firstChild.nextSibling.firstChild.textContent;
            let goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
            let amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
            let timingOptions = bmc.subCategories[i].timingOptions;

            temporaryObject.subCategories.push(
              Object.fromEntries([
                [`title`, title],
                [`goalAmount`, goalAmount],
                [`amountSpent`, amountSpent],
                [`amountRemaining`, amountRemaining],
                [`percentageSpent`, percentageSpent],
                [`timingOptions`, timingOptions],
              ])
            );
            if (temporaryObject.subCategories.length === tempArray.length) {
              mainCategoryIndex++;
              if (temporaryObject === undefined) return;
              temporaryObject.subCategories = [];
              return mainCategoryIndex;
            }
            if (i === tempArray.length) {
              mainCategoryIndex++;
            }
          });

          if (updateObject.mainCategories.length === budget.mainCategories.length) {
            return (mainCategoryIndex = 0);
          }
        });

        updateObject.mainCategories.forEach((mc, i) => {
          // Maintain.fillSubCategoryArray(updateObject, i);
          let mainCategoryIndex = i;
          let tempArray = Array.from(document.querySelectorAll(`.sub-category-display__sub-category[data-subcategory="${i}"]`));
          tempArray.forEach((temp, i) => {
            let title = temp.firstChild.nextSibling.firstChild.textContent;
            let goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
            let amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
            let timingOptions = budget.mainCategories[mainCategoryIndex].subCategories[i].timingOptions;

            updateObject.mainCategories[mainCategoryIndex].subCategories.push(
              Object.fromEntries([
                [`title`, title],
                [`goalAmount`, goalAmount],
                [`amountSpent`, amountSpent],
                [`amountRemaining`, amountRemaining],
                [`percentageSpent`, percentageSpent],
                [`timingOptions`, timingOptions],
              ])
            );
            if (updateObject.mainCategories[mainCategoryIndex].subCategories.length === tempArray.length) {
              mainCategoryIndex++;
              if (updateObject.mainCategories[mainCategoryIndex] === undefined) return;
              updateObject.mainCategories[mainCategoryIndex].subCategories = [];
              return mainCategoryIndex;
            }
            if (i === tempArray.length) {
              mainCategoryIndex++;
            }
          });
        });

        placeholderBudget._updateBudget(
          `Update`,
          `Edit Category Goals`,
          {
            budgetId: budget._id,
            budgetMainCategories: budget.mainCategories,
            userId: user._id,
            user: user,
            updateObject: updateObject,
          },
          `Edit-Category-Goals`
        );
      });
    }
  }
};

const getTithing = (budget, user, currentTithingSetting) => {
  let tithingSetting;
  let tithing = {};
  if (tithingSetting === undefined || tithingSetting !== '' || tithingSetting === null) {
    tithingSetting = currentTithingSetting;
  }
  tithing.tithingSetting = currentTithingSetting;
  tithing.amount = budget.accounts.tithing.amount;
  return tithing;
};

const getEmergencyFund = (budget, emergencySetting) => {
  let emergencyFundGoal, emergencyFundGoalTiming;
  let emergencyFund = {};
  emergencyFund.emergencyGoalMeasurement = emergencySetting;
  if (emergencySetting === `Length Of Time`) {
    emergencyFundGoal = Number(document.querySelector('.form__input--half-left').value);
    emergencyFundGoalTiming = document.querySelector('.form__select--half-right').value;
    if (emergencyFundGoal === '' || emergencyFundGoal === undefined || emergencyFundGoal === null) emergencyFundGoal = budget.accounts.emergencyFund.emergencyFundGoal;
    if (emergencyFundGoalTiming === '' || emergencyFundGoalTiming === undefined || emergencyFundGoalTiming === null)
      emergencyFundGoalTiming = budget.accounts.emergencyFund.emergencyFundGoalTiming;
    emergencyFund.emergencyGoalMeasurement = emergencySetting;
    emergencyFund.emergencyFundGoal = emergencyFundGoal;
    emergencyFund.emergencyFundGoalTiming = emergencyFundGoalTiming;
    emergencyFund.amount = budget.accounts.emergencyFund.amount;
    return emergencyFund;
  }
  if (emergencySetting === `Total Amount`) {
    emergencyFund.emergencyFundGoal = Number(document.querySelector('.budget-container__budget-management-container--extra-small__budget-emergency-goal-form__input').value);
  }
  return emergencyFund;
};

const getInvestmentFund = (budget) => {
  const budgetInputs = document.querySelectorAll('.form__input--small-thin');
  let investmentFund = {};
  let investmentGoal = Number(budgetInputs[0].value);
  let investmentPercentage = Number(budgetInputs[1].value);
  if (investmentGoal === '' || investmentGoal === undefined || investmentGoal === null) investmentGoal = budget.accounts.investmentFund.investmentGoal;
  if (investmentPercentage === '' || investmentPercentage === undefined || investmentPercentage === null)
    investmentPercentage = budget.accounts.investmentFund.investmentPercentage;
  investmentFund.investmentGoal = investmentGoal;
  investmentFund.investmentPercentage = investmentPercentage / 100;
  investmentFund.amount = budget.accounts.investmentFund.amount;
  return investmentFund;
};

const getSavingsFund = (budget) => {
  const budgetInputs = document.querySelectorAll('.form__input--small-thin');
  let savingsFund = {};
  let savingsGoal = Number(budgetInputs[0].value);
  let savingsPercentage = Number(budgetInputs[1].value);
  if (savingsGoal === '' || savingsGoal === undefined || savingsGoal === null) savingsGoal = budget.accounts.savingsFund.savingsGoal;
  if (savingsPercentage === '' || savingsPercentage === undefined || savingsPercentage === null) savingsPercentage = budget.accounts.savingsFund.savingsPercentage;
  savingsFund.savingsGoal = savingsGoal;
  savingsFund.savingsPercentage = savingsPercentage / 100;
  savingsFund.amount = budget.accounts.savingsFund.amount;
  return savingsFund;
};

const getBudgetName = (budget) => {
  const budgetInputs = document.querySelectorAll('.form__input--small-thin__placeholder-shown');
  let budgetName = budgetInputs[0].value;
  if (budgetName === '') budgetName = budget.name;
  return budgetName;
};

const compileBudgetManagementUpdates = (emergencySetting, currentTithingSetting, budget, placeholderBudget, user) => {
  /*
    Quick note here...,

    Building the update object outside of a method is alright, however, how this really should go down is to update the placeholder budget first.

    Then, after the place holder budget is updated within the limits of the current page, there should be an object that is built based off of what CAN be updated on that page.
    For the Budget Management Page, that would be the budget's name and the budget's accounts.  So, sending an object with THAT information would be most beneficial.
    Another and final example for now would be the edit category goals page be fore changing the timing, goals, etc... on the placeholder budget and sending the whole main categories array
    to the update functionality in the backend to update that budget that way.

  */
  // GET BUDGET NAME
  let budgetName = getBudgetName(budget);
  // The methods below are returning the objects of these accounts.  They are NOT returning the values themselves.
  const savingsFund = getSavingsFund(budget);
  const investmentFund = getInvestmentFund(budget);
  const emergencyFund = getEmergencyFund(budget, emergencySetting);
  let tithing;
  if (user.latterDaySaint === true) {
    tithing = getTithing(budget, user, currentTithingSetting);
    let name = placeholderBudget._addName(budgetName);
    placeholderBudget._updateBudget(
      `Update`,
      `Budget Management`,
      {
        budgetId: budget._id,
        userId: user._id,
        user: user,
        name: name,
        unAllocatedAmount: placeholderBudget.accounts.unAllocated.amount,
        monthlyBudgetAmount: placeholderBudget.accounts.monthlyBudget.amount,
        emergencyFund: emergencyFund,
        savingsFund: savingsFund,
        expenseFundAmount: placeholderBudget.accounts.expenseFund.amount,
        surplusAmount: placeholderBudget.accounts.surplus.amount,
        investmentFund: investmentFund,
        debtAmount: placeholderBudget.accounts.debt.amount,
        debtTotal: Number(placeholderBudget.accounts.debt.debtAmount),
        tithing: tithing,
        updateObject: {},
      },
      `Budget-Management`
    );
  }

  if (user.latterDaySaint === false) {
    let name = placeholderBudget._addName(budgetName);
    placeholderBudget._updateBudget(
      `Update`,
      `Budget Management`,
      {
        budgetId: budget._id,
        userId: user._id,
        user: user,
        name: name,
        unAllocatedAmount: placeholderBudget.accounts.unAllocated.amount,
        monthlyBudgetAmount: placeholderBudget.accounts.monthlyBudget.amount,
        emergencyFund: emergencyFund,
        savingsFund: savingsFund,
        expenseFundamount: placeholderBudget.accounts.expenseFund.amount,
        surplusAmount: placeholderBudget.accounts.surplus.amount,
        investmentFund: investmentFund,
        debtAmount: placeholderBudget.accounts.debt.amount,
        debtTotal: Number(placeholderBudget.accounts.debt.debtAmount),
        updateObject: {},
      },
      `Budget-Management`
    );
  }
};

const changeEmergencyInput = (array, setting) => {
  if (setting === `Length Of Time`) {
    array.forEach((eSetting) => {
      eSetting.classList.remove('closed');
      eSetting.classList.remove('open');
    });
    array[0].classList.add('open');
    array[1].classList.add('closed');
  }
  if (setting === `Total Amount`) {
    array.forEach((eSetting) => {
      eSetting.classList.remove('closed');
      eSetting.classList.remove('open');
    });
    array[1].classList.add('open');
    array[0].classList.add('closed');
  }
};

const _setupBudgetManagement = (budget, placeholderBudget, user) => {
  const budgetNameDisplay = document.querySelector('.form--extra-small__budget-name-display');
  const budgetNameInput = document.querySelectorAll('.form__input--small-thin__placeholder-shown')[0];
  if (window.location.pathname.split('/')[6] === `Budget-Management`) {
    const invisibleCheckboxes = document.querySelectorAll('.form__input--invisible-checkbox');
    if (budgetNameInput) {
      budgetNameInput.addEventListener('keyup', (e) => {
        e.preventDefault();
        budgetNameDisplay.textContent = budgetNameInput.value;
      });
    }
    const emergencyFundSettings = document.querySelectorAll('.form__label--checkbox-container');
    let emergencySetting;

    const emergencySelectionContainer = document.querySelector('.form__section--small-thin');
    const smallThinInputs = document.querySelectorAll('.form__input--small-thin');
    console.log(smallThinInputs);
    const emergencyTotalInput = document.querySelectorAll('.form__input--small-thin__placeholder-shown')[1];
    const emergencySettings = [emergencySelectionContainer, emergencyTotalInput];
    emergencySettings.forEach((eSetting) => eSetting.classList.remove('visible'));
    if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
      emergencySettings.forEach((es) => {
        es.classList.add('closed');
        es.classList.remove('open');
      });
      emergencySettings[0].classList.remove('closed');
      emergencySettings[0].classList.add('open');
    }
    if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
      emergencySettings.forEach((es) => {
        es.classList.add('closed');
        es.classList.remove('open');
      });
      emergencySettings[1].classList.remove('closed');
      emergencySettings[1].classList.add('open');
    }

    emergencyFundSettings.forEach((setting) => {
      setting.classList.remove('checked');
      if (setting.textContent === budget.accounts.emergencyFund.emergencyGoalMeasurement) setting.classList.toggle('checked');
      emergencySetting = budget.accounts.emergencyFund.emergencyGoalMeasurement;
      setting.addEventListener('click', (e) => {
        e.preventDefault();
        emergencyFundSettings.forEach((es) => es.classList.remove('checked'));
        setting.classList.toggle('checked');
        emergencySetting = setting.textContent;
        changeEmergencyInput(emergencySettings, emergencySetting, budget);
      });
    });

    console.log(invisibleCheckboxes);
    const tithingCheckboxes = [invisibleCheckboxes[2], invisibleCheckboxes[3], invisibleCheckboxes[4]];
    let currentTithingSetting;
    const budgetManagementSubmitButtons = document.querySelectorAll('.button--extra-extra-small');
    const wideBudgetManagementSubmitButtons = document.querySelectorAll('.button--extra-extra-small__wide');
    console.log(budgetManagementSubmitButtons);
    const budgetNameSubmit = budgetManagementSubmitButtons[0];
    const savingsGoalSubmit = budgetManagementSubmitButtons[1];
    const investmentGoalSubmit = budgetManagementSubmitButtons[2];
    const emergencyGoalSubmit = budgetManagementSubmitButtons[3];
    const tithingSettingSubmit = budgetManagementSubmitButtons[4];
    const updateSubmitButtons = [budgetNameSubmit, savingsGoalSubmit, investmentGoalSubmit, emergencyGoalSubmit];

    if (user.latterDaySaint === true) {
      updateSubmitButtons.push(tithingSettingSubmit);
    }
    updateSubmitButtons.forEach((ub) => {
      ub.addEventListener('click', (e) => {
        e.preventDefault();
        compileBudgetManagementUpdates(emergencySetting, currentTithingSetting, budget, placeholderBudget, user);
      });
    });
    watchForBudgetExit();
    watchForBudgetDeletion();

    if (!budget.accounts.tithing) return;
    if (budget.accounts.tithing.tithingSetting) {
      const tithingSettings = document.querySelectorAll('.form__label--small-thin__taller--thirds__tithing');
      const tithingCheckboxes = document.querySelectorAll(
        '.budget-container__budget-management-container--extra-small__budget-tithing-setting-form__setting-container__label-container__input--checkbox'
      );
      tithingSettings.forEach((ts) => {
        ts.classList.remove('selected');
        if (budget.accounts.tithing.tithingSetting === `Gross`) tithingSettings[0].classList.add('selected');
        if (budget.accounts.tithing.tithingSetting === `Net`) tithingSettings[1].classList.add('selected');
        if (budget.accounts.tithing.tithingSetting === `Surplus`) tithingSettings[2].classList.add('selected');
      });
      tithingSettings.forEach((ts) => {
        if (ts.classList.contains('selected')) currentTithingSetting = ts.textContent;
      });
      tithingSettings.forEach((ts) => {
        ts.addEventListener('click', (e) => {
          e.preventDefault();
          tithingSettings.forEach((setting) => setting.classList.remove('selected'));
          ts.classList.add('selected');
          currentTithingSetting = ts.textContent;
        });
      });
    }
  }
};

const cycleMainCategories = (direction, index, subCats, budget) => {
  const categoryIcon = document.querySelector('.main-category-display__category-display__icon');
  const categoryTitle = document.querySelector('.main-category-display__category-display__title');
  if (direction === `left`) {
    categoryIcon.classList.remove(categoryIcon.classList[2]);
    categoryIcon.classList.add(`${budget.mainCategories[index].icon}`);
    categoryTitle.textContent = budget.mainCategories[index].title;

    subCats.forEach((sc) => {
      sc.classList.add('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.remove('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.add('open');
    });
  }
  if (direction === `right`) {
    categoryIcon.classList.remove(categoryIcon.classList[2]);
    categoryIcon.classList.add(`${budget.mainCategories[index].icon}`);
    categoryTitle.textContent = budget.mainCategories[index].title;
    subCats.forEach((sc) => {
      sc.classList.add('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.remove('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.add('open');
    });
  }
};

const _setupCurrentMonth = (budget) => {
  const categoryIcon = document.querySelector('.main-category-display__category-display__icon');
  const categoryTitle = document.querySelector('.main-category-display__category-display__title');
  const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
  const leftButton = document.querySelector('.left');
  const rightButton = document.querySelector('.right');
  let categoryIndex = 0;
  subCategories.forEach((sc, i) => {
    sc.classList.add('closed');
    if (Number(sc.dataset.subcategory) === 0) sc.classList.remove('closed');
    if (Number(sc.dataset.subcategory) === 0) sc.classList.add('open');
  });
  if (leftButton) {
    leftButton.addEventListener('click', (e) => {
      e.preventDefault();
      categoryIndex--;
      if (categoryIndex <= 0) categoryIndex = 0;
      cycleMainCategories('left', categoryIndex, subCategories, budget);
    });
  }
  if (rightButton) {
    rightButton.addEventListener('click', (e) => {
      e.preventDefault();
      categoryIndex++;
      if (categoryIndex >= budget.mainCategories.length - 1) categoryIndex = budget.mainCategories.length - 1;
      cycleMainCategories('right', categoryIndex, subCategories, budget);
    });
  }
};

const _setupBillCalendar = () => {
  const calendar = Calendar.myCalendar;
  let currentMonth = calendar.getMonth();
  let currentMonthIndex = calendar.getMonthIndex();
  let currentYear = calendar.getYear();

  calendar.makeCalendar(
    currentMonthIndex,
    currentMonth,
    currentYear,
    '.bill-calendar__days__single-day', // NEEDS PERIOD FOR .querySelectorAll
    'bill-calendar__days__single-day--current-day', // CLASS IS ONLY BEING ADDED via .classList.add
    'un-used-day' // CLASS IS ONLY BEING ADDED via .classList.add
  );

  const monthLeft = document.querySelector('.month-left');
  const monthRight = document.querySelector('.month-right');

  if (monthLeft) {
    monthLeft.addEventListener('click', (e) => {
      e.preventDefault();
      currentMonthIndex--;
      if (currentMonthIndex === -1) {
        currentMonthIndex = 11;
        currentYear--;
      }
      calendar.goBackAMonth(currentMonthIndex, currentYear, '.bill-calendar__days__single-day', 'bill-calendar__days__single-day--current-day', 'un-used-day');
    });
  }
  if (monthRight) {
    monthRight.addEventListener('click', (e) => {
      e.preventDefault();
      currentMonthIndex++;
      if (currentMonthIndex === 12) {
        currentMonthIndex = 0;
        currentYear++;
      }
      calendar.goForwardAMonth(currentMonthIndex, currentYear, '.bill-calendar__days__single-day', 'bill-calendar__days__single-day--current-day', 'un-used-day');
    });
  }
};

const calculateTotal = (accountType, budget) => {
  const accountSections = document.querySelectorAll('.budget-container__dashboard__container--extra-small__content__account-total');
  const budgetAccounts = budget.accounts;
  let amountOfDebt;
  let budgetAccountTotals = [];
  Object.entries(budgetAccounts).forEach((account) => {
    return budgetAccountTotals.push(account[1].amount);
  });
  Object.entries(budgetAccounts).forEach((account) => {
    if (account[0] === `debt`) amountOfDebt = account[1].debtAmount;
    return amountOfDebt;
  });

  // Set Money Format
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  if (budget) {
    if (accountType === `Bank Account`) {
      let initialDeposit = 0;
      const bankVaultTotal = budgetAccountTotals.reduce((previous, current) => previous + current, initialDeposit);
      const bankAccountSection = accountSections[0];
      let bankAccount = money.format(bankVaultTotal);
      if (bankAccountSection) bankAccountSection.textContent = `${bankAccount}`;
    }

    if (accountType === `Debt`) {
      const debtAccount = accountSections[1];
      // amountOfDebt += 200;
      let debt = money.format(amountOfDebt);

      if (debtAccount) {
        amountOfDebt === 0 ? (debtAccount.textContent = debt) : (debtAccount.textContent = `-${debt}`);
      }
    }

    if (accountType === `Net Value`) {
      let initialDeposit = 0;
      let budgetAccountTotals = [];
      Object.entries(budgetAccounts).forEach((account) => {
        if (account[0] === `debt`) amountOfDebt = account[1].debtAmount;
        return amountOfDebt;
      });
      const bankVaultTotal = budgetAccountTotals.reduce((previous, current) => previous + current, initialDeposit);
      const netValueAccount = accountSections[2];
      let netValue = money.format(bankVaultTotal - amountOfDebt);
      if (netValueAccount) netValueAccount.textContent = netValue;
    }
  }
};

const getDashboardAccountTotals = (budget) => {
  calculateTotal(`Bank Account`, budget);
  calculateTotal(`Debt`, budget);
  calculateTotal(`Net Value`, budget);

  // budget-container__dashboard__container--extra-small__content__account-total
};

const _watchForTransactions = (arrayOfArrays, budget, placeholderBudget, user) => {
  const dashboard = document.querySelector('.budget-dashboard');
  if (dashboard) {
    const money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    const headerSubmitButtons = document.querySelectorAll('.button--small-container-header');
    const incomeInputs = document.querySelectorAll('.form__input--enter-income');
    // MUSTDO: Separate income into investment, savings, and un-allocated after every keystroke into net pay.
    const incomeDateInput = incomeInputs[0];
    const incomeFromInput = incomeInputs[1];
    const grossIncomeInput = incomeInputs[2];
    const netIncomeInput = incomeInputs[3];

    const investmentPercentage = budget.accounts.investmentFund.investmentPercentage;
    const savingsPercentage = budget.accounts.savingsFund.savingsPercentage;
    const incomePreviewAmounts = [
      ...document.querySelectorAll('.form__section--early-income-view__income-view__amount'),
      document.querySelector('.form__section--early-income-view__income-view--purple__amount'),
    ];

    netIncomeInput.addEventListener('keyup', (e) => {
      e.preventDefault();
      incomePreviewAmounts[0].textContent = money.format(netIncomeInput.value * investmentPercentage);
      incomePreviewAmounts[1].textContent = money.format(netIncomeInput.value * savingsPercentage);
      incomePreviewAmounts[2].textContent = money.format(
        netIncomeInput.value - Number(incomePreviewAmounts[0].textContent.split('$')[1]) - Number(incomePreviewAmounts[1].textContent.split('$')[1])
      );
    });

    // ENTERING INCOME
    headerSubmitButtons[0].addEventListener('click', (e) => {
      const unAllocatedAmount = budget.accounts.unAllocated.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1]);
      const savingsAmount = budget.accounts.savingsFund.amount + Number(incomePreviewAmounts[1].textContent.split('$')[1]);
      const investmentAmount = budget.accounts.investmentFund.amount + Number(incomePreviewAmounts[0].textContent.split('$')[1]);
      const updateObject = {
        budgetId: budget._id,
        userId: user._id,
        user: user,
        accounts: {
          unAllocated: {
            amount: unAllocatedAmount,
          },
          monthlyBudget: placeholderBudget.accounts.monthlyBudget,
          emergencyFund: placeholderBudget.accounts.emergencyFund,
          savingsFund: {
            savingsGoal: placeholderBudget.accounts.savingsFund.savingsGoal,
            savingsPercentage: placeholderBudget.accounts.savingsFund.savingsPercentage,
            amount: savingsAmount,
          },
          expenseFund: placeholderBudget.accounts.expenseFund,
          surplus: placeholderBudget.accounts.surplus,
          investmentFund: {
            investmentGoal: placeholderBudget.accounts.investmentFund.investmentGoal,
            investmentPercentage: placeholderBudget.accounts.investmentFund.investmentPercentage,
            amount: investmentAmount,
          },
          debt: placeholderBudget.accounts.debt,
        },
      };

      placeholderBudget._updateBudget(
        `Update`,
        `Enter Income`,
        {
          updateObject: updateObject,
        },
        `Enter-Income`
      );
      incomeDateInput.value = '';
      incomeFromInput.value = '';
      grossIncomeInput.value = '';
      netIncomeInput.value = '';
      incomePreviewAmounts[0].textContent = money.format(0);
      incomePreviewAmounts[1].textContent = money.format(0);
      incomePreviewAmounts[2].textContent = money.format(0);
    });
  }

  // ** TOP PRIORITY ** When it is possible, record the income as a deposit transaction in the recent transactions page.

  // arrayOfArrays = mainCategoryOptionArrays

  const rowThirds = document.querySelectorAll('.form__row--thirds');
  arrayOfArrays.forEach((a, i) => {
    a.forEach((c, i) => {
      // console.log(c);
      if (c) {
        c.classList.add(`closed`);
      }
    });
  });
  const accountOptions = document.querySelectorAll('.form__select--accounts__option');
  let clicked;
  accountOptions.forEach((ao, i) => {
    ao.addEventListener('click', (e) => {
      e.preventDefault();
      clicked = e.target;

      // MONTHLY BUDGET OPTIONS
      if (clicked.value === `Monthly Budget`) {
        if (rowThirds[1].classList.contains('extend-enter-transaction')) {
          rowThirds[1].classList.toggle('extend-enter-transaction');
        }
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.classList.add('closed');
            c.classList.remove('open');
          });
        });
        arrayOfArrays[0].forEach((a, i) => {
          a.classList.remove('closed');
          a.classList.add('open');
          if (i === 0) a.classList.add('label-container');
          if (i === 1) a.classList.add('label-container');
        });
      }

      // EMERGENCY FUND OPTIONS
      if (clicked.value === `Emergency Fund`) {
        if (rowThirds[1].classList.contains('extend-enter-transaction')) {
          rowThirds[1].classList.toggle('extend-enter-transaction');
        }
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.classList.add('closed');
            c.classList.remove('open');
          });
        });
        arrayOfArrays[1].forEach((a, i) => {
          a.classList.remove('closed');
          a.classList.add('open');
        });
      }

      // SAVINGS FUND OPTIONS
      if (clicked.value === `Savings Fund`) {
        if (rowThirds[1].classList.contains('extend-enter-transaction')) {
          rowThirds[1].classList.toggle('extend-enter-transaction');
        }
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.classList.add('closed');
            c.classList.remove('open');
          });
        });
        arrayOfArrays[2].forEach((a, i) => {
          a.classList.remove('closed');
          a.classList.add('open');
          if (i === 0) a.classList.add('label-container');
          if (i === 1) a.classList.add('label-container');
          if (i === 4) {
            a.firstChild.classList.add('form__label--fully-paid-for');
            a.firstChild.classList.add('r__form__label--fully-paid-for');
            a.firstChild.addEventListener('click', (e) => {
              a.firstChild.firstChild.nextSibling.classList.toggle('form__input-container--paid-for--clicked');
            });
          }
        });
      }

      // EXPENSE FUND OPTIONS
      if (clicked.value === `Expense Fund`) {
        const expenseFundTransactionSelects = document.querySelectorAll('.form__select--expense-fund-transaction');
        let expenseSelectWidth;
        // if (!rowThirds[1].classList.contains('extend-enter-transaction')) {
        //   rowThirds[1].classList.toggle('extend-enter-transaction');
        // }
        let extendedRow = rowThirds[1];
        let expenseTitles =
          extendedRow.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling
            .childNodes;
        expenseTitles.forEach((expense) => {
          if (expense.text.length >= 8 && !rowThirds[1].classList.contains('extend-enter-transaction')) {
            rowThirds[1].classList.add('extend-enter-transaction');
            console.log(`Extended.`);
          }
        });
        if (expenseFundTransactionSelects[2].getBoundingClientRect().width > 0) expenseSelectWidth = expenseFundTransactionSelects[2].getBoundingClientRect().width;
        console.log(expenseFundTransactionSelects[2].getBoundingClientRect().width);
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.classList.add('closed');
            c.classList.remove('open');
          });
        });
        arrayOfArrays[3].forEach((a, i) => {
          a.classList.remove('closed');
          a.classList.add('open');
          if (i === 0) a.classList.add('label-container');
          if (i === 1) a.classList.add('label-container');
          if (i === 4) {
            a.nextSibling.firstChild.classList.add('form__label--fully-paid-for');
            a.nextSibling.firstChild.classList.add('r__form__label--fully-paid-for');
            a.nextSibling.firstChild.addEventListener('click', (e) => {
              a.nextSibling.firstChild.firstChild.nextSibling.classList.toggle('form__input-container--paid-for--clicked');
            });
          }
        });
      }

      // SURPLUS OPTIONS
      if (clicked.value === `Surplus`) {
        if (rowThirds[1].classList.contains('extend-enter-transaction')) {
          rowThirds[1].classList.toggle('extend-enter-transaction');
        }
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.classList.add('closed');
            c.classList.remove('open');
          });
        });
        arrayOfArrays[4].forEach((a, i) => {
          a.classList.remove('closed');
          a.classList.add('open');
          if (i === 0) a.classList.add('label-container');
          if (i === 1) a.classList.add('label-container');
          if (i === 4) {
            a.firstChild.classList.add('fully-paid-for');
            a.firstChild.addEventListener('click', (e) => {
              a.firstChild.firstChild.nextSibling.classList.toggle('form__input-container--paid-for--clicked');
            });
          }
        });
      }

      // DEBT OPTIONS
      if (clicked.value === `Debt`) {
        if (rowThirds[1].classList.contains('extend-enter-transaction')) {
          rowThirds[1].classList.toggle('extend-enter-transaction');
        }
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.classList.add('closed');
            c.classList.remove('open');
          });
        });
        arrayOfArrays[5].forEach((a, i) => {
          a.classList.remove('closed');
          a.classList.add('open');
          if (i === 0) a.classList.add('label-container');
          if (i === 3) {
            a.firstChild.classList.add('fully-paid-for');
            a.firstChild.addEventListener('click', (e) => {
              a.firstChild.firstChild.nextSibling.classList.toggle('form__input-container--paid-for--clicked');
            });
          }
        });
      }

      // TITHING OPTIONS
      if (clicked.value === `Tithing`) {
        if (rowThirds[1].classList.contains('extend-enter-transaction')) {
          rowThirds[1].classList.toggle('extend-enter-transaction');
        }
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.classList.add('closed');
            c.classList.remove('open');
          });
        });
        arrayOfArrays[6].forEach((a, i) => {
          a.classList.remove('closed');
          a.classList.add('open');
        });
      }
    });
  });
};

const _watchBudgetNavigation = () => {
  const budgetNavButton = document.querySelector('.button--budget-navigation');
  const budgetNavigation = document.querySelector('.navigation');
  const linkButtons = document.querySelectorAll('.navigation__link-list__list-item__link-button');

  if (budgetNavButton) {
    budgetNavButton.addEventListener('click', (e) => {
      e.preventDefault();
      budgetNavButton.classList.toggle('button--budget-navigation--clicked');
      budgetNavigation.classList.toggle('closed');
      budgetNavigation.classList.toggle('open-navigation');
      if (!budgetNavButton.classList.contains('budget-navigation--visible')) linkButtons.forEach((lb) => lb.closest('li').nextSibling.classList.add('closed'));
    });
  }
  if (linkButtons) {
    linkButtons.forEach((lb) => {
      lb.addEventListener('click', (e) => {
        e.preventDefault();
        const clicked = e.target.closest('li');
        const siblingLinkContainer = clicked.nextSibling;
        linkButtons.forEach((lb) => {
          lb.closest('li').nextSibling.classList.add('closed');
          lb.closest('li').nextSibling.classList.remove('open');
          console.log(lb.closest('li'));
        });
        if (!siblingLinkContainer.classList.contains('open')) {
          siblingLinkContainer.classList.toggle('closed');
          siblingLinkContainer.classList.toggle('open');
        }
      });
    });
  }
};

const finalTransactionArrayPush = (finalArray, arrays) => {
  arrays.forEach((a) => {
    finalArray.push(a);
  });
};

const pushIntoArray = (arrayFiller, array) => {
  arrayFiller.forEach((af) => {
    array.push(af);
  });
  return array;
};

const setupDashboard = (user, budget, placeholderBudget) => {
  ////////////////////////////////////////////
  // SETUP ACCOUNT OPTIONS FOR TRANSACTIONS
  const formLabels = document.querySelectorAll('.form-label');
  const formInputs = document.querySelectorAll('.form-input');
  const formSections = document.querySelectorAll('.form-row__section');

  const relativeMediumFormLabels = document.querySelectorAll('.form__label--medium__relative');

  const mediumFormSections = document.querySelectorAll('.form__section--medium');
  const mediumLeftPaddedSections = document.querySelectorAll('.form__section--medium__padded--left');
  const mediumTopLeftPaddedSections = document.querySelectorAll('.form__section--medium__padded--topLeft');
  const longFormSections = document.querySelectorAll('.form__section--long');
  const longTopLeftPaddedSections = document.querySelectorAll('.form__section--long__padded--topLeft');

  const paidForContainers = document.querySelectorAll('.form__section--switch__fully-paid-for');
  const altPaidForContainers = document.querySelectorAll('.form__section--switch__fully-paid-for__alt');
  ///////////////////////////////////////////////
  // INITIALIZE ACCOUNT TRANSACTION OPTION ARRAYS

  console.log(relativeMediumFormLabels);

  // MONTHLY BUDGET
  const monthlyBudgetTransactionsOptionsOne = [relativeMediumFormLabels[0], relativeMediumFormLabels[1]];
  const monthlyBudgetTransactionsOptionsTwo = [mediumFormSections[5], longFormSections[0]];
  const monthlyBudgetTransactionOptionsArray = [];

  // EMERGENCY FUND
  const emergencyFundTransactionsOptions = [longTopLeftPaddedSections[0], mediumTopLeftPaddedSections[0]];
  const emergencyFundTransactionOptionsArray = [];

  // SAVINGS FUND
  const savingsFundTransactionsOptionsOne = [relativeMediumFormLabels[2], relativeMediumFormLabels[3]];
  const savingsFundTransactionsOptionsTwo = [longFormSections[1], mediumFormSections[6]];
  const savingsFundTransactionsOptionsThree = document.querySelectorAll('.form__section--switch__fully-paid-for')[0];
  const savingsFundTransactionOptionsArray = [];

  // EXPENSE FUND
  const expenseFundTransactionsOptionsOne = [relativeMediumFormLabels[4], relativeMediumFormLabels[5], relativeMediumFormLabels[6]];
  const expenseFundTransactionsOptionsTwo = [longFormSections[2], mediumFormSections[7]];
  const expenseFundTransactionsOptionsThree = [altPaidForContainers[0]];
  const expenseFundTransactionOptionsArray = [];

  // SURPLUS
  const surplusTransactionsOptionsOne = [relativeMediumFormLabels[7], relativeMediumFormLabels[8]];
  const surplusTransactionsOptionsTwo = [longFormSections[3], mediumFormSections[8]];
  const surplusTransactionsOptionsThree = [altPaidForContainers[1]];
  const surplusTransactionOptionsArray = [];

  // DEBT
  const debtTransactionsOptionsOne = [relativeMediumFormLabels[9], relativeMediumFormLabels[10]];
  const debtTransactionsOptionsTwo = [longFormSections[4], mediumFormSections[9]];
  const debtTransactionsOptionsThree = [altPaidForContainers[2]];
  const debtTransactionOptionsArray = [];

  // TITHING
  const tithingTransactionsOptions = document.querySelectorAll('.tithing-transaction');
  const tithingTransactionOptionsArray = [];

  const mainCategoryOptionArrays = [];

  ///////////////////////////////
  // MONTHLY BUDGET OPTIONS
  pushIntoArray(monthlyBudgetTransactionsOptionsOne, monthlyBudgetTransactionOptionsArray);
  pushIntoArray(monthlyBudgetTransactionsOptionsTwo, monthlyBudgetTransactionOptionsArray);
  pushIntoArray(emergencyFundTransactionsOptions, emergencyFundTransactionOptionsArray);
  pushIntoArray(savingsFundTransactionsOptionsOne, savingsFundTransactionOptionsArray);
  pushIntoArray(savingsFundTransactionsOptionsTwo, savingsFundTransactionOptionsArray);
  pushIntoArray([savingsFundTransactionsOptionsThree], savingsFundTransactionOptionsArray);
  pushIntoArray(expenseFundTransactionsOptionsOne, expenseFundTransactionOptionsArray);
  pushIntoArray(expenseFundTransactionsOptionsTwo, expenseFundTransactionOptionsArray);
  pushIntoArray(expenseFundTransactionsOptionsThree, expenseFundTransactionOptionsArray);
  pushIntoArray(surplusTransactionsOptionsOne, surplusTransactionOptionsArray);
  pushIntoArray(surplusTransactionsOptionsTwo, surplusTransactionOptionsArray);
  pushIntoArray(surplusTransactionsOptionsThree, surplusTransactionOptionsArray);
  pushIntoArray(debtTransactionsOptionsOne, debtTransactionOptionsArray);
  pushIntoArray(debtTransactionsOptionsTwo, debtTransactionOptionsArray);
  pushIntoArray(debtTransactionsOptionsThree, debtTransactionOptionsArray);
  pushIntoArray(tithingTransactionsOptions, tithingTransactionOptionsArray);

  finalTransactionArrayPush(mainCategoryOptionArrays, [
    monthlyBudgetTransactionOptionsArray,
    emergencyFundTransactionOptionsArray,
    savingsFundTransactionOptionsArray,
    expenseFundTransactionOptionsArray,
    surplusTransactionOptionsArray,
    debtTransactionOptionsArray,
    tithingTransactionOptionsArray,
  ]);

  if (user.latterDaySaint === true) mainCategoryOptionArrays.push(tithingTransactionOptionsArray);
  ////////////////////////////////////////////
  // START BY WATCHING THE BUDGET NAVIGATION
  _watchBudgetNavigation();

  ////////////////////////////////////////////
  // WATCH FOR ACCOUNT SELECTION
  _watchForTransactions(mainCategoryOptionArrays, budget, placeholderBudget, user);

  ////////////////////////////////////////////
  // GET BANK ACCOUNT TOTAL
  getDashboardAccountTotals(budget);

  ////////////////////////////////////////////
  // SETUP BILL CALENDAR
  _setupBillCalendar();
  ////////////////////////////////////////////
  // SETUP BILL CURRENT MONTH
  _setupCurrentMonth(budget);
};

export const _watchBudget = async () => {
  console.log(`WATCHING YOUR BUDGET`);
  /////////////////////////////
  // GET USER
  const userInfo = await Updating.getSomePersonals();
  const user = userInfo.data.data.user;

  ////////////////////////////////////////////
  // GET BUDGET INFORMATION
  let currentBudget;
  user.budgets.forEach((b) => {
    if (b._id === window.location.pathname.split('/')[5]) currentBudget = b;
  });
  let budget = Budget.startToCreate();
  budget._buildPlaceHolderBudget(currentBudget, user);
  console.log(budget);

  if (!currentBudget) return;
  ////////////////////////////////////////////
  // WATCH BUDGET MANAGEMENT PAGE
  setupDashboard(user, currentBudget, budget);
  ////////////////////////////////////////////
  // WATCH BUDGET MANAGEMENT PAGE
  _setupBudgetManagement(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH EDIT CATEGORY GOALS PAGE
  _watchEditCategoryGoals(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH MANAGE CATEGORIES PAGE
  _watchManageCategories(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  _watchIncomeAllocation(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  _watchTransactionPlanner(currentBudget, budget, user);
};
