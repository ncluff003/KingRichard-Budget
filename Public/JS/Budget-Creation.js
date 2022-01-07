import * as Categories from './Budget-Categories';
import * as Updating from './Update-User';
let tithingSetting;
const grossOption = document.getElementById('grossOption');
const netOption = document.getElementById('netOption');
const surplusOption = document.getElementById('surplusOption');
const grossOptionLabel = document.getElementById('grossOptionLabel');
const netOptionLabel = document.getElementById('netOptionLabel');
const surplusOptionLabel = document.getElementById('surplusOptionLabel');
const tithingCheckboxes = [grossOption, netOption, surplusOption];
const tithingOptions = [grossOptionLabel, netOptionLabel, surplusOptionLabel];
const budgetContinueButton = document.querySelector('.budget-creation-form__page-mechanisms__submit-button');

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

const emergencySettingLabels = document.querySelectorAll('.emergency-checkbox-label');
const emergencyInputs = document.querySelectorAll('.emergency-input');
let emergencyGoalSetting;

export const _watchEmergencyGoalSettings = () => {
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
      return (emergencyGoalSetting = esl.textContent);
    });
  });
};

const budgetCreationFormPages = document.querySelectorAll('.budget-creation-form__page');
const budgetCreationFormPagesNumber = budgetCreationFormPages.length;

const logUser = async () => {
  const userInfo = await Updating.getSomePersonals();
  const user = userInfo.data.data.user;
  return user;
  // return user;
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

const _watchSubCategoryCreation = (categories, index) => {
  const subCategoryCreateButton = document.querySelector('.category-creation__input-container__button');
  console.log(index);
  subCategoryCreateButton.addEventListener('click', (e) => {
    Categories.createSubCategory(categories, index);
    console.log(index);
  });
};

const getNumberOfSubCategories = (categories, index) => {
  return categories[index].subCategories.length;
};

const _addSubCategory = (categories, index) => {
  Categories.createSubCategory(categories, index);
};

const setupGoalSetting = (categories, index) => {
  const leftButton = document.querySelector('.left');
  const rightButton = document.querySelector('.right');
  const mainCategoryIcon = document.querySelector('.main-category-display__category-display__icon');
  const mainCategoryTitle = document.querySelector('.main-category-display__category-display__title');
  mainCategoryIcon.classList.add(categories[index].icon);
  mainCategoryTitle.textContent = categories[index].title;
  console.log(mainCategoryIcon);
  leftButton.addEventListener('click', (e) => {
    index--;
    if (index < 0) index = 0;
    mainCategoryIcon.classList.remove(categories[index + 1].icon);
    mainCategoryIcon.classList.add(categories[index].icon);
    mainCategoryTitle.textContent = categories[index].title;
    // const subCategories = document.querySelectorAll('.sub-category');
    // subCategories.forEach((sc, i) => {
    //   sc.classList.add('hidden');
    //   if (sc.dataset.category === `${index}`) {
    //     sc.classList.remove('hidden');
    //   }
    // });
    return index;
  });
  rightButton.addEventListener('click', (e) => {
    index++;
    if (index > categories.length - 1) index = categories.length - 1;
    mainCategoryIcon.classList.remove(categories[index - 1].icon);
    mainCategoryIcon.classList.add(categories[index].icon);
    mainCategoryTitle.textContent = categories[index].title;
    // const subCategories = document.querySelectorAll('.sub-category');
    // subCategories.forEach((sc, i) => {
    //   sc.classList.add('hidden');
    //   if (sc.dataset.category === `${index}`) {
    //     sc.classList.remove('hidden');
    //   }
    // });
    return index;
  });
};

const setupSubCategoryCreation = (categories, index) => {
  const leftButton = document.querySelector('.budget-creation-form__page__section__sub-category-container__main-category-display__left-button__icon');
  const rightButton = document.querySelector(
    '.budget-creation-form__page__section__sub-category-container__main-category-display__right-button__icon',
  );
  let mainCategoryIcon = document.querySelector(
    '.budget-creation-form__page__section__sub-category-container__main-category-display__category-information__icon',
  );
  let mainCategoryText = document.querySelector(
    '.budget-creation-form__page__section__sub-category-container__main-category-display__category-information__text',
  );
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
    _addSubCategory(categories, index);
  });
};

/////////////////////////////////
// GO TO PAGE
const goToPage = (page) => {
  budgetCreationFormPages.forEach((bp) => {
    bp.classList.add('disappear');
    budgetCreationFormPages[page].classList.remove('disappear');
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
const setupPage = () => {
  currentPage++;
  goToPage(currentPage);
  setPageCount(currentPage);
  return currentPage;
};

/////////////////////////////////
// SET CORRECT PAGE COUNT
const setPageCount = (pageNumber) => {
  const page = document.querySelector('.budget-creation-form__page-mechanisms__page-number');
  page.textContent = `Page ${pageNumber + 1} / ${budgetCreationFormPagesNumber}`;
};

////////////////////////////
// INITIALIZE KEY VARIABLES
let currentPage = 0;

export const _watchBudgetCreation = () => {
  //////////////////////////////////////////////////////////////
  // SET APPROPRIATE PAGE NUMBER DEPENDING ON USER INFORMATION
  setPageCount(currentPage);
  ////////////////////////////////////////////////
  // INITIALIZE KEY VARIABLES INSIDE FUNCTION SCOPE
  let budgetName, mainCategories;
  let subCategoryIndex = 0;
  budgetContinueButton.addEventListener('click', (e) => {
    e.preventDefault();
    let budgetInfo = {};
    setupPage(currentPage);
    //////////////////////////////
    // ASSIGN BUDGET INFORMATION

    /////////////////////
    // BUDGET NAME
    budgetName = getBudgetName();
    mainCategories = Categories.budgetMainCategories;
    budgetInfo.name = budgetName;
    /////////////////////////////
    // BUDGET MAIN CATEGORIES
    budgetInfo.mainCategories = mainCategories;
    if (currentPage + 1 === 2) {
      Categories.createCategories();
      Categories._watchCreateCategoryButton();
    }
    if (currentPage + 1 === 3) {
      setupSubCategoryCreation(budgetInfo.mainCategories, subCategoryIndex);
    }
    if (currentPage + 1 === 4) {
      setupGoalSetting(budgetInfo.mainCategories, subCategoryIndex);
    }
  });
};
