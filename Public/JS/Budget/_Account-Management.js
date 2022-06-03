export const _watchAccountManagement = (budget, placeholderBudget, user) => {
  const accountSelect = document.querySelectorAll('.form__select--accounts');
  const transferFrom = accountSelect[0];
  const transferTo = accountSelect[1];
  const transferAmount = document.getElementById('transferAmount');
  const transferButton = document.querySelector('.button--extra-extra-small__wider');
  if (transferFrom) {
    transferFrom.childNodes.forEach((child) => {
      child.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(child.value);
      });
    });
  }
  if (transferTo) {
    transferTo.childNodes.forEach((child) => {
      child.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(child.value);
      });
    });
  }
  if (transferButton) {
    transferButton.addEventListener('click', (e) => {
      e.preventDefault();
      let to, from;
      switch (transferFrom.value) {
        case `Monthly Budget`:
          from = `monthlyBudget`;
          break;
        case `Emergency Fund`:
          from = `emergencyFund`;
          break;
        case `Savings Fund`:
          from = `savingsFund`;
          break;
        case `Expense Fund`:
          from = `expenseFund`;
          break;
        case `Surplus`:
          from = `surplus`;
          break;
        case `Investment Fund`:
          from = `investmentFund`;
          break;
        case `Tithing`:
          from = `tithing`;
          break;
      }
      switch (transferTo.value) {
        case `Monthly Budget`:
          to = `monthlyBudget`;
          break;
        case `Emergency Fund`:
          to = `emergencyFund`;
          break;
        case `Savings Fund`:
          to = `savingsFund`;
          break;
        case `Expense Fund`:
          to = `expenseFund`;
          break;
        case `Surplus`:
          to = `surplus`;
          break;
        case `Investment Fund`:
          to = `investmentFund`;
          break;
        case `Tithing`:
          from = `tithing`;
          break;
      }
      let updateObject = {
        budgetId: budget._id,
        userId: user._id,
      };
      placeholderBudget._accountTransfer(placeholderBudget.accounts[from], placeholderBudget.accounts[to], transferAmount.value);
      updateObject.accounts = placeholderBudget.accounts;
      placeholderBudget._updateBudget({ updateObject: updateObject }, `Account-Management`);
      Utility.reloadPage();
    });
  }
};
