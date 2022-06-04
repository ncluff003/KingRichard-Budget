import * as Utility from './../Application/Utility';
import * as Calendar from './../Classes/FrontEnd-Calendar';
import * as Transaction from './../Classes/Transaction';
import * as Navigation from './Budget-Navigation';

const showTransactionOptions = (budget, placeholderBudget, user, optionText, transactionOptionArrays, transactionOptions) => {
  let transactionTypeSelect = document.getElementById('transactionType');
  let transactionItemSelect = document.getElementById('savingsGoals');
  let transactionLenderSelect = document.getElementById('lender');
  [...transactionTypeSelect.childNodes].forEach((child) => {
    child.remove();
  });
  [...transactionItemSelect.childNodes].forEach((child) => {
    child.remove();
  });
  [...transactionLenderSelect.childNodes].forEach((child) => {
    child.remove();
  });
  transactionOptionArrays.forEach((array) => {
    array.forEach((arrayItem) => {
      arrayItem.classList.remove('open');
      arrayItem.classList.add('closed');
      arrayItem.firstChild.classList.remove('lowered');
    });
  });

  transactionOptions.forEach((option, i) => {
    option.classList.remove('closed');
    option.classList.add('open');
    if (optionText === `Monthly Budget`) {
      console.log(optionText);
      option.classList.remove('lowered');
      if (i === 0) {
        console.log(option.firstChild.nextSibling.childNodes);
        option.firstChild.nextSibling.childNodes.forEach((child, i) => {
          child.addEventListener('click', (e) => {
            e.preventDefault();
            option.nextSibling.firstChild.nextSibling.childNodes.forEach((subChild, i) => {
              subChild.classList.add('closed');
              subChild.classList.remove('open');
              if (subChild.dataset.category === child.dataset.category) {
                subChild.classList.add('open');
                subChild.classList.remove('closed');
              }
            });
          });
        });
      }
      if (i === 2) {
        option.classList.remove('lowered');
        if (transactionOptions[i - 1].getBoundingClientRect().width < 115) {
          option.classList.add('lowered');
        }
      }
    }
    if (optionText === `Emergency Fund`) {
      option.classList.add('lowered');
    }
    if (optionText === `Savings Fund`) {
      option.classList.remove('raised');
      if (transactionItemSelect.childNodes.length === 0) {
        budget.transactions.plannedTransactions.forEach((transaction, i) => {
          if (transaction.account === `Savings Fund`) {
            let option = document.createElement('option');
            option.classList.add('form__select--option');
            option.classList.add('r__form__select--option');
            option.textContent = transaction.name;
            Utility.insertElement(`beforeend`, transactionItemSelect, option);
          }
        });
      }
    }
    if (optionText === `Expense Fund`) {
      option.classList.remove('lowered');
      if (i === 2) {
        console.log(option.firstChild.nextSibling.getBoundingClientRect().width);
        option.classList.remove('raised');
        if (option.firstChild.nextSibling.getBoundingClientRect().width > 133.5) {
          option.classList.add('raised');
        }
      }
      let expenseTypes = [`Bill`, `Subscription`, `Other`];
      if (transactionTypeSelect.childNodes.length === 0) {
        expenseTypes.forEach((expense, i) => {
          let option = document.createElement('option');
          option.classList.add('form__select--option');
          option.classList.add('r__form__select--option');
          option.textContent = expense;
          Utility.insertElement(`beforeend`, transactionTypeSelect, option);
        });
      }

      if (transactionItemSelect.childNodes.length === 0) {
        budget.transactions.plannedTransactions.forEach((transaction, i) => {
          if (transaction.account === `Expense Fund`) {
            let option = document.createElement('option');
            option.classList.add('form__select--option');
            option.classList.add('r__form__select--option');
            option.textContent = transaction.name;
            Utility.insertElement(`beforeend`, transactionItemSelect, option);
          }
        });
      }
      console.log(transactionTypeSelect);
    }
    if (optionText === `Surplus`) {
      option.classList.remove('raised');

      if (transactionItemSelect.childNodes.length === 0) {
        budget.transactions.plannedTransactions.forEach((transaction, i) => {
          if (transaction.account === `Surplus`) {
            let option = document.createElement('option');
            option.classList.add('form__select--option');
            option.classList.add('r__form__select--option');
            option.textContent = transaction.name;
            Utility.insertElement(`beforeend`, transactionItemSelect, option);
          }
        });
      }
    }
    if (optionText === `Investment Fund`) {
      option.classList.remove('raised');
      if (i === 1) {
        option.classList.add('lowered');
      }
      let investmentTypes = [`Stock`, `Real Estate`, `Timeshare`, `Other`];
      if (transactionTypeSelect.childNodes.length === 0) {
        investmentTypes.forEach((investment, i) => {
          let option = document.createElement('option');
          option.classList.add('form__select--option');
          option.classList.add('r__form__select--option');
          option.textContent = investment;
          Utility.insertElement(`beforeend`, transactionTypeSelect, option);
        });
      }
    }
    if (optionText === `Debt`) {
      option.classList.remove('lowered');
      if (i === 2) {
        option.classList.remove('raised');
        console.log(transactionOptions[i - 1].getBoundingClientRect().width);
        if (transactionOptions[i - 1].getBoundingClientRect().width > 115) {
          option.classList.add('raised');
        }
      }
      if (transactionItemSelect.childNodes.length === 0) {
        budget.transactions.plannedTransactions.forEach((transaction, i) => {
          if (transaction.account === `Debt`) {
            let option = document.createElement('option');
            let lenderOption = document.createElement('option');
            option.classList.add('form__select--option');
            option.classList.add('r__form__select--option');
            lenderOption.classList.add('form__select--option');
            lenderOption.classList.add('r__form__select--option');
            option.textContent = transaction.name;
            lenderOption.textContent = transaction.lender;
            Utility.insertElement(`beforeend`, transactionItemSelect, option);
            Utility.insertElement(`beforeend`, transactionLenderSelect, lenderOption);
          }
        });
      }
    }
    if (optionText === `Tithing`) {
      option.classList.add('lowered');
    }
  });
};

const cycleMainCategories = (direction, index, subCats, budget) => {
  const categoryIcon = document.querySelector('.main-category-display__category-display__icon');
  const categoryTitle = document.querySelector('.main-category-display__category-display__title');
  if (direction === `left`) {
    categoryIcon.classList.remove(categoryIcon.classList[2]);
    categoryIcon.classList.add(`${budget.mainCategories[index].icon}`);
    categoryTitle.textContent = budget.mainCategories[index].title;

    subCats.forEach((sc) => {
      sc.classList.add('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.remove('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.add('open');
    });
  }
  if (direction === `right`) {
    categoryIcon.classList.remove(categoryIcon.classList[2]);
    categoryIcon.classList.add(`${budget.mainCategories[index].icon}`);
    categoryTitle.textContent = budget.mainCategories[index].title;
    subCats.forEach((sc) => {
      sc.classList.add('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.remove('closed');
      if (Number(sc.dataset.subcategory) === index) sc.classList.add('open');
    });
  }
};

const _setupCurrentMonth = (budget, placeholderBudget, user, utility) => {
  const categoryIcon = document.querySelector('.main-category-display__category-display__icon');
  const categoryTitle = document.querySelector('.main-category-display__category-display__title');
  const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
  const leftButton = document.querySelector('.left');
  const rightButton = document.querySelector('.right');
  let currentMonth = Calendar.myCalendar.getMonth();
  if (currentMonth !== budget.currentMonth) {
    placeholderBudget.previousMonth = placeholderBudget.currentMonth;
    placeholderBudget.currentMonth = currentMonth;
    placeholderBudget.mainCategories.forEach((mc) => {
      mc.lastUpdated = new Date();
      mc.subCategories.forEach((sc) => {
        sc.lastUpdated = new Date();
        sc.amountSpent = 0;
        sc.amountRemaining = Number(sc.goalAmount - sc.amountSpent);
        sc.percentageSpent = Number(sc.amountSpent / sc.goalAmount);
        if (isNaN(sc.percentageSpent)) {
          sc.percentageSpent = 0;
        }
      });
    });
    let updateObject = {
      budgetId: budget._id,
      userId: user._id,
      currentMonth: currentMonth,
      previousMonth: placeholderBudget.previousMonth,
      mainCategories: placeholderBudget.mainCategories,
    };
    placeholderBudget._updateBudget({ updateObject: updateObject }, `Dashboard`);
    Utility.reloadPage();
  }
  let categoryIndex = 0;
  subCategories.forEach((sc, i) => {
    sc.classList.add('closed');
    if (Number(sc.dataset.subcategory) === 0) sc.classList.remove('closed');
    if (Number(sc.dataset.subcategory) === 0) sc.classList.add('open');
  });
  if (leftButton) {
    leftButton.addEventListener('click', (e) => {
      e.preventDefault();
      categoryIndex--;
      if (categoryIndex <= 0) categoryIndex = 0;
      cycleMainCategories('left', categoryIndex, subCategories, budget);
    });
  }
  if (rightButton) {
    rightButton.addEventListener('click', (e) => {
      e.preventDefault();
      categoryIndex++;
      if (categoryIndex >= budget.mainCategories.length - 1) categoryIndex = budget.mainCategories.length - 1;
      cycleMainCategories('right', categoryIndex, subCategories, budget);
    });
  }
};

// DISPLAY UPCOMING TRANSACTIONS -- NEED TO DO THIS HERE INSTEAD OF PUG FOR THE REASON OF THE TRANSACTIONS THAT HAVE TWO DUE DATES.
const displayUpcomingTransactions = (container, transactions, utility) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  transactions.forEach((transaction, i) => {
    if (transaction.timingOptions.paymentCycle !== `Bi-Annual` || transaction.timingOptions.paymentCycle !== `Bi-Monthly`) {
      let index = i;
      transaction.timingOptions.paymentSchedule.forEach((date, i) => {
        const upcomingBill = document.createElement('section');
        upcomingBill.classList.add('upcoming-bills__bill');
        upcomingBill.classList.add('r__upcoming-bills__bill');
        upcomingBill.dataset.transaction = index;

        let billSections = 5;
        let billSectionStart = 0;
        while (billSectionStart < billSections) {
          const billSection = document.createElement('section');
          billSection.classList.add('upcoming-bills__bill__bill-item');
          billSection.classList.add('r__upcoming-bills__bill__bill-item');
          Utility.insertElement(`beforeend`, upcomingBill, billSection);

          if (billSectionStart === 0) {
            const billAccount = document.createElement('p');
            billAccount.classList.add('upcoming-bills__bill__bill-item__text');
            billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
            billAccount.textContent = transaction.account;
            Utility.insertElement(`beforeend`, billSection, billAccount);
          }
          if (billSectionStart === 1) {
            const billAccount = document.createElement('p');
            billAccount.classList.add('upcoming-bills__bill__bill-item__text');
            billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
            billAccount.textContent = `${new Date(date).getDate()} ${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
            Utility.insertElement(`beforeend`, billSection, billAccount);
          }
          if (billSectionStart === 2) {
            const billAccount = document.createElement('p');
            billAccount.classList.add('upcoming-bills__bill__bill-item__text');
            billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
            billAccount.textContent = transaction.lender;
            if (!transaction.lender) {
              billAccount.textContent = transaction.location;
            }
            Utility.insertElement(`beforeend`, billSection, billAccount);
          }
          if (billSectionStart === 3) {
            const billAccount = document.createElement('p');
            billAccount.classList.add('upcoming-bills__bill__bill-item__text');
            billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
            billAccount.textContent = utility.money.format(transaction.amount);
            Utility.insertElement(`beforeend`, billSection, billAccount);
          }
          if (billSectionStart === 4) {
            const paidOrNot = document.createElement('section');
            paidOrNot.classList.add('upcoming-bills__bill__bill-item__checkbox-container');
            paidOrNot.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container');
            const paidOrNotInput = document.createElement('input');
            paidOrNotInput.classList.add('upcoming-bills__bill__bill-item__checkbox-container__payment-checkbox');
            paidOrNotInput.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container__payment-checkbox');
            paidOrNotInput.id = `paymentCheck`;
            paidOrNotInput.type = `checkbox`;
            const paidOrNotLabel = document.createElement('label');
            paidOrNotLabel.classList.add('upcoming-bills__bill__bill-item__checkbox-container__payment-label');
            paidOrNotLabel.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container__payment-label');
            paidOrNotLabel.textContent = `Payment Made`;
            paidOrNotLabel.for = `paymentCheck`;
            Utility.insertElement(`beforeend`, paidOrNot, paidOrNotInput);
            Utility.insertElement(`beforeend`, paidOrNot, paidOrNotLabel);
            Utility.insertElement(`beforeend`, billSection, paidOrNot);
          }
          billSectionStart++;
        }
        Utility.insertElement(`beforeend`, container, upcomingBill);
      });
    }

    if (transaction.timingOptions.paymentCycle === `Bi-Annual` || transaction.timingOptions.paymentCycle === `Bi-Monthly`) {
      let index = i;
      transaction.timingOptions.paymentSchedule.forEach((array, i) => {
        // let dateIndex = index;
        array.forEach((date, i) => {
          const upcomingBill = document.createElement('section');
          upcomingBill.classList.add('upcoming-bills__bill');
          upcomingBill.classList.add('r__upcoming-bills__bill');
          upcomingBill.dataset.transaction = index;

          let billSections = 5;
          let billSectionStart = 0;
          while (billSectionStart < billSections) {
            const billSection = document.createElement('section');
            billSection.classList.add('upcoming-bills__bill__bill-item');
            billSection.classList.add('r__upcoming-bills__bill__bill-item');
            Utility.insertElement(`beforeend`, upcomingBill, billSection);

            if (billSectionStart === 0) {
              const billAccount = document.createElement('p');
              billAccount.classList.add('upcoming-bills__bill__bill-item__text');
              billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
              billAccount.textContent = transaction.account;
              Utility.insertElement(`beforeend`, billSection, billAccount);
            }
            if (billSectionStart === 1) {
              const billAccount = document.createElement('p');
              billAccount.classList.add('upcoming-bills__bill__bill-item__text');
              billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
              billAccount.textContent = `${new Date(date).getDate()} ${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
              Utility.insertElement(`beforeend`, billSection, billAccount);
            }
            if (billSectionStart === 2) {
              const billAccount = document.createElement('p');
              billAccount.classList.add('upcoming-bills__bill__bill-item__text');
              billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
              billAccount.textContent = transaction.lender;
              if (!transaction.lender) {
                billAccount.textContent = transaction.location;
              }
              Utility.insertElement(`beforeend`, billSection, billAccount);
            }
            if (billSectionStart === 3) {
              const billAccount = document.createElement('p');
              billAccount.classList.add('upcoming-bills__bill__bill-item__text');
              billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
              billAccount.textContent = utility.money.format(transaction.amount);
              Utility.insertElement(`beforeend`, billSection, billAccount);
            }
            if (billSectionStart === 4) {
              const paidOrNot = document.createElement('section');
              paidOrNot.classList.add('upcoming-bills__bill__bill-item__checkbox-container');
              paidOrNot.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container');
              const paidOrNotInput = document.createElement('input');
              paidOrNotInput.classList.add('upcoming-bills__bill__bill-item__checkbox-container__payment-checkbox');
              paidOrNotInput.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container__payment-checkbox');
              paidOrNotInput.id = `paymentCheck`;
              paidOrNotInput.type = `checkbox`;
              const paidOrNotLabel = document.createElement('label');
              paidOrNotLabel.classList.add('upcoming-bills__bill__bill-item__checkbox-container__payment-label');
              paidOrNotLabel.classList.add('r__upcoming-bills__bill__bill-item__checkbox-container__payment-label');
              paidOrNotLabel.textContent = `Payment Made`;
              paidOrNotLabel.for = `paymentCheck`;
              Utility.insertElement(`beforeend`, paidOrNot, paidOrNotInput);
              Utility.insertElement(`beforeend`, paidOrNot, paidOrNotLabel);
              Utility.insertElement(`beforeend`, billSection, paidOrNot);
            }
            billSectionStart++;
          }
          Utility.insertElement(`beforeend`, container, upcomingBill);
        });
      });
    }
  });
};

const selectDayAndShowTransactions = (event) => {
  const upcomingTransactions = document.querySelectorAll('.upcoming-bills__bill');
  const e = event;
  const selectedDay = e.target;
  const monthHeader = document.querySelector('.bill-calendar__header__title');
  const splitMonthHeader = monthHeader.textContent.split(' ');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  upcomingTransactions.forEach((transaction, i) => {
    transaction.classList.remove('open');
    transaction.classList.add('closed');
    let date = new Date(transaction.firstChild.nextSibling.firstChild.textContent);
    if (date.getFullYear() !== Number(splitMonthHeader[2])) return;
    if (months[date.getMonth()] !== splitMonthHeader[0]) return;
    if (date.getDate() === Number(selectedDay.textContent)) {
      transaction.classList.remove('closed');
      transaction.classList.add('open');
    }
  });
};

// WATCH FOR CALENDAR DAY SELECTION FOR TO DISPLAY CORRECT TRANSACTIONS
const _watchDaySelection = () => {
  const calendarDays = document.querySelectorAll('.bill-calendar__days__single-day');
  calendarDays.forEach((day, i) => {
    day.addEventListener('click', selectDayAndShowTransactions);
  });
};

// SETTING UP BILL / TRANSACTION CALENDAR
const _setupBillCalendar = (budget, placeholderBudget, user, utility) => {
  const calendar = Calendar.myCalendar;
  let currentMonth = calendar.getMonth();
  let currentMonthIndex = calendar.getMonthIndex();
  let currentYear = calendar.getYear();

  calendar.makeCalendar(
    currentMonthIndex,
    currentMonth,
    currentYear,
    '.bill-calendar__days__single-day', // NEEDS PERIOD FOR .querySelectorAll
    'bill-calendar__days__single-day--current-day', // CLASS IS ONLY BEING ADDED via .classList.add
    'un-used-day' // CLASS IS ONLY BEING ADDED via .classList.add
  );

  const monthLeft = document.querySelector('.month-left');
  const monthRight = document.querySelector('.month-right');

  if (monthLeft) {
    monthLeft.addEventListener('click', (e) => {
      e.preventDefault();
      currentMonthIndex--;
      if (currentMonthIndex === -1) {
        currentMonthIndex = 11;
        currentYear--;
      }
      calendar.goBackAMonth(currentMonthIndex, currentYear, '.bill-calendar__days__single-day', 'bill-calendar__days__single-day--current-day', 'un-used-day');
    });
  }
  if (monthRight) {
    monthRight.addEventListener('click', (e) => {
      e.preventDefault();
      currentMonthIndex++;
      if (currentMonthIndex === 12) {
        currentMonthIndex = 0;
        currentYear++;
      }
      calendar.goForwardAMonth(currentMonthIndex, currentYear, '.bill-calendar__days__single-day', 'bill-calendar__days__single-day--current-day', 'un-used-day');
    });
  }

  const upcomingBillsContainer = document.querySelector('.upcoming-bills');
  displayUpcomingTransactions(upcomingBillsContainer, budget.transactions.plannedTransactions, utility);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const upcomingTransactions = document.querySelectorAll('.upcoming-bills__bill');

  let currentDay = document.querySelector('.bill-calendar__days__single-day--current-day');
  const monthHeader = document.querySelector('.bill-calendar__header__title');
  if (monthHeader) {
    const splitMonthHeader = monthHeader.textContent.split(' ');
    upcomingTransactions.forEach((transaction, i) => {
      transaction.classList.add('closed');
      let date = new Date(transaction.firstChild.nextSibling.firstChild.textContent);
      if (date.getDate() === Number(currentDay.textContent) && months[date.getMonth()] === splitMonthHeader[0] && date.getFullYear() === Number(splitMonthHeader[2])) {
        transaction.classList.remove('closed');
        transaction.classList.add('open');
      }
    });
    _watchDaySelection();
  }

  const paymentChecks = document.querySelectorAll('.upcoming-bills__bill__bill-item__checkbox-container__payment-checkbox');
  paymentChecks.forEach((check, i) => {
    check.addEventListener('click', (e) => {
      let upcomingBills = [...document.querySelectorAll('.upcoming-bills__bill')];

      let transactionIndex = Number(check.closest('.upcoming-bills__bill').dataset.transaction);

      let upcomingBill = document.querySelectorAll('.upcoming-bills__bill')[i];

      let accountType = upcomingBill.firstChild.firstChild.textContent;
      let transactionDate = upcomingBill.firstChild.nextSibling.firstChild.textContent;

      // THE INDEX JUST UNDERNEATH WILL NEED TO CHANGE TO THE INDEX OF THE ACTUAL UPCOMING BILL, SO WE'LL NEED THE DATASET OF THE BILL HERE.
      let transactionLocation = placeholderBudget.transactions.plannedTransactions[transactionIndex].location;
      let transactionAmount = upcomingBill.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1];
      let transactionBill = new Transaction.Transaction({ date: transactionDate, location: transactionLocation });
      let currentBill = placeholderBudget.transactions.plannedTransactions[transactionIndex];

      if (accountType === `Monthly Budget`) {
        transactionBill.transactionType = `Withdrawal`;
        transactionBill.addToReceipt({
          accountSelected: accountType,
          mainCategory: currentBill.category,
          subCategory: currentBill.subCategory,
          description: currentBill.name,
          amount: Number(transactionAmount),
        });
      }
      if (accountType === `Expense Fund`) {
        transactionBill.transactionType = `Withdrawal`;
        transactionBill.addToReceipt({
          accountSelected: accountType,
          transactionType: currentBill.subAccount,
          timing: currentBill.timingOptions.paymentCycle,
          expenditure: currentBill.name,
          description: currentBill.name,
          amount: Number(transactionAmount),
        });
      }
      if (accountType === `Surplus`) {
        transactionBill.transactionType = `Withdrawal`;
        transactionBill.addToReceipt({
          accountSelected: accountType,
          timing: currentBill.timingOptions.paymentCycle,
          expenditure: currentBill.name,
          description: currentBill.name,
          amount: Number(transactionAmount),
        });
      }
      if (accountType === `Savings Fund`) {
        transactionBill.transactionType = `Withdrawal`;
        transactionBill.addToReceipt({
          accountSelected: accountType,
          timing: currentBill.timingOptions.paymentCycle,
          expenditure: currentBill.name,
          description: currentBill.name,
          amount: Number(transactionAmount),
        });
      }
      if (accountType === `Debt`) {
        transactionBill.transactionType = `Withdrawal`;
        transactionBill.addToReceipt({
          accountSelected: accountType,
          lender: currentBill.lender,
          timing: currentBill.timingOptions.paymentCycle,
          expenditure: currentBill.name,
          description: currentBill.name,
          amount: Number(transactionAmount),
        });
      }
      console.log(
        transactionDate,
        new Date(transactionDate).toISOString(),
        new Date(new Date(transactionDate).setHours(0, 0, 0, 0)),
        currentBill.timingOptions.paymentSchedule[0]
        // new Date(new Date(currentBill.timingOptions.paymentSchedule[0]).setHours(0, 0, 0, 0))
      );
      if (currentBill.timingOptions.paymentCycle !== `Bi-Monthly` && currentBill.timingOptions.paymentCycle !== `Bi-Annual`) {
        // LOOP THROUGH MAIN CATEGORIES
        placeholderBudget.mainCategories.forEach((mc, i) => {
          // IF MAIN CATEGORY MATCHES THE CURRENT BILL CATEGORY, LOOP THROUGH ITS SUBCATEGORIES
          if (mc.title === currentBill.category) {
            mc.subCategories.forEach((sc, i) => {
              if (sc.title === currentBill.name) {
                // IF SUB CATEGORY MATCHES CURRENT BILL SUB CATEGORY NAME, DOUBLE CHECK PAYMENT CYCLE.
                if (sc.timingOptions.paymentCycle !== `Bi-Monthly` && sc.timingOptions.paymentCycle !== `Bi-Annual`) {
                  sc.timingOptions.paymentSchedule = sc.timingOptions.paymentSchedule.filter((date) => {
                    return new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString() !== new Date(new Date(transactionDate).setHours(0, 0, 0, 0)).toISOString();
                  });
                }
                if (sc.timingOptions.paymentCycle === `Bi-Monthly` && sc.timingOptions.paymentCycle === `Bi-Annual`) {
                  sc.timingOptions.paymentSchedule.forEach((dateArray, i) => {
                    sc.timingOptions.paymentSchedule[i] = dateArray.filter((date) => {
                      return new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString() !== new Date(new Date(transactionDate).setHours(0, 0, 0, 0)).toISOString();
                    });
                  });
                }
                console.log(sc);
                console.log(sc.timingOptions.paymentSchedule);
              }
            });
          }
        });
        currentBill.timingOptions.paymentSchedule = currentBill.timingOptions.paymentSchedule.filter((date) => {
          console.log(new Date(new Date(date).setHours(0, 0, 0, 0)));
          return new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString() !== new Date(new Date(transactionDate).setHours(0, 0, 0, 0)).toISOString();
        });
      }
      if (currentBill.timingOptions.paymentCycle === `Bi-Monthly` || currentBill.timingOptions.paymentCycle === `Bi-Annual`) {
        currentBill.timingOptions.paymentSchedule.forEach((dateArray, i) => {
          currentBill.timingOptions.paymentSchedule[i] = dateArray.filter((date) => {
            return new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString() !== new Date(new Date(transactionDate).setHours(0, 0, 0, 0)).toISOString();
          });
        });
      }
      if (currentBill.timingOptions.paymentCycle !== `Bi-Monthly` && currentBill.timingOptions.paymentCycle !== `Bi-Annual`) {
        if (currentBill.timingOptions.paymentSchedule.length === 0) {
          currentBill.paid = !currentBill.paid;
          currentBill.paidStatus = `Paid`;
          placeholderBudget.transactions.plannedTransactions = placeholderBudget.transactions.plannedTransactions.filter((transaction) => {
            return transaction !== currentBill;
          });
        }
        if (currentBill.timingOptions.paymentSchedule.length > 0) {
          currentBill.paidStatus = `Partially Paid`;
        }
      }
      if (currentBill.timingOptions.paymentCycle === `Bi-Monthly` || currentBill.timingOptions.paymentCycle === `Bi-Annual`) {
        currentBill.timingOptions.paymentSchedule = currentBill.timingOptions.paymentSchedule.filter((array) => {
          return array.length > 0;
        });
        if (currentBill.timingOptions.paymentSchedule.length === 0) {
          currentBill.paid = !currentBill.paid;
          currentBill.paidStatus = `Paid`;
        }
        if (currentBill.timingOptions.paymentSchedule.length > 0) {
          currentBill.paidStatus = `Partially Paid`;
        }
      }
      console.log(currentBill, transactionBill);
      placeholderBudget.transactions.recentTransactions.push(transactionBill);
      console.log(placeholderBudget);

      let updateObject = {
        budgetId: budget._id,
        userId: user._id,
      };
      updateObject.transactions = placeholderBudget.transactions;
      updateObject.transactions.recentTransactions[updateObject.transactions.recentTransactions.length - 1].receipt.forEach((receiptItem, i) => {
        if (receiptItem.account === `Monthly Budget`) {
          placeholderBudget.accounts.monthlyBudget.amount = placeholderBudget.accounts.monthlyBudget.amount - Number(receiptItem.amount);
          placeholderBudget.mainCategories.forEach((category, i) => {
            if (receiptItem.category === category.title) {
              let index = i;
              console.log(receiptItem.category);
              category.subCategories.forEach((subCategory, i) => {
                if (receiptItem.subCategory === subCategory.title) {
                  console.log(receiptItem.subCategory);
                  subCategory.amountSpent += receiptItem.amount;
                  subCategory.amountRemaining = subCategory.goalAmount - subCategory.amountSpent;
                  subCategory.percentageSpent = Number((subCategory.amountSpent / subCategory.goalAmount) * 100);
                }
              });
            }
          });
          updateObject.mainCategories = placeholderBudget.mainCategories;
        }
        if (receiptItem.account === `Emergency Fund`) {
          placeholderBudget.accounts.emergencyFund.amount = placeholderBudget.accounts.emergencyFund.amount - Number(receiptItem.amount);
        }
        if (receiptItem.account === `Savings Fund`) {
          placeholderBudget.accounts.savingsFund.amount = placeholderBudget.accounts.savingsFund.amount - Number(receiptItem.amount);
        }
        if (receiptItem.account === `Expense Fund`) {
          placeholderBudget.accounts.expenseFund.amount = placeholderBudget.accounts.expenseFund.amount - Number(receiptItem.amount);
        }
        if (receiptItem.account === `Surplus`) {
          placeholderBudget.accounts.surlus.amount = placeholderBudget.accounts.surplus.amount - Number(receiptItem.amount);
        }
        if (receiptItem.account === `Debt`) {
          placeholderBudget.accounts.debt.amount = placeholderBudget.accounts.debt.amount - Number(receiptItem.amount);
          /* After reducing the amount that is allocated to the debt account, there needs to be a reduction of the debt amount through reducing the current amount owed for the debt that was selected.

          To do that we need to:
          1) Find the exact debt that is being paid.
          2) From there, reduce it's amountOwed amount.

          There is more steps to each of those, especially the first, but that is what needs to be done.
          */
        }
      });
      upcomingBill.remove();
      updateObject.accounts = placeholderBudget.accounts;
      placeholderBudget._updateBudget({ updateObject: updateObject }, `Dashboard`);
      Utility.reloadPage();
    });
  });
};

const calculateTotal = (accountType, budget, utility, debtAccount) => {
  const accountSections = document.querySelectorAll('.container--extra-small__content__account-total');
  const budgetAccounts = budget.accounts;
  let amountOfDebt = 0;
  let budgetAccountTotals = [];
  Object.entries(budgetAccounts).forEach((account, i) => {
    return budgetAccountTotals.push(account[1].amount);
  });
  Object.entries(budgetAccounts).forEach((account) => {
    if (account[0] === `debt`) {
      if (debtAccount) {
        debtAccount.forEach((debt, i) => {
          if (debt.status !== `Paid Off`) {
            amountOfDebt += debt.amountOwed;
          }
        });
      }
      // amountOfDebt = account[1].debtAmount;
    }
    return amountOfDebt;
  });

  if (budget) {
    if (accountType === `Bank Account`) {
      let initialDeposit = 0;
      const bankVaultTotal = budgetAccountTotals.reduce((previous, current) => previous + current, initialDeposit);
      const bankAccountSection = accountSections[0];
      let bankAccount = utility.money.format(bankVaultTotal);
      if (bankAccountSection) bankAccountSection.textContent = `${bankAccount}`;
    }

    if (accountType === `Debt`) {
      const debtAccount = accountSections[1];
      // amountOfDebt += 200;
      let debt = utility.money.format(amountOfDebt);

      if (debtAccount) {
        amountOfDebt === 0 ? (debtAccount.textContent = debt) : (debtAccount.textContent = `-${debt}`);
      }
    }

    if (accountType === `Net Value`) {
      let initialDeposit = 0;
      const bankVaultTotal = budgetAccountTotals.reduce((previous, current) => previous + current, initialDeposit);
      const netValueAccount = accountSections[2];
      let netValue = utility.money.format(bankVaultTotal - amountOfDebt);
      if (netValueAccount) netValueAccount.textContent = netValue;
    }
  }
};

const getDashboardAccountTotals = (budget, placeholderBudget, user, utility) => {
  calculateTotal(`Bank Account`, budget, utility);
  calculateTotal(`Debt`, budget, utility, budget.debts);
  calculateTotal(`Net Value`, budget, utility, budget.debts);
};

const buildTransactionOptions = (options) => {
  let transactionOptions = [];
  options.forEach((option, i) => {
    if (option) {
      option.classList.add('closed');
      transactionOptions.push(option);
    }
  });
  return transactionOptions;
};

const resetTransactionOptions = (allOptions) => {
  allOptions.forEach((option) => {
    option.forEach((optionItem) => {
      optionItem.classList.remove('open');
      optionItem.classList.add('closed');
    });
  });
};

const _watchForTransactions = (budget, placeholderBudget, user, utility) => {
  const dashboard = document.querySelector('.budget-dashboard');
  if (dashboard) {
    console.log(placeholderBudget);

    const transactionTotal = document.querySelector('.container--small__transaction-total__amount');
    transactionTotal.textContent = utility.money.format(0);
    console.log(transactionTotal);

    // MUSTDO: CREATE A UTILITY OBJECT THAT HOLDS THINGS LIKE THIS MONEY FORMATTER.
    // MUSTDO: PUT THE MONEY FORMATTER INTO ITS OWN FUNCTION WITH THE CURRENT OPTIONS AS THE DEFAULT, AND OTHER OPTIONS USING THE PERSON'S LOCATION.

    const headerSubmitButtons = document.querySelectorAll('.button--small-container-header');
    const incomeInputs = document.querySelectorAll('.form__input--enter-income');
    // MUSTDO: Separate income into investment, savings, and un-allocated after every keystroke into net pay.
    const incomeDateInput = incomeInputs[0];
    const incomeFromInput = incomeInputs[1];
    const grossIncomeInput = incomeInputs[2];
    let netIncomeInput = incomeInputs[3];
    let tithingInput;
    if (user.isLatterDaySaint === true) {
      tithingInput = incomeInputs[3];
      netIncomeInput = incomeInputs[4];
    }

    const investmentPercentage = budget.accounts.investmentFund.investmentPercentage;
    const savingsPercentage = budget.accounts.savingsFund.savingsPercentage;
    const incomePreviewAmounts = [
      ...document.querySelectorAll('.form__section--early-income-view__income-view__amount'),
      document.querySelector('.form__section--early-income-view__income-view--purple__amount'),
    ];
    let tithed = false;

    incomePreviewAmounts.forEach((amount) => {
      amount.textContent = utility.money.format(Number(amount.textContent.split(utility.currencySymbol)[1]));
    });

    netIncomeInput.addEventListener('keyup', (e) => {
      e.preventDefault();
      incomePreviewAmounts[0].textContent = utility.money.format(netIncomeInput.value * investmentPercentage);
      incomePreviewAmounts[1].textContent = utility.money.format(netIncomeInput.value * savingsPercentage);
      if (user.latterDaySaint === true) {
        incomePreviewAmounts[2].textContent = utility.money.format(0);
        if (budget.accounts.tithing.tithingSetting === `Gross`) {
          incomePreviewAmounts[2].textContent = utility.money.format(grossIncomeInput.value * 0.1);
        }
        if (budget.accounts.tithing.tithingSetting === `Net`) {
          incomePreviewAmounts[2].textContent = utility.money.format(netIncomeInput.value * 0.1);
        }
        if (budget.accounts.tithing.tithingSetting !== `Surplus`) {
          incomePreviewAmounts[3].textContent = utility.money.format(
            netIncomeInput.value -
              Number(incomePreviewAmounts[0].textContent.split('$')[1]) -
              Number(incomePreviewAmounts[1].textContent.split('$')[1]) -
              Number(incomePreviewAmounts[2].textContent.split('$')[1])
          );
        }
        if (budget.accounts.tithing.tithingSetting === `Surplus`) {
          incomePreviewAmounts[2].textContent = utility.money.format(
            netIncomeInput.value - Number(incomePreviewAmounts[0].textContent.split('$')[1]) - Number(incomePreviewAmounts[1].textContent.split('$')[1])
          );
        }
      }
      if (user.latterDaySaint === false) {
        incomePreviewAmounts[2].textContent = utility.money.format(
          netIncomeInput.value - Number(incomePreviewAmounts[0].textContent.split('$')[1]) - Number(incomePreviewAmounts[1].textContent.split('$')[1])
        );
      }
    });

    const tithedSwitch = document.querySelector('.form__input--tithing');
    if (tithedSwitch) {
      tithedSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        Utility.toggleClass(tithedSwitch, `form__input--tithing`);
        Utility.toggleClass(tithedSwitch, `form__input--tithing--tithed`);
        tithed = !tithed;
      });
    }

    // ENTERING INCOME
    headerSubmitButtons[0].addEventListener('click', (e) => {
      let updateObject, transaction, netAmount;

      let unAllocatedAmount = budget.accounts.unAllocated.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1]);
      const savingsAmount = budget.accounts.savingsFund.amount + Number(incomePreviewAmounts[1].textContent.split('$')[1]);
      const investmentAmount = budget.accounts.investmentFund.amount + Number(incomePreviewAmounts[0].textContent.split('$')[1]);
      if (user.latterDaySaint === false) {
        netAmount = Number(incomePreviewAmounts[2].textContent.split('$')[1]);
        console.log(incomePreviewAmounts[2].textContent.split('$')[1]);
        if (incomePreviewAmounts[2].textContent.split('$')[1].includes(',')) {
          netAmount = Number(incomePreviewAmounts[2].textContent.split('$')[1].split(',').join(''));
          unAllocatedAmount = budget.accounts.unAllocated.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1].split(',').join(''));
        }
        transaction = new Transaction.Transaction({ date: incomeDateInput.value, type: `Deposit`, location: incomeFromInput.value });
        console.log(transaction);
        transaction.addToReceipt({
          accountSelected: `Un-Allocated`,
          account: `Un-Allocated`,
          grossAmount: Number(grossIncomeInput.value),
          netAmount: Number(netIncomeInput.value),
          deposited: Number(netAmount),
          user: user,
          budget: budget,
        });
        placeholderBudget.transactions.recentTransactions.push(transaction);
        updateObject = {
          budgetId: budget._id,
          userId: user._id,
          user: user,
          accounts: {
            unAllocated: {
              amount: unAllocatedAmount,
            },
            monthlyBudget: placeholderBudget.accounts.monthlyBudget,
            emergencyFund: placeholderBudget.accounts.emergencyFund,
            savingsFund: {
              savingsGoal: placeholderBudget.accounts.savingsFund.savingsGoal,
              savingsPercentage: placeholderBudget.accounts.savingsFund.savingsPercentage,
              amount: savingsAmount,
            },
            expenseFund: placeholderBudget.accounts.expenseFund,
            surplus: placeholderBudget.accounts.surplus,
            investmentFund: {
              investmentGoal: placeholderBudget.accounts.investmentFund.investmentGoal,
              investmentPercentage: placeholderBudget.accounts.investmentFund.investmentPercentage,
              amount: investmentAmount,
            },
            debt: placeholderBudget.accounts.debt,
          },
          transactions: placeholderBudget.transactions,
        };
      }
      if (user.latterDaySaint === true) {
        transaction = new Transaction.Transaction({ date: new Date(incomeDateInput.value), type: `Deposit`, location: incomeFromInput.value });
        // This may not be the final place for this.  Only because if I make it so that the tithing account only shows up when a Latter Day Saint has Gross or Net calculated tithing.
        if (budget.accounts.tithing.tithingSetting !== `Surplus`) {
          netAmount = Number(incomePreviewAmounts[3].textContent.split('$')[1]);
          console.log(incomePreviewAmounts[2].textContent.split('$')[1]);
          if (incomePreviewAmounts[3].textContent.split('$')[1].includes(',')) {
            netAmount = Number(incomePreviewAmounts[3].textContent.split('$')[1].split(',').join(''));
            unAllocatedAmount = budget.accounts.unAllocated.amount + Number(incomePreviewAmounts[3].textContent.split('$')[1].split(',').join(''));
          }
          transaction.addToReceipt({
            account: `Un-Allocated`,
            grossAmount: Number(grossIncomeInput.value),
            netAmount: Number(netIncomeInput.value),
            deposited: Number(netAmount),
            tithed: tithed,
            user: user,
            budget: budget,
          });
          let tithingAmount = budget.accounts.tithing.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1]);
          if (Number(incomePreviewAmounts[2].textContent.split('$')[1].contains(','))) {
            tithingAmount = budget.accounts.tithing.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1]).split(',').join('');
          }
          placeholderBudget.accounts.tithing.amount = Number(tithingAmount);
        }
        if (budget.accounts.tithing.tithingSetting === `Surplus`) {
          netAmount = Number(incomePreviewAmounts[2].textContent.split('$')[1]);
          console.log(incomePreviewAmounts[2].textContent.split('$')[1]);
          if (incomePreviewAmounts[2].textContent.split('$')[1].includes(',')) {
            netAmount = Number(incomePreviewAmounts[2].textContent.split('$')[1].split(',').join(''));
            unAllocatedAmount = budget.accounts.unAllocated.amount + Number(incomePreviewAmounts[2].textContent.split('$')[1].split(',').join(''));
          }
          transaction.addToReceipt({
            account: `Un-Allocated`,
            grossAmount: Number(grossIncomeInput.value),
            netAmount: Number(netIncomeInput.value),
            deposited: Number(netAmount),
            user: user,
            budget: budget,
          });
        }
        placeholderBudget.transactions.recentTransactions.push(transaction);
        updateObject = {
          budgetId: budget._id,
          userId: user._id,
          user: user,
          accounts: {
            unAllocated: {
              amount: unAllocatedAmount,
            },
            monthlyBudget: placeholderBudget.accounts.monthlyBudget,
            emergencyFund: placeholderBudget.accounts.emergencyFund,
            savingsFund: {
              savingsGoal: placeholderBudget.accounts.savingsFund.savingsGoal,
              savingsPercentage: placeholderBudget.accounts.savingsFund.savingsPercentage,
              amount: savingsAmount,
            },
            expenseFund: placeholderBudget.accounts.expenseFund,
            surplus: placeholderBudget.accounts.surplus,
            investmentFund: {
              investmentGoal: placeholderBudget.accounts.investmentFund.investmentGoal,
              investmentPercentage: placeholderBudget.accounts.investmentFund.investmentPercentage,
              amount: investmentAmount,
            },
            debt: placeholderBudget.accounts.debt,
            tithing: placeholderBudget.accounts.tithing,
          },
          transactions: placeholderBudget.transactions,
        };
      }

      placeholderBudget._updateBudget(
        {
          updateObject: updateObject,
        },
        `Enter-Income`
      );
      incomeDateInput.value = '';
      incomeFromInput.value = '';
      grossIncomeInput.value = '';
      netIncomeInput.value = '';
      incomePreviewAmounts[0].textContent = utility.money.format(0);
      incomePreviewAmounts[1].textContent = utility.money.format(0);
      incomePreviewAmounts[2].textContent = utility.money.format(0);
    });
  }

  ////////////////////////////////////////////
  // INITIALIZE TRANSACTION OPTIONS
  const smallContainerButtons = document.querySelectorAll('.button--small-container-header');
  const transactionSelects = document.querySelectorAll('.form__section--select');
  const transactionOptions = document.querySelectorAll('.form__section--transaction-option');
  const transactionButtons = document.querySelectorAll('.button--transaction-button');
  const transactionCreationContainer = document.querySelector('.form__section--transaction-item-creation');
  const transactionCost = document.querySelector('.container--small__transaction-total__amount');
  const transactionHeaderInputs = document.querySelectorAll('.form__input--small-thinner');
  const transactionHeaderInputsTwo = document.querySelectorAll('.form__input--small-thinner__wide');
  const transactionSubmitButton = smallContainerButtons[1];

  const accountSelection = transactionSelects[0];
  //////////////////////////////////////////
  // UNIVERSAL TRANSACTION OPTIONS
  const addTransactionItemButton = transactionButtons[0];
  const transactionDescription = transactionOptions[1];
  const transactionAmount = transactionOptions[2];
  const transactionName = transactionOptions[0];
  const transactionType = transactionSelects[3];
  const transactionTiming = transactionSelects[4];
  const transactionItem = transactionSelects[6];
  const transactionSaveButton = transactionButtons[1];

  //////////////////////////////////////////
  // MONTHLY BUDGET TRANSACTION OPTIONS
  const mainCategorySelect = transactionSelects[1];
  const subCategorySelect = transactionSelects[2];

  //////////////////////////////////////////
  // DEBT TRANSACTION OPTIONS
  const transactionLender = transactionSelects[5];

  //////////////////////////////////////////
  // BUILD TRANSACTION OPTIONS
  const monthlyBudgetTransactionOptions = buildTransactionOptions([mainCategorySelect, subCategorySelect, transactionDescription, transactionAmount, transactionSaveButton]);
  const emergencyFundTransactionsOptions = buildTransactionOptions([transactionDescription, transactionAmount, transactionSaveButton]);
  const savingsFundTransactionOptions = buildTransactionOptions([transactionTiming, transactionItem, transactionDescription, transactionAmount, transactionSaveButton]);
  const expenseFundTransactionOptions = buildTransactionOptions([transactionType, transactionTiming, transactionItem, transactionDescription, transactionAmount, transactionSaveButton]);
  const surplusTransactionOptions = buildTransactionOptions([transactionTiming, transactionItem, transactionDescription, transactionAmount, transactionSaveButton]);
  const investmentTransactionOptions = buildTransactionOptions([transactionType, transactionName, transactionDescription, transactionAmount, transactionSaveButton]);
  const debtTransactionOptions = buildTransactionOptions([transactionTiming, transactionLender, transactionItem, transactionDescription, transactionAmount, transactionSaveButton]);
  const tithingTransactionsOptions = buildTransactionOptions([transactionAmount, transactionSaveButton]);

  const allTransactionOptions = [
    monthlyBudgetTransactionOptions,
    emergencyFundTransactionsOptions,
    savingsFundTransactionOptions,
    expenseFundTransactionOptions,
    surplusTransactionOptions,
    investmentTransactionOptions,
    debtTransactionOptions,
    tithingTransactionsOptions,
  ];
  let transaction;
  if (addTransactionItemButton) {
    addTransactionItemButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (transactionCreationContainer.classList.contains('open')) {
        resetTransactionOptions(allTransactionOptions);
        return transactionCreationContainer.classList.toggle('closed');
      }
      if (transactionCreationContainer.classList.contains('closed')) {
        transactionCreationContainer.classList.toggle('open');
        return (transaction = new Transaction.Transaction({ date: transactionHeaderInputs[0].value, location: transactionHeaderInputsTwo[0].value }));
      }
    });
  }

  if (accountSelection) {
    let selectedAccount;
    [...accountSelection.firstChild.nextSibling.children].forEach((option) => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        if (option.value === `Monthly Budget`) {
          showTransactionOptions(budget, placeholderBudget, user, option.value, allTransactionOptions, monthlyBudgetTransactionOptions);
          selectedAccount = option.value;
          console.log(selectedAccount);
        }
        if (option.value === `Emergency Fund`) {
          showTransactionOptions(budget, placeholderBudget, user, option.value, allTransactionOptions, emergencyFundTransactionsOptions);
          selectedAccount = option.value;
          console.log(selectedAccount);
        }
        if (option.value === `Savings Fund`) {
          showTransactionOptions(budget, placeholderBudget, user, option.value, allTransactionOptions, savingsFundTransactionOptions);
          selectedAccount = option.value;
          console.log(selectedAccount);
        }
        if (option.value === `Expense Fund`) {
          showTransactionOptions(budget, placeholderBudget, user, option.value, allTransactionOptions, expenseFundTransactionOptions);
          selectedAccount = option.value;
          console.log(selectedAccount);
        }
        if (option.value === `Surplus`) {
          showTransactionOptions(budget, placeholderBudget, user, option.value, allTransactionOptions, surplusTransactionOptions);
          selectedAccount = option.value;
          console.log(selectedAccount);
        }
        if (option.value === `Investment Fund`) {
          showTransactionOptions(budget, placeholderBudget, user, option.value, allTransactionOptions, investmentTransactionOptions);
          selectedAccount = option.value;
          console.log(selectedAccount);
        }
        if (option.value === `Debt`) {
          showTransactionOptions(budget, placeholderBudget, user, option.value, allTransactionOptions, debtTransactionOptions);
          selectedAccount = option.value;
          console.log(selectedAccount);
        }
        if (option.value === `Tithing`) {
          showTransactionOptions(budget, placeholderBudget, user, option.value, allTransactionOptions, tithingTransactionsOptions);
          selectedAccount = option.value;
          console.log(selectedAccount);
        }
      });
    });

    const receiptItemContainer = document.querySelector('.receipt-item-container');

    if (transactionSaveButton) {
      transactionSaveButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`Saving...`);
        if (selectedAccount !== `Investment Fund`) {
          transaction.transactionType = `Withdrawal`;
          const receiptRow = document.createElement('section');
          receiptRow.classList.add('receipt-item-container__row');
          receiptRow.classList.add('r__receipt-item-container__row');
          Utility.insertElement('beforeend', receiptItemContainer, receiptRow);

          const transactionDetails = document.createElement('section');
          transactionDetails.classList.add('transaction-item-details');
          transactionDetails.classList.add('r__transaction-item-details');

          Utility.insertElement('beforeend', receiptRow, transactionDetails);

          const transactionCostDetails = document.createElement('section');
          transactionCostDetails.classList.add('transaction-item-cost');
          transactionCostDetails.classList.add('r__transaction-item-cost');
          Utility.insertElement('beforeend', receiptRow, transactionCostDetails);

          let detailCount = 1;
          let detailStart = 0;
          console.log(selectedAccount);
          if (selectedAccount === `Monthly Budget` || selectedAccount === `Debt`) {
            detailCount = 2;
            console.log(detailCount);
          }
          while (detailStart < detailCount) {
            let receiptDetail = document.createElement('p');
            receiptDetail.classList.add('transaction-item-details__detail');
            receiptDetail.classList.add('r__transaction-item-details__detail');
            console.log(mainCategorySelect.firstChild.nextSibling.textContent);
            console.log(selectedAccount);
            if (selectedAccount === `Monthly Budget`) {
              if (detailStart === 0) {
                receiptDetail.textContent = mainCategorySelect.firstChild.nextSibling.value;
              }
              if (detailStart === 1) {
                receiptDetail.textContent = subCategorySelect.firstChild.nextSibling.value;
              }
            }
            if (selectedAccount === `Emergency Fund`) {
              if (detailStart === 0) {
                receiptDetail.textContent = transactionDescription.firstChild.value;
              }
            }
            if (selectedAccount === `Savings Fund` || selectedAccount === `Expense Fund` || selectedAccount === `Surplus`) {
              if (detailStart === 0) {
                receiptDetail.textContent = transactionItem.firstChild.nextSibling.value;
              }
            }
            if (selectedAccount === `Investment Fund`) {
              if (detailStart === 0) {
                receiptDetail.textContent = transactionName.firstChild.value;
              }
            }
            if (selectedAccount === `Debt`) {
              if (detailStart === 0) {
                receiptDetail.textContent = transactionLender.firstChild.nextSibling.value;
              }
              if (detailStart === 1) {
                receiptDetail.textContent = transactionItem.firstChild.nextSibling.value;
              }
            }
            Utility.insertElement('beforeend', transactionDetails, receiptDetail);
            detailStart++;
          }

          const receiptDetailCost = document.createElement('p');
          receiptDetailCost.classList.add('transaction-item-cost__cost');
          receiptDetailCost.classList.add('r__transaction-item-cost__cost');
          receiptDetailCost.textContent = utility.money.format(Number(transactionAmount.firstChild.value));
          Utility.insertElement('beforeend', transactionCostDetails, receiptDetailCost);

          const removeTransactionItemIcon = document.createElement('i');
          removeTransactionItemIcon.classList.add('fas');
          removeTransactionItemIcon.classList.add('fa-trash-alt');
          removeTransactionItemIcon.classList.add('remove-transaction');
          removeTransactionItemIcon.classList.add('r__remove-transaction');
          removeTransactionItemIcon.classList.add('closed');
          Utility.insertElement('beforeend', transactionCostDetails, removeTransactionItemIcon);

          removeTransactionItemIcon.addEventListener('click', (e) => {
            let removeTransactionIcons = document.querySelectorAll('.remove-transaction');
            let index = [...removeTransactionIcons].indexOf(e.target);
            let receiptTransactions = document.querySelectorAll('.receipt-item-container__row');
            receiptTransactions[index].remove();
            transaction.removeFromReceipt(index);
          });

          receiptRow.addEventListener('mouseover', (e) => {
            e.preventDefault();
            removeTransactionItemIcon.classList.toggle('closed');
            removeTransactionItemIcon.classList.toggle('open');
          });
          receiptRow.addEventListener('mouseout', (e) => {
            e.preventDefault();
            removeTransactionItemIcon.classList.toggle('closed');
            removeTransactionItemIcon.classList.toggle('open');
          });
          console.log(selectedAccount);
          if (selectedAccount === `Monthly Budget`) {
            transaction.addToReceipt({
              mainCategory: mainCategorySelect.firstChild.nextSibling.value,
              subCategory: subCategorySelect.firstChild.nextSibling.value,
              description: transactionDescription.firstChild.value,
              amount: Number(transactionAmount.firstChild.value),
              accountSelected: selectedAccount,
            });
          }
          if (selectedAccount === `Emergency Fund`) {
            transaction.addToReceipt({
              description: transactionDescription.firstChild.value,
              amount: Number(transactionAmount.firstChild.value),
              accountSelected: selectedAccount,
            });
          }
          if (selectedAccount === `Savings Fund`) {
            console.log(selectedAccount);
            transaction.addToReceipt({
              timing: transactionTiming.firstChild.nextSibling.value,
              expenditure: transactionItem.firstChild.nextSibling.value,
              description: transactionDescription.firstChild.value,
              amount: Number(transactionAmount.firstChild.value),
              accountSelected: selectedAccount,
            });
          }
          if (selectedAccount === `Expense Fund`) {
            transaction.addToReceipt({
              transactionType: transactionType.firstChild.nextSibling.value,
              timing: transactionTiming.firstChild.nextSibling.value,
              expenditure: transactionItem.firstChild.nextSibling.value,
              description: transactionDescription.firstChild.value,
              amount: Number(transactionAmount.firstChild.value),
              accountSelected: selectedAccount,
            });
          }
          if (selectedAccount === `Surplus`) {
            transaction.addToReceipt({
              timing: transactionTiming.firstChild.nextSibling.value,
              expenditure: transactionItem.firstChild.nextSibling.value,
              description: transactionDescription.firstChild.value,
              amount: Number(transactionAmount.firstChild.value),
              accountSelected: selectedAccount,
            });
          }
          if (selectedAccount === `Debt`) {
            transaction.addToReceipt({
              timing: transactionTiming.firstChild.nextSibling.value,
              lender: transactionLender.firstChild.nextSibling.value,
              expenditure: transactionItem.firstChild.nextSibling.value,
              description: transactionDescription.firstChild.value,
              amount: Number(transactionAmount.firstChild.value),
              accountSelected: selectedAccount,
            });
          }
        }
        console.log(selectedAccount);
        if (selectedAccount === `Investment Fund`) {
          console.log(selectedAccount);
          if (transaction.transactionType) return;
          console.log(selectedAccount);
          transaction.transactionType = `Deposit`;

          const receiptRow = document.createElement('section');
          receiptRow.classList.add('receipt-item-container__row');
          receiptRow.classList.add('r__receipt-item-container__row');
          Utility.insertElement('beforeend', receiptItemContainer, receiptRow);

          const transactionDetails = document.createElement('section');
          transactionDetails.classList.add('transaction-item-details');
          transactionDetails.classList.add('r__transaction-item-details');

          Utility.insertElement('beforeend', receiptRow, transactionDetails);

          const transactionCostDetails = document.createElement('section');
          transactionCostDetails.classList.add('transaction-item-cost');
          transactionCostDetails.classList.add('r__transaction-item-cost');
          Utility.insertElement('beforeend', receiptRow, transactionCostDetails);

          let detailCount = 1;
          let detailStart = 0;

          while (detailStart < detailCount) {
            let receiptDetail = document.createElement('p');
            receiptDetail.classList.add('transaction-item-details__detail');
            receiptDetail.classList.add('r__transaction-item-details__detail');
            console.log(mainCategorySelect.firstChild.nextSibling.textContent);
            console.log(selectedAccount);
            if (selectedAccount === `Investment Fund`) {
              if (detailStart === 0) {
                receiptDetail.textContent = transactionName.firstChild.value;
              }
            }
            Utility.insertElement('beforeend', transactionDetails, receiptDetail);
            detailStart++;
          }
          const receiptDetailCost = document.createElement('p');
          receiptDetailCost.classList.add('transaction-item-cost__cost');
          receiptDetailCost.classList.add('r__transaction-item-cost__cost');
          receiptDetailCost.textContent = utility.money.format(Number(transactionAmount.firstChild.value));
          Utility.insertElement('beforeend', transactionCostDetails, receiptDetailCost);

          const removeTransactionItemIcon = document.createElement('i');
          removeTransactionItemIcon.classList.add('fas');
          removeTransactionItemIcon.classList.add('fa-trash-alt');
          removeTransactionItemIcon.classList.add('remove-transaction');
          removeTransactionItemIcon.classList.add('r__remove-transaction');
          removeTransactionItemIcon.classList.add('closed');
          Utility.insertElement('beforeend', transactionCostDetails, removeTransactionItemIcon);

          removeTransactionItemIcon.addEventListener('click', (e) => {
            let removeTransactionIcons = document.querySelectorAll('.remove-transaction');
            let index = [...removeTransactionIcons].indexOf(e.target);
            let receiptTransactions = document.querySelectorAll('.receipt-item-container__row');
            receiptTransactions[index].remove();
            transaction.removeFromReceipt(index);
          });

          receiptRow.addEventListener('mouseover', (e) => {
            e.preventDefault();
            removeTransactionItemIcon.classList.toggle('closed');
            removeTransactionItemIcon.classList.toggle('open');
          });
          receiptRow.addEventListener('mouseout', (e) => {
            e.preventDefault();
            removeTransactionItemIcon.classList.toggle('closed');
            removeTransactionItemIcon.classList.toggle('open');
          });
          console.log(selectedAccount);

          if (selectedAccount === `Investment Fund`) {
            transaction.addToReceipt({
              user: user,
              transactionType: transactionType.firstChild.nextSibling.value,
              transactionName: transactionName.firstChild.value,
              description: transactionDescription.firstChild.value,
              amount: Number(transactionAmount.firstChild.value),
              accountSelected: selectedAccount,
            });
          }
        }
        console.log(transaction, transaction.receipt);
        const fullTransactionCost = document.querySelectorAll('.container--small__transaction-total__amount')[0];
        let receiptCost = 0;
        transaction.receipt.forEach((receiptItem, i) => {
          return (receiptCost = receiptCost += receiptItem.amount);
        });
        console.log(receiptCost);
        fullTransactionCost.textContent = utility.money.format(receiptCost);
      });
    }
    if (transactionSubmitButton) {
      transactionSubmitButton.addEventListener('click', (e) => {
        e.preventDefault();
        let updateObject = {
          budgetId: budget._id,
          userId: user._id,
        };
        placeholderBudget.transactions.recentTransactions.push(transaction);
        updateObject.transactions = placeholderBudget.transactions;
        console.log(updateObject);
        updateObject.transactions.recentTransactions[updateObject.transactions.recentTransactions.length - 1].receipt.forEach((receiptItem, i) => {
          console.log(receiptItem);
          if (receiptItem.account === `Monthly Budget`) {
            placeholderBudget.accounts.monthlyBudget.amount = placeholderBudget.accounts.monthlyBudget.amount - Number(receiptItem.amount);
            placeholderBudget.mainCategories.forEach((category, i) => {
              if (receiptItem.category === category.title) {
                let index = i;
                console.log(receiptItem.category);
                category.subCategories.forEach((subCategory, i) => {
                  if (receiptItem.subCategory === subCategory.title) {
                    console.log(receiptItem.subCategory);
                    subCategory.amountSpent += receiptItem.amount;
                    subCategory.amountRemaining = subCategory.goalAmount - subCategory.amountSpent;
                    subCategory.percentageSpent = Number((subCategory.amountSpent / subCategory.goalAmount) * 100);
                  }
                });
              }
            });
            updateObject.mainCategories = placeholderBudget.mainCategories;
          }
          if (receiptItem.account === `Emergency Fund`) {
            placeholderBudget.accounts.emergencyFund.amount = placeholderBudget.accounts.emergencyFund.amount - Number(receiptItem.amount);
          }
          if (receiptItem.account === `Savings Fund`) {
            placeholderBudget.accounts.savingsFund.amount = placeholderBudget.accounts.savingsFund.amount - Number(receiptItem.amount);
          }
          if (receiptItem.account === `Expense Fund`) {
            placeholderBudget.accounts.expenseFund.amount = placeholderBudget.accounts.expenseFund.amount - Number(receiptItem.amount);
          }
          if (receiptItem.account === `Surplus`) {
            placeholderBudget.accounts.surlus.amount = placeholderBudget.accounts.surplus.amount - Number(receiptItem.amount);
          }
          if (receiptItem.account === `Investment Fund`) {
            if (!placeholderBudget.accounts.investmentFund.investedAmount) placeholderBudget.accounts.investmentFund.investedAmount = 0;
            placeholderBudget.accounts.investmentFund.amount = placeholderBudget.accounts.investmentFund.amount - Number(receiptItem.amount);
            placeholderBudget.accounts.investmentFund.investedAmount = placeholderBudget.accounts.investmentFund.investedAmount + Number(receiptItem.amount);
            let investmentObject = {
              investmentType: receiptItem.transactionType,
              investmentName: receiptItem.transactionName,
              investmentDescription: receiptItem.description,
              initialInvestment: receiptItem.amount,
              currentValue: receiptItem.amount,
              settled: false,
              valueDifference: 0,
            };
            placeholderBudget.investments.push(investmentObject);
            updateObject.investments = placeholderBudget.investments;
          }
          if (receiptItem.account === `Debt`) {
            placeholderBudget.accounts.debt.amount = placeholderBudget.accounts.debt.amount - Number(receiptItem.amount);
            /* After reducing the amount that is allocated to the debt account, there needs to be a reduction of the debt amount through reducing the current amount owed for the debt that was selected.
  
            To do that we need to:
            1) Find the exact debt that is being paid.
            2) From there, reduce it's amountOwed amount.
  
            There is more steps to each of those, especially the first, but that is what needs to be done.
            */
          }
        });
        updateObject.accounts = placeholderBudget.accounts;
        placeholderBudget._updateBudget({ updateObject: updateObject }, `Dashboard`);
        const fullTransactionCost = document.querySelectorAll('.container--small__transaction-total__amount')[0];
        fullTransactionCost.textContent = utility.money.format(0);
      });
    }
  }
};

const createMonthlyBudgetTransactionPlans = (budget, placeholderBudget, user) => {
  let updateObject = { budgetId: budget._id, userId: user._id };
  placeholderBudget.mainCategories.forEach((mc, i) => {
    mc.subCategories.forEach((sc, i) => {
      if (sc.timingOptions.paymentSchedule) {
        let index = i;
        // LOOPING THROUGH SUB CATEGORY PAYMENT SCHEDULE
        sc.timingOptions.paymentSchedule.forEach((date, i) => {
          let found = false;
          // LOOP THROUGH PLANNED TRANSACTIONS FOR EACH DATE IN PAYMENT SCHEDULE
          placeholderBudget.transactions.plannedTransactions.forEach((plan, i) => {
            // console.log(plan);
            // CHECKING IF THE PLAN IS A MONTHLY BUDGET ONE, AND THAT IT CONTAINS THE MAIN CATEGORY AND SUB CATEGORY
            if (plan.account === `Monthly Budget` && plan.subAccount === mc.title && plan.name === sc.title) {
              // THEN, CHECK IF THE PAYMENT SCHEDULE ITEM IS AN ARRAY OF 2 DATES OR 1.
              if (date.length > 1 && typeof date === `object`) {
                date.forEach((newDate) => {
                  if (plan.timingOptions.dueDates.includes(new Date(newDate).toISOString())) {
                    if (sc.goalAmount !== plan.amount) {
                      found = true;
                      return (plan.amount = sc.goalAmount);
                    }
                    found = true;
                    return;
                  }
                });
              }
              // IF PAYMENT SCHEDULE DATE IS ONE ITEM
              if (date.length === 24) {
                if (plan.timingOptions.dueDates.includes(new Date(date).toISOString())) {
                  if (sc.goalAmount !== plan.amount) {
                    return (plan.amount = sc.goalAmount);
                  }
                  found = true;
                  return;
                }
              }
            }
          });
          if (found === false && date.length === 24) {
            let transactionPlan = {};
            transactionPlan.date = sc.lastUpdated;
            transactionPlan.type = `Withdrawal`;
            transactionPlan.location = `Unknown`;
            transactionPlan.account = `Monthly Budget`;
            transactionPlan.subAccount = mc.title;
            transactionPlan.category = mc.title;
            transactionPlan.subCategory = sc.title;
            transactionPlan.name = sc.title;
            transactionPlan.amount = sc.goalAmount;
            transactionPlan.need = `Need`;
            transactionPlan.timingOptions = {
              dueDates: [new Date(date)],
              paymentSchedule: [new Date(date)],
              paymentCycle: `Once`,
            };
            transactionPlan.amountSaved = 0;
            transactionPlan.paid = false;
            transactionPlan.paidStatus = `Unpaid`;
            placeholderBudget.transactions.plannedTransactions.push(transactionPlan);
          }
          if (found === false && date.length === 2) {
            date.forEach((date) => {
              let transactionPlan = {};
              transactionPlan.date = sc.lastUpdated;
              transactionPlan.type = `Withdrawal`;
              transactionPlan.location = `Unknown`;
              transactionPlan.account = `Monthly Budget`;
              transactionPlan.subAccount = mc.title;
              transactionPlan.category = mc.title;
              transactionPlan.subCategory = sc.title;
              transactionPlan.name = sc.title;
              transactionPlan.amount = sc.goalAmount;
              transactionPlan.need = `Need`;
              transactionPlan.timingOptions = {
                dueDates: [new Date(date)],
                paymentSchedule: [new Date(date)],
                paymentCycle: `Once`,
              };
              transactionPlan.amountSaved = 0;
              transactionPlan.paid = false;
              transactionPlan.paidStatus = `Unpaid`;
              placeholderBudget.transactions.plannedTransactions.push(transactionPlan);
            });
          }
        });
      }
    });
  });
  updateObject.transactions = placeholderBudget.transactions;
  placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
};

export const setupBudgetDashboard = (user, budget, placeholderBudget, utility) => {
  // THE LOGGED USER ABOVE SHOWED THAT THE DATE THE PASSWORD WAS CHANGED IS STILL SHOWING. THAT NEEDS TO BE CHANGED.
  ////////////////////////////////////////////
  // WATCH THE BUDGET NAVIGATION
  Navigation._watchBudgetNavigation();

  ////////////////////////////////////////////
  // CREATE TRANSACTION PLANS
  createMonthlyBudgetTransactionPlans(budget, placeholderBudget, user);

  ////////////////////////////////////////////
  // WATCH FOR ACCOUNT SELECTION
  _watchForTransactions(budget, placeholderBudget, user, utility);

  ////////////////////////////////////////////
  // GET BANK ACCOUNT TOTAL
  getDashboardAccountTotals(budget, placeholderBudget, user, utility);

  ////////////////////////////////////////////
  // SETUP BILL CALENDAR
  _setupBillCalendar(budget, placeholderBudget, user, utility);
  ////////////////////////////////////////////
  // SETUP BILL CURRENT MONTH
  _setupCurrentMonth(budget, placeholderBudget, user, utility);
};
