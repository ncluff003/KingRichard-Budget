import * as Categories from './Budget-Categories';
import * as Updating from './Update-User';
import * as Budgeting from './Maintain-Budget';
import * as Budget from './Budget';
import * as Base from './Base-Forms';

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
        // budget.accounts.emergencyFund.emergencyGoalMeasurement = setting;
        budget._updateAccounts(`Creation`, `Emergency Measurement`, { setting: setting });
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

const getOverallBudget = (subCategories, overall) => {
  let arrayOfTotals = [];
  subCategories.forEach((sc, i) => {
    const subCategoryTotal = sc.firstChild.nextSibling.firstChild.value;
    arrayOfTotals.push(subCategoryTotal);
  });
  let initialValue = 0;
  overall = arrayOfTotals.reduce((previous, current) => Number(previous) + Number(current), initialValue);
  return overall;
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

const getOverallPercentageSpent = (total, part) => {
  let percent = (part / total).toFixed(2);
  if (percent === NaN) percent = 0;
  return percent;
};

const getSinglePercentageSpent = (spent, total) => {
  let percentage = (spent / total).toFixed(2);
  return percentage;
};

const buildSubCategories = (categories, index, secondaryIndex, clickedItem) => {
  const timingFunctionContainer = document.querySelector('.sub-category-display__timing-container');
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
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
  const subCategories = document.querySelectorAll('.sub-category-display__sub-category');

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

    const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
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
        let spent = subCategoryInput.closest('section').nextSibling.firstChild;
        let remaining = subCategoryInput.closest('section').nextSibling.nextSibling.firstChild;
        let percentageSpent = subCategoryInput.closest('section').nextSibling.nextSibling.nextSibling.firstChild;
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
        spent.textContent = money.format(0);
        remaining.textContent = money.format(subCategoryInput.value - 0);
        percentageSpent.textContent = `${getSinglePercentageSpent(Number(spent.textContent.split('$')[1]), subCategoryInput.value)}%`;
      });
    }
    if (sectionIndex === 2) {
      const subCategoryContent = document.createElement('p');
      subCategoryContent.classList.add('sub-category-display__sub-category__section__content');
      subCategoryContent.classList.add('r__sub-category-display__sub-category__section__content');
      subCategorySection.insertAdjacentElement('beforeend', subCategoryContent);
    }
    if (sectionIndex === 3) {
      const subCategoryContent = document.createElement('p');
      subCategoryContent.classList.add('sub-category-display__sub-category__section__content');
      subCategoryContent.classList.add('r__sub-category-display__sub-category__section__content');
      subCategorySection.insertAdjacentElement('beforeend', subCategoryContent);
    }
    if (sectionIndex === 4) {
      const subCategoryContent = document.createElement('p');
      subCategoryContent.classList.add('sub-category-display__sub-category__section__content');
      subCategoryContent.classList.add('r__sub-category-display__sub-category__section__content');
      subCategorySection.insertAdjacentElement('beforeend', subCategoryContent);
    }
    sectionIndex++;
  }
  const overallBudget = document.querySelectorAll('.budget-single-goal-summary__amount');
  const individualPayments = document.querySelectorAll('.individual-payment');
  subCategories.forEach((sc, i) => {
    let input = sc.firstChild.nextSibling.firstChild;
    let spent = sc.firstChild.nextSibling.nextSibling.firstChild;
    let remaining = sc.firstChild.nextSibling.nextSibling.nextSibling.firstChild;
    let percentageSpent = sc.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild;
    let overallSpent = overallBudget[1];
    let overallRemaining = overallBudget[2];
    let overallPercentageSpent = overallBudget[3];
    input.addEventListener('keyup', (e) => {
      e.preventDefault();
      // getOverallSpent(0, individualPayments[i].value, overallSpent);
    });
  });
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

export const calculateDayEnding = (endDigit, dateEnding, input) => {
  if (endDigit === 0 || endDigit === 4 || endDigit === 5 || endDigit === 6 || endDigit === 7 || endDigit === 8 || endDigit === 9) {
    dateEnding = `th`;
  }
  if (endDigit === 1) {
    dateEnding = `st`;
    if (Number(input.getDate() === 11)) dateEnding = `th`;
  }
  if (endDigit === 2) dateEnding = `nd`;
  if (endDigit === 3) dateEnding = `rd`;
  return dateEnding;
};

export const insertTiming = (target, inputValues, timing, timingButtons, budget, index, placeholderBudget) => {
  let wording, dayEnding, dayEndingNumberOne;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let currentMainCategory, subCategoryIndex, mainIndex;
  ////////////////////////////
  // INITIALIZE 12 MONTH ARRAY
  const twelveMonthArray = [];

  // GET MONTHLY TIMING
  if (timing === `Monthly`) {
    // Create Payment Schedule
    let paymentSchedule = create12MonthArray(twelveMonthArray, inputValues[0], timing, days);

    // Get Current Main Category
    budget.mainCategories.forEach((mc, i) => {
      let categoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
      categoryTitles.forEach((ct) => {
        if (mc.title === ct.textContent) {
          currentMainCategory = mc;
          console.log(mainIndex, mc.title, ct);
          return (mainIndex = i);
        }
      });
    });

    budget.mainCategories.forEach((mc, i) => {
      let mainCategoryIndex = i;
      mc.subCategories.forEach((sc) => {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    });

    console.log(currentMainCategory, mainIndex, subCategoryIndex);

    ///////////////////////
    // SET TIMING OPTIONS
    budget._updateSubCategory(`Creation`, `Timing`, {
      index: mainIndex,
      subCategoryIndex: subCategoryIndex,
      paymentCycle: timing,
      paymentSchedule: paymentSchedule,
    });

    ///////////////////////////////
    // GET THE DUE DATE
    let dueDate = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0];

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
      if (mc.title === categoryTitle) {
        currentMainCategory = mc;
        mainIndex = i;
      }
    });
    console.log(currentMainCategory, mainIndex, subCategoryIndex);

    // Get Correct Sub Category Index
    budget.mainCategories.forEach((mc, i) => {
      let mainCategoryIndex = i;
      mc.subCategories.forEach((sc) => {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    });

    ///////////////////////
    // SET TIMING OPTIONS

    budget._updateSubCategory(`Creation`, `Timing`, {
      index: mainIndex,
      subCategoryIndex: subCategoryIndex,
      paymentCycle: timing,
      paymentSchedule: paymentSchedule,
    });

    ///////////////////////////////
    // GET THE DUE DATES
    let dueDate1 = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0][0];
    let dueDate2 = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0][1];

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
      if (mc.title === categoryTitle) {
        currentMainCategory = mc;
        mainIndex = i;
      }
    });
    console.log(currentMainCategory, mainIndex, subCategoryIndex);

    // Get Correct Sub Category Index
    budget.mainCategories.forEach((mc, i) => {
      let mainCategoryIndex = i;
      mc.subCategories.forEach((sc) => {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    });

    ///////////////////////
    // SET TIMING OPTIONS

    budget._updateSubCategory(`Creation`, `Timing`, {
      index: mainIndex,
      subCategoryIndex: subCategoryIndex,
      paymentCycle: timing,
      paymentSchedule: paymentSchedule,
    });

    ///////////////////////////////
    // GET THE DUE DATE
    let dueDate = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0];

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
      if (mc.title === categoryTitle) {
        currentMainCategory = mc;
        mainIndex = i;
      }
    });
    console.log(currentMainCategory, mainIndex, subCategoryIndex);

    // Get Correct Sub Category Index
    budget.mainCategories.forEach((mc, i) => {
      let mainCategoryIndex = i;
      mc.subCategories.forEach((sc) => {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    });

    ///////////////////////
    // SET TIMING OPTIONS

    budget._updateSubCategory(`Creation`, `Timing`, {
      index: mainIndex,
      subCategoryIndex: subCategoryIndex,
      paymentCycle: timing,
      paymentSchedule: paymentSchedule,
    });

    ///////////////////////////////
    // GET THE DUE DATE
    let dueDate = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0];

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
export const watchForSettingTiming = (budget, index, clickedItem, timing, placeholderBudget, fullBudget) => {
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
        return insertTiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
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
        return insertTiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
      }

      if (timing === `Bi-Weekly`) {
        const oldBiWeeklyTiming = new Date(document.querySelector('.sub-category-display__timing-container__bi-weekly-container__label__input').value);
        const biWeeklyTiming = new Date(oldBiWeeklyTiming.setHours(oldBiWeeklyTiming.getHours() + 7));
        const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
        timingArray = [];
        timingArray.push(biWeeklyTiming);
        insertTiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
        return;
      }

      if (timing === `Weekly`) {
        const oldWeeklyTiming = new Date(document.querySelector('.sub-category-display__timing-container__weekly-container__label__select').value);
        const weeklyTiming = new Date(oldWeeklyTiming.setHours(oldWeeklyTiming.getHours() + 7));
        timingArray = [];
        timingArray.push(weeklyTiming);
        insertTiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
      }
    });
  });
};

/////////////////////////////////////////
// SET UP TIMING FUNCTION CONTAINER
export const setupTimingFunctionContainer = (container, timing) => {
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

export const setupGoalSetting = (budget, index, clickedItem, timing) => {
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
      // This is NOT part of the methods of the class, so I will ignore this for now.
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
  // This is NOT part of the methods of the class, so I will ignore this for now.
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
  _watchForCyclingCategoryGoals();
  watchForSettingTiming(budget, index, clickedItem, timing);
};

const cycleMainCategories = (direction, index, budget, iconElement, textElement) => {
  if (direction === `Left`) {
    if (index < 0) index = 0;
    iconElement.classList.remove(budget.mainCategories[index + 1].icon);
    iconElement.classList.add(budget.mainCategories[index].icon);
    textElement.textContent = budget.mainCategories[index].title;
    const subCategories = document.querySelectorAll('.sub-category');
    subCategories.forEach((sc, i) => {
      sc.classList.add('hidden');
      if (sc.dataset.category === `${index}`) {
        sc.classList.remove('hidden');
      }
    });
    return index;
  }
  if (direction === `Right`) {
    if (index > budget.mainCategories.length - 1) index = budget.mainCategories.length - 1;
    iconElement.classList.remove(budget.mainCategories[index - 1].icon);
    iconElement.classList.add(budget.mainCategories[index].icon);
    textElement.textContent = budget.mainCategories[index].title;
    const subCategories = document.querySelectorAll('.sub-category');
    subCategories.forEach((sc, i) => {
      sc.classList.add('hidden');
      if (sc.dataset.category === `${index}`) {
        sc.classList.remove('hidden');
      }
    });
    return index;
  }
};

const closeSubCategoryCreationInput = (button, inputSection) => {
  button.classList.toggle('budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button--hidden');
  inputSection.classList.toggle('category-creation--shown');
};

const setupSubCategoryCreation = (budget, index) => {
  const leftButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__left-button__icon');
  const rightButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__right-button__icon');
  let mainCategoryIcon = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__category-information__icon');
  let mainCategoryText = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__category-information__text');
  const subCategoryStartCreationButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button');
  const subCategoryStopCreationButton = document.querySelector('.category-creation__controller__close');
  const categoryCreationSection = document.querySelector('.category-creation');
  let direction;
  mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
  mainCategoryText.textContent = budget.mainCategories[index].title;
  leftButton.addEventListener('click', (e) => {
    index--;
    direction = `Left`;
    cycleMainCategories(direction, index, budget, mainCategoryIcon, mainCategoryText);
  });
  rightButton.addEventListener('click', (e) => {
    index++;
    direction = `Right`;
    cycleMainCategories(direction, index, budget, mainCategoryIcon, mainCategoryText);
  });
  subCategoryStopCreationButton.addEventListener('click', (e) => {
    e.preventDefault();
    closeSubCategoryCreationInput(subCategoryStartCreationButton, categoryCreationSection);
  });

  const subCategoryCreateButton = document.querySelector('.category-creation__input-container__button');
  subCategoryCreateButton.addEventListener('click', (e) => {
    e.preventDefault();
    const subCategoryCreateInput = document.querySelector('.category-creation__input-container__input');
    Categories._verifySubCategory(budget, index);
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
    console.log(`Ready...`);
  });
  _watchForSubCategoryKeyboardInput();
  watchToCycleSubCategoryMainCategories();
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
const _watchForSubCategoryKeyboardInput = () => {
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
// SET BUDGET NAME
const getBudgetName = (budget) => {
  const budgetName = document.getElementById('budgetName').value;
  budget._addName(budgetName);
  return budget;
};

const _checktLatterDaySaintStatus = (user) => {
  return user.latterDaySaint;
};

///////////////////////////////////////
// SETTING UP MAIN CATEGORY CREATION
const setupMainCategoryCreation = (icon, budget) => {
  Categories._watchCreateCategoryButton(icon, budget);
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
        budget._updateAccounts(`Creation`, `Tithing Setting`, { setting: `Gross` });
      }
      if (e.target === netOptionLabel) {
        tithingOptions.forEach((t) => t.classList.remove('checked'));
        clicked.classList.toggle('checked');
        budget._updateAccounts(`Creation`, `Tithing Setting`, { setting: `Net` });
      }
      if (e.target === surplusOptionLabel) {
        tithingOptions.forEach((t) => t.classList.remove('checked'));
        clicked.classList.toggle('checked');
        budget._updateAccounts(`Creation`, `Tithing Setting`, { setting: `Surplus` });
      }
    });
  }
};

const _watchCreationFormCloser = (form, budget) => {
  // GLITCH: Budget creation form page is NOT resetting when the form is closed.

  const formCloser = document.querySelector(`.budget-creation-form-close-icon`);
  if (formCloser) {
    formCloser.addEventListener('click', (e) => {
      form.classList.toggle(`budget-creation-form-container--shown`);
      budget = undefined;
      console.log(budget);
    });
  }
};

const _watchCreationFormOpener = (form, button, budget) => {
  if (button) {
    button.addEventListener(`click`, (e) => {
      form.classList.toggle(`budget-creation-form-container--shown`);
      console.log(budget);
      return budget;
    });
  }
};

const _setupBudgetCreation = (form, button, budget) => {
  _watchCreationFormCloser(form, budget);
  _watchCreationFormOpener(form, button, budget);
};

export const _watchForBudgetCreation = async () => {
  const budgetCreationForm = document.querySelector('.budget-creation-form-container');
  const budgetCreationFormOpenButton = document.querySelector('.budget-card-container__card--create');
  let budget;
  budget = Budget.startToCreate();
  _setupBudgetCreation(budgetCreationForm, budgetCreationFormOpenButton, budget);
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

  /////////////////////////////
  // GET USER
  const userInfo = await Updating.getSomePersonals();
  const user = userInfo.data.data.user;

  //////////////////////////////////////
  // CHECK IF USER IS A LATTER DAY SAINT
  let latterDaySaintStatus = _checktLatterDaySaintStatus(user);

  if (budgetContinueButton) {
    budgetContinueButton.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage++;
      //////////////////////////////
      // ASSIGN BUDGET INFORMATION
      /////////////////////
      // BUDGET NAME
      getBudgetName(budget);

      ////////////////////////////////
      // SETUP BUDGET CREATION FORM
      setupPage(currentPage, budgetCreationFormPages, budgetCreationFormPagesNumber, budget);

      /////////////////////////////
      // IF NOT LATTER DAY SAINT
      if (currentPage + 1 === 2 && latterDaySaintStatus === false) {
        // From here, there is a need to check the function names to make sure they make sense as to what they are actually doing.  If not, they WILL be renamed accordingly.
        setupMainCategoryCreation(icon, budget);
      }
      if (currentPage + 1 === 3 && latterDaySaintStatus === false) {
        setupSubCategoryCreation(budget, subCategoryIndex);
      }
      if (currentPage + 1 === 4 && latterDaySaintStatus === false) {
        setupGoalSetting(budget, subCategoryIndex, clicked, selectedTiming);
      }
      if (currentPage + 1 === 5 && latterDaySaintStatus === false) {
        const individualPayments = document.querySelectorAll('.individual-payment');
        budget._updateSubCategory(`Creation`, `Finalizing Sub-Categories`, { goals: individualPayments });
        _watchEmergencyGoalSettings(budget, emergencyGoalSetting);
      }
      if (currentPage + 1 === 6 && latterDaySaintStatus === false) {
        if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
          budget._updateAccounts(`Creation`, `Emergency Goal`, {
            goal: Number(document.querySelector('#timingNumber').value),
            goalTiming: document.querySelector('.budget-creation-form__page__section__select').value,
          });
        }
        if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
          budget._updateAccounts(`Creation`, `Emergency Goal`, { goal: Number(document.querySelector('#emergencyGoal').value) });
        }
        document.querySelector('#savingsPercentGoal').focus();
      }
      if (currentPage + 1 === 7 && latterDaySaintStatus === false) {
        budget._updateAccounts(`Creation`, `Savings`, {
          percentage: Number(document.querySelector('#savingsPercentGoal').value) / 100,
          goal: Number(document.querySelector('#savingsGoal').value),
        });
        document.querySelector('#investmentPercentGoal').focus();
      }
      if (currentPage + 1 === 8 && latterDaySaintStatus === false) {
        budget._updateAccounts(`Creation`, `Investment`, {
          percentage: Number(document.querySelector('#investmentPercentGoal').value) / 100,
          goal: Number(document.querySelector('#investmentGoal').value),
        });
        budget._submit(budget, user);
      }

      /////////////////////////////
      // IF LATTER DAY SAINT
      if (currentPage + 1 === 2 && latterDaySaintStatus === true) {
        console.log(`Tithing Options`);
        budget._addTithingAccount(user);
        _watchTIthingOptions(budget);
      }
      if (currentPage + 1 === 3 && latterDaySaintStatus === true) {
        // From here, there is a need to check the function names to make sure they make sense as to what they are actually doing.  If not, they WILL be renamed accordingly.
        setupMainCategoryCreation(icon, budget);
      }
      if (currentPage + 1 === 4 && latterDaySaintStatus === true) {
        setupSubCategoryCreation(budget, subCategoryIndex);
      }
      if (currentPage + 1 === 5 && latterDaySaintStatus === true) {
        setupGoalSetting(budget, subCategoryIndex, clicked, selectedTiming);
      }
      if (currentPage + 1 === 6 && latterDaySaintStatus === true) {
        const individualPayments = document.querySelectorAll('.individual-payment');
        budget._updateSubCategory(`Creation`, `Finalizing Sub-Categories`, { goals: individualPayments });
        _watchEmergencyGoalSettings(budget, emergencyGoalSetting);
      }
      if (currentPage + 1 === 7 && latterDaySaintStatus === true) {
        if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
          budget._updateAccounts(`Creation`, `Emergency Goal`, {
            goal: Number(document.querySelector('#timingNumber').value),
            goalTiming: document.querySelector('.budget-creation-form__page__section__select').value,
          });
        }
        if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
          budget._updateAccounts(`Creation`, `Emergency Goal`, { goal: Number(document.querySelector('#emergencyGoal').value) });
        }
        document.querySelector('#savingsPercentGoal').focus();
      }
      if (currentPage + 1 === 8 && latterDaySaintStatus === true) {
        budget._updateAccounts(`Creation`, `Savings`, {
          percentage: Number(document.querySelector('#savingsPercentGoal').value) / 100,
          goal: Number(document.querySelector('#savingsGoal').value),
        });
        document.querySelector('#investmentPercentGoal').focus();
      }
      if (currentPage + 1 === 9 && latterDaySaintStatus === true) {
        budget._updateAccounts(`Creation`, `Investment`, {
          percentage: Number(document.querySelector('#investmentPercentGoal').value) / 100,
          goal: Number(document.querySelector('#investmentGoal').value),
        });
        budget._submit(budget, user);
      }
    });
  }
  // WATCHING YOUR BUDGET AFTER YOU LOGIN OR CREATE YOUR BUDGET
  const budgetNavButton = document.querySelector('.budget-container__navigation-button-container__button');
  Budgeting._watchBudget();
};
