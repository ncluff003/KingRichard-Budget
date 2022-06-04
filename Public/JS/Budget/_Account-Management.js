const getBankAccountTotal = (accounts) => {
  let budgetAccountTotals = [];
  Object.entries(accounts).forEach((account, i) => {
    return budgetAccountTotals.push(account[1].amount);
  });
  let initialDeposit = 0;
  const bankVaultTotal = budgetAccountTotals.reduce((previous, current) => previous + current, initialDeposit);
  return bankVaultTotal;
};

export const _watchAccountManagement = (budget, placeholderBudget, user, utility) => {
  const accountSelect = document.querySelectorAll('.form__select--accounts');
  const transferFrom = accountSelect[0];
  const transferTo = accountSelect[1];
  const transferAmount = document.getElementById('transferAmount');
  const transferButton = document.querySelector('.button--extra-extra-small__wider');
  const accountTotals = document.querySelectorAll('.container--extra-small__content__account-total__alt');
  let bankAccountTotal = getBankAccountTotal(budget.accounts);
  let bankAccount = document.querySelectorAll('.container--extra-small__content__account-total');
  bankAccount.textContent = utility.money.format(bankAccountTotal);
  accountTotals.forEach((total, i) => {
    if (i === 0) {
      total.textContent = utility.money.format(placeholderBudget.accounts.monthlyBudget.amount);
    }
    if (i === 1) {
      total.textContent = utility.money.format(placeholderBudget.accounts.emergencyFund.amount);
    }
    if (i === 2) {
      total.textContent = utility.money.format(placeholderBudget.accounts.savingsFund.amount);
    }
    if (i === 3) {
      total.textContent = utility.money.format(placeholderBudget.accounts.expenseFund.amount);
    }
    if (i === 4) {
      total.textContent = utility.money.format(placeholderBudget.accounts.surplus.amount);
    }
    if (i === 5) {
      total.textContent = utility.money.format(placeholderBudget.accounts.investmentFund.amount);
    }
    if (i === 6) {
      total.textContent = utility.money.format(placeholderBudget.accounts.tithing.amount);
    }
  });
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
