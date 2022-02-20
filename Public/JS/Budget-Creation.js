import * as Categories from './Budget-Categories';
import * as Updating from './Update-User';
import * as Budgets from './Create-Budget';
import * as Budgeting from './Budget';
import * as Base from './Base-Forms';

class Account {
  constructor(options) {
    this.amount = options.amount;
  }
}
export class Budget {
  constructor() {
    this.name = '';
    this.accounts = {};
    this.mainCategories = [];
  }

  _addName(name) {
    this.name = name;
  }

  _addMainCategory(icon, title) {
    this.mainCategories.push(new Categories.MainCategory({ icon: icon, title: title }));
  }

  _addSubCategory(index, title) {
    this.mainCategories[index].subCategories.push(new Categories.SubCategory({ title: title }));
  }

  _addAccounts(user) {
    this.accounts.unAllocated = new Account({ amount: 0 });
    this.accounts.monthlyBudget = new Account({ amount: 0 });
    this.accounts.emergencyFund = new Account({ amount: 0 });
    this.accounts.savingsFund = new Account({ amount: 0 });
    this.accounts.expenseFund = new Account({ amount: 0 });
    this.accounts.surplus = new Account({ amount: 0 });
    this.accounts.investmentFund = new Account({ amount: 0 });
    this.accounts.debt = new Account({ amount: 0, debtAmount: 0 });
  }

  _addTithingAccount(user) {
    if (user.latterDaySaint === true) this.accounts.tithing = { amount: 0 };
  }

  _setEmergencyGoal() {
    if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
      this.accounts.emergencyFund.emergencyFundGoal = Number(document.querySelector('#timingNumber').value);
      this.accounts.emergencyFund.emergencyFundGoalTiming = document.querySelector('.budget-creation-form__page__section__select').value;
      console.log(this);
    }
    if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
      this.accounts.emergencyFund.emergencyFundGoal = Number(document.querySelector('#emergencyGoal').value);
      console.log(this);
    }
  }

  _setSavingsGoal() {
    this.accounts.savingsFund.savingsPercentage = Number(document.querySelector('#savingsPercentGoal').value) / 100;
    this.accounts.savingsFund.savingsGoal = Number(document.querySelector('#savingsGoal').value);
    console.log(this);
  }

  _setInvestmentGoal() {
    this.accounts.investmentFund.investmentPercentage = Number(document.querySelector('#investmentPercentGoal').value) / 100;
    this.accounts.investmentFund.investmentGoal = Number(document.querySelector('#investmentGoal').value);
    console.log(this);
  }

  _submit(budget, user) {
    Budgets.createBudget(budget, user);
  }
}

export const _watchEmergencyGoalSettings = (budget, setting) => {
  const emergencySettingLabels = document.querySelectorAll('.emergency-checkbox-label');
  const emergencyInputs = document.querySelectorAll('.emergency-input');
  emergencySettingLabels.forEach((esl, i) => {
    esl.addEventListener('click', (e) => {
      emergencySettingLabels.forEach((label) => {
        label.classList.remove('clicked-label');
      });
      esl.classList.add('clicked-label');
      emergencyInputs.forEach((ei) => {
        ei.style.display = 'none';
      });
      esl.textContent === `Length Of Time` ? (emergencyInputs[1].style.display = `flex`) : (emergencyInputs[0].style.display = `flex`);
      setting = esl.textContent;
      if (setting === `Length Of Time`) {
        console.log(emergencyInputs);
        document.querySelector('#timingNumber').focus();
      }
      if (setting === `Total Amount`) {
        console.log(emergencyInputs);
        document.querySelector('#emergencyGoal').focus();
      }
      if (budget) {
        budget.accounts.emergencyFund.emergencyGoalMeasurement = setting;
      }
      console.log(budget);
      return setting;
    });
  });
};

const _finishUpdatingSubCategories = (budget, goals) => {
  console.log(budget);
  let index = 0;
  // This is where the issue persists with the sub category individual payments.
  budget.mainCategories.forEach((mc, i) => {
    mc.subCategories.forEach((sc, i) => {
      sc._finishUpdatingSubCategory(Number(goals[index].value));
      index++;
    });
  });
  return;
};

const checkUser = async () => {
  const userInfo = await Updating.getSomePersonals();
  const user = userInfo.data.data.user;
  return user;
};

const getUserInformation = async () => {
  const userInfo = await Updating.getSomePersonals();
  const user = userInfo.data.data.user;
  const lastname = user.lastname;
  return user, lastname;
};

// const userInfo = await Updating.getSomePersonals();
// const user = userInfo.data.data.user;

const buildSubCategories = (categories, index, secondaryIndex, clickedItem) => {
  const timingFunctionContainer = document.querySelector('.sub-category-display__timing-container');
  /////////////////////////////////////////
  // SELECT SUB CATEGORY DISPLAY
  const subCategoryDisplay = document.querySelector('.sub-category-display');
  const subCategory = document.createElement('section');
  subCategory.classList.add('sub-category-display__sub-category');
  subCategory.classList.add('r__sub-category-display__sub-category');
  subCategory.classList.add('sub-category-display__sub-category--hidden');
  subCategory.dataset.category = `${secondaryIndex}`;

  subCategoryDisplay.insertAdjacentElement('beforeend', subCategory);
  const numberOfSections = 5;
  let sectionIndex = 0;

  while (sectionIndex < numberOfSections) {
    const subCategorySection = document.createElement('section');
    subCategorySection.classList.add('sub-category-display__sub-category__section');
    subCategorySection.classList.add('r__sub-category-display__sub-category__section');
    subCategory.insertAdjacentElement('beforeend', subCategorySection);

    ///////////////////////////////////////////
    // CREATE SUB CATEGORY NAME
    const subCategoryName = document.createElement('p');
    subCategoryName.classList.add('sub-category-display__sub-category__section__category-name');
    subCategoryName.classList.add('r__sub-category-display__sub-category__section__category-name');
    // subCategoryName.textContent = `${categories[index].title}`;

    //////////////////////////////////////////
    // CREATE SUB CATEGORY TIMING BUTTON
    const subCategoryTimingButton = document.createElement('button');
    subCategoryTimingButton.classList.add('sub-category-display__sub-category__section__set-category-timing-button');
    subCategoryTimingButton.classList.add('r__sub-category-display__sub-category__section__set-category-timing-button');
    subCategoryTimingButton.textContent = `+ Timing`;
    //////////////////////////////////////////
    // CREATE SUB CATEGORY TIMING DISPLAY
    if (sectionIndex === 0) {
      subCategorySection.insertAdjacentElement('beforeend', subCategoryName);
      subCategorySection.insertAdjacentElement('beforeend', subCategoryTimingButton);
      subCategoryName.textContent = categories[index].title;
    }
    if (sectionIndex === 1) {
      const subCategoryInput = document.createElement('input');
      subCategoryInput.classList.add('sub-category-display__sub-category__section__input');
      subCategoryInput.classList.add('r__sub-category-display__sub-category__section__input');
      subCategoryInput.classList.add('individual-payment');
      subCategoryInput.classList.add('r__individual-payment');
      subCategoryInput.type = `number`;
      subCategoryInput.min = 0;
      subCategorySection.insertAdjacentElement('beforeend', subCategoryInput);

      subCategoryInput.addEventListener('keyup', (e) => {
        e.preventDefault();
        const overallBudget = document.querySelectorAll('.budget-single-goal-summary__amount');
        const individualPayments = document.querySelectorAll('.individual-payment');
        let total = 0;
        individualPayments.forEach((ip) => {
          total += Number(ip.value);
        });
        overallBudget[0].textContent = `$${total}`;
        overallBudget[2].textContent = `$${total}`;
      });
    }
    if (sectionIndex === 2) {
      const subCategoryInput = document.createElement('input');
      subCategoryInput.classList.add('sub-category-display__sub-category__section__input');
      subCategoryInput.classList.add('r__sub-category-display__sub-category__section__input');
      subCategoryInput.readOnly = true;
      subCategoryInput.type = `number`;
      subCategoryInput.min = 0;
      subCategorySection.insertAdjacentElement('beforeend', subCategoryInput);
    }
    if (sectionIndex === 3) {
      const subCategoryInput = document.createElement('input');
      subCategoryInput.classList.add('sub-category-display__sub-category__section__input');
      subCategoryInput.classList.add('r__sub-category-display__sub-category__section__input');
      subCategoryInput.readOnly = true;
      subCategoryInput.type = `number`;
      subCategoryInput.min = 0;
      subCategorySection.insertAdjacentElement('beforeend', subCategoryInput);
    }
    if (sectionIndex === 4) {
      const subCategoryInput = document.createElement('input');
      subCategoryInput.classList.add('sub-category-display__sub-category__section__input');
      subCategoryInput.classList.add('r__sub-category-display__sub-category__section__input');
      subCategoryInput.readOnly = true;
      subCategoryInput.type = `number`;
      subCategoryInput.min = 0;
      subCategorySection.insertAdjacentElement('beforeend', subCategoryInput);
    }
    sectionIndex++;
  }
};

const getNextWeekDayDate = (days, date, weekday) => {
  let currentWeekDay = days[date.getDay()];
  let startingDate = date;
  let alterable;
  if (currentWeekDay === days[weekday]) console.log(`They Match!`);
  while (currentWeekDay !== days[weekday]) {
    alterable = new Date(date.setDate(startingDate.getDate() + 1));
    currentWeekDay = days[alterable.getDay()];
    if (days[alterable.getDay()] === weekday) {
      startingDate = alterable;
      return currentWeekDay;
    }
  }
  return startingDate;
};

const checkMonth = (date) => {
  return date.getMonth();
};

const create12MonthArray = (array, input, timing, days) => {
  let numberOfIterations;
  let startingIteration = 0;

  if (timing === `Monthly`) {
    ////////////////////////////////////////////////////
    // GET DATE AGAIN SO IT DOES NOT CHANGE MAGICALLY
    const adjustedDate = new Date(document.querySelector('.sub-category-display__timing-container__monthly-container__label__input').value);
    const selectedDate = new Date(adjustedDate.setHours(adjustedDate.getHours() + 7));
    const manipulated = input;
    array.push(selectedDate);
    numberOfIterations = 11;
    while (startingIteration < numberOfIterations) {
      array.push(new Date(manipulated.setMonth(manipulated.getMonth() + 1)));
      startingIteration++;
    }
  }

  if (timing === `Bi-Monthly`) {
    ////////////////////////////////////////////////////
    // GET DATE AGAIN SO IT DOES NOT CHANGE MAGICALLY
    const adjustedDate1 = new Date(document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label__input')[0].value);
    const selectedDate1 = new Date(adjustedDate1.setHours(adjustedDate1.getHours() + 7));
    const adjustedDate2 = new Date(document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label__input')[1].value);
    const selectedDate2 = new Date(adjustedDate2.setHours(adjustedDate2.getHours() + 7));
    const manipulated1 = input[0];
    const manipulated2 = input[1];

    let biMonthlyArray = [];
    biMonthlyArray.push(selectedDate1, selectedDate2);
    array.push(biMonthlyArray);
    numberOfIterations = 11;
    while (startingIteration < numberOfIterations) {
      biMonthlyArray = [];
      biMonthlyArray.push(new Date(manipulated1.setMonth(manipulated1.getMonth() + 1)));
      biMonthlyArray.push(new Date(manipulated2.setMonth(manipulated2.getMonth() + 1)));
      array.push(biMonthlyArray);
      startingIteration++;
    }
  }

  if (timing === `Bi-Weekly`) {
    ////////////////////////////////////////////////////
    // GET DATE AGAIN SO IT DOES NOT CHANGE MAGICALLY
    const adjustedDate = new Date(document.querySelector('.sub-category-display__timing-container__bi-weekly-container__label__input').value);
    const selectedDate = new Date(adjustedDate.setHours(adjustedDate.getHours() + 7));
    const manipulated = input;
    array.push(selectedDate);
    numberOfIterations = 25;

    while (startingIteration < numberOfIterations) {
      array.push(new Date(manipulated.setDate(manipulated.getDate() + 14)));
      startingIteration++;
    }
  }

  if (timing === `Weekly`) {
    ////////////////////////////////////////////////////
    // GET DATE AGAIN SO IT DOES NOT CHANGE MAGICALLY
    const selectedWeekDay = document.querySelector('.sub-category-display__timing-container__weekly-container__label__select').value;
    const currentDate1 = new Date();
    const currentDate2 = new Date();
    const nextWeekDay = getNextWeekDayDate(days, currentDate1, selectedWeekDay);
    const firstDate = getNextWeekDayDate(days, currentDate2, selectedWeekDay);
    const adjustedDate = nextWeekDay;
    const selectedDate = adjustedDate;
    const manipulated = currentDate1;
    array.push(selectedDate);
    numberOfIterations = 51;

    while (startingIteration < numberOfIterations) {
      array.push(new Date(manipulated.setDate(manipulated.getDate() + 7)));
      startingIteration++;
    }
    array[0] = firstDate;
  }
  return array;
};

const calculateDayEnding = (day, dateEnding, input) => {
  if (day === 0 || day === 4 || day === 5 || day === 6 || day === 7 || day === 8 || day === 9) {
    dateEnding = `th`;
  }
  if (day === 1) {
    dateEnding = `st`;
    if (Number(input.getDate() === 11)) dateEnding = `th`;
  }
  if (day === 2) dateEnding = `nd`;
  if (day === 3) dateEnding = `rd`;
  return dateEnding;
};

const insertTiiming = (target, inputValues, timing, timingButtons, budget, index) => {
  let wording, dayEnding, dayEndingNumberOne;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let currentMainCategory, subCategoryIndex;
  ////////////////////////////
  // INITIALIZE 12 MONTH ARRAY
  const twelveMonthArray = [];

  // GET MONTHLY TIMING
  if (timing === `Monthly`) {
    // Create Payment Schedule
    let paymentSchedule = create12MonthArray(twelveMonthArray, inputValues[0], timing, days);

    // Get Current Main Category
    budget.mainCategories.forEach((mc, i) => {
      let categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;
      if (mc.title === categoryTitle) currentMainCategory = mc;
    });

    // Get Correct Sub Category Index
    currentMainCategory.subCategories.forEach((sc) => {
      if (sc.title === target.previousSibling.textContent) subCategoryIndex = currentMainCategory.subCategories.indexOf(sc);
    });

    ///////////////////////
    // SET TIMING OPTIONS
    // Set Payment Cycle
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentCycle = timing;

    // Set Payment Schedule
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentSchedule = paymentSchedule;

    // Set Next Due Date(s)
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.dueDates = [currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentSchedule[0]];

    ///////////////////////////////
    // GET THE DUE DATE
    let dueDate = currentMainCategory.subCategories[subCategoryIndex].timingOptions.dueDates[0];

    //////////////////////////
    // GET LAST DIGIT OF DATE
    dayEndingNumberOne = Number(dueDate.getDate().toString().split('')[dueDate.getDate().toString().length - 1]);

    ///////////////////////////////////////////////
    // CALCULATE PROPER DAY ENDING (i.e. 'st' on 1st)
    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, dueDate);

    ////////////////////////////
    // GET THE DAY OF THE WEEK
    const day = days[dueDate.getDay()];

    //////////////////////////////
    // GET THE DAY OF THE MONTH
    const dayOne = dueDate.getDate();

    //////////////////////////////////////////////
    // SET THE WORDING FOR THE TIMING ON THE UI
    wording = `Due ${day}, the ${dayOne}${dayEnding} of ${months[dueDate.getMonth()]}.`;
  }

  // GET BI-MONTHLY TIMING
  if (timing === `Bi-Monthly`) {
    ////////////////////////////////////////////
    // RETURN IF MONTH OF DATES DO NOT MATCH
    if (inputValues[0].getMonth() !== inputValues[1].getMonth()) return;

    // Create Payment Schedule
    let paymentSchedule = create12MonthArray(twelveMonthArray, inputValues, timing, days);

    // Get Current Main Category
    budget.mainCategories.forEach((mc, i) => {
      let categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;
      if (mc.title === categoryTitle) currentMainCategory = mc;
    });

    // Get Correct Sub Category Index
    currentMainCategory.subCategories.forEach((sc) => {
      if (sc.title === target.previousSibling.textContent) subCategoryIndex = currentMainCategory.subCategories.indexOf(sc);
    });

    ///////////////////////
    // SET TIMING OPTIONS

    // Set Payment Cycle
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentCycle = timing;

    // Set Payment Schedule
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentSchedule = paymentSchedule;

    // Set Next Due Date(s)
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.dueDates = [currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentSchedule[0]];

    ///////////////////////////////
    // GET THE DUE DATES
    let dueDate1 = currentMainCategory.subCategories[subCategoryIndex].timingOptions.dueDates[0][0];
    let dueDate2 = currentMainCategory.subCategories[subCategoryIndex].timingOptions.dueDates[0][1];

    //////////////////////////
    // GET LAST DIGIT OF DATES
    dayEndingNumberOne = Number(dueDate1.getDate().toString().split('')[dueDate1.getDate().toString().length - 1]);
    let dayEndingNumberTwo = Number(dueDate2.getDate().toString().split('')[dueDate2.getDate().toString().length - 1]);

    ///////////////////////////////////////////////
    // CALCULATE PROPER DAY ENDING (i.e. 'st' on 1st)
    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, dueDate1);
    let dayEndingTwo = calculateDayEnding(dayEndingNumberTwo, dayEnding, dueDate2);

    ////////////////////////////
    // GET THE DAY OF THE WEEK
    const day = dueDate1.getDay();
    const day2 = dueDate2.getDay();

    //////////////////////////////
    // GET THE DAY OF THE MONTH
    const dayOne = dueDate1.getDate();
    const dayTwo = dueDate2.getDate();

    //////////////////////////////////////////////
    // SET THE WORDING FOR THE TIMING ON THE UI
    wording = `Due the ${dayOne}${dayEnding} & ${dayTwo}${dayEndingTwo}, of ${months[dueDate1.getMonth()]}`;
  }

  // GET BI-WEEKLY TIMING
  if (timing === `Bi-Weekly`) {
    // Create Payment Schedule
    let paymentSchedule = create12MonthArray(twelveMonthArray, inputValues[0], timing, days);

    // Get Current Main Category
    budget.mainCategories.forEach((mc, i) => {
      let categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;
      if (mc.title === categoryTitle) currentMainCategory = mc;
    });

    // Get Correct Sub Category Index
    currentMainCategory.subCategories.forEach((sc) => {
      if (sc.title === target.previousSibling.textContent) subCategoryIndex = currentMainCategory.subCategories.indexOf(sc);
    });

    ///////////////////////
    // SET TIMING OPTIONS

    // Set Payment Cycle
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentCycle = timing;

    // Set Payment Schedule
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentSchedule = paymentSchedule;

    // Set Next Due Date(s)
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.dueDates = [currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentSchedule[0]];

    ///////////////////////////////
    // GET THE DUE DATE
    let dueDate = currentMainCategory.subCategories[subCategoryIndex].timingOptions.dueDates[0];

    //////////////////////////
    // GET LAST DIGIT OF DATE
    dayEndingNumberOne = Number(dueDate.getDate().toString().split('')[dueDate.getDate().toString().length - 1]);

    ///////////////////////////////////////////////
    // CALCULATE PROPER DAY ENDING (i.e. 'st' on 1st)
    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, dueDate);

    ////////////////////////////
    // GET THE DAY OF THE WEEK
    const day = days[dueDate.getDay()];

    //////////////////////////////
    // GET THE DAY OF THE MONTH
    const dayOne = dueDate.getDate();

    //////////////////////////////////////////////
    // SET THE WORDING FOR THE TIMING ON THE UI
    wording = `Due the ${dayOne}${dayEnding} of ${months[dueDate.getMonth()]}.`;
  }

  // GET WEEKLY TIMING
  if (timing === `Weekly`) {
    // Create Payment Schedule
    let paymentSchedule = create12MonthArray(twelveMonthArray, inputValues[0], timing, days);

    // Get Current Main Category
    budget.mainCategories.forEach((mc, i) => {
      let categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;
      if (mc.title === categoryTitle) currentMainCategory = mc;
    });

    // Get Correct Sub Category Index
    currentMainCategory.subCategories.forEach((sc) => {
      if (sc.title === target.previousSibling.textContent) subCategoryIndex = currentMainCategory.subCategories.indexOf(sc);
    });

    ///////////////////////
    // SET TIMING OPTIONS

    // Set Payment Cycle
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentCycle = timing;

    // Set Payment Schedule
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentSchedule = paymentSchedule;

    // Set Next Due Date(s)
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.dueDates = [currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentSchedule[0]];

    ///////////////////////////////
    // GET THE DUE DATE
    let dueDate = currentMainCategory.subCategories[subCategoryIndex].timingOptions.dueDates[0];

    //////////////////////////
    // GET LAST DIGIT OF DATE
    dayEndingNumberOne = Number(dueDate.getDate().toString().split('')[dueDate.getDate().toString().length - 1]);

    ///////////////////////////////////////////////
    // CALCULATE PROPER DAY ENDING (i.e. 'st' on 1st)
    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, dueDate);

    ////////////////////////////
    // GET THE DAY OF THE WEEK
    const day = days[dueDate.getDay()];

    //////////////////////////////
    // GET THE DAY OF THE MONTH
    const dayOne = dueDate.getDate();

    //////////////////////////////////////////////
    // SET THE WORDING FOR THE TIMING ON THE UI
    wording = `Due every ${day} of the month.`;
  }
  target.textContent = wording;
  const timingFunctionContainer = document.querySelector('.sub-category-display__timing-container');
  timingFunctionContainer.classList.toggle('sub-category-display__timing-container__hidden');
};

/////////////////////////////////////////
// WATCH FOR TIMING SETTING
const watchForSettingTiming = (budget, index, clickedItem, timing, fullBudget) => {
  // Getting the timing.
  const monthlyTimingButton = document.querySelector('.sub-category-display__timing-container__monthly-container__button');
  const biMonthlyTimingButton = document.querySelector('.sub-category-display__timing-container__bi-monthly-container__button');
  const biWeeklyTimingButton = document.querySelector('.sub-category-display__timing-container__bi-weekly-container__button');
  const weeklyTimingButton = document.querySelector('.sub-category-display__timing-container__weekly-container__button');
  const timingInputButtons = [monthlyTimingButton, biMonthlyTimingButton, biWeeklyTimingButton, weeklyTimingButton];

  timingInputButtons.forEach((tib, i) => {
    tib.addEventListener('click', (e) => {
      e.preventDefault();
      timing = tib.firstChild.nextSibling.textContent;
    });
  });

  const subCategoryTimingButtons = document.querySelectorAll('.sub-category-display__sub-category__section__set-category-timing-button');
  const timingFunctionContainer = document.querySelector('.sub-category-display__timing-container');
  subCategoryTimingButtons.forEach((sctb, i) => {
    sctb.addEventListener('click', (e) => {
      e.preventDefault();
      timingFunctionContainer.classList.toggle('sub-category-display__timing-container__hidden');
      clickedItem = e.target;
    });
  });
  const timingSubmitButtons = document.querySelectorAll('.timing-submit-button');
  timingSubmitButtons.forEach((tsb) => {
    tsb.addEventListener('click', (e) => {
      e.preventDefault();
      let timingArray = [];
      const oldMonthlyTiming = new Date(document.querySelector('.sub-category-display__timing-container__monthly-container__label__input').value);
      const monthlyTiming = new Date(oldMonthlyTiming.setHours(oldMonthlyTiming.getHours() + 7));
      const subCategoryIndex = [...document.querySelectorAll('.sub-category-display__sub-category__section__set-category-timing-button')].indexOf(clickedItem);
      const subCategoryTimingTarget = document.querySelectorAll('.sub-category-display__sub-category__section__set-category-timing-text')[subCategoryIndex];
      if (timing === `Monthly`) {
        timingArray = [];
        timingArray.push(monthlyTiming);
        return insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
      }
      if (timing === `Bi-Monthly`) {
        e.preventDefault();
        const oldTimingOne = new Date(document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label__input')[0].value);
        const oldTimingTwo = new Date(document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label__input')[1].value);
        const timingOne = new Date(oldTimingOne.setHours(oldTimingOne.getHours() + 7));
        const timingTwo = new Date(oldTimingTwo.setHours(oldTimingTwo.getHours() + 7));
        timingArray = [];
        timingArray.push(timingOne);
        timingArray.push(timingTwo);
        return insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
      }

      if (timing === `Bi-Weekly`) {
        const oldBiWeeklyTiming = new Date(document.querySelector('.sub-category-display__timing-container__bi-weekly-container__label__input').value);
        const biWeeklyTiming = new Date(oldBiWeeklyTiming.setHours(oldBiWeeklyTiming.getHours() + 7));
        const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
        timingArray = [];
        timingArray.push(biWeeklyTiming);
        insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
        return;
      }

      if (timing === `Weekly`) {
        const oldWeeklyTiming = new Date(document.querySelector('.sub-category-display__timing-container__weekly-container__label__select').value);
        const weeklyTiming = new Date(oldWeeklyTiming.setHours(oldWeeklyTiming.getHours() + 7));
        timingArray = [];
        timingArray.push(weeklyTiming);
        insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
      }
    });
  });
};

/////////////////////////////////////////
// SET UP TIMING FUNCTION CONTAINER
const setupTimingFunctionContainer = (container, timing) => {
  const closeTimingFunctionContainer = document.querySelector('.sub-category-display__timing-container__close');
  /////////////////////////////////////////
  // INITIALIZE VARIABLES FOR TIMING INPUTS
  const monthlyTimingButton = document.querySelector('.sub-category-display__timing-container__monthly-container__button');
  const biMonthlyTimingButton = document.querySelector('.sub-category-display__timing-container__bi-monthly-container__button');
  const biWeeklyTimingButton = document.querySelector('.sub-category-display__timing-container__bi-weekly-container__button');
  const weeklyTimingButton = document.querySelector('.sub-category-display__timing-container__weekly-container__button');
  const timingInputButtons = [monthlyTimingButton, biMonthlyTimingButton, biWeeklyTimingButton, weeklyTimingButton];

  // Monthly Timing
  const monthlyTimingLabel = document.querySelector('.sub-category-display__timing-container__monthly-container__label');
  const monthlyTimingSubmit = document.querySelector('.sub-category-display__timing-container__monthly-container__submit');

  // Bi-Monthly Timing
  const biMonthlyTimingLabelOne = document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label')[0];
  const biMonthlyTimingLabelTwo = document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label')[1];
  const biMonthlyTimingSubmit = document.querySelector('.sub-category-display__timing-container__bi-monthly-container__submit');
  // Bi-Weekly Timing
  const biWeeklyTimingLabel = document.querySelector('.sub-category-display__timing-container__bi-weekly-container__label');
  const biWeeklyTimingSubmit = document.querySelector('.sub-category-display__timing-container__bi-weekly-container__submit');

  // Weekly Timing
  const weeklyTimingLabel = document.querySelector('.sub-category-display__timing-container__weekly-container__label');
  const weeklyTimingSubmit = document.querySelector('.sub-category-display__timing-container__weekly-container__submit');

  const timingFunctionPages = [
    [monthlyTimingLabel, monthlyTimingSubmit],
    [biMonthlyTimingLabelOne, biMonthlyTimingLabelTwo, biMonthlyTimingSubmit],
    [biWeeklyTimingLabel, biWeeklyTimingSubmit],
    [weeklyTimingLabel, weeklyTimingSubmit],
  ];

  // sub-category-display__timing-container__monthly-container__label__input

  timingInputButtons.forEach((tib, i) => {
    const index = i;
    timingFunctionPages.forEach((tfp, i) => {
      tfp.forEach((el) => {
        el.classList.add('element-hidden');
      });
    });
    tib.addEventListener('click', (e) => {
      timingFunctionPages.forEach((tfp, i) => {
        tfp.forEach((el) => {
          el.classList.add('element-hidden');
        });
      });
      timingFunctionPages[index].forEach((te) => {
        te.classList.remove('element-hidden');
      });
    });
  });
  closeTimingFunctionContainer.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.toggle('sub-category-display__timing-container__hidden');
  });
};

const getTimingContainerHeight = (categories, index) => {
  return (100 * categories[index].subCategories.length) / 10;
};

const setupGoalSetting = (budget, index, clickedItem, timing) => {
  const leftButton = document.querySelector('.left');
  const rightButton = document.querySelector('.right');
  const mainCategoryIcon = document.querySelector('.main-category-display__category-display__icon');
  const mainCategoryTitle = document.querySelector('.main-category-display__category-display__title');
  mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
  mainCategoryTitle.textContent = budget.mainCategories[index].title;

  budget.mainCategories.forEach((c, i) => {
    /////////////////////////////////////////
    // INITIALIZE INDEX FOR DATASET
    let dataIndex = i;
    c.subCategories.forEach((sc, i) => {
      buildSubCategories(c.subCategories, i, dataIndex, clickedItem);
    });
  });
  const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
  subCategories.forEach((sc, i) => {
    if (Number(sc.dataset.category) === 0) {
      sc.classList.remove('sub-category-display__sub-category--hidden');
    }
  });

  /////////////////////////////////////////
  // SET UP TIMING FUNCTION CONTAINER
  const timingFunctionContainer = document.querySelector('.sub-category-display__timing-container');
  setupTimingFunctionContainer(timingFunctionContainer);
  timingFunctionContainer.style.height = `${getTimingContainerHeight(budget.mainCategories, index)}rem`;
  timingFunctionContainer.style.minHeight = `calc(100% - 4rem)`;
  if (getTimingContainerHeight(budget.mainCategories, index) >= 40) timingFunctionContainer.style.justifyContent = `space-evenly`;
  if (getTimingContainerHeight(budget.mainCategories, index) < 40) timingFunctionContainer.style.justifyContent = `flex-start`;
  leftButton.addEventListener('click', (e) => {
    index--;
    if (index < 0) index = 0;
    mainCategoryIcon.classList.remove(budget.mainCategories[index + 1].icon);
    mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
    mainCategoryTitle.textContent = budget.mainCategories[index].title;
    subCategories.forEach((sc, i) => {
      sc.classList.add('sub-category-display__sub-category--hidden');
      if (Number(sc.dataset.category) === index) {
        sc.classList.remove('sub-category-display__sub-category--hidden');
      }
    });
    timingFunctionContainer.style.height = getTimingContainerHeight(budget.mainCategories, index);
    timingFunctionContainer.style.minHeight = `calc(100% - 4rem)`;
    if (getTimingContainerHeight(budget.mainCategories, index) >= 40) timingFunctionContainer.style.justifyContent = `space-evenly`;
    if (getTimingContainerHeight(budget.mainCategories, index) < 40) timingFunctionContainer.style.justifyContent = `flex-start`;
    return index;
  });
  rightButton.addEventListener('click', (e) => {
    index++;
    if (index > budget.mainCategories.length - 1) index = budget.mainCategories.length - 1;
    mainCategoryIcon.classList.remove(budget.mainCategories[index - 1].icon);
    mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
    mainCategoryTitle.textContent = budget.mainCategories[index].title;
    subCategories.forEach((sc, i) => {
      sc.classList.add('sub-category-display__sub-category--hidden');
      if (Number(sc.dataset.category) === index) {
        sc.classList.remove('sub-category-display__sub-category--hidden');
      }
    });
    timingFunctionContainer.style.height = getTimingContainerHeight(budget.mainCategories, index);
    timingFunctionContainer.style.minHeight = `calc(100% - 4rem)`;
    if (getTimingContainerHeight(budget.mainCategories, index) >= 40) timingFunctionContainer.style.justifyContent = `space-evenly`;
    if (getTimingContainerHeight(budget.mainCategories, index) < 40) timingFunctionContainer.style.justifyContent = `flex-start`;
    return index;
  });
};

const setupSubCategoryCreation = (budget, index) => {
  const leftButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__left-button__icon');
  const rightButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__right-button__icon');
  let mainCategoryIcon = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__category-information__icon');
  let mainCategoryText = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__category-information__text');
  const subCategoryStartCreationButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button');
  const subCategoryStopCreationButton = document.querySelector('.category-creation__controller__close');
  const categoryCreationSection = document.querySelector('.category-creation');
  subCategoryStopCreationButton.addEventListener('click', (e) => {
    e.preventDefault();
    subCategoryStartCreationButton.classList.toggle('budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button--hidden');
    categoryCreationSection.classList.toggle('category-creation--shown');
  });
  mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
  mainCategoryText.textContent = budget.mainCategories[index].title;
  leftButton.addEventListener('click', (e) => {
    index--;
    if (index < 0) index = 0;
    mainCategoryIcon.classList.remove(budget.mainCategories[index + 1].icon);
    mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
    mainCategoryText.textContent = budget.mainCategories[index].title;
    const subCategories = document.querySelectorAll('.sub-category');
    subCategories.forEach((sc, i) => {
      sc.classList.add('hidden');
      if (sc.dataset.category === `${index}`) {
        sc.classList.remove('hidden');
      }
    });
    return index;
  });
  rightButton.addEventListener('click', (e) => {
    index++;
    if (index > budget.mainCategories.length - 1) index = budget.mainCategories.length - 1;
    mainCategoryIcon.classList.remove(budget.mainCategories[index - 1].icon);
    mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
    mainCategoryText.textContent = budget.mainCategories[index].title;
    const subCategories = document.querySelectorAll('.sub-category');
    subCategories.forEach((sc, i) => {
      sc.classList.add('hidden');
      if (sc.dataset.category === `${index}`) {
        sc.classList.remove('hidden');
      }
    });
    return index;
  });
  const subCategoryCreateButton = document.querySelector('.category-creation__input-container__button');
  subCategoryCreateButton.addEventListener('click', (e) => {
    e.preventDefault();
    const subCategoryCreateInput = document.querySelector('.category-creation__input-container__input');
    Categories._addSubCategory(budget, index);
    subCategoryCreateInput.focus();
    subCategoryCreateInput.value = '';
  });
  subCategoryStartCreationButton.addEventListener('click', (e) => {
    e.preventDefault();
    subCategoryStartCreationButton.classList.toggle('budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button--hidden');
    categoryCreationSection.classList.toggle('category-creation--shown');
    const subCategoryCreateInput = document.querySelector('.category-creation__input-container__input');
    subCategoryCreateInput.value = '';
    subCategoryCreateInput.focus();
  });
};

//////////////////////////////////////
// LOG KEYBOARD KEY
const clickToCreateSubCategory = () => {
  const e = event;
  e.preventDefault();
  const subCategoryCreateInput = document.querySelector('.category-creation__input-container__input');
  const subCategoryCreationButton = document.querySelector('.category-creation__input-container__button');
  const subCategoryStartCreationButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button');
  if (e.key === `Enter`) {
    const categoryCreation = document.querySelector('.category-creation');
    if (categoryCreation.classList.contains('category-creation--shown')) {
      subCategoryCreationButton.click();
    }
    if (!subCategoryStartCreationButton.classList.contains(`budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button--hidden`)) {
      subCategoryStartCreationButton.classList.toggle('budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button--hidden');
      categoryCreation.classList.toggle('category-creation--shown');
      const subCategoryCreateInput = document.querySelector('.category-creation__input-container__input');
      subCategoryCreateInput.focus();
    }
  }
};

//////////////////////////////////////////////////////////////
// WATCHING TO CYCLE MAIN CATEGORIES GOALS
const _watchForCyclingCategoryGoals = () => {
  const leftButton = document.querySelector('.left');
  const rightButton = document.querySelector('.right');
  document.addEventListener(`keyup`, (e) => {
    e.preventDefault();
    if (e.key === `ArrowLeft`) {
      return leftButton.click();
    }
    if (e.key === `ArrowRight`) {
      return rightButton.click();
    }
  });
};

//////////////////////////////////////////////////////////////
// WATCHING TO CYCLE MAIN CATEGORIES IN SUB CATEGORY CREATION
const watchToCycleSubCategoryMainCategories = () => {
  const leftButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__left-button__icon');
  const rightButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__right-button__icon');
  document.addEventListener(`keyup`, (e) => {
    e.preventDefault();
    if (e.key === `ArrowLeft`) {
      return leftButton.click();
    }
    if (e.key === `ArrowRight`) {
      return rightButton.click();
    }
  });
};

///////////////////////////////////////////////////
// WATCH SUB CATEGORY CREATE BUTTON FOR KEYBOARD
const _watchForSubCategoryKeyboard = () => {
  const subCategoryStartCreationButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button');
  subCategoryStartCreationButton.focus();
  document.addEventListener(`keyup`, clickToCreateSubCategory);
};

/////////////////////////////////
// GO TO PAGE
const goToPage = (page, createBudgetPages) => {
  createBudgetPages.forEach((bp) => {
    bp.classList.add('disappear');
    if (createBudgetPages[page]) createBudgetPages[page].classList.remove('disappear');
  });
};

/////////////////////////////////
// GET BUDGET NAME
const getBudgetName = () => {
  const budgetName = document.getElementById('budgetName').value;
  return budgetName;
};

/////////////////////////////////
// SETUP PAGE
const setupPage = (page, createBudgetPages, createBudgetPagesNumber, budget) => {
  if (page - 1 === 8 || page - 1 === 9) {
    budget._setInvestmentGoal();
  }
  goToPage(page, createBudgetPages);
  setPageCount(page, createBudgetPagesNumber);
  return page;
};

/////////////////////////////////
// SET CORRECT PAGE COUNT
const setPageCount = (pageNumber, createBudgetPages) => {
  const page = document.querySelector('.budget-creation-form__page-mechanisms__page-number');
  if (page) {
    page.textContent = `Page ${pageNumber + 1} / ${createBudgetPages}`;
  }
};

// ////////////////////////////
// // INITIALIZE KEY VARIABLES
// let currentPage = 0;

const _watchTIthingOptions = (budget) => {
  let tithingSetting;
  const grossOption = document.getElementById('grossOption');
  const netOption = document.getElementById('netOption');
  const surplusOption = document.getElementById('surplusOption');
  const grossOptionLabel = document.getElementById('grossOptionLabel');
  const netOptionLabel = document.getElementById('netOptionLabel');
  const surplusOptionLabel = document.getElementById('surplusOptionLabel');
  const tithingCheckboxes = [grossOption, netOption, surplusOption];
  const tithingOptions = [grossOptionLabel, netOptionLabel, surplusOptionLabel];
  const tithingSection = document.querySelector('.tithing-section');
  if (tithingSection) {
    tithingSection.addEventListener('click', (e) => {
      const clicked = e.target;
      if (e.target === grossOptionLabel) {
        tithingOptions.forEach((t) => t.classList.remove('checked'));
        clicked.classList.toggle('checked');
        return (tithingSetting = `Gross`);
      }
      if (e.target === netOptionLabel) {
        tithingOptions.forEach((t) => t.classList.remove('checked'));
        clicked.classList.toggle('checked');
        return (tithingSetting = `Net`);
      }
      if (e.target === surplusOptionLabel) {
        tithingOptions.forEach((t) => t.classList.remove('checked'));
        clicked.classList.toggle('checked');
        return (tithingSetting = `Surplus`);
      }
      budget.accounts.tithing.tithingSetting = tithingSetting;
      console.log(budget);
    });
  }
};

const _watchCreationFormCloser = (form) => {
  const formCloser = document.querySelector(`.budget-creation-form-close-icon`);
  if (formCloser) {
    formCloser.addEventListener('click', (e) => {
      form.classList.toggle(`budget-creation-form-container--shown`);
    });
  }
};

const _watchCreationFormOpener = (form, button) => {
  if (button) {
    button.addEventListener(`click`, (e) => {
      form.classList.toggle(`budget-creation-form-container--shown`);
    });
  }
};

export const _watchBudgetCreation = () => {
  const budgetCreationForm = document.querySelector('.budget-creation-form-container');
  const budgetCreationFormOpenButton = document.querySelector('.budget-card-container__card--create');
  ////////////////////////////
  // WATCH FOR FORM CLOSURE
  _watchCreationFormCloser(budgetCreationForm);

  ////////////////////////////
  // WATCH FOR FORM OPENING
  _watchCreationFormOpener(budgetCreationForm, budgetCreationFormOpenButton);
  ////////////////////////////
  // INITIALIZE KEY VARIABLES
  const budgetCreationFormPages = document.querySelectorAll('.budget-creation-form__page');
  const budgetCreationFormPagesNumber = budgetCreationFormPages.length;
  let currentPage = 0;
  let emergencyGoalSetting, clicked, selectedTiming;
  const budgetContinueButton = document.querySelector('.budget-creation-form__page-mechanisms__submit-button');
  //////////////////////////////////////////////////////////////
  // SET APPROPRIATE PAGE NUMBER DEPENDING ON USER INFORMATION
  setPageCount(currentPage, budgetCreationFormPagesNumber);
  ////////////////////////////////////////////////
  // INITIALIZE KEY VARIABLES INSIDE FUNCTION SCOPE
  let budgetName;
  let subCategoryIndex = 0;
  let icon;
  const budget = new Budget();
  budget._addAccounts();
  if (budgetContinueButton) {
    budgetContinueButton.addEventListener('click', async (e) => {
      e.preventDefault();
      currentPage++;
      //////////////////////////////
      // ASSIGN BUDGET INFORMATION
      /////////////////////
      // BUDGET NAME
      budgetName = getBudgetName();
      budget.name = budgetName;

      ////////////////////////////////
      // SETUP BUDGET CREATION FORM
      setupPage(currentPage, budgetCreationFormPages, budgetCreationFormPagesNumber, budget);

      /////////////////////////////
      // CHECK USER
      const userInfo = await Updating.getSomePersonals();
      const user = userInfo.data.data.user;
      console.log(user);
      ////////////////////////////////////////////////////////////////////////
      // GLITCH: Need to fix this to work if you are a Latter Day Saint as well.
      ////////////////////////////////////////////////////////////////////////

      /////////////////////////////
      // IF NOT LATTER DAY SAINT
      if (currentPage + 1 === 2 && user.latterDaySaint === false) {
        Categories.createCategories(icon);
        Categories._watchCreateCategoryButton(icon, budget);
      }
      if (currentPage + 1 === 3 && user.latterDaySaint === false) {
        _watchForSubCategoryKeyboard();
        watchToCycleSubCategoryMainCategories();
        setupSubCategoryCreation(budget, subCategoryIndex);
      }
      if (currentPage + 1 === 4 && user.latterDaySaint === false) {
        setupGoalSetting(budget, subCategoryIndex, clicked, selectedTiming);
        _watchForCyclingCategoryGoals();
        watchForSettingTiming(budget, subCategoryIndex, clicked, selectedTiming);
      }
      if (currentPage + 1 === 5 && user.latterDaySaint === false) {
        const individualPayments = document.querySelectorAll('.individual-payment');
        _finishUpdatingSubCategories(budget, individualPayments);
        _watchEmergencyGoalSettings(budget, emergencyGoalSetting);
      }
      if (currentPage + 1 === 6 && user.latterDaySaint === false) {
        budget._setEmergencyGoal();
        document.querySelector('#savingsGoal').focus();
      }
      if (currentPage + 1 === 7 && user.latterDaySaint === false) {
        budget._setSavingsGoal();
        document.querySelector('#investmentGoal').focus();
      }
      if (currentPage + 1 === 8 && user.latterDaySaint === false) {
        budget._setInvestmentGoal();
        budget._submit(budget, user);
      }

      /////////////////////////////
      // IF LATTER DAY SAINT
      if (currentPage + 1 === 2 && user.latterDaySaint === true) {
        console.log(`Tithing Options`);
        budget._addTithingAccount(user);
        _watchTIthingOptions(budget);
      }
      if (currentPage + 1 === 3 && user.latterDaySaint === true) {
        Categories.createCategories(icon);
        Categories._watchCreateCategoryButton(icon, budget);
      }
      if (currentPage + 1 === 4 && user.latterDaySaint === true) {
        _watchForSubCategoryKeyboard();
        watchToCycleSubCategoryMainCategories();
        setupSubCategoryCreation(budget, subCategoryIndex);
      }
      if (currentPage + 1 === 5 && user.latterDaySaint === true) {
        setupGoalSetting(budget, subCategoryIndex, clicked, selectedTiming);
        _watchForCyclingCategoryGoals();
        watchForSettingTiming(budget, subCategoryIndex, clicked, selectedTiming);
      }
      if (currentPage + 1 === 6 && user.latterDaySaint === true) {
        const individualPayments = document.querySelectorAll('.individual-payment');
        _finishUpdatingSubCategories(budget, individualPayments);
        _watchEmergencyGoalSettings(budget, emergencyGoalSetting);
      }
      if (currentPage + 1 === 7 && user.latterDaySaint === true) {
        budget._setEmergencyGoal();
        document.querySelector('#savingsGoal').focus();
      }
      if (currentPage + 1 === 8 && user.latterDaySaint === true) {
        budget._setSavingsGoal();
        document.querySelector('#investmentGoal').focus();
      }
      if (currentPage + 1 === 9 && user.latterDaySaint === true) {
        budget._setInvestmentGoal();
        budget._submit(budget, user);
      }
    });
  }
  // WATCHING YOUR BUDGET AFTER YOU LOGIN OR CREATE YOUR BUDGET
  const budgetNavButton = document.querySelector('.budget-container__navigation-button-container__button');
  Budgeting._watchBudget();
};
