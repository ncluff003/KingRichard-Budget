import * as Categories from './../Budget-Creation/Budget-Categories';
import * as Creation from '../Budget-Creation/Budget-Creation';

const _watchForBudgetCategoryUpdates = (budget, placeholderBudget, user) => {
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

      // THIS IS WHERE IT WOULD BE GOOD TO HAVE THE INDIVIDUAL BUTTONS CAUSE ANOTHER UPDATE
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

    placeholderBudget.mainCategories.forEach((mc, i) => {
      if (!mc.createdAt) {
        mc.createdAt = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));
      }
      if (!mc.lastUpdated) {
        mc.lastUpdated = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));
      }
      mc.subCategories.forEach((sc, i) => {
        if (!sc.createdAt) {
          sc.createdAt = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));
        }
        if (sc.updated === true) {
          sc.lastUpdated = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));
        }
      });
    });
    placeholderBudget._updateBudget(
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
  const mainCategories = document.querySelectorAll('.main-category__alt');

  const mainCategoryIcon = document.querySelector('.main-category-display__category-information__icon');
  const mainCategoryText = document.querySelector('.main-category-display__category-information__text');

  mainCategories.forEach((mc) => {
    mc.removeEventListener(`click`, _watchCategoryForSelection);
    mc.addEventListener('click', _watchCategoryForSelection);
  });
};

export const _watchManageCategories = (budget, placeholderBudget, user) => {
  const mediumContainers = document.querySelectorAll('.container--medium');
  const manageCategoryContainer = mediumContainers[0];
  let icon, index;
  let subCategoryIndex = 0;
  if (manageCategoryContainer) {
    Categories.createCategories(icon, index);
    Categories._watchCreateCategoryButton(icon, placeholderBudget);
    Creation.setupSubCategoryCreation(placeholderBudget, subCategoryIndex);
    _watchForMainCategorySelection(budget, placeholderBudget, user);
    _watchForBudgetCategoryUpdates(budget, placeholderBudget, user);
  }
};
