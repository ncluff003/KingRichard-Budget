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
    console.log(clickedItem);
    // subCategoryTimingButton.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   timingFunctionContainer.classList.toggle('sub-category-display__timing-container__hidden');
    //   clickedItem = e.target;
    //   console.log(clickedItem);
    // });
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

  console.log(dateEnding);
  return dateEnding;
};

const insertTiiming = (target, inputValues, timing) => {
  let wording, dayEnding, dayEndingNumberOne;
  console.log(dayEndingNumberOne);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  if (timing === `Monthly`) {
    dayEndingNumberOne = Number(inputValues[0].getDate().toString().split('')[inputValues[0].getDate().toString().length - 1]);
    const day = inputValues[0].getDay();
    const dayOne = inputValues[0].getDate();

    // Getting proper day ending, such as 'st' for example for the 1st.
    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, inputValues[0]);

    wording = `Due the ${dayOne}${dayEnding} of ${months[inputValues[0].getMonth()]}.`;
  }
  if (timing === `Bi-Monthly`) {
    const day = inputValues[0].getDay();
    const day2 = inputValues[1].getDay();
    const dayOne = inputValues[0].getDate();
    const dayTwo = inputValues[1].getDate();
    dayEndingNumberOne = Number(inputValues[0].getDate().toString().split('')[inputValues[0].getDate().toString().length - 1]);
    let dayEndingNumberTwo = Number(inputValues[1].getDate().toString().split('')[inputValues[1].getDate().toString().length - 1]);
    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, inputValues[0]);
    let dayEndingTwo = calculateDayEnding(dayEndingNumberTwo, dayEnding, inputValues[1]);

    if (inputValues[0].getMonth() !== inputValues[1].getMonth()) return;
    wording = `Due the ${dayOne}${dayEnding} & ${dayTwo}${dayEndingTwo}, of ${months[inputValues[0].getMonth()]}`;
  }
  if (timing === `Bi-Weekly`) {
    const day = inputValues[0].getDay();
    const dayOne = inputValues[0].getDate();
    dayEndingNumberOne = Number(inputValues[0].getDate().toString().split('')[inputValues[0].getDate().toString().length - 1]);
    // Getting proper day ending, such as 'st' for example for the 1st.
    dayEnding = calculateDayEnding(dayEndingNumberOne, dayEnding, inputValues[0]);
    console.log(timing);
    console.log(inputValues);
    wording = `Due the ${dayOne}${dayEnding} of ${months[inputValues[0].getMonth()]}.`;
  }
  if (timing === `Weekly`) {
    const day = inputValues[0].getDay();
    const dayOne = inputValues[0].getDate();
    console.log(timing);
  }
  target.textContent = wording;
  const timingFunctionContainer = document.querySelector('.sub-category-display__timing-container');
  timingFunctionContainer.classList.toggle('sub-category-display__timing-container__hidden');
};

/////////////////////////////////////////
// WATCH FOR TIMING SETTING
const watchForSettingTiming = (categories, index, clickedItem, timing) => {
  console.log(clickedItem);
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
  console.log(subCategoryTimingButtons);
  subCategoryTimingButtons.forEach((sctb, i) => {
    sctb.addEventListener('click', (e) => {
      e.preventDefault();
      timingFunctionContainer.classList.toggle('sub-category-display__timing-container__hidden');
      clickedItem = e.target;
      console.log(clickedItem, timing);
    });
  });
  const timingSubmitButtons = document.querySelectorAll('.timing-submit-button');
  timingSubmitButtons.forEach((tsb) => {
    tsb.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(tsb);
      let timingArray = [];
      const oldMonthlyTiming = new Date(document.querySelector('.sub-category-display__timing-container__monthly-container__label__input').value);
      const monthlyTiming = new Date(oldMonthlyTiming.setHours(oldMonthlyTiming.getHours() + 7));
      console.log(monthlyTiming, clickedItem);
      const subCategoryIndex = [...document.querySelectorAll('.sub-category-display__sub-category__section__set-category-timing-button')].indexOf(clickedItem);
      const subCategoryTimingTarget = document.querySelectorAll('.sub-category-display__sub-category__section__set-category-timing-text')[subCategoryIndex];
      console.log(subCategoryIndex);
      console.log(typeof monthlyTiming, timing);
      if (timing === `Monthly`) {
        timingArray = [];
        timingArray.push(monthlyTiming);
        return insertTiiming(clickedItem, timingArray, timing);
      }
      if (timing === `Bi-Monthly`) {
        e.preventDefault();
        const oldTimingOne = new Date(document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label__input')[0].value);
        const oldTimingTwo = new Date(document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label__input')[1].value);
        const timingOne = new Date(oldTimingOne.setHours(oldTimingOne.getHours() + 7));
        const timingTwo = new Date(oldTimingTwo.setHours(oldTimingTwo.getHours() + 7));
        console.log(timingOne, timingTwo, document.querySelectorAll('.sub-category-display__timing-container__bi-monthly-container__label__input'));
        timingArray = [];
        timingArray.push(timingOne);
        timingArray.push(timingTwo);
        console.log(timingArray);
        return insertTiiming(clickedItem, timingArray, timing);
      }

      if (timing === `Bi-Weekly`) {
        const oldBiWeeklyTiming = new Date(document.querySelector('.sub-category-display__timing-container__bi-weekly-container__label__input').value);
        const biWeeklyTiming = new Date(oldBiWeeklyTiming.setHours(oldBiWeeklyTiming.getHours() + 7));
        const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
        timingArray = [];
        timingArray.push(biWeeklyTiming);
        return insertTiiming(clickedItem, timingArray, timing);
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
  return `${(100 * categories[index].subCategories.length) / 10}rem`;
};

const setupGoalSetting = (categories, index, clickedItem, timing) => {
  const leftButton = document.querySelector('.left');
  const rightButton = document.querySelector('.right');
  const mainCategoryIcon = document.querySelector('.main-category-display__category-display__icon');
  const mainCategoryTitle = document.querySelector('.main-category-display__category-display__title');
  mainCategoryIcon.classList.add(categories[index].icon);
  mainCategoryTitle.textContent = categories[index].title;

  console.log(clickedItem);
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
  console.log(getTimingContainerHeight(categories, index));
  timingFunctionContainer.style.height = getTimingContainerHeight(categories, index);
  timingFunctionContainer.style.minHeight = `calc(100% - 4rem)`;
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
    console.log(getTimingContainerHeight(categories, index));
    timingFunctionContainer.style.height = getTimingContainerHeight(categories, index);
    timingFunctionContainer.style.minHeight = `calc(100% - 4rem)`;
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
    setupPage(currentPage, budgetCreationFormPages, budgetCreationFormPagesNumber);
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
      watchForSettingTiming(budgetInfo.mainCategories, subCategoryIndex, clicked, selectedTiming);
    }
    if (currentPage + 1 === 5 && user.latterDaySaint === false) {
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
      watchForSettingTiming(budgetInfo.mainCategories, subCategoryIndex, clicked, selectedTiming);
    }
    if (currentPage + 1 === 6 && user.latterDaySaint === true) {
      _watchEmergencyGoalSettings(emergencyGoalSetting);
    }
  });
};
