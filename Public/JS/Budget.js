import * as Updating from './Update-User';
import * as Calendar from './FrontEnd-Calendar';
import * as Budget from './Manage-Budget';

// Class of the 'days' on the Calendar.
// bill-calendar-container__calendar-container__calendar__days__single-day

const watchForBudgetDeletion = () => {
  const budgetDeleteButton = document.querySelector(`.budget-container__budget-management-container--extra-small__budget-exit-or-delete-form__submit--delete`);
  const budgetId = window.location.pathname.split('/')[5];
  const userId = window.location.pathname.split('/')[3];
  budgetDeleteButton.addEventListener('click', (e) => {
    Budget.deleteMyBudget(budgetId, userId);
  });
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

const _watchBudgetManagement = (budget) => {
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
    budget.accounts.emergencyFund.goalMeasurement === `Length Of Time` ? emergencySettings[0].classList.add('visible') : emergencySettings[1].classList.add('visible');

    emergencyFundSettings.forEach((setting) => {
      setting.addEventListener('click', (e) => {
        e.preventDefault();
        emergencyFundSettings.forEach((es) => es.classList.remove('checked'));
        setting.classList.toggle('checked');
        emergencySetting = setting.textContent;
        changeEmergencyInput(emergencySettings, emergencySetting, budget);
      });
    });

    const tithingSettings = document.querySelectorAll(
      '.budget-container__budget-management-container--extra-small__budget-tithing-setting-form__setting-container__label-container'
    );
    const tithingCheckboxes = document.querySelectorAll(
      '.budget-container__budget-management-container--extra-small__budget-tithing-setting-form__setting-container__label-container__input--checkbox'
    );
    if (budget.accounts.tithing.setting) {
      const tithingSettings = document.querySelectorAll(
        '.budget-container__budget-management-container--extra-small__budget-tithing-setting-form__setting-container__label-container'
      );
      const tithingCheckboxes = document.querySelectorAll(
        '.budget-container__budget-management-container--extra-small__budget-tithing-setting-form__setting-container__label-container__input--checkbox'
      );
      let currentTithingSetting;
      tithingSettings.forEach((ts) => {
        ts.classList.remove('selected');
        if (budget.accounts.tithing.setting === `Gross`) tithingSettings[0].classList.add('selected');
        if (budget.accounts.tithing.setting === `Net`) tithingSettings[1].classList.add('selected');
        if (budget.accounts.tithing.setting === `Surplus`) tithingSettings[2].classList.add('selected');
      });
      tithingSettings.forEach((ts) => {
        ts.addEventListener('click', (e) => {
          e.preventDefault();
          tithingSettings.forEach((setting) => setting.classList.remove('selected'));
          ts.classList.add('selected');
          currentTithingSetting = ts.textContent;
          console.log(currentTithingSetting);
        });
      });
    }
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
  // SETUP BILL CURRENT MONTH
  _watchBudgetManagement(currentBudget);
};
