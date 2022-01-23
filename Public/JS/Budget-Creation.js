import * as Categories from './Budget-Categories';
import * as Updating from './Update-User';

export const _watchEmergencyGoalSettings = (setting) => {
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
      return (setting = esl.textContent);
    });
  });
};

const _finishUpdatingSubCategories = (mainCategories, goals) => {
  console.log(mainCategories, goals);
  mainCategories.forEach((mc, i) => {
    mc.subCategories.forEach((sc, i) => {
      sc._finishUpdatingSubCategory(goals[i].value);
    });
    console.log(mc);
  });
  return;
};

const checkUser = async () => {
  const userInfo = await Updating.getSomePersonals();
  const user = userInfo.data.data.user;
  return user;
};

const getUserInformation = async () => {
  console.log(await Updating.getSomePersonals());
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

const insertTiiming = (target, inputValues, timing, timingButtons, mainCategories, index) => {
  let wording, dayEnding, dayEndingNumberOne;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const subCategoryIndex = [...document.querySelectorAll('.sub-category-display__sub-category__section__set-category-timing-button')].indexOf(target);
  let currentMainCategory;
  ////////////////////////////
  // INITIALIZE 12 MONTH ARRAY
  const twelveMonthArray = [];

  // GET MONTHLY TIMING
  if (timing === `Monthly`) {
    // Create Payment Schedule
    let paymentSchedule = create12MonthArray(twelveMonthArray, inputValues[0], timing, days);

    // Get Current Main Category
    mainCategories.forEach((mc, i) => {
      let categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;
      if (mc.title === categoryTitle) currentMainCategory = mc;
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
    mainCategories.forEach((mc, i) => {
      let categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;
      if (mc.title === categoryTitle) currentMainCategory = mc;
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
    mainCategories.forEach((mc, i) => {
      let categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;
      if (mc.title === categoryTitle) currentMainCategory = mc;
    });

    ///////////////////////
    // SET TIMING OPTIONS

    // Set Payment Cycle
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentCycle = timing;

    // Set Payment Schedule
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentSchedule = paymentSchedule;

    // Set Next Due Date(s)
    currentMainCategory.subCategories[subCategoryIndex].timingOptions.dueDates = [currentMainCategory.subCategories[subCategoryIndex].timingOptions.paymentSchedule[0]];
    console.log(currentMainCategory.subCategories[subCategoryIndex]);

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
    mainCategories.forEach((mc, i) => {
      let categoryTitle = document.querySelector('.main-category-display__category-display__title').textContent;
      if (mc.title === categoryTitle) currentMainCategory = mc;
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
const watchForSettingTiming = (categories, index, clickedItem, timing, fullBudget) => {
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
        return insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, categories, index);
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
        console.log(timingArray);
        return insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, categories, index);
      }

      if (timing === `Bi-Weekly`) {
        const oldBiWeeklyTiming = new Date(document.querySelector('.sub-category-display__timing-container__bi-weekly-container__label__input').value);
        const biWeeklyTiming = new Date(oldBiWeeklyTiming.setHours(oldBiWeeklyTiming.getHours() + 7));
        const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
        timingArray = [];
        timingArray.push(biWeeklyTiming);
        insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, categories, index);
        console.log(fullBudget);
        return;
      }

      if (timing === `Weekly`) {
        const oldWeeklyTiming = new Date(document.querySelector('.sub-category-display__timing-container__weekly-container__label__select').value);
        const weeklyTiming = new Date(oldWeeklyTiming.setHours(oldWeeklyTiming.getHours() + 7));
        timingArray = [];
        timingArray.push(weeklyTiming);
        insertTiiming(clickedItem, timingArray, timing, subCategoryTimingButtons, categories, index);
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

const setupGoalSetting = (categories, index, clickedItem, timing) => {
  const leftButton = document.querySelector('.left');
  const rightButton = document.querySelector('.right');
  const mainCategoryIcon = document.querySelector('.main-category-display__category-display__icon');
  const mainCategoryTitle = document.querySelector('.main-category-display__category-display__title');
  mainCategoryIcon.classList.add(categories[index].icon);
  mainCategoryTitle.textContent = categories[index].title;

  categories.forEach((c, i) => {
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
  timingFunctionContainer.style.height = `${getTimingContainerHeight(categories, index)}rem`;
  timingFunctionContainer.style.minHeight = `calc(100% - 4rem)`;
  if (getTimingContainerHeight(categories, index) >= 40) timingFunctionContainer.style.justifyContent = `space-evenly`;
  if (getTimingContainerHeight(categories, index) < 40) timingFunctionContainer.style.justifyContent = `flex-start`;
  leftButton.addEventListener('click', (e) => {
    index--;
    if (index < 0) index = 0;
    mainCategoryIcon.classList.remove(categories[index + 1].icon);
    mainCategoryIcon.classList.add(categories[index].icon);
    mainCategoryTitle.textContent = categories[index].title;
    subCategories.forEach((sc, i) => {
      sc.classList.add('sub-category-display__sub-category--hidden');
      if (Number(sc.dataset.category) === index) {
        sc.classList.remove('sub-category-display__sub-category--hidden');
      }
    });
    console.log(getTimingContainerHeight(categories, index));
    timingFunctionContainer.style.height = getTimingContainerHeight(categories, index);
    timingFunctionContainer.style.minHeight = `calc(100% - 4rem)`;
    if (getTimingContainerHeight(categories, index) >= 40) timingFunctionContainer.style.justifyContent = `space-evenly`;
    if (getTimingContainerHeight(categories, index) < 40) timingFunctionContainer.style.justifyContent = `flex-start`;
    return index;
  });
  rightButton.addEventListener('click', (e) => {
    index++;
    if (index > categories.length - 1) index = categories.length - 1;
    mainCategoryIcon.classList.remove(categories[index - 1].icon);
    mainCategoryIcon.classList.add(categories[index].icon);
    mainCategoryTitle.textContent = categories[index].title;
    subCategories.forEach((sc, i) => {
      sc.classList.add('sub-category-display__sub-category--hidden');
      if (Number(sc.dataset.category) === index) {
        sc.classList.remove('sub-category-display__sub-category--hidden');
      }
    });
    timingFunctionContainer.style.height = getTimingContainerHeight(categories, index);
    timingFunctionContainer.style.minHeight = `calc(100% - 4rem)`;
    if (getTimingContainerHeight(categories, index) >= 40) timingFunctionContainer.style.justifyContent = `space-evenly`;
    if (getTimingContainerHeight(categories, index) < 40) timingFunctionContainer.style.justifyContent = `flex-start`;
    return index;
  });
};

const setupSubCategoryCreation = (categories, index, mainCategories) => {
  const leftButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__left-button__icon');
  const rightButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__right-button__icon');
  let mainCategoryIcon = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__category-information__icon');
  let mainCategoryText = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__category-information__text');
  const subCategoryStartCreationButton = document.querySelector(
    '.budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button',
  );
  const subCategoryStopCreationButton = document.querySelector('.category-creation__controller__close');
  const categoryCreationSection = document.querySelector('.category-creation');
  subCategoryStartCreationButton.addEventListener('click', (e) => {
    e.preventDefault();
    subCategoryStartCreationButton.classList.toggle('budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button--hidden');
    categoryCreationSection.classList.toggle('category-creation--shown');
  });
  subCategoryStopCreationButton.addEventListener('click', (e) => {
    e.preventDefault();
    subCategoryStartCreationButton.classList.toggle('budget-creation-form__page__section__sub-category-container__sub-category-display__sub-category-button--hidden');
    categoryCreationSection.classList.toggle('category-creation--shown');
  });
  mainCategoryIcon.classList.add(categories[index].icon);
  mainCategoryText.textContent = categories[index].title;
  leftButton.addEventListener('click', (e) => {
    index--;
    if (index < 0) index = 0;
    mainCategoryIcon.classList.remove(categories[index + 1].icon);
    mainCategoryIcon.classList.add(categories[index].icon);
    mainCategoryText.textContent = categories[index].title;
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
    if (index > categories.length - 1) index = categories.length - 1;
    mainCategoryIcon.classList.remove(categories[index - 1].icon);
    mainCategoryIcon.classList.add(categories[index].icon);
    mainCategoryText.textContent = categories[index].title;
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
    Categories._addSubCategory(categories, index, mainCategories);
  });
};

/////////////////////////////////
// GO TO PAGE
const goToPage = (page, createBudgetPages) => {
  createBudgetPages.forEach((bp) => {
    bp.classList.add('disappear');
    createBudgetPages[page].classList.remove('disappear');
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
const setupPage = (page, createBudgetPages, createBudgetPagesNumber) => {
  goToPage(page, createBudgetPages);
  setPageCount(page, createBudgetPagesNumber);
  return page;
};

/////////////////////////////////
// SET CORRECT PAGE COUNT
const setPageCount = (pageNumber, createBudgetPages) => {
  const page = document.querySelector('.budget-creation-form__page-mechanisms__page-number');
  page.textContent = `Page ${pageNumber + 1} / ${createBudgetPages}`;
};

// ////////////////////////////
// // INITIALIZE KEY VARIABLES
// let currentPage = 0;

const _watchTIthingOptions = () => {
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
    });
  }
};

export const _watchBudgetCreation = () => {
  ////////////////////////////
  // INITIALIZE KEY VARIABLES
  const budgetCreationFormPages = document.querySelectorAll('.budget-creation-form__page');
  const budgetCreationFormPagesNumber = budgetCreationFormPages.length;
  let currentPage = 0;
  let budgetMainCategories = [];
  let emergencyGoalSetting, clicked, selectedTiming;
  const budgetContinueButton = document.querySelector('.budget-creation-form__page-mechanisms__submit-button');
  //////////////////////////////////////////////////////////////
  // SET APPROPRIATE PAGE NUMBER DEPENDING ON USER INFORMATION
  setPageCount(currentPage, budgetCreationFormPagesNumber);
  ////////////////////////////////////////////////
  // INITIALIZE KEY VARIABLES INSIDE FUNCTION SCOPE
  let budgetName, mainCategories;
  let subCategoryIndex = 0;
  let icon;
  budgetContinueButton.addEventListener('click', async (e) => {
    e.preventDefault();
    let budgetInfo = {};
    currentPage++;
    //////////////////////////////
    // ASSIGN BUDGET INFORMATION
    /////////////////////
    // BUDGET NAME
    budgetName = getBudgetName();
    mainCategories = budgetMainCategories;
    budgetInfo.name = budgetName;
    /////////////////////////////
    // BUDGET MAIN CATEGORIES
    budgetInfo.mainCategories = mainCategories;
    setupPage(currentPage, budgetCreationFormPages, budgetCreationFormPagesNumber);

    /////////////////////////////
    // CHECK USER
    const userInfo = await Updating.getSomePersonals();
    const user = userInfo.data.data.user;
    ////////////////////////////////////////////////////////////////////////
    // GLITCH: Need to fix this to work if you are a Latter Day Saint as well.
    ////////////////////////////////////////////////////////////////////////

    /////////////////////////////
    // IF NOT LATTER DAY SAINT
    if (currentPage + 1 === 2 && user.latterDaySaint === false) {
      Categories.createCategories(icon);
      Categories._watchCreateCategoryButton(icon, budgetMainCategories);
    }
    if (currentPage + 1 === 3 && user.latterDaySaint === false) {
      setupSubCategoryCreation(budgetInfo.mainCategories, subCategoryIndex, budgetMainCategories);
    }
    if (currentPage + 1 === 4 && user.latterDaySaint === false) {
      setupGoalSetting(budgetInfo.mainCategories, subCategoryIndex, clicked, selectedTiming);
      watchForSettingTiming(budgetInfo.mainCategories, subCategoryIndex, clicked, selectedTiming, budgetInfo);
    }
    if (currentPage + 1 === 5 && user.latterDaySaint === false) {
      const individualPayments = document.querySelectorAll('.individual-payment');
      _finishUpdatingSubCategories(budgetInfo.mainCategories, individualPayments);
      _watchEmergencyGoalSettings(emergencyGoalSetting);
    }

    /////////////////////////////
    // IF LATTER DAY SAINT
    if (currentPage + 1 === 2 && user.latterDaySaint === true) {
      console.log(`Tithing Options`);
      _watchTIthingOptions();
    }
    if (currentPage + 1 === 3 && user.latterDaySaint === true) {
      Categories.createCategories(icon);
      Categories._watchCreateCategoryButton(icon, budgetMainCategories);
    }
    if (currentPage + 1 === 4 && user.latterDaySaint === true) {
      setupSubCategoryCreation(budgetInfo.mainCategories, subCategoryIndex, budgetMainCategories);
    }
    if (currentPage + 1 === 5 && user.latterDaySaint === true) {
      setupGoalSetting(budgetInfo.mainCategories, subCategoryIndex, clicked, selectedTiming);
      watchForSettingTiming(budgetInfo.mainCategories, subCategoryIndex, clicked, selectedTiming, budgetInfo);
    }
    if (currentPage + 1 === 6 && user.latterDaySaint === true) {
      const individualPayments = document.querySelectorAll('.individual-payment');
      _finishUpdatingSubCategories(budgetInfo.mainCategories, individualPayments);
      _watchEmergencyGoalSettings(emergencyGoalSetting);
    }
  });
};
