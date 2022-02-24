import * as Updating from './Update-User';
import * as Calendar from './FrontEnd-Calendar';
import * as Budget from './Manage-Budget';
import * as Edit from './Budget-Creation';

// Class of the 'days' on the Calendar.
// bill-calendar-container__calendar-container__calendar__days__single-day

const watchForBudgetDeletion = () => {
  const budgetDeleteButton = document.querySelector(`.budget-container__budget-management-container--extra-small__budget-exit-or-delete-form__submit--delete`);
  const budgetId = window.location.pathname.split('/')[5];
  const userId = window.location.pathname.split('/')[3];
  budgetDeleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    Budget.deleteMyBudget(budgetId, userId);
  });
};

const watchForBudgetExit = () => {
  const exitButton = document.querySelector('.budget-container__budget-management-container--extra-small__budget-exit-or-delete-form__submit--exit');
  const userId = window.location.pathname.split('/')[3];
  exitButton.addEventListener('click', (e) => {
    e.preventDefault();
    Budget.exitBudget(userId);
  });
};

const setMainCategoryTitle = (mainCategory, title) => {
  return (mainCategory.title = title);
};

const fillSubCategoryArray = (updateObject, index) => {
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

const getSubCategoryTiming = (budget, mainCategory, index) => {
  const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
  console.log(subCategories);
  budget.mainCategories[index].subCategories.forEach((msc, i) => {
    if (msc.timingOptions.paymentCycle && Number(subCategories[i].dataset.subcategory) === index) {
      console.log(subCategories[i]);
      console.log(i, index);
      subCategories[i].firstChild.nextSibling.firstChild.nextSibling.textContent = msc.timingOptions.paymentCycle;
    }
    console.log(`Fetching Sub Category Index...`, index);
    console.log(subCategories[i].dataset.subcategory);
  });
};

const getSinglePercentageSpent = (spent, total) => {
  let percentage = (spent / total).toFixed(2);
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
  console.log(overall);
  return overall;
};

const _watchEditCategoryGoals = (budget, user) => {
  const editCategoryGoalsContainer = document.querySelector('.budget-container__edit-category-goals-container--large');
  if (editCategoryGoalsContainer) {
    const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
    const timingFunctionContainer = document.querySelector('.sub-category-display__timing-container');
    const editCategoryGoalsSubmit = document.querySelector('.budget-container__update-budget-categories-button-container__button');
    Edit.setupTimingFunctionContainer(timingFunctionContainer);
    let clickedItem, selectedTiming;
    let subCategoryIndex = 0;
    Edit.watchForSettingTiming(budget, subCategoryIndex, clickedItem, selectedTiming);
    console.log(budget, user);

    // This is where we will need to check the timingOptions of each sub-category, and peform the operations necessary.

    // export const insertTiiming = (target, inputValues, timing, timingButtons, budget, index) => {
    // budget.mainCategories.forEach((mc, i) => {
    //   mc.subCategories.forEach((sc, i) => {
    //     console.log(sc.timingOptions);
    //     let target, timing;
    //     // if (sc.timingOptions.paymentCycle) {
    //     //   console.log(subCategories[i], subCategories[i].firstChild.nextSibling.firstChild.nextSibling);
    //     //   console.log(sc.timingOptions.paymentCycle);
    //     //   console.log(subCategories[i].firstChild.nextSibling.firstChild);
    //     //   target = subCategories[i].firstChild.nextSibling.firstChild.nextSibling;
    //     //   timing = sc.timingOptions.paymentCycle;
    //     //   sc.timingOptions.dueDates.forEach((dd) => {
    //     //     let timingArray;
    //     //     console.log(dd);
    //     //     console.log(dd.length);
    //     //     typeof dd === `object` && dd.length > 1 ? dd.forEach((d) => console.log(d)) : console.log(dd);

    //     //     timingArray = [dd];
    //     //     if (typeof dd === `object` && dd.length > 1) {
    //     //       timingArray = dd;
    //     //     }
    //     //     console.log(timingArray);
    //     //     timingArray = timingArray.map((timingItem) => new Date(`${timingItem}`));
    //     //     timingArray.forEach((timing) => console.log(timing.getDay()));
    //     //     // Edit.insertTiiming(target, timingArray, timing, `timingButtons`, budget, subCategoryIndex);
    //     //   });
    //     // }
    //   });
    // });

    const mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
    mainCategoryTitles.forEach((mc, i) => {
      getSubCategoryTiming(budget, mc, i);
    });

    // if (timing === `Monthly`) {
    //   timingArray = [];
    //   timingArray.push(monthlyTiming);
    //   return insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
    // }
    // if (timing === `Bi-Monthly`) {
    //   e.preventDefault();
    //   const oldTimingOne = new Date(document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label__input')[0].value);
    //   const oldTimingTwo = new Date(document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label__input')[1].value);
    //   const timingOne = new Date(oldTimingOne.setHours(oldTimingOne.getHours() + 7));
    //   const timingTwo = new Date(oldTimingTwo.setHours(oldTimingTwo.getHours() + 7));
    //   timingArray = [];
    //   timingArray.push(timingOne);
    //   timingArray.push(timingTwo);
    //   return insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
    // }

    // if (timing === `Bi-Weekly`) {
    //   const oldBiWeeklyTiming = new Date(document.querySelector('.sub-category-display__timing-container__bi-weekly-container__label__input').value);
    //   const biWeeklyTiming = new Date(oldBiWeeklyTiming.setHours(oldBiWeeklyTiming.getHours() + 7));
    //   const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
    //   timingArray = [];
    //   timingArray.push(biWeeklyTiming);
    //   insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
    //   return;
    // }

    // if (timing === `Weekly`) {
    //   const oldWeeklyTiming = new Date(document.querySelector('.sub-category-display__timing-container__weekly-container__label__select').value);
    //   const weeklyTiming = new Date(oldWeeklyTiming.setHours(oldWeeklyTiming.getHours() + 7));
    //   timingArray = [];
    //   timingArray.push(weeklyTiming);
    //   insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
    // }

    // insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);

    const money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    const individualPayments = document.querySelectorAll('.individual-payment');
    individualPayments.forEach((ip, i) => {
      ip.addEventListener('keyup', (e) => {
        e.preventDefault();
        console.log(ip.value);
        const overallBudget = document.querySelectorAll('.budget-single-goal-summary__amount');
        console.log(overallBudget[0]);
        let spent = ip.closest('section').nextSibling.firstChild;
        let remaining = ip.closest('section').nextSibling.nextSibling.firstChild;
        let percentageSpent = ip.closest('section').nextSibling.nextSibling.nextSibling.firstChild;
        let overallSpent = overallBudget[1];
        let overallRemaining = overallBudget[2];
        let overallPercentageSpent = overallBudget[3];
        let total = getOverallBudget(subCategories, overallBudget[0]);
        let part = getOverallSpent(subCategories, overallSpent);
        let percentage = getOverallPercentageSpent(total, part);
        overallBudget[0].textContent = money.format(getOverallBudget(subCategories, overallBudget[0]));
        overallSpent.textContent = money.format(part);
        overallRemaining.textContent = money.format(total - part);
        overallPercentageSpent.textContent = `${percentage}%`;
        spent.textContent = money.format(spent.textContent.split('$')[1]);
        remaining.textContent = money.format(ip.value - 0);
        percentageSpent.textContent = `${getSinglePercentageSpent(Number(spent.textContent.split('$')[1]), ip.value)}%`;
      });
      ip.addEventListener('blur', (e) => {
        e.preventDefault();
        ip.value = Number(ip.value).toFixed(2);
      });
    });
    editCategoryGoalsSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const newBudget = buildUpdateObject(budget, user, `Main Categories`, budget.name, budget.mainCategories, `Objects`);
    });
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
  if (emergencySetting === `Length Of Time`) {
    emergencyFundGoal = Number(document.querySelector('.budget-container__budget-management-container--extra-small__budget-emergency-goal-form__selection-container__input').value);
    emergencyFundGoalTiming = document.querySelector('.budget-container__budget-management-container--extra-small__budget-emergency-goal-form__selection-container__select').value;
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
    emergencyFundGoal = Number(document.querySelector('.budget-container__budget-management-container--extra-small__budget-emergency-goal-form__input').value);
  }
};

const getInvestmentFund = (budget) => {
  let investmentFund = {};
  let investmentGoal = Number(document.querySelectorAll('.budget-container__budget-management-container--extra-small__budget-investment-goal-form__input')[0].value);
  let investmentPercentage = Number(document.querySelectorAll('.budget-container__budget-management-container--extra-small__budget-investment-goal-form__input')[1].value);
  if (investmentGoal === '' || investmentGoal === undefined || investmentGoal === null) investmentGoal = budget.accounts.investmentFund.investmentGoal;
  if (investmentPercentage === '' || investmentPercentage === undefined || investmentPercentage === null)
    investmentPercentage = budget.accounts.investmentFund.investmentPercentage;
  investmentFund.investmentGoal = investmentGoal;
  investmentFund.investmentPercentage = investmentPercentage / 100;
  investmentFund.amount = budget.accounts.investmentFund.amount;
  return investmentFund;
};

const getSavingsFund = (budget) => {
  let savingsFund = {};
  let savingsGoal = Number(document.querySelectorAll('.budget-container__budget-management-container--extra-small__budget-savings-goal-form__input')[0].value);
  let savingsPercentage = Number(document.querySelectorAll('.budget-container__budget-management-container--extra-small__budget-savings-goal-form__input')[1].value);
  if (savingsGoal === '' || savingsGoal === undefined || savingsGoal === null) savingsGoal = budget.accounts.savingsFund.savingsGoal;
  if (savingsPercentage === '' || savingsPercentage === undefined || savingsPercentage === null) savingsPercentage = budget.accounts.savingsFund.savingsPercentage;
  savingsFund.savingsGoal = savingsGoal;
  savingsFund.savingsPercentage = savingsPercentage / 100;
  savingsFund.amount = budget.accounts.savingsFund.amount;
  return savingsFund;
};

const getBudgetName = (budget) => {
  let budgetName = document.querySelector('.budget-container__budget-management-container--extra-small__budget-name-form__input').value;
  if (budgetName === '') budgetName = budget.name;
  return budgetName;
};

const watchBudgetManatementUpdates = (emergencySetting, currentTithingSetting, budget, user) => {
  // GET BUDGET NAME
  const budgetName = getBudgetName(budget);
  const savingsFund = getSavingsFund(budget);
  const investmentFund = getInvestmentFund(budget);
  const emergencyFund = getEmergencyFund(budget, emergencySetting);
  let tithing;
  if (user.latterDaySaint === true) {
    tithing = getTithing(budget, user, currentTithingSetting);
  }
  console.log(budgetName, savingsFund, investmentFund, emergencyFund, tithing);
  const newBudget = buildUpdateObject(
    budget,
    user,
    `Accounts`,
    budgetName,
    [`unAllocated`, `monthlyBudget`, `emergencyFund`, `savingsFund`, `expenseFund`, `surplus`, `investmentFund`, `debt`, `tithing`],
    [
      budget.accounts.unAllocated,
      budget.accounts.monthlyBudget,
      emergencyFund,
      savingsFund,
      budget.accounts.expenseFund,
      budget.accounts.surplus,
      investmentFund,
      budget.accounts.debt,
      tithing,
    ]
  );
  console.log(newBudget);
  Budget.updateMyBudget(newBudget);
};

const changeEmergencyInput = (array, setting) => {
  if (setting === `Length Of Time`) {
    array.forEach((eSetting) => eSetting.classList.remove('visible'));
    array[0].classList.add('visible');
    console.log(setting);
  }
  if (setting === `Total Amount`) {
    array.forEach((eSetting) => eSetting.classList.remove('visible'));
    array[1].classList.add('visible');
    console.log(setting);
  }
};

const _watchBudgetManagement = (budget, user) => {
  const budgetNameDisplay = document.querySelector('.budget-container__budget-management-container--extra-small__budget-name-form__budget-name-display');
  const budgetNameInput = document.querySelector('.budget-container__budget-management-container--extra-small__budget-name-form__input');
  if (window.location.pathname.split('/')[6] === `Budget-Management`) {
    budgetNameInput.addEventListener('keyup', (e) => {
      e.preventDefault();
      budgetNameDisplay.textContent = budgetNameInput.value;
    });
    const emergencyFundSettings = document.querySelectorAll(
      '.budget-container__budget-management-container--extra-small__budget-emergency-goal-form__label-container--checkbox-container'
    );
    let emergencySetting;

    const emergencySelectionContainer = document.querySelector('.budget-container__budget-management-container--extra-small__budget-emergency-goal-form__selection-container');
    const emergencyTotalInput = document.querySelector('.budget-container__budget-management-container--extra-small__budget-emergency-goal-form__input');
    const emergencySettings = [emergencySelectionContainer, emergencyTotalInput];
    emergencySettings.forEach((eSetting) => eSetting.classList.remove('visible'));
    budget.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time` ? emergencySettings[0].classList.add('visible') : emergencySettings[1].classList.add('visible');

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

    const tithingCheckboxes = document.querySelectorAll(
      '.budget-container__budget-management-container--extra-small__budget-tithing-setting-form__setting-container__label-container__input--checkbox'
    );
    let currentTithingSetting;
    if (budget.accounts.tithing.tithingSetting) {
      const tithingSettings = document.querySelectorAll(
        '.budget-container__budget-management-container--extra-small__budget-tithing-setting-form__setting-container__label-container'
      );
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
    const budgetNameSubmit = document.querySelector('.budget-container__budget-management-container--extra-small__budget-name-form__submit');
    const savingsGoalSubmit = document.querySelector('.budget-container__budget-management-container--extra-small__budget-savings-goal-form__submit');
    const investmentGoalSubmit = document.querySelector('.budget-container__budget-management-container--extra-small__budget-investment-goal-form__submit');
    const emergencyGoalSubmit = document.querySelector('.budget-container__budget-management-container--extra-small__budget-emergency-goal-form__submit');
    const tithingSettingSubmit = document.querySelector('.budget-container__budget-management-container--extra-small__budget-tithing-setting-form__submit');
    const updateSubmitButtons = [budgetNameSubmit, savingsGoalSubmit, investmentGoalSubmit, emergencyGoalSubmit];

    if (user.latterDaySaint === true) {
      updateSubmitButtons.push(tithingSettingSubmit);
    }
    updateSubmitButtons.forEach((ub) => {
      ub.addEventListener('click', (e) => {
        e.preventDefault();
        watchBudgetManatementUpdates(emergencySetting, currentTithingSetting, budget, user);
      });
    });
    watchForBudgetExit();
    watchForBudgetDeletion();
  }
};

const cycleMainCategories = (direction, index, icons, titles, subCats) => {
  if (direction === `left`) {
    icons.forEach((ic) => {
      ic.style.display = `none`;
      icons[index].style.display = `flex`;
    });
    titles.forEach((t) => {
      t.style.display = `none`;
      titles[index].style.display = `flex`;
    });
    subCats.forEach((sc) => {
      sc.classList.add('sub-category-display__sub-category--hidden');
      if (Number(sc.dataset.subcategory) === index) sc.classList.remove('sub-category-display__sub-category--hidden');
    });
  }
  if (direction === `right`) {
    icons.forEach((ic) => {
      ic.style.display = `none`;
      icons[index].style.display = `flex`;
    });
    titles.forEach((t) => {
      t.style.display = `none`;
      titles[index].style.display = `flex`;
    });
    subCats.forEach((sc) => {
      sc.classList.add('sub-category-display__sub-category--hidden');
      if (Number(sc.dataset.subcategory) === index) sc.classList.remove('sub-category-display__sub-category--hidden');
    });
  }
};

const _setupCurrentMonth = () => {
  const categoryIcons = document.querySelectorAll('.main-category-display__category-display__icon');
  const categoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
  const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
  const leftButton = document.querySelector('.left');
  const rightButton = document.querySelector('.right');
  let categoryIndex = 0;
  categoryIcons.forEach((c, i) => {
    c.style.display = `none`;
    if (i === 0) c.style.display = `flex`;
  });
  categoryTitles.forEach((t, i) => {
    t.style.display = `none`;
    if (i === 0) t.style.display = `flex`;
  });
  subCategories.forEach((sc, i) => {
    sc.classList.add('sub-category-display__sub-category--hidden');
    if (Number(sc.dataset.subcategory) === 0) sc.classList.remove('sub-category-display__sub-category--hidden');
  });
  if (leftButton) {
    leftButton.addEventListener('click', (e) => {
      e.preventDefault();
      categoryIndex--;
      if (categoryIndex <= 0) categoryIndex = 0;
      cycleMainCategories('left', categoryIndex, categoryIcons, categoryTitles, subCategories);
    });
  }
  if (rightButton) {
    rightButton.addEventListener('click', (e) => {
      e.preventDefault();
      categoryIndex++;
      if (categoryIndex >= categoryIcons.length - 1) categoryIndex = categoryIcons.length - 1;
      cycleMainCategories('right', categoryIndex, categoryIcons, categoryTitles, subCategories);
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
    '.bill-calendar-container__calendar-container__calendar__days__single-day', // NEEDS PERIOD FOR .querySelectorAll
    'bill-calendar-container__calendar-container__calendar__days__single-day--current-day', // CLASS IS ONLY BEING ADDED via .classList.add
    'un-used-day' // CLASS IS ONLY BEING ADDED via .classList.add
  );

  const monthLeft = document.querySelector('.month-left');
  const monthRight = document.querySelector('.month-right');

  if (monthLeft) {
    monthLeft.addEventListener('click', (e) => {
      e.preventDefault();
      currentMonthIndex--;
      console.log(currentMonthIndex);
      if (currentMonthIndex === -1) {
        currentMonthIndex = 11;
        currentYear--;
        console.log(currentYear);
      }
      console.log(currentYear);
      calendar.goBackAMonth(
        currentMonthIndex,
        currentYear,
        '.bill-calendar-container__calendar-container__calendar__days__single-day',
        'bill-calendar-container__calendar-container__calendar__days__single-day--current-day',
        'un-used-day'
      );
    });
  }
  if (monthRight) {
    monthRight.addEventListener('click', (e) => {
      e.preventDefault();
      currentMonthIndex++;
      console.log(currentMonthIndex);
      if (currentMonthIndex === 12) {
        currentMonthIndex = 0;
        currentYear++;
        console.log(currentYear);
      }
      console.log(currentYear);
      calendar.goForwardAMonth(
        currentMonthIndex,
        currentYear,
        '.bill-calendar-container__calendar-container__calendar__days__single-day',
        'bill-calendar-container__calendar-container__calendar__days__single-day--current-day',
        'un-used-day'
      );
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

const _watchForTransactions = (arrayOfArrays) => {
  arrayOfArrays.forEach((a, i) => {
    a.forEach((c, i) => {
      // console.log(c);
      c.style.display = `none`;
    });
  });
  const accountOptions = document.querySelectorAll('.account-selection__option');
  let clicked;
  accountOptions.forEach((ao, i) => {
    ao.addEventListener('click', (e) => {
      e.preventDefault();
      clicked = e.target;

      // MONTHLY BUDGET OPTIONS
      if (clicked.value === `Monthly Budget`) {
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.style.display = `none`;
          });
        });
        arrayOfArrays[0].forEach((a, i) => {
          a.style.display = `flex`;
          if (i === 0) a.classList.add('label-container');
          if (i === 1) a.classList.add('label-container');
        });
      }

      // EMERGENCY FUND OPTIONS
      if (clicked.value === `Emergency Fund`) {
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.style.display = `none`;
          });
        });
        arrayOfArrays[1].forEach((a, i) => {
          a.style.display = `flex`;
        });
      }

      // SAVINGS FUND OPTIONS
      if (clicked.value === `Savings Fund`) {
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.style.display = `none`;
          });
        });
        arrayOfArrays[2].forEach((a, i) => {
          a.style.display = `flex`;
          if (i === 0) a.classList.add('label-container');
          if (i === 1) a.classList.add('label-container');
          if (i === 4) {
            a.firstChild.classList.add('fully-paid-for');
            a.firstChild.addEventListener('click', (e) => {
              a.firstChild.firstChild.nextSibling.classList.toggle('paid-for-container--clicked');
            });
          }
        });
      }

      // EXPENSE FUND OPTIONS
      if (clicked.value === `Expense Fund`) {
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.style.display = `none`;
          });
        });
        arrayOfArrays[3].forEach((a, i) => {
          a.style.display = `flex`;
          if (i === 0) a.classList.add('label-container');
          if (i === 1) a.classList.add('label-container');
          if (i === 4) {
            a.firstChild.classList.add('fully-paid-for');
            a.firstChild.addEventListener('click', (e) => {
              a.firstChild.firstChild.nextSibling.classList.toggle('paid-for-container--clicked');
            });
          }
        });
      }

      // SURPLUS OPTIONS
      if (clicked.value === `Surplus`) {
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.style.display = `none`;
          });
        });
        arrayOfArrays[4].forEach((a, i) => {
          a.style.display = `flex`;
          if (i === 0) a.classList.add('label-container');
          if (i === 1) a.classList.add('label-container');
          if (i === 4) {
            a.firstChild.classList.add('fully-paid-for');
            a.firstChild.addEventListener('click', (e) => {
              a.firstChild.firstChild.nextSibling.classList.toggle('paid-for-container--clicked');
            });
          }
        });
      }

      // DEBT OPTIONS
      if (clicked.value === `Debt`) {
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.style.display = `none`;
          });
        });
        arrayOfArrays[5].forEach((a, i) => {
          a.style.display = `flex`;
          if (i === 0) a.classList.add('label-container');
          if (i === 3) {
            a.firstChild.classList.add('fully-paid-for');
            a.firstChild.addEventListener('click', (e) => {
              a.firstChild.firstChild.nextSibling.classList.toggle('paid-for-container--clicked');
            });
          }
        });
      }

      // TITHING OPTIONS
      if (clicked.value === `Tithing`) {
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.style.display = `none`;
          });
        });
        arrayOfArrays[6].forEach((a, i) => {
          a.style.display = `flex`;
        });
      }
    });
  });
};

const _watchBudgetNavigation = () => {
  const budgetNavButton = document.querySelector('.budget-container__navigation-button-container__button');
  const budgetNavigation = document.querySelector('.budget-navigation');
  const linkButtons = document.querySelectorAll('.budget-navigation__link-list__list-item__link-button');

  if (budgetNavButton) {
    budgetNavButton.addEventListener('click', (e) => {
      e.preventDefault();
      budgetNavButton.classList.toggle('budget-container__navigation-button-container__button--clicked');
      budgetNavigation.classList.toggle('budget-navigation--visible');
      if (!budgetNavButton.classList.contains('budget-navigation--visible')) linkButtons.forEach((lb) => lb.closest('li').nextSibling.classList.remove('revealed'));
    });
  }
  if (linkButtons) {
    linkButtons.forEach((lb) => {
      lb.addEventListener('click', (e) => {
        e.preventDefault();
        const clicked = e.target.closest('li');
        const siblingLinkContainer = clicked.nextSibling;
        linkButtons.forEach((lb) => {
          lb.closest('li').nextSibling.classList.remove('revealed');
          console.log(lb.closest('li'));
        });
        !siblingLinkContainer.classList.contains('revealed') ? siblingLinkContainer.classList.toggle('revealed') : siblingLinkContainer.classList.remove('revealed');
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

  if (!currentBudget) return;

  ////////////////////////////////////////////
  // SETUP ACCOUNT OPTIONS FOR TRANSACTIONS
  const formLabels = document.querySelectorAll('.form-label');
  const formInputs = document.querySelectorAll('.form-input');
  const formSections = document.querySelectorAll('.form-row__section');

  //////////////////////////////
  // INITIALIZE ACCOUNT ARRAYS

  // MONTHLY BUDGET
  const monthlyBudgetTransactions = document.querySelectorAll('.monthly-budget-transaction');
  const monthlyBudgetTransactionOptions = [];

  // EMERGENCY FUND
  const emergencyFundTransactions = document.querySelectorAll('.emergency-fund-transaction');
  const emergencyFundTransactionOptions = [];

  // SAVINGS FUND
  const savingsFundTransactions = document.querySelectorAll('.savings-fund-transaction');
  const savingsFundTransactionOptions = [];

  // EXPENSE FUND
  const expenseFundTransactions = document.querySelectorAll('.expense-fund-transaction');
  const expenseFundTransactionOptions = [];

  // SURPLUS
  const surplusTransactions = document.querySelectorAll('.surplus-transaction');
  const surplusTransactionOptions = [];

  // DEBT
  const debtTransactions = document.querySelectorAll('.debt-transaction');
  const debtTransactionOptions = [];

  // TITHING
  const tithingTransactions = document.querySelectorAll('.tithing-transaction');
  const tithingTransactionOptions = [];

  const mainCategoryOptionArrays = [];

  ///////////////////////////////
  // MONTHLY BUDGET OPTIONS
  pushIntoArray(monthlyBudgetTransactions, monthlyBudgetTransactionOptions);
  pushIntoArray(emergencyFundTransactions, emergencyFundTransactionOptions);
  pushIntoArray(savingsFundTransactions, savingsFundTransactionOptions);
  pushIntoArray(expenseFundTransactions, expenseFundTransactionOptions);
  pushIntoArray(surplusTransactions, surplusTransactionOptions);
  pushIntoArray(debtTransactions, debtTransactionOptions);
  pushIntoArray(tithingTransactions, tithingTransactionOptions);

  finalTransactionArrayPush(mainCategoryOptionArrays, [
    monthlyBudgetTransactionOptions,
    emergencyFundTransactionOptions,
    savingsFundTransactionOptions,
    expenseFundTransactionOptions,
    surplusTransactionOptions,
    debtTransactionOptions,
    tithingTransactionOptions,
  ]);

  if (user.latterDaySaint === true) mainCategoryOptionArrays.push(tithingTransactionOptions);
  ////////////////////////////////////////////
  // START BY WATCHING THE BUDGET NAVIGATION
  _watchBudgetNavigation();

  ////////////////////////////////////////////
  // WATCH FOR ACCOUNT SELECTION
  _watchForTransactions(mainCategoryOptionArrays);

  ////////////////////////////////////////////
  // GET BANK ACCOUNT TOTAL
  getDashboardAccountTotals(currentBudget);

  ////////////////////////////////////////////
  // SETUP BILL CALENDAR
  _setupBillCalendar();
  ////////////////////////////////////////////
  // SETUP BILL CURRENT MONTH
  _setupCurrentMonth();
  ////////////////////////////////////////////
  // WATCH BUDGET MANAGEMENT PAGE
  _watchBudgetManagement(currentBudget, user);
  ////////////////////////////////////////////
  // WATCH EDIT CATEGORY GOALS PAGE
  _watchEditCategoryGoals(currentBudget, user);
};
