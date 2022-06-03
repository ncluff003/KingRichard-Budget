import * as Manage from './Manage-Budget';

const getTithing = (budget, user, currentTithingSetting) => {
  let tithingSetting;
  let tithing = {};
  if (tithingSetting === undefined || tithingSetting !== '' || tithingSetting === null) {
    tithingSetting = currentTithingSetting;
  }
  tithing.tithingSetting = currentTithingSetting;
  tithing.amount = budget.accounts.tithing.amount;
  return tithing;
};

const getEmergencyFund = (budget, emergencySetting) => {
  let emergencyFundGoal, emergencyFundGoalTiming;
  let emergencyFund = {};
  emergencyFund.emergencyGoalMeasurement = emergencySetting;
  if (emergencySetting === `Length Of Time`) {
    emergencyFundGoal = Number(document.querySelector('.form__input--half-left').value);
    emergencyFundGoalTiming = document.querySelector('.form__select--half-right').value;
    if (emergencyFundGoal === '' || emergencyFundGoal === undefined || emergencyFundGoal === null) emergencyFundGoal = budget.accounts.emergencyFund.emergencyFundGoal;
    if (emergencyFundGoalTiming === '' || emergencyFundGoalTiming === undefined || emergencyFundGoalTiming === null) emergencyFundGoalTiming = budget.accounts.emergencyFund.emergencyFundGoalTiming;
    emergencyFund.emergencyGoalMeasurement = emergencySetting;
    emergencyFund.emergencyFundGoal = emergencyFundGoal;
    emergencyFund.emergencyFundGoalTiming = emergencyFundGoalTiming;
    emergencyFund.amount = budget.accounts.emergencyFund.amount;
    return emergencyFund;
  }
  if (emergencySetting === `Total Amount`) {
    emergencyFund.emergencyFundGoal = Number(document.querySelector('.budget-container__budget-management-container--extra-small__budget-emergency-goal-form__input').value);
  }
  return emergencyFund;
};

const getInvestmentFund = (budget) => {
  const budgetInputs = document.querySelectorAll('.form__input--small-thin');
  let investmentFund = {};
  let investmentGoal = Number(budgetInputs[0].value);
  let investmentPercentage = Number(budgetInputs[1].value);
  if (investmentGoal === '' || investmentGoal === undefined || investmentGoal === null) investmentGoal = budget.accounts.investmentFund.investmentGoal;
  if (investmentPercentage === '' || investmentPercentage === undefined || investmentPercentage === null) investmentPercentage = budget.accounts.investmentFund.investmentPercentage;
  investmentFund.investmentGoal = investmentGoal;
  investmentFund.investmentPercentage = investmentPercentage / 100;
  investmentFund.amount = budget.accounts.investmentFund.amount;
  return investmentFund;
};

const getSavingsFund = (budget) => {
  const budgetInputs = document.querySelectorAll('.form__input--small-thin');
  let savingsFund = {};
  let savingsGoal = Number(budgetInputs[0].value);
  let savingsPercentage = Number(budgetInputs[1].value);
  if (savingsGoal === '' || savingsGoal === undefined || savingsGoal === null) savingsGoal = budget.accounts.savingsFund.savingsGoal;
  if (savingsPercentage === '' || savingsPercentage === undefined || savingsPercentage === null) savingsPercentage = budget.accounts.savingsFund.savingsPercentage;
  savingsFund.savingsGoal = savingsGoal;
  savingsFund.savingsPercentage = savingsPercentage / 100;
  savingsFund.amount = budget.accounts.savingsFund.amount;
  return savingsFund;
};

const getBudgetName = (budget) => {
  const budgetInputs = document.querySelectorAll('.form__input--small-thin__placeholder-shown');
  let budgetName = budgetInputs[0].value;
  if (budgetName === '') budgetName = budget.name;
  return budgetName;
};

const compileBudgetManagementUpdates = (emergencySetting, currentTithingSetting, budget, placeholderBudget, user) => {
  /*
    Quick note here...,

    Building the update object outside of a method is alright, however, how this really should go down is to update the placeholder budget first.

    Then, after the place holder budget is updated within the limits of the current page, there should be an object that is built based off of what CAN be updated on that page.
    For the Budget Management Page, that would be the budget's name and the budget's accounts.  So, sending an object with THAT information would be most beneficial.
    Another and final example for now would be the edit category goals page be fore changing the timing, goals, etc... on the placeholder budget and sending the whole main categories array
    to the update functionality in the backend to update that budget that way.

  */
  // GET BUDGET NAME
  let budgetName = getBudgetName(budget);
  // The methods below are returning the objects of these accounts.  They are NOT returning the values themselves.
  const savingsFund = getSavingsFund(budget);
  const investmentFund = getInvestmentFund(budget);
  const emergencyFund = getEmergencyFund(budget, emergencySetting);
  let tithing;
  let updateObject = {};
  if (user.latterDaySaint === true) {
    tithing = getTithing(budget, user, currentTithingSetting);
    let name = placeholderBudget._addName(budgetName);

    updateObject.budgetId = budget._Id;
    updateObject.userId = user._Id;
    updateObject.name = name;
    updateObject.accounts = {
      unAllocated: {
        amount: placeholderBudget.accounts.unAllocated.amount,
      },
      monthlyBudget: {
        amount: placeholderBudget.accounts.monthlyBudget.amount,
      },
      emergencyFund: emergencyFund,
      savingsFund: savingsFund,
      expenseFund: {
        amount: placeholderBudget.accounts.expenseFund.amount,
      },
      surplus: {
        amount: placeholderBudget.accounts.surplus.amount,
      },
      investmentFund: investmentFund,
      debt: {
        amount: placeholderBudget.accounts.debt.amount,
        debtAmount: Number(placeholderBudget.accounts.debt.debtAmount),
      },
      tithing: tithing,
    };

    placeholderBudget._updateBudget({ updateObject: updateObject }, `Budget-Management`);
  }

  if (user.latterDaySaint === false) {
    let name = placeholderBudget._addName(budgetName);
    updateObject.budgetId = budget._Id;
    updateObject.userId = user._Id;
    updateObject.name = name;
    updateObject.accounts = {
      unAllocated: {
        amount: placeholderBudget.accounts.unAllocated.amount,
      },
      monthlyBudget: {
        amount: placeholderBudget.accounts.monthlyBudget.amount,
      },
      emergencyFund: emergencyFund,
      savingsFund: savingsFund,
      expenseFund: {
        amount: placeholderBudget.accounts.expenseFund.amount,
      },
      surplus: {
        amount: placeholderBudget.accounts.surplus.amount,
      },
      investmentFund: investmentFund,
      debt: {
        amount: placeholderBudget.accounts.debt.amount,
        debtAmount: Number(placeholderBudget.accounts.debt.debtAmount),
      },
    };
    placeholderBudget._updateBudget({ updateObject: updateObject }, `Budget-Management`);
  }
};

const changeEmergencyInput = (array, setting) => {
  if (setting === `Length Of Time`) {
    array.forEach((eSetting) => {
      eSetting.classList.remove('closed');
      eSetting.classList.remove('open');
    });
    array[0].classList.add('open');
    array[1].classList.add('closed');
  }
  if (setting === `Total Amount`) {
    array.forEach((eSetting) => {
      eSetting.classList.remove('closed');
      eSetting.classList.remove('open');
    });
    array[1].classList.add('open');
    array[0].classList.add('closed');
  }
};

const watchForBudgetDeletion = () => {
  const budgetDeleteButton = document.querySelectorAll(`.button--extra-extra-small__wide`)[1];
  const budgetId = window.location.pathname.split('/')[5];
  const userId = window.location.pathname.split('/')[3];
  budgetDeleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    Manage.deleteMyBudget(budgetId, userId);
  });
};

const watchForBudgetExit = () => {
  const submitButtons = document.querySelectorAll(`.button--extra-extra-small__wide`);
  const exitButton = document.querySelectorAll(`.button--extra-extra-small__wide`)[0];
  const userId = window.location.pathname.split('/')[3];
  exitButton.addEventListener('click', (e) => {
    e.preventDefault();
    Manage.exitBudget(userId);
  });
};

export const _setupBudgetManagement = (budget, placeholderBudget, user) => {
  const budgetNameDisplay = document.querySelector('.form--extra-small__budget-name-display');
  const budgetNameInput = document.querySelectorAll('.form__input--small-thin__placeholder-shown')[0];
  if (window.location.pathname.split('/')[6] === `Budget-Management`) {
    const invisibleCheckboxes = document.querySelectorAll('.form__input--invisible-checkbox');
    if (budgetNameInput) {
      budgetNameInput.addEventListener('keyup', (e) => {
        e.preventDefault();
        budgetNameDisplay.textContent = budgetNameInput.value;
      });
    }
    const emergencyFundSettings = document.querySelectorAll('.form__label--checkbox-container');
    let emergencySetting;

    const emergencySelectionContainer = document.querySelector('.form__section--small-thin');
    const smallThinInputs = document.querySelectorAll('.form__input--small-thin');
    const emergencyTotalInput = document.querySelectorAll('.form__input--small-thin__placeholder-shown')[1];
    const emergencySettings = [emergencySelectionContainer, emergencyTotalInput];
    emergencySettings.forEach((eSetting) => eSetting.classList.remove('visible'));
    if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
      emergencySettings.forEach((es) => {
        es.classList.add('closed');
        es.classList.remove('open');
      });
      emergencySettings[0].classList.remove('closed');
      emergencySettings[0].classList.add('open');
    }
    if (budget.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
      emergencySettings.forEach((es) => {
        es.classList.add('closed');
        es.classList.remove('open');
      });
      emergencySettings[1].classList.remove('closed');
      emergencySettings[1].classList.add('open');
    }

    emergencyFundSettings.forEach((setting) => {
      setting.classList.remove('checked');
      if (setting.textContent === budget.accounts.emergencyFund.emergencyGoalMeasurement) setting.classList.toggle('checked');
      emergencySetting = budget.accounts.emergencyFund.emergencyGoalMeasurement;
      setting.addEventListener('click', (e) => {
        e.preventDefault();
        emergencyFundSettings.forEach((es) => es.classList.remove('checked'));
        setting.classList.toggle('checked');
        emergencySetting = setting.textContent;
        changeEmergencyInput(emergencySettings, emergencySetting, budget);
      });
    });

    const tithingCheckboxes = [invisibleCheckboxes[2], invisibleCheckboxes[3], invisibleCheckboxes[4]];
    let currentTithingSetting;
    const budgetManagementSubmitButtons = document.querySelectorAll('.button--extra-extra-small');
    const wideBudgetManagementSubmitButtons = document.querySelectorAll('.button--extra-extra-small__wide');
    const budgetNameSubmit = budgetManagementSubmitButtons[0];
    const savingsGoalSubmit = budgetManagementSubmitButtons[1];
    const investmentGoalSubmit = budgetManagementSubmitButtons[2];
    const emergencyGoalSubmit = budgetManagementSubmitButtons[3];
    const tithingSettingSubmit = budgetManagementSubmitButtons[4];
    const updateSubmitButtons = [budgetNameSubmit, savingsGoalSubmit, investmentGoalSubmit, emergencyGoalSubmit];

    if (user.latterDaySaint === true) {
      updateSubmitButtons.push(tithingSettingSubmit);
    }
    updateSubmitButtons.forEach((ub) => {
      ub.addEventListener('click', (e) => {
        e.preventDefault();
        compileBudgetManagementUpdates(emergencySetting, currentTithingSetting, budget, placeholderBudget, user);
      });
    });
    watchForBudgetExit();
    watchForBudgetDeletion();

    if (!budget.accounts.tithing) return;
    if (budget.accounts.tithing.tithingSetting) {
      const tithingSettings = document.querySelectorAll('.form__label--small-thin__taller--thirds__tithing');
      const tithingCheckboxes = document.querySelectorAll(
        '.budget-container__budget-management-container--extra-small__budget-tithing-setting-form__setting-container__label-container__input--checkbox'
      );
      tithingSettings.forEach((ts) => {
        ts.classList.remove('selected');
        if (budget.accounts.tithing.tithingSetting === `Gross`) tithingSettings[0].classList.add('selected');
        if (budget.accounts.tithing.tithingSetting === `Net`) tithingSettings[1].classList.add('selected');
        if (budget.accounts.tithing.tithingSetting === `Surplus`) tithingSettings[2].classList.add('selected');
      });
      tithingSettings.forEach((ts) => {
        if (ts.classList.contains('selected')) currentTithingSetting = ts.textContent;
      });
      tithingSettings.forEach((ts) => {
        ts.addEventListener('click', (e) => {
          e.preventDefault();
          tithingSettings.forEach((setting) => setting.classList.remove('selected'));
          ts.classList.add('selected');
          currentTithingSetting = ts.textContent;
        });
      });
    }
  }
};
