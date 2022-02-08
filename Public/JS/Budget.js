// Class of the 'days' on the Calendar.
// bill-calendar-container__calendar-container__calendar__days__single-day

const _watchForTransactions = (arrayOfArrays) => {
  arrayOfArrays.forEach((a, i) => {
    a.forEach((c, i) => {
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
          if (i === 2) a.classList.add('label-container');
          if (i === 3) a.classList.add('label-container');
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
          if (i === 3) a.classList.add('label-container');
          if (i === 5) a.classList.add('label-container');
          if (i === 11) {
            a.classList.add('fully-paid-for');
            a.addEventListener('click', (e) => {
              console.log(a.firstChild.nextSibling);
              a.firstChild.nextSibling.classList.toggle('paid-for-container--clicked');
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
          if (i === 3) a.classList.add('label-container');
          if (i === 5) a.classList.add('label-container');
          if (i === 11) {
            a.classList.add('fully-paid-for');
            a.addEventListener('click', (e) => {
              console.log(a.firstChild.nextSibling);
              a.firstChild.nextSibling.classList.toggle('paid-for-container--clicked');
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
          if (i === 3) a.classList.add('label-container');
          if (i === 6) a.classList.add('label-container');
          if (i === 11) {
            a.classList.add('fully-paid-for');
            a.addEventListener('click', (e) => {
              a.firstChild.nextSibling.classList.toggle('paid-for-container--clicked');
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
          if (i === 3) a.classList.add('label-container');
          if (i === 8) {
            a.classList.add('fully-paid-for');
            a.addEventListener('click', (e) => {
              console.log(a.firstChild.nextSibling);
              a.firstChild.nextSibling.classList.toggle('paid-for-container--clicked');
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

export const _watchBudget = () => {
  console.log(`WATCHING YOUR BUDGET`);
  ////////////////////////////////////////////
  // SETUP ACCOUNT OPTIONS FOR TRANSACTIONS
  const formLabels = document.querySelectorAll('.form-label');
  const formInputs = document.querySelectorAll('.form-input');
  const formSections = document.querySelectorAll('.form-row__section');
  const mainCategoryOptionArrays = [];
  console.log(formInputs, formLabels, formSections);
  ///////////////////////////////
  // MONTHLY BUDGET OPTIONS
  const monthlyBudgetTransactionOptions = [
    formSections[10],
    formSections[11],
    formLabels[7],
    formLabels[8],
    formInputs[18],
    formLabels[19],
    formInputs[19],
    formLabels[20],
  ];
  const emergencyFuncTransactionOptions = [formSections[7], formSections[8], formLabels[9], formInputs[8], formLabels[10], formInputs[9]];
  const savingsFundTransactionOptions = [
    formSections[12],
    formSections[13],
    formSections[14],
    formLabels[11],
    formInputs[10],
    formLabels[12],
    formInputs[11],
    formLabels[21],
    formInputs[20],
    formLabels[22],
    formInputs[21],
    formLabels[23],
  ];
  const expenseFundTransactionOptions = [
    formSections[15],
    formSections[16],
    formSections[17],
    formLabels[13],
    formInputs[12],
    formLabels[14],
    formInputs[13],
    formLabels[24],
    formInputs[22],
    formLabels[25],
    formInputs[23],
    formLabels[26],
  ];
  const surplusTransactionOptions = [
    formSections[18],
    formSections[19],
    formSections[20],
    formLabels[15],
    formInputs[14],
    formInputs[15],
    formLabels[16],
    formLabels[27],
    formInputs[24],
    formLabels[28],
    formInputs[25],
    formLabels[29],
  ];
  const investmentFundTransactionOptions = [];
  const debtTransactionOptions = [
    formSections[21],
    formSections[22],
    formSections[23],
    formLabels[17],
    formLabels[30],
    formInputs[26],
    formLabels[31],
    formInputs[27],
    formLabels[32],
  ];
  const tithingTransactionOptions = [formSections[9], formLabels[18], formInputs[17]];
  mainCategoryOptionArrays.push(monthlyBudgetTransactionOptions);
  mainCategoryOptionArrays.push(emergencyFuncTransactionOptions);
  mainCategoryOptionArrays.push(savingsFundTransactionOptions);
  mainCategoryOptionArrays.push(expenseFundTransactionOptions);
  mainCategoryOptionArrays.push(surplusTransactionOptions);
  mainCategoryOptionArrays.push(debtTransactionOptions);
  mainCategoryOptionArrays.push(tithingTransactionOptions);

  ////////////////////////////////////////////
  // START BY WATCHING THE BUDGET NAVIGATION
  _watchBudgetNavigation();

  ////////////////////////////////////////////
  // WATCH FOR ACCOUNT SELECTION
  _watchForTransactions(mainCategoryOptionArrays);
};
