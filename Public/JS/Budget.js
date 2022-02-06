const _watchForTransactions = (arrayOfArrays) => {
  arrayOfArrays.forEach((a, i) => {
    a.forEach((c, i) => {
      c.style.display = `none`;
    });
  });
  const accountOptions = document.querySelectorAll('.account-selection__option');
  let clicked;
  console.log(accountOptions);
  accountOptions.forEach((ao, i) => {
    ao.addEventListener('click', (e) => {
      e.preventDefault();
      clicked = e.target;
      if (clicked.value === `Monthly Budget`) {
        arrayOfArrays.forEach((a, i) => {
          a.forEach((c, i) => {
            c.style.display = `none`;
          });
        });
        arrayOfArrays[0].forEach((a, i) => {
          a.style.display = `flex`;
        });
      }
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
      console.log(clicked);
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
  const mainCategoryOptionArrays = [];
  console.log(formInputs, formLabels);
  ///////////////////////////////
  // MONTHLY BUDGET OPTIONS
  const monthlyBudgetTransactionOptions = [formLabels[7], formLabels[8], formInputs[17], formLabels[18], formInputs[18], formLabels[19]];
  const emergencyFuncTransactionOptions = [formLabels[9], formInputs[8], formLabels[10], formInputs[9]];
  mainCategoryOptionArrays.push(monthlyBudgetTransactionOptions);
  mainCategoryOptionArrays.push(emergencyFuncTransactionOptions);

  ////////////////////////////////////////////
  // START BY WATCHING THE BUDGET NAVIGATION
  _watchBudgetNavigation();

  ////////////////////////////////////////////
  // WATCH FOR ACCOUNT SELECTION
  _watchForTransactions(mainCategoryOptionArrays);
};
