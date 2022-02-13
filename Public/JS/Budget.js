import * as Updating from './Update-User';
import * as Calendar from './FrontEnd-Calendar';
// Class of the 'days' on the Calendar.
// bill-calendar-container__calendar-container__calendar__days__single-day
const calculateRemaining = (overall, spent) => {
  let initialValue = 0;
  total = subCategoryTotals.reduce((totalValue, currentValue) => totalValue + currentValue, initialValue);
  console.log(total);
  return total;
};

const cycleMainCategories = (direction, index, icons, titles, subCats) => {
  if (direction === `left`) {
    index--;
    if (index < 0) index = 0;
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
    index++;
    if (index > icons.length - 1) index = icons.length - 1;
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
  leftButton.addEventListener('click', (e) => {
    e.preventDefault();
    cycleMainCategories('left', categoryIndex, categoryIcons, categoryTitles, subCategories);
  });
  rightButton.addEventListener('click', (e) => {
    e.preventDefault();
    cycleMainCategories('right', categoryIndex, categoryIcons, categoryTitles, subCategories);
  });
};

const _setupBillCalendar = (user) => {
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
    'un-used-day', // CLASS IS ONLY BEING ADDED via .classList.add
  );

  const monthLeft = document.querySelector('.month-left');
  const monthRight = document.querySelector('.month-right');

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
      'un-used-day',
    );
  });
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
      'un-used-day',
    );
  });

  console.log(currentMonth, currentYear);
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
  if (budgetNavButton) {
    budgetNavButton.addEventListener('click', (e) => {
      e.preventDefault();
      budgetNavButton.classList.toggle('budget-container__navigation-button-container__button--clicked');
      budgetNavigation.classList.toggle('budget-navigation--visible');
    });
  }
};

const finalTransactionArrayPush = (finalArray, user, arrays) => {
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
  /////////////////////////////
  // CHECK USER
  const userInfo = await Updating.getSomePersonals();
  const user = userInfo.data.data.user;
  ///////////////////////////////
  // MONTHLY BUDGET OPTIONS
  pushIntoArray(monthlyBudgetTransactions, monthlyBudgetTransactionOptions);
  pushIntoArray(emergencyFundTransactions, emergencyFundTransactionOptions);
  pushIntoArray(savingsFundTransactions, savingsFundTransactionOptions);
  pushIntoArray(expenseFundTransactions, expenseFundTransactionOptions);
  pushIntoArray(surplusTransactions, surplusTransactionOptions);
  pushIntoArray(debtTransactions, debtTransactionOptions);
  pushIntoArray(tithingTransactions, tithingTransactionOptions);

  finalTransactionArrayPush(mainCategoryOptionArrays, user, [
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
  // SETUP BILL CALENDAR
  _setupBillCalendar(user);
  ////////////////////////////////////////////
  // SETUP BILL CURRENT MONTH
  _setupCurrentMonth();
};
