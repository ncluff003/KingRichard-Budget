import * as Categories from './Budget-Categories';
import * as Budgeting from './Maintain-Budget';
import * as Budget from './Budget';
import * as Utility from './Utility';
import * as Validate from './Validate';

export const _watchEmergencyGoalSettings = (budget, setting) => {
  const emergencySettingLabels = document.querySelectorAll('.emergency-checkbox-label');
  const emergencyInputs = document.querySelectorAll('.emergency-input');
  emergencySettingLabels.forEach((esl, i) => {
    esl.addEventListener('click', (e) => {
      emergencySettingLabels.forEach((label) => {
        label.classList.remove('clicked-label');
      });
      esl.classList.add('clicked-label');
      if (esl.textContent === `Length Of Time`) {
        emergencyInputs[1].classList.toggle('closed');
        emergencyInputs[1].classList.toggle('open');
        if (emergencyInputs[0].classList.contains('open')) {
          emergencyInputs[0].classList.toggle('closed');
          emergencyInputs[0].classList.toggle('open');
        }
      }
      if (esl.textContent === `Total Amount`) {
        emergencyInputs[0].classList.toggle('closed');
        emergencyInputs[0].classList.toggle('open');
        if (emergencyInputs[1].classList.contains('open')) {
          emergencyInputs[1].classList.toggle('closed');
          emergencyInputs[1].classList.toggle('open');
        }
      }
      setting = esl.textContent;
      if (setting === `Length Of Time`) {
        document.querySelector('#timingNumber').focus();
      }
      if (setting === `Total Amount`) {
        document.querySelector('#emergencyGoal').focus();
      }
      if (budget) {
        // budget.accounts.emergencyFund.emergencyGoalMeasurement = setting;
        budget._updateEmergencyMeasurement({ setting: setting });
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
  const timingFunctionContainer = document.querySelector('.timing-container');
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  /////////////////////////////////////////
  // SELECT SUB CATEGORY DISPLAY
  const subCategoryDisplay = document.querySelector('.sub-category-display');
  const subCategory = document.createElement('section');
  subCategory.classList.add('sub-category--month-view');
  subCategory.classList.add('r__sub-category--month-view');
  subCategory.classList.add('closed');
  subCategory.dataset.category = `${secondaryIndex}`;

  subCategoryDisplay.insertAdjacentElement('beforeend', subCategory);
  const numberOfSections = 5;
  let sectionIndex = 0;
  const subCategories = document.querySelectorAll('.sub-category--month-view');

  while (sectionIndex < numberOfSections) {
    const subCategorySection = document.createElement('section');
    subCategorySection.classList.add('sub-category--month-view__section');
    subCategorySection.classList.add('r__sub-category--month-view__section');
    subCategory.insertAdjacentElement('beforeend', subCategorySection);

    ///////////////////////////////////////////
    // CREATE SUB CATEGORY NAME
    const subCategoryName = document.createElement('p');
    subCategoryName.classList.add('sub-category--month-view__section__category-name');
    subCategoryName.classList.add('r__sub-category--month-view__section__category-name');
    // subCategoryName.textContent = `${categories[index].title}`;

    //////////////////////////////////////////
    // CREATE SUB CATEGORY TIMING BUTTON
    const subCategoryTimingButton = document.createElement('button');
    subCategoryTimingButton.classList.add('button--borderless-set-timing-button');
    subCategoryTimingButton.classList.add('r__button--borderless-set-timing-button');
    subCategoryTimingButton.textContent = `+ Timing`;

    const subCategories = document.querySelectorAll('.sub-category--month-view');
    //////////////////////////////////////////
    // CREATE SUB CATEGORY TIMING DISPLAY
    if (sectionIndex === 0) {
      subCategorySection.insertAdjacentElement('beforeend', subCategoryName);
      subCategorySection.insertAdjacentElement('beforeend', subCategoryTimingButton);
      subCategoryName.textContent = categories[index].title;
    }
    if (sectionIndex === 1) {
      const subCategoryInput = document.createElement('input');
      subCategoryInput.classList.add('sub-category--month-view__section__input');
      subCategoryInput.classList.add('r__sub-category--month-view__section__input');
      subCategoryInput.classList.add('individual-payment');
      subCategoryInput.classList.add('r__individual-payment');
      subCategoryInput.type = `number`;
      subCategoryInput.min = 0;
      subCategorySection.insertAdjacentElement('beforeend', subCategoryInput);

      subCategoryInput.addEventListener('keyup', (e) => {
        e.preventDefault();
        const overallBudget = document.querySelectorAll('.month-container__overall-budget-summary-container--single-summary__amount');
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
      subCategoryContent.classList.add('sub-category--month-view__section__content');
      subCategoryContent.classList.add('r__sub-category--month-view__section__content');
      subCategorySection.insertAdjacentElement('beforeend', subCategoryContent);
    }
    if (sectionIndex === 3) {
      const subCategoryContent = document.createElement('p');
      subCategoryContent.classList.add('sub-category--month-view__section__content');
      subCategoryContent.classList.add('r__sub-category--month-view__section__content');
      subCategorySection.insertAdjacentElement('beforeend', subCategoryContent);
    }
    if (sectionIndex === 4) {
      const subCategoryContent = document.createElement('p');
      subCategoryContent.classList.add('sub-category--month-view__section__content');
      subCategoryContent.classList.add('r__sub-category--month-view__section__content');
      subCategorySection.insertAdjacentElement('beforeend', subCategoryContent);
    }
    sectionIndex++;
  }
  const overallBudget = document.querySelectorAll('.month-container__overall-budget-summary-container--single-summary__amount');
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

  const timingInputs = document.querySelectorAll('.timing-container__section__label__input');
  if (timing === `Monthly`) {
    ////////////////////////////////////////////////////
    // GET DATE AGAIN SO IT DOES NOT CHANGE MAGICALLY
    const adjustedDate = new Date(timingInputs[0].value);
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
    const adjustedDate1 = new Date(timingInputs[1].value);
    const selectedDate1 = new Date(adjustedDate1.setHours(adjustedDate1.getHours() + 7));
    const adjustedDate2 = new Date(timingInputs[2].value);
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
    const adjustedDate = new Date(timingInputs[3].value);
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
    const timingSelect = document.querySelector('.timing-container__section__label__select');
    const selectedWeekDay = timingSelect.value;
    const currentDate1 = new Date();
    const currentDate2 = new Date();
    const nextWeekDay = getNextWeekDayDate(days, currentDate1, selectedWeekDay);
    const firstDate = getNextWeekDayDate(days, currentDate2, selectedWeekDay);
    const adjustedDate = nextWeekDay;
    const selectedDate = adjustedDate;
    const manipulated = currentDate1;
    console.log(selectedDate, firstDate);
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

    ///////////////////////
    // SET TIMING OPTIONS
    budget._updateSubCategoryTiming({
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

    // Get Correct Sub Category Index
    budget.mainCategories.forEach((mc, i) => {
      let mainCategoryIndex = i;
      mc.subCategories.forEach((sc) => {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    });

    ///////////////////////
    // SET TIMING OPTIONS

    budget._updateSubCategoryTiming({
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

    // Get Correct Sub Category Index
    budget.mainCategories.forEach((mc, i) => {
      let mainCategoryIndex = i;
      mc.subCategories.forEach((sc) => {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    });

    ///////////////////////
    // SET TIMING OPTIONS

    budget._updateSubCategoryTiming({
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

    // Get Correct Sub Category Index
    budget.mainCategories.forEach((mc, i) => {
      let mainCategoryIndex = i;
      mc.subCategories.forEach((sc) => {
        if (sc.title === target.previousSibling.textContent) subCategoryIndex = budget.mainCategories[mainCategoryIndex].subCategories.indexOf(sc);
      });
    });

    ///////////////////////
    // SET TIMING OPTIONS

    budget._updateSubCategoryTiming({
      index: mainIndex,
      subCategoryIndex: subCategoryIndex,
      paymentCycle: timing,
      paymentSchedule: paymentSchedule,
    });

    ///////////////////////////////
    // GET THE DUE DATE
    let dueDate = budget.mainCategories[mainIndex].subCategories[subCategoryIndex].timingOptions.dueDates[0];
    console.log(dueDate);
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
  const timingFunctionContainer = document.querySelector('.timing-container');
  timingFunctionContainer.classList.toggle('closed');
  timingFunctionContainer.classList.toggle('open');
};

/////////////////////////////////////////
// WATCH FOR TIMING SETTING
export const watchForSettingTiming = (budget, index, clickedItem, timing, placeholderBudget, fullBudget) => {
  // Getting the timing.
  const timingButtons = document.querySelectorAll('.button--timing-button');
  const monthlyTimingButton = timingButtons[0];
  const biMonthlyTimingButton = timingButtons[1];
  const biWeeklyTimingButton = timingButtons[2];
  const weeklyTimingButton = timingButtons[3];
  const timingInputButtons = [monthlyTimingButton, biMonthlyTimingButton, biWeeklyTimingButton, weeklyTimingButton];

  timingInputButtons.forEach((tib, i) => {
    if (tib) {
      tib.addEventListener('click', (e) => {
        e.preventDefault();
        timing = tib.firstChild.nextSibling.textContent;
      });
    }
  });

  const subCategoryTimingButtons = document.querySelectorAll('.button--borderless-set-timing-button');
  const timingFunctionContainer = document.querySelector('.timing-container');
  subCategoryTimingButtons.forEach((sctb, i) => {
    sctb.addEventListener('click', (e) => {
      e.preventDefault();
      timingFunctionContainer.classList.toggle('closed');
      timingFunctionContainer.classList.toggle('open');
      clickedItem = e.target;
    });
  });
  const timingSubmitButtons = document.querySelectorAll('.button--timing-button-submit');
  const timingSectionInputs = document.querySelectorAll('.timing-container__section__label__input');
  timingSubmitButtons.forEach((tsb) => {
    tsb.addEventListener('click', (e) => {
      e.preventDefault();
      let timingArray = [];
      const oldMonthlyTiming = new Date(timingSectionInputs[0].value);
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
        const oldTimingOne = new Date(timingSectionInputs[1].value);
        const oldTimingTwo = new Date(timingSectionInputs[2].value);
        const timingOne = new Date(oldTimingOne.setHours(oldTimingOne.getHours() + 7));
        const timingTwo = new Date(oldTimingTwo.setHours(oldTimingTwo.getHours() + 7));
        timingArray = [];
        timingArray.push(timingOne);
        timingArray.push(timingTwo);
        return insertTiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
      }

      if (timing === `Bi-Weekly`) {
        const oldBiWeeklyTiming = new Date(timingSectionInputs[3].value);
        const biWeeklyTiming = new Date(oldBiWeeklyTiming.setHours(oldBiWeeklyTiming.getHours() + 7));
        const subCategories = document.querySelectorAll('.sub-category--month-view');
        timingArray = [];
        timingArray.push(biWeeklyTiming);
        insertTiming(clickedItem, timingArray, timing, subCategoryTimingButtons, budget, index);
        return;
      }

      if (timing === `Weekly`) {
        const timingSectionSelect = document.querySelector('.timing-container__section__label__select');
        const oldWeeklyTiming = new Date(timingSectionSelect.value);
        const weeklyTiming = new Date(oldWeeklyTiming.setHours(oldWeeklyTiming.getHours() + 7));
        // const weeklyTiming = new Date(oldWeeklyTiming.setHours(oldWeeklyTiming.getHours() + (oldMonthlyTiming.getTimezoneOffset() + 1)));

        // Date Sat Apr 23 2022 20:11:15 GMT-0600 (Mountain Daylight Time)
        // Date Sat Apr 23 2022 20:12:21 GMT-0600 (Mountain Daylight Time)
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
  const closeTimingFunctionContainer = document.querySelector('.timing-container__closure-icon');
  /////////////////////////////////////////
  // INITIALIZE VARIABLES FOR TIMING INPUTS
  const timingButtons = document.querySelectorAll('.button--timing-button');
  const monthlyTimingButton = timingButtons[0];
  const biMonthlyTimingButton = timingButtons[1];
  const biWeeklyTimingButton = timingButtons[2];
  const weeklyTimingButton = timingButtons[3];
  const timingInputButtons = [monthlyTimingButton, biMonthlyTimingButton, biWeeklyTimingButton, weeklyTimingButton];

  const timingLabels = document.querySelectorAll('.timing-container__section__label');
  const timingSubmitButtons = document.querySelectorAll('.button--timing-button-submit');
  // Monthly Timing
  const monthlyTimingLabel = timingLabels[0];
  const monthlyTimingSubmit = timingSubmitButtons[0];

  // Bi-Monthly Timing
  const biMonthlyTimingLabelOne = timingLabels[1];
  const biMonthlyTimingLabelTwo = timingLabels[2];
  const biMonthlyTimingSubmit = timingSubmitButtons[1];
  // Bi-Weekly Timing
  const biWeeklyTimingLabel = timingLabels[3];
  const biWeeklyTimingSubmit = timingSubmitButtons[2];

  // Weekly Timing
  const weeklyTimingLabel = timingLabels[4];
  const weeklyTimingSubmit = timingSubmitButtons[3];

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
        if (el) el.classList.add('closed');
      });
    });
    if (tib) {
      tib.addEventListener('click', (e) => {
        timingFunctionPages.forEach((tfp, i) => {
          tfp.forEach((el) => {
            el.classList.add('closed');
            el.classList.remove('open');
          });
        });
        timingFunctionPages[index].forEach((te) => {
          te.classList.toggle('closed');
          te.classList.toggle('open');
        });
      });
    }
  });
  if (closeTimingFunctionContainer) {
    closeTimingFunctionContainer.addEventListener('click', (e) => {
      e.preventDefault();
      container.classList.toggle('closed');
      container.classList.toggle('open');
    });
  }
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
  const subCategories = document.querySelectorAll('.sub-category--month-view');
  subCategories.forEach((sc, i) => {
    if (Number(sc.dataset.category) === 0) {
      sc.classList.toggle('closed');
    }
  });

  /////////////////////////////////////////
  // SET UP TIMING FUNCTION CONTAINER
  const timingFunctionContainer = document.querySelector('.timing-container');
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
      sc.classList.add('closed');
      sc.classList.remove('open');
      if (Number(sc.dataset.category) === index) {
        sc.classList.remove('closed');
        sc.classList.add('open');
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
      sc.classList.add('closed');
      sc.classList.remove('open');
      if (Number(sc.dataset.category) === index) {
        sc.classList.remove('closed');
        sc.classList.add('open');
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
      sc.classList.add('closed');
      sc.classList.remove('open');
      if (sc.dataset.category === `${index}`) {
        sc.classList.remove('closed');
        sc.classList.add('open');
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
      sc.classList.add('closed');
      console.log(sc.dataset.category);
      if (sc.dataset.category === `${index}`) {
        sc.classList.remove('closed');
      }
    });
    return index;
  }
};

const closeSubCategoryCreationInput = (button, inputSection) => {
  button.classList.toggle('closed');
  button.classList.toggle('open');
  inputSection.classList.toggle('closed');
  inputSection.classList.toggle('open');
};

export const setupSubCategoryCreation = (budget, index) => {
  const leftButton = document.querySelector('.budget-creation-container--sub-categories__main-category-display__left-button__icon');
  const rightButton = document.querySelector('.budget-creation-container--sub-categories__main-category-display__right-button__icon');
  let mainCategoryIcon = document.querySelector('.budget-creation-container--sub-categories__main-category-display__category-information__icon');
  let mainCategoryText = document.querySelector('.budget-creation-container--sub-categories__main-category-display__category-information__text');
  const borderlessButtons = document.querySelectorAll('.button--borderless');
  console.log(borderlessButtons);
  const subCategoryStartCreationButton = borderlessButtons[2];
  const subCategoryStopCreationButton = document.querySelector('.button--small-create-sub-category-close');
  const categoryCreationSection = document.querySelector('.form__section--sub-category-creation');
  let direction;
  const mainCategoryDisplay = document.querySelector('.main-category-display');
  const subCategoryCreationContainer = document.querySelector('.budget-creation-container--sub-categories.r__budget-creation-container--sub-categories');

  // USED DURING BUDGET CREATION PROCESS
  if (subCategoryCreationContainer) {
    mainCategoryIcon.classList.add(budget.mainCategories[index].icon);
    mainCategoryText.textContent = budget.mainCategories[index].title;
    leftButton.addEventListener('click', (e) => {
      index--;
      if (index < 0) index = 0;
      direction = `Left`;
      cycleMainCategories(direction, index, budget, mainCategoryIcon, mainCategoryText);
    });
    rightButton.addEventListener('click', (e) => {
      index++;
      if (index > budget.mainCategories.length - 1) index = budget.mainCategories.length - 1;
      direction = `Right`;
      cycleMainCategories(direction, index, budget, mainCategoryIcon, mainCategoryText);
    });
    subCategoryStopCreationButton.addEventListener('click', (e) => {
      e.preventDefault();
      closeSubCategoryCreationInput(subCategoryStartCreationButton, categoryCreationSection);
    });

    const subCategoryCreateButton = document.querySelector('.button--small-create-sub-category');
    subCategoryCreateButton.addEventListener('click', (e) => {
      e.preventDefault();
      const subCategoryCreateInput = document.querySelector('.form__input--sub-category-title');
      Categories._verifySubCategory(budget, index);
      subCategoryCreateInput.focus();
      subCategoryCreateInput.value = '';
    });

    subCategoryStartCreationButton.addEventListener('click', (e) => {
      e.preventDefault();
      subCategoryStartCreationButton.classList.toggle('closed');
      subCategoryStartCreationButton.classList.toggle('open');
      categoryCreationSection.classList.toggle('closed');
      categoryCreationSection.classList.toggle('open');
      const subCategoryCreateInput = document.querySelector('.form__input--sub-category-title');
      subCategoryCreateInput.value = '';
      subCategoryCreateInput.focus();
      console.log(`Ready...`);
    });
    _watchForSubCategoryKeyboardInput();
    watchToCycleSubCategoryMainCategories();
  }

  // USED INSIDE BUDGET ON MANAGE CATEGORIES PAGE
  if (mainCategoryDisplay) {
    let mainCategoryIcon__alt = document.querySelector('.main-category-display__category-information__icon');
    let mainCategoryText__alt = document.querySelector('.main-category-display__category-information__text');
    const leftButton = document.querySelector('.main-category-display__left-button__icon');
    const rightButton = document.querySelector('.main-category-display__right-button__icon');

    if (mainCategoryIcon__alt) {
      mainCategoryIcon__alt.classList.add(budget.mainCategories[index].icon);
      mainCategoryIcon__alt.dataset.category = index;
      mainCategoryText__alt.textContent = budget.mainCategories[index].title;
      mainCategoryText__alt.dataset.category = index;

      console.log(budget);

      const subCategories = document.querySelectorAll('.sub-category');
      subCategories.forEach((sc, i) => {
        sc.classList.add('closed');
        sc.classList.remove('open');
        if (sc.dataset.category === `${index}`) {
          sc.classList.remove('closed');
          sc.classList.add('open');
        }
      });

      leftButton.addEventListener('click', (e) => {
        index--;
        if (index < 0) index = 0;
        direction = `Left`;
        cycleMainCategories(direction, index, budget, mainCategoryIcon__alt, mainCategoryText__alt);
      });
      rightButton.addEventListener('click', (e) => {
        index++;
        if (index > budget.mainCategories.length - 1) index = budget.mainCategories.length - 1;
        direction = `Right`;
        cycleMainCategories(direction, index, budget, mainCategoryIcon__alt, mainCategoryText__alt);
      });

      subCategoryStartCreationButton.addEventListener('click', (e) => {
        e.preventDefault();
        subCategoryStartCreationButton.classList.toggle('closed');
        subCategoryStartCreationButton.classList.toggle('open');
        categoryCreationSection.classList.toggle('closed');
        categoryCreationSection.classList.toggle('open');
        const subCategoryCreateInput = document.querySelector('.form__input--sub-category-title');
        subCategoryCreateInput.value = '';
        subCategoryCreateInput.focus();
        console.log(`Ready...`);
      });

      subCategoryStopCreationButton.addEventListener('click', (e) => {
        e.preventDefault();
        closeSubCategoryCreationInput(subCategoryStartCreationButton, categoryCreationSection);
      });

      const subCategoryCreateButton = document.querySelector('.button--small-create-sub-category');
      subCategoryCreateButton.addEventListener('click', (e) => {
        e.preventDefault();
        const subCategoryCreateInput = document.querySelector('.form__input--sub-category-title');
        Categories._verifySubCategory(budget, index);
        subCategoryCreateInput.focus();
        subCategoryCreateInput.value = '';
      });

      _watchForSubCategoryKeyboardInput();
      watchToCycleSubCategoryMainCategories();
    }
  }
};

//////////////////////////////////////
// LOG KEYBOARD KEY
const clickToCreateSubCategory = () => {
  const e = event;
  e.preventDefault();
  const subCategoryCreateInput = document.querySelector('.form__input--sub-category-title');
  const borderlessButtons = document.querySelectorAll('.button--borderless');
  const subCategoryCreationButton = document.querySelector('.button--small-create-sub-category');
  const subCategoryStartCreationButton = borderlessButtons[2];
  if (e.key === `Enter`) {
    const categoryCreation = document.querySelector('.form__section--sub-category-creation');
    if (categoryCreation.classList.contains('open')) {
      subCategoryCreationButton.click();
      return;
    }
    if (!subCategoryStartCreationButton.classList.contains(`open`)) {
      subCategoryStartCreationButton.classList.toggle('open');
      subCategoryStartCreationButton.classList.toggle('closed');
      categoryCreation.classList.toggle('open');
      categoryCreation.classList.toggle('closed');
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
  const leftButton = document.querySelector('.budget-creation-container--sub-categories__main-category-display__left-button__icon');
  const rightButton = document.querySelector('.budget-creation-container--sub-categories__main-category-display__right-button__icon');
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
  const borderlessButtons = document.querySelectorAll('.button--borderless');
  const subCategoryStartCreationButton = borderlessButtons[2];
  subCategoryStartCreationButton.focus();
  document.addEventListener(`keyup`, clickToCreateSubCategory);
};

/////////////////////////////////
// GO TO PAGE
const goToPage = (page, createBudgetPages) => {
  createBudgetPages.forEach((bp) => {
    bp.classList.add('closed');
    bp.classList.remove('open');
    if (createBudgetPages[page]) createBudgetPages[page].classList.remove('closed');
    if (createBudgetPages[page]) createBudgetPages[page].classList.add('open');
  });
};

/////////////////////////////////
// SET BUDGET NAME
const getBudgetName = (budget) => {
  const budgetName = document.getElementById('budgetName').value;
  budget._updateBudgetName(budgetName);
  return budget;
};

///////////////////////////////////////
// SETTING UP MAIN CATEGORY CREATION
const setupMainCategoryCreation = (icon, budget, person) => {
  Categories._watchCreateCategoryButton(icon, budget, person);
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
  const page = document.querySelector('.form__section--page-number-display__number');
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

const _watchCreationFormCloser = (pages, page, form, budget) => {
  // ADJUST: Budget now resets, but somehow, I feel there is a better way of handling the form altogether.

  const formCloser = document.querySelectorAll(`.form-closure-icon--budget-creation`)[0];
  if (formCloser) {
    formCloser.addEventListener('click', (e) => {
      pages.forEach((page) => {
        if (page.classList.contains('open')) {
          page.classList.add(`reset`);
        }
      });
      console.log(page);
      setupPage(page, pages, pages.length, budget);
      form.classList.toggle(`closed`);
      form.classList.toggle(`open`);
      budget = undefined;
      pages.forEach((page) => {
        page.classList.add('closed');
        page.classList.remove('open');
      });
    });
  }
};

const _watchCreationFormOpener = (pages, form, button, budget, budgetForm) => {
  if (button) {
    button.addEventListener(`click`, (e) => {
      pages.forEach((page) => {
        page.classList.add('closed');
        page.classList.remove('open');
      });
      pages[0].classList.add('open');
      pages[0].classList.remove('closed');
      form.classList.toggle(`closed`);
      form.classList.toggle(`open`);
      if (budgetForm.classList.contains('closed')) {
        budgetForm.classList.toggle(`closed`);
        budgetForm.classList.toggle(`open`);
      }
      return budget;
    });
  }
};

const _setupBudgetCreation = (pages, page, form, button, budget) => {
  const forms = document.querySelectorAll('.form--full-width');
  const budgetCreationForm = forms[4];
  _watchCreationFormCloser(pages, page, form, budget);
  _watchCreationFormOpener(pages, form, button, budget, budgetCreationForm);
};

export const _watchForBudgetCreation = async (person) => {
  const forms = document.querySelectorAll('.form-container--full-width');
  const budgetCreationForm = forms[0];
  const budgetCreationFormOpenButton = document.querySelector('.budget-card-container__card--create');
  let budget;
  budget = Budget.startToCreate();
  const pages = document.querySelectorAll('.form__page--centered.r__form__page--centered');
  let currentPage = 0;
  let resetForm = false;
  _setupBudgetCreation(pages, currentPage, budgetCreationForm, budgetCreationFormOpenButton, budget);
  ////////////////////////////
  // INITIALIZE KEY VARIABLES
  // const budgetCreationFormPages = document.querySelectorAll('.budget-creation-form__page');
  const budgetCreationFormPagesNumber = pages.length;
  let emergencyGoalSetting, clicked, selectedTiming;
  const buttons = document.querySelectorAll('.button--small');
  const budgetContinueButton = buttons[0];
  //////////////////////////////////////////////////////////////
  // SET APPROPRIATE PAGE NUMBER DEPENDING ON USER INFORMATION
  setPageCount(currentPage, budgetCreationFormPagesNumber);
  ////////////////////////////////////////////////
  // INITIALIZE KEY VARIABLES INSIDE FUNCTION SCOPE
  let subCategoryIndex = 0;
  let icon;

  /////////////////////////////
  // GET USER
  const userInfo = await person._getPersonData();
  const user = userInfo.data.data.user;

  //////////////////////////////////////
  // CHECK IF USER IS A LATTER DAY SAINT
  let latterDaySaintStatus = person._getLatterDaySaintStatus();

  if (budgetContinueButton) {
    budgetContinueButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (pages[currentPage].classList.contains('reset')) {
        pages[currentPage].classList.remove('reset');
        currentPage = 0;
      }
      currentPage++;

      // BUDGET IS SIMILAR TO PLACEHOLDERBUDGET IN THE WATCH BUDGET FUNCTION.
      // It will have the same budget class methods attached to it.
      //////////////////////////////
      // ASSIGN BUDGET INFORMATION

      /////////////////////
      // BUDGET NAME
      let budgetName = document.getElementById('budgetName').value;

      const budgetNameLabel = document.querySelectorAll('.form__label--small-budget');
      if (!Validate.Validate.isBudgetName(budgetName)) {
        currentPage = 0;
        return Utility.renderError(budgetNameLabel[0], `Invalid Budget Name`, `What will be the name of your budget?`, `negative`, 2500);
      }

      budget._updateBudgetName(budgetName);

      ////////////////////////////////
      // SETUP BUDGET CREATION FORM
      setupPage(currentPage, pages, budgetCreationFormPagesNumber, budget);

      /////////////////////////////
      // IF NOT LATTER DAY SAINT
      if (latterDaySaintStatus === false) {
        if (currentPage + 1 === 2) {
          setupMainCategoryCreation(icon, budget, person);
        }
        if (currentPage + 1 === 3) {
          setupSubCategoryCreation(budget, subCategoryIndex);
        }
        if (currentPage + 1 === 4) {
          setupGoalSetting(budget, subCategoryIndex, clicked, selectedTiming);
        }
        if (currentPage + 1 === 5) {
          const individualPayments = document.querySelectorAll('.individual-payment');
          budget._finalizeSubCategoryCreation({ goals: individualPayments });
          _watchEmergencyGoalSettings(budget, emergencyGoalSetting);
        }
        if (currentPage + 1 === 6) {
          if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
            budget._updateEmergencyGoal({
              goal: Number(document.querySelector('#timingNumber').value),
              goalTiming: document.querySelector('.form__select').value,
            });
          }
          if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
            budget._updateEmergencyGoal({ goal: Number(document.querySelector('#emergencyGoal').value) });
          }
          document.querySelector('#savingsPercentGoal').focus();
        }
        if (currentPage + 1 === 7) {
          budget._updateSavingsFund({
            percentage: Number(document.querySelector('#savingsPercentGoal').value) / 100,
            goal: Number(document.querySelector('#savingsGoal').value),
            amount: 0,
          });
          document.querySelector('#investmentPercentGoal').focus();
        }
        if (currentPage + 1 === 8) {
          budget._updateInvestmentFund({
            percentage: Number(document.querySelector('#investmentPercentGoal').value) / 100,
            goal: Number(document.querySelector('#investmentGoal').value),
            amount: 0,
          });
          budget._submit(budget, user);
        }
      }
      // if (currentPage + 1 === 2) {
      // From here, there is a need to check the function names to make sure they make sense as to what they are actually doing.  If not, they WILL be renamed accordingly.
      //   setupMainCategoryCreation(icon, budget, person);
      // }

      /////////////////////////////
      // IF LATTER DAY SAINT
      if (latterDaySaintStatus === true) {
        if (currentPage + 1 === 2) {
          console.log(`Tithing Options`);
          budget._addTithingAccount(user);
          _watchTIthingOptions(budget);
        }
        if (currentPage + 1 === 3) {
          // From here, there is a need to check the function names to make sure they make sense as to what they are actually doing.  If not, they WILL be renamed accordingly.
          setupMainCategoryCreation(icon, budget, person);
        }
        if (currentPage + 1 === 4) {
          setupSubCategoryCreation(budget, subCategoryIndex);
        }
        if (currentPage + 1 === 5) {
          setupGoalSetting(budget, subCategoryIndex, clicked, selectedTiming);
        }
        if (currentPage + 1 === 6) {
          const individualPayments = document.querySelectorAll('.individual-payment');
          budget._finalizeSubCategoryCreation({ goals: individualPayments });
          _watchEmergencyGoalSettings(budget, emergencyGoalSetting);
        }
        if (currentPage + 1 === 7) {
          if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
            budget._updateEmergencyGoal({
              goal: Number(document.querySelector('#timingNumber').value),
              goalTiming: document.querySelector('.budget-creation-form__page__section__select').value,
            });
          }
          if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
            budget._updateEmergencyGoal({ goal: Number(document.querySelector('#emergencyGoal').value) });
          }
          document.querySelector('#savingsPercentGoal').focus();
        }
        if (currentPage + 1 === 8) {
          budget._updateSavingsFund({
            percentage: Number(document.querySelector('#savingsPercentGoal').value) / 100,
            goal: Number(document.querySelector('#savingsGoal').value),
            amount: 0,
          });
          document.querySelector('#investmentPercentGoal').focus();
        }
        if (currentPage + 1 === 9) {
          budget._updateInvestmentFund({
            percentage: Number(document.querySelector('#investmentPercentGoal').value) / 100,
            goal: Number(document.querySelector('#investmentGoal').value),
            amount: 0,
          });
          budget._submit(budget, user);
        }
      }
    });
  }
  // WATCHING YOUR BUDGET AFTER YOU LOGIN OR CREATE YOUR BUDGET
  const budgetNavButton = document.querySelector('.budget-container__navigation-button-container__button');
  Budgeting._watchBudget(person);
};
