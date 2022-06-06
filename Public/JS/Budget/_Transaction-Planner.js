import * as Utility from './../Application/Utility';

const displayTransaction = (container, plan) => {
  container.insertAdjacentElement('beforebegin', plan);
};

const getPaymentSchedule = (paymentArray, paymentCycle, dates) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let payments;
  let paymentStart = 0;
  console.log(`Scheduling Payments...`);
  if (paymentCycle === `Once`) {
    paymentArray.push(dates[0]);
    return paymentArray;
  }
  if (paymentCycle === `Weekly`) {
    payments = 52;
    while (paymentStart < payments) {
      let adjustedDate = new Date(dates[0]);
      let selectedDate = new Date(adjustedDate.setHours(adjustedDate.getHours() + new Date().getTimezoneOffset() / 60));
      if (paymentStart === 0) {
        paymentArray.push(adjustedDate);
      }
      if (paymentStart === 1) {
        selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() + 7));
        paymentArray.push(selectedDate);
      }
      if (paymentStart > 1) {
        selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() + 7 * paymentStart));
        paymentArray.push(selectedDate);
      }
      paymentStart++;
    }
    return paymentArray;
  }
  if (paymentCycle === `Bi-Weekly`) {
    payments = 26;
    while (paymentStart < payments) {
      let adjustedDate = new Date(dates[0]);
      let selectedDate = new Date(adjustedDate.setHours(adjustedDate.getHours() + new Date().getTimezoneOffset() / 60));
      if (paymentStart === 0) {
        paymentArray.push(adjustedDate);
      }
      if (paymentStart === 1) {
        selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() + 14));
        paymentArray.push(selectedDate);
      }
      if (paymentStart > 1) {
        selectedDate = new Date(selectedDate.setDate(selectedDate.getDate() + 14 * paymentStart));
        paymentArray.push(selectedDate);
      }
      paymentStart++;
    }
    return paymentArray;
  }
  if (paymentCycle === `Bi-Monthly`) {
    payments = 12;
    while (paymentStart < payments) {
      let adjustedDate1 = new Date(dates[0]);
      let adjustedDate2 = new Date(dates[1]);
      let selectedDate1 = new Date(adjustedDate1.setHours(adjustedDate1.getHours() + new Date().getTimezoneOffset() / 60));
      let selectedDate2 = new Date(adjustedDate2.setHours(adjustedDate2.getHours() + new Date().getTimezoneOffset() / 60));
      if (paymentStart === 0) {
        paymentArray.push([adjustedDate1, adjustedDate2]);
      }
      if (paymentStart === 1) {
        selectedDate1 = new Date(selectedDate1.setMonth(selectedDate1.getMonth() + 1));
        selectedDate2 = new Date(selectedDate2.setMonth(selectedDate2.getMonth() + 1));
        paymentArray.push([selectedDate1, selectedDate2]);
      }
      if (paymentStart > 1) {
        selectedDate1 = new Date(selectedDate1.setMonth(selectedDate1.getMonth() + 1 * paymentStart));
        selectedDate2 = new Date(selectedDate2.setMonth(selectedDate2.getMonth() + 1 * paymentStart));
        paymentArray.push([selectedDate1, selectedDate2]);
      }
      paymentStart++;
    }
    return paymentArray;
  }
  if (paymentCycle === `Monthly`) {
    payments = 12;
    while (paymentStart < payments) {
      let adjustedDate = new Date(dates[0]);
      let selectedDate = new Date(adjustedDate.setHours(adjustedDate.getHours() + new Date().getTimezoneOffset() / 60));
      if (paymentStart === 0) {
        paymentArray.push(adjustedDate);
      }
      if (paymentStart === 1) {
        selectedDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + 1));
        paymentArray.push(selectedDate);
      }
      if (paymentStart > 1) {
        selectedDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + 1 * paymentStart));
        paymentArray.push(selectedDate);
      }
      paymentStart++;
    }
    return paymentArray;
  }
  if (paymentCycle === `Quarterly`) {
    payments = 4;
    while (paymentStart < payments) {
      let adjustedDate = new Date(dates[0]);
      let selectedDate = new Date(adjustedDate.setHours(adjustedDate.getHours() + new Date().getTimezoneOffset() / 60));
      if (paymentStart === 0) {
        paymentArray.push(adjustedDate);
      }
      if (paymentStart === 1) {
        selectedDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + 3));
        paymentArray.push(selectedDate);
      }
      if (paymentStart > 1) {
        selectedDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + 3 * paymentStart));
        paymentArray.push(selectedDate);
      }
      paymentStart++;
    }
    return paymentArray;
  }
  if (paymentCycle === `Bi-Annual`) {
    payments = 7; // Gives them 7 years of payments ahead.
    while (paymentStart < payments) {
      let adjustedDate1 = new Date(dates[0]);
      let adjustedDate2 = new Date(dates[1]);
      let selectedDate1 = new Date(adjustedDate1.setHours(adjustedDate1.getHours() + new Date().getTimezoneOffset() / 60));
      let selectedDate2 = new Date(adjustedDate2.setHours(adjustedDate2.getHours() + new Date().getTimezoneOffset() / 60));
      if (paymentStart === 0) {
        paymentArray.push([adjustedDate1, adjustedDate2]);
      }
      if (paymentStart === 1) {
        selectedDate1 = new Date(selectedDate1.setFullYear(selectedDate1.getFullYear() + 1));
        selectedDate2 = new Date(selectedDate2.setFullYear(selectedDate2.getFullYear() + 1));
        paymentArray.push([selectedDate1, selectedDate2]);
      }
      if (paymentStart > 1) {
        selectedDate1 = new Date(selectedDate1.setFullYear(selectedDate1.getFullYear() + 1 * paymentStart));
        selectedDate2 = new Date(selectedDate2.setFullYear(selectedDate2.getFullYear() + 1 * paymentStart));
        paymentArray.push([selectedDate1, selectedDate2]);
      }
      paymentStart++;
    }
    return paymentArray;
  }
  if (paymentCycle === `Annual`) {
    payments = 10; // Gives them 10 years of payments ahead.
    while (paymentStart < payments) {
      let adjustedDate = new Date(dates[0]);
      let selectedDate = new Date(adjustedDate.setHours(adjustedDate.getHours() + new Date().getTimezoneOffset() / 60));
      if (paymentStart === 0) {
        paymentArray.push(adjustedDate);
      }
      if (paymentStart === 1) {
        selectedDate = new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 1));
        paymentArray.push(selectedDate);
      }
      if (paymentStart > 1) {
        selectedDate = new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 1 * paymentStart));
        paymentArray.push(selectedDate);
      }
      paymentStart++;
    }
    return paymentArray;
  }
};

const getDatabaseDueDate = (date) => {
  return new Date(new Date(date).setHours(new Date(date).getHours() + new Date().getTimezoneOffset() / 60));
};

const finalizeTransactionPlan = (budget, placeholderBudget, user, selects, smallInputs, mediumInputs) => {
  let updateObject = {
    budgetId: budget._id,
    userId: user._id,
  };
  let plannedTransaction = {};
  updateObject.transactions = {};
  updateObject.transactions.recentTransactions = budget.transactions.recentTransactions;
  updateObject.transactions.plannedTransactions = budget.transactions.plannedTransactions;

  plannedTransaction.date = new Date();
  plannedTransaction.type = `Withdrawal`;
  plannedTransaction.location = smallInputs[0].value;
  plannedTransaction.account = selects[0].value;
  plannedTransaction.amount = Number(smallInputs[2].value);
  plannedTransaction.timingOptions = {};
  plannedTransaction.timingOptions.paymentCycle = selects[5].value;
  plannedTransaction.timingOptions.dueDates = [];
  plannedTransaction.timingOptions.dueDates.push(getDatabaseDueDate(mediumInputs[0].value));

  if (plannedTransaction.timingOptions.paymentCycle === `Bi-Monthly` || plannedTransaction.timingOptions.paymentCycle === `Bi-Annual`) {
    plannedTransaction.timingOptions.dueDates = [];
    plannedTransaction.timingOptions.dueDates.push(getDatabaseDueDate(mediumInputs[0].value));
    plannedTransaction.timingOptions.dueDates.push(getDatabaseDueDate(mediumInputs[1].value));
  }
  plannedTransaction.timingOptions.paymentSchedule = [];
  // After the due dates, it is setting the payment schedule using the selected payment cycle.
  getPaymentSchedule(plannedTransaction.timingOptions.paymentSchedule, plannedTransaction.timingOptions.paymentCycle, plannedTransaction.timingOptions.dueDates);
  plannedTransaction.name = smallInputs[1].value;
  plannedTransaction.amountSaved = 0;
  plannedTransaction.paid = false;
  plannedTransaction.paidStatus = `Unpaid`;

  if (selects[0].value === `Expense Fund`) {
    plannedTransaction.subAccount = selects[1].value;

    const surplusSwitch = smallInputs[2].closest('.form__section--transaction-plan').nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.nextSibling;
    plannedTransaction.need = `Need`;
    if (surplusSwitch.classList.contains('surplus-container__switch--switched')) {
      plannedTransaction.need = `Surplus`;
    }
  }
  if (selects[0].value === `Savings Fund`) {
    plannedTransaction.subAccount = selects[2].value;
    const surplusSwitch = smallInputs[2].closest('.form__section--transaction-plan').nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.nextSibling;
    plannedTransaction.need = `Need`;
    if (surplusSwitch.classList.contains('surplus-container__switch--switched')) {
      plannedTransaction.need = `Surplus`;
    }
  }
  if (selects[0].value === `Debt`) {
    plannedTransaction.subAccount = selects[3].value;
    plannedTransaction.need = `Need`;
    plannedTransaction.lender = selects[6].value;
  }
  if (selects[0].value === `Surplus`) {
    plannedTransaction.subAccount = selects[4].value;
    plannedTransaction.need = `Surplus`;
  }

  updateObject.transactions.plannedTransactions.push(plannedTransaction);
  placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
};

const getCurrentDate = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getFullYear()}`;
};

const getDueDate = (date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const selectedDate = new Date(date);
  const currentTimezoneOffset = selectedDate.getTimezoneOffset() / 60;
  return `${new Date(selectedDate.setHours(selectedDate.getHours() + new Date().getTimezoneOffset() / 60)).getDate()} ${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
};

const buildTransactionPlan = (budget, placeholderBudget, user, number, numberOfSections, plan, classType, utility) => {
  const transactionPlanSelects = document.querySelectorAll('.form__select--accounts');
  const smallShortTransactionPlanInputs = document.querySelectorAll('.form__input--small-short');
  const altMediumTransactionPlanInputs = document.querySelectorAll('.form__input--medium__alt');

  let expenseAppliedTotal = 0;
  let savingsAppliedTotal = 0;
  let debtAppliedTotal = 0;
  let surplusAppliedTotal = 0;
  budget.transactions.plannedTransactions.forEach((transaction, i) => {
    if (transaction.account === `Expense Fund`) {
      expenseAppliedTotal += transaction.amountSaved;
    }
    if (transaction.account === `Savings Fund`) {
      savingsAppliedTotal += transaction.amountSaved;
    }
    if (transaction.account === `Debt`) {
      debtAppliedTotal += transaction.amountSaved;
    }
    if (transaction.account === `Surplus`) {
      surplusAppliedTotal += transaction.amountSaved;
    }
  });

  if (classType === `original`) {
    while (number < numberOfSections) {
      const transactionPlanPartHeader = document.createElement('header');
      const transactionPlanPartHeaderText = document.createElement('p');
      const transactionPlanPartText = document.createElement('p');
      // Add Classes For First Part
      transactionPlanPartHeader.classList.add('transaction-plan__part__header');
      transactionPlanPartHeader.classList.add('r__transaction-plan__part__header');
      transactionPlanPartHeaderText.classList.add('transaction-plan__part__header__text');
      transactionPlanPartHeaderText.classList.add('r__transaction-plan__part__header__text');
      transactionPlanPartText.classList.add('transaction-plan__part__text');
      transactionPlanPartText.classList.add('r__transaction-plan__part__text');

      // Add Content For First Part
      transactionPlanPartHeaderText.textContent = `Date`;
      transactionPlanPartText.textContent = getCurrentDate();

      const transactionPlanPart = document.createElement('section');
      transactionPlanPart.classList.add(`transaction-plan__part`);
      if (numberOfSections === 13) Utility.replaceClassName(transactionPlanPart, 'transaction-plan__part', 'transaction-plan__double__part');
      plan.insertAdjacentElement('beforeend', transactionPlanPart);

      if (number === 0) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        Utility.insertElement('beforeend', transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement('beforeend', transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement('beforeend', transactionPlanPart, transactionPlanPartText);
      }
      if (number === 1) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Account`;
        transactionPlanPartText.textContent = `${transactionPlanSelects[0].value}`;
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 2) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Transaction Type`;

        if (transactionPlanSelects[0].value === `Expense Fund`) {
          transactionPlanPartText.textContent = `${transactionPlanSelects[1].value}`;
        }
        if (transactionPlanSelects[0].value === `Savings Fund`) {
          transactionPlanPartText.textContent = `${transactionPlanSelects[2].value}`;
        }
        if (transactionPlanSelects[0].value === `Surplus`) {
          transactionPlanPartText.textContent = `${transactionPlanSelects[4].value}`;
        }
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 3) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Transaction Name`;
        transactionPlanPartText.textContent = `${smallShortTransactionPlanInputs[1].value}`;
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 4) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Location`;
        transactionPlanPartText.textContent = `${smallShortTransactionPlanInputs[0].value}`;
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 5) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Amount`;
        transactionPlanPartText.textContent = `${utility.money.format(Number(smallShortTransactionPlanInputs[2].value))}`;
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 6) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Due Date One`;
        transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[0].value);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 7) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Timing`;
        transactionPlanPartText.textContent = `${transactionPlanSelects[5].value}`;

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Due Date Two`;
          transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[1].value);
        }
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 8) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Amount Saved`;
        transactionPlanPartText.textContent = utility.money.format(0);

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Timing`;
          transactionPlanPartText.textContent = `${transactionPlanSelects[5].value}`;
        }
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 9) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = `Apply Money`;
          const transactionPlanInput = document.createElement('input');
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Apply`;
          transactionPlanInput.classList.add('form__input--transaction-plan');
          transactionPlanInput.classList.add('r__form__input--transaction-plan');
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
          transactionPlanInput.type = 'number';
          transactionPlanInput.min = 0;
          transactionPlanInput.placeholder = '$0.00';

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanInput);
          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Amount Saved`;
          transactionPlanPartText.textContent = utility.money.format(0);
          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
        }
      }
      if (number === 10) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = `Paid In Full?`;
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Paid`;
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Apply Money`;
          const transactionPlanInput = document.createElement('input');
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Apply`;
          transactionPlanInput.classList.add('form__input--transaction-plan');
          transactionPlanInput.classList.add('r__form__input--transaction-plan');
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
          transactionPlanInput.type = 'number';
          transactionPlanInput.min = 0;
          transactionPlanInput.placeholder = '$0.00';

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanInput);
          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
        }
      }
      if (number === 11) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = `Status`;
          transactionPlanPartText.textContent = `Unpaid`;

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Paid In Full?`;
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Paid`;
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
        }
      }
      if (number === 12) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Status`;
          transactionPlanPartText.textContent = `Unpaid`;

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
        }
      }

      number++;
    }
  }
  if (classType === `alt`) {
    while (number < numberOfSections) {
      // Initialize Variables For First Part
      const transactionPlanPartHeader = document.createElement('header');
      const transactionPlanPartHeaderText = document.createElement('p');
      const transactionPlanPartText = document.createElement('p');

      // Add Classes For First Part
      transactionPlanPartHeader.classList.add('transaction-plan__alt__part__header');
      transactionPlanPartHeader.classList.add('r__transaction-plan__alt__part__header');
      transactionPlanPartHeaderText.classList.add('transaction-plan__alt__part__header__text');
      transactionPlanPartHeaderText.classList.add('r__transaction-plan__alt__part__header__text');
      transactionPlanPartText.classList.add('transaction-plan__alt__part__text');
      transactionPlanPartText.classList.add('r__transaction-plan__alt__part__text');

      // Add Content For First Part
      transactionPlanPartHeaderText.textContent = `Date`;
      transactionPlanPartText.textContent = getCurrentDate();

      const transactionPlanPart = document.createElement('section');
      transactionPlanPart.classList.add(`transaction-plan__alt__part`);
      if (numberOfSections === 14) Utility.replaceClassName(transactionPlanPart, 'transaction-plan__alt__part', 'transaction-plan__alt-double__part');
      plan.insertAdjacentElement('beforeend', transactionPlanPart);

      if (number === 0) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 1) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Account`;
        transactionPlanPartText.textContent = `${transactionPlanSelects[0].value}`;
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 2) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Transaction Type`;
        transactionPlanPartText.textContent = `${transactionPlanSelects[3].value}`;
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 3) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Lender`;
        transactionPlanPartText.textContent = `${transactionPlanSelects[6].value}`;
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 4) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Transaction Name`;
        transactionPlanPartText.textContent = `${smallShortTransactionPlanInputs[1].value}`;
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 5) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Location`;
        transactionPlanPartText.textContent = `${smallShortTransactionPlanInputs[0].value}`;
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 6) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Amount`;
        transactionPlanPartText.textContent = `${utility.money.format(Number(smallShortTransactionPlanInputs[2].value))}`;
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 7) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Due Date One`;
        transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[0].value);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 8) {
        // transactionPlanPartHeader.classList.add('transaction-plan__alt__part__header');
        // transactionPlanPartHeader.classList.add('r__transaction-plan__alt__part__header');
        // transactionPlanPartHeaderText.classList.add('transaction-plan__alt__part__header__text');
        // transactionPlanPartHeaderText.classList.add('r__transaction-plan__alt__part__header__text');
        // transactionPlanPartText.classList.add('transaction-plan__alt__part__text');
        // transactionPlanPartText.classList.add('r__transaction-plan__alt__part__text');

        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Timing`;
        transactionPlanPartText.textContent = `${transactionPlanSelects[5].value}`;

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Due Date Two`;
          transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[1].value);
        }
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 9) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Amount Saved`;
        transactionPlanPartText.textContent = utility.money.format(0);

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Timing`;
          transactionPlanPartText.textContent = `${transactionPlanSelects[5].value}`;
        }
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
      }
      if (number === 10) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = `Apply Money`;
          const transactionPlanInput = document.createElement('input');
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Apply`;
          transactionPlanInput.classList.add('form__input--transaction-plan');
          transactionPlanInput.classList.add('r__form__input--transaction-plan');
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
          transactionPlanInput.type = 'number';
          transactionPlanInput.min = 0;
          transactionPlanInput.placeholder = '$0.00';

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanInput);
          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Amount Saved`;
          transactionPlanPartText.textContent = utility.money.format(0);
          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
        }
      }
      if (number === 11) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = `Paid In Full?`;
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Paid`;
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Apply Money`;
          const transactionPlanInput = document.createElement('input');
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Apply`;
          transactionPlanInput.classList.add('form__input--transaction-plan');
          transactionPlanInput.classList.add('r__form__input--transaction-plan');
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
          transactionPlanInput.type = 'number';
          transactionPlanInput.min = 0;
          transactionPlanInput.placeholder = '$0.00';

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanInput);
          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
        }
      }
      if (number === 12) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = `Status`;
          transactionPlanPartText.textContent = `Unpaid`;

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Paid In Full?`;
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Paid`;
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
        }
      }
      if (number === 13) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
        Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          Utility.replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          Utility.replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Status`;
          transactionPlanPartText.textContent = `Unpaid`;

          Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
        }
      }
      number++;
    }
  }
  finalizeTransactionPlan(budget, placeholderBudget, user, transactionPlanSelects, smallShortTransactionPlanInputs, altMediumTransactionPlanInputs);
};

const createPlannedTransaction = (accountSelect, budget, placeholderBudget, user, creationContainer, utility) => {
  console.log(`Creating Plan...`);
  const transactionDisplay = document.querySelector('.transaction-plan-display');
  const transactionPlanSelects = document.querySelectorAll('.form__select--accounts');
  let numSections;
  let sectionStart = 0;
  if (accountSelect.value === `Expense Fund` || accountSelect.value === `Savings Fund` || accountSelect.value === `Surplus`) {
    const transactionPlan = document.createElement('section');
    numSections = 12;
    if (transactionPlanSelects[5].value === `Bi-Monthly` || transactionPlanSelects[5].value === `Bi-Annual`) numSections = 13;

    buildTransactionPlan(budget, placeholderBudget, user, sectionStart, numSections, transactionPlan, `original`, utility);
    numSections === 13 ? transactionPlan.classList.add('transaction-plan__double') : transactionPlan.classList.add('transaction-plan');
    numSections === 13 ? transactionPlan.classList.add('r__transaction-plan__double') : transactionPlan.classList.add('r__transaction-plan');
    displayTransaction(creationContainer, transactionPlan);
  }
  if (accountSelect.value === `Debt`) {
    const altTransactionPlan = document.createElement('section');
    numSections = 13;
    if (transactionPlanSelects[5].value === `Bi-Monthly` || transactionPlanSelects[5].value === `Bi-Annual`) numSections = 14;

    buildTransactionPlan(budget, placeholderBudget, user, sectionStart, numSections, altTransactionPlan, `alt`, utility);
    numSections === 14 ? altTransactionPlan.classList.add('transaction-plan__alt-double') : altTransactionPlan.classList.add('transaction-plan__alt');
    numSections === 14 ? altTransactionPlan.classList.add('r__transaction-plan__alt-double') : altTransactionPlan.classList.add('r__transaction-plan__alt');
    displayTransaction(creationContainer, altTransactionPlan);
  }
};

const checkSelectedTiming = () => {
  const transactionPlanSections = document.querySelectorAll('.form__section--transaction-plan');
  const formSelectSections = document.querySelectorAll('.form__section--select');

  if (formSelectSections[2].firstChild.nextSibling.nextSibling.value === `Bi-Monthly` || formSelectSections[2].firstChild.nextSibling.nextSibling.value === `Bi-Annual`) {
    transactionPlanSections[4].classList.remove('closed');
    transactionPlanSections[4].classList.add('open');
  }
  if (formSelectSections[2].firstChild.nextSibling.nextSibling.value !== `Bi-Monthly` && formSelectSections[2].firstChild.nextSibling.nextSibling.value !== `Bi-Annual`) {
    transactionPlanSections[4].classList.remove('open');
    transactionPlanSections[4].classList.add('closed');
  }
};

const showTransactionPlanOptions = (array, allOptions) => {
  const altMediumTransactionPlanInputs = document.querySelectorAll('.form__input--medium__alt');
  const transactionPlanSelects = document.querySelectorAll('.form__select--accounts');
  if (altMediumTransactionPlanInputs[1]) {
    if (altMediumTransactionPlanInputs[1].classList.contains('open')) {
      altMediumTransactionPlanInputs[1].classList.remove('open');
      altMediumTransactionPlanInputs[1].classList.add('closed');
    }
    transactionPlanSelects[5].value = transactionPlanSelects[5].firstChild.nextSibling.value;
    allOptions.forEach((optionArray, i) => {
      optionArray.forEach((arrayItem, i) => {
        arrayItem.classList.remove('open');
        arrayItem.classList.add('closed');
      });
    });
    array.forEach((arrayItem, i) => {
      if (i === 0) return;
      arrayItem.classList.remove('closed');
      arrayItem.classList.add('open');
      if (i === 1) {
        arrayItem.removeEventListener('click', checkSelectedTiming);
        arrayItem.addEventListener('click', checkSelectedTiming);
      }
    });
  }
};

const updateTransactionPlanningAccountDisplays = (budget, placeholderBudget, user, utility) => {
  console.log(`Updating...`);
  const appliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__applied-container__applied');
  const unAppliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__un-applied-container__un-applied');
  const accountTotals = document.querySelectorAll('.container--extra-small-evenly-spaced__content__account-total');

  let expenseAppliedTotal = 0;
  let savingsAppliedTotal = 0;
  let debtAppliedTotal = 0;
  let surplusAppliedTotal = 0;
  budget.transactions.plannedTransactions.forEach((transaction, i) => {
    if (transaction.account === `Expense Fund`) {
      expenseAppliedTotal += transaction.amountSaved;
    }
    if (transaction.account === `Savings Fund`) {
      savingsAppliedTotal += transaction.amountSaved;
    }
    if (transaction.account === `Debt`) {
      debtAppliedTotal += transaction.amountSaved;
    }
    if (transaction.account === `Surplus`) {
      surplusAppliedTotal += transaction.amountSaved;
    }
  });

  // ACCOUNT TOTALS
  accountTotals[0].textContent = utility.money.format(budget.accounts.expenseFund.amount);
  accountTotals[1].textContent = utility.money.format(budget.accounts.savingsFund.amount);
  accountTotals[2].textContent = utility.money.format(budget.accounts.debt.amount);
  accountTotals[3].textContent = utility.money.format(budget.accounts.surplus.amount);

  // APPLIED TOTALS
  appliedMoney[0].textContent = utility.money.format(expenseAppliedTotal);
  appliedMoney[1].textContent = utility.money.format(savingsAppliedTotal);
  appliedMoney[2].textContent = utility.money.format(debtAppliedTotal);
  appliedMoney[3].textContent = utility.money.format(surplusAppliedTotal);

  // UNAPPLIED TOTALS
  unAppliedMoney[0].textContent = utility.money.format(budget.accounts.expenseFund.amount - expenseAppliedTotal);
  unAppliedMoney[1].textContent = utility.money.format(budget.accounts.savingsFund.amount - savingsAppliedTotal);
  unAppliedMoney[2].textContent = utility.money.format(budget.accounts.debt.amount - debtAppliedTotal);
  unAppliedMoney[3].textContent = utility.money.format(budget.accounts.surplus.amount - surplusAppliedTotal);
};

const getTransactionPlanDate = (date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${new Date(date).getDate()} ${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
};

const displayExistingTransactionPlans = (budget, placeholderBudget, user, utility) => {
  const transactionPlanCreation = document.querySelector('.transaction-plan-creation');
  const transactionPlans = [];
  let numberOfSections;
  budget.transactions.plannedTransactions.forEach((transaction, i) => {
    transactionPlans.push(transaction);
    transactionPlans.sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  transactionPlans.forEach((transaction, i) => {
    let sectionStart = 0;
    if (transaction.account !== `Debt`) {
      // Decision if NOT Debt Transaction
      const transactionPlan = document.createElement('section');
      if (transaction.timingOptions.paymentCycle === `Bi-Monthly` || transaction.timingOptions.paymentCycle === `Bi-Annual`) {
        transactionPlan.classList.add('transaction-plan__double');
        transactionPlan.classList.add('r__transaction-plan__double');
        numberOfSections = 13;
        while (sectionStart < numberOfSections) {
          // Initialize Variables For First Part
          const transactionPlanPartHeader = document.createElement('header');
          const transactionPlanPartHeaderText = document.createElement('p');
          const transactionPlanPartText = document.createElement('p');

          // Add Classes For First Part
          transactionPlanPartHeader.classList.add('transaction-plan__double__part__header');
          transactionPlanPartHeader.classList.add('r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.classList.add('transaction-plan__double__part__header__text');
          transactionPlanPartHeaderText.classList.add('r__transaction-plan__double__part__header__text');
          transactionPlanPartText.classList.add('transaction-plan__double__part__text');
          transactionPlanPartText.classList.add('r__transaction-plan__double__part__text');

          // Add Content For First Part
          transactionPlanPartHeaderText.textContent = `Date`;
          transactionPlanPartText.textContent = getTransactionPlanDate(transaction.date);

          const transactionPlanPart = document.createElement('section');
          transactionPlanPart.classList.add(`transaction-plan__double__part`);
          transactionPlan.insertAdjacentElement('beforeend', transactionPlanPart);
          if (sectionStart === 0) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Account`;
            transactionPlanPartText.textContent = `${transaction.account}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Type`;
            transactionPlanPartText.textContent = `${transaction.subAccount}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Name`;
            transactionPlanPartText.textContent = `${transaction.name}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Location`;
            transactionPlanPartText.textContent = `${transaction.location}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount`;
            transactionPlanPartText.textContent = utility.money.format(transaction.amount);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date One`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[0])}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date Two`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[1])}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Timing`;
            transactionPlanPartText.textContent = `${transaction.timingOptions.paymentCycle}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 9) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount Saved`;
            transactionPlanPartText.textContent = utility.money.format(transaction.amountSaved);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 10) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Apply Money`;
            const transactionPlanInput = document.createElement('input');
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Apply`;
            transactionPlanInput.classList.add('form__input--transaction-plan');
            transactionPlanInput.classList.add('r__form__input--transaction-plan');
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
            transactionPlanInput.type = 'number';
            transactionPlanInput.min = 0;
            transactionPlanInput.placeholder = '$0.00';
            transactionPlanButton.addEventListener('click', (e) => {
              transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = utility.money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
              transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);

              let updateObject = {
                budgetId: budget._id,
                userId: user._id,
              };
              updateObject.transactions = {
                recentTransactions: budget.transactions.recentTransactions,
                plannedTransactions: transactionPlans,
              };
              placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
              updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user, utility);
            });
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanInput);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 11) {
            transactionPlanPartHeaderText.textContent = `Paid In Full?`;
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Paid`;
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 12) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Status`;
            transactionPlanPartText.textContent = `${transaction.paidStatus}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          sectionStart++;
        }
      }
      if (transaction.timingOptions.paymentCycle !== `Bi-Monthly` && transaction.timingOptions.paymentCycle !== `Bi-Annual`) {
        transactionPlan.classList.add('transaction-plan');
        transactionPlan.classList.add('r__transaction-plan');
        numberOfSections = 12;
        while (sectionStart < numberOfSections) {
          // Initialize Variables For First Part
          const transactionPlanPartHeader = document.createElement('header');
          const transactionPlanPartHeaderText = document.createElement('p');
          const transactionPlanPartText = document.createElement('p');

          // Add Classes For First Part
          transactionPlanPartHeader.classList.add('transaction-plan__part__header');
          transactionPlanPartHeader.classList.add('r__transaction-plan__part__header');
          transactionPlanPartHeaderText.classList.add('transaction-plan__part__header__text');
          transactionPlanPartHeaderText.classList.add('r__transaction-plan__part__header__text');
          transactionPlanPartText.classList.add('transaction-plan__part__text');
          transactionPlanPartText.classList.add('r__transaction-plan__part__text');

          // Add Content For First Part
          transactionPlanPartHeaderText.textContent = `Date`;
          transactionPlanPartText.textContent = getTransactionPlanDate(transaction.date);

          const transactionPlanPart = document.createElement('section');
          transactionPlanPart.classList.add(`transaction-plan__part`);
          transactionPlan.insertAdjacentElement('beforeend', transactionPlanPart);
          if (sectionStart === 0) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Account`;
            transactionPlanPartText.textContent = `${transaction.account}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Type`;
            transactionPlanPartText.textContent = `${transaction.subAccount}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Name`;
            transactionPlanPartText.textContent = `${transaction.name}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Location`;
            transactionPlanPartText.textContent = `${transaction.location}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount`;
            transactionPlanPartText.textContent = utility.money.format(transaction.amount);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date One`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[0])}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Timing`;
            transactionPlanPartText.textContent = `${transaction.timingOptions.paymentCycle}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount Saved`;
            transactionPlanPartText.textContent = utility.money.format(transaction.amountSaved);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 9) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Apply Money`;
            const transactionPlanInput = document.createElement('input');
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Apply`;
            transactionPlanInput.classList.add('form__input--transaction-plan');
            transactionPlanInput.classList.add('r__form__input--transaction-plan');
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
            transactionPlanInput.type = 'number';
            transactionPlanInput.min = 0;
            transactionPlanInput.placeholder = '$0.00';
            transactionPlanButton.addEventListener('click', (e) => {
              transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = utility.money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
              transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);
              let updateObject = {
                budgetId: budget._id,
                userId: user._id,
              };
              updateObject.transactions = {
                recentTransactions: budget.transactions.recentTransactions,
                plannedTransactions: transactionPlans,
              };
              placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
              updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user, utility);
            });
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanInput);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 10) {
            transactionPlanPartHeaderText.textContent = `Paid In Full?`;
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Paid`;
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 11) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Status`;
            transactionPlanPartText.textContent = `${transaction.paidStatus}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          sectionStart++;
        }
      }
      if (transactionPlanCreation) {
        transactionPlanCreation.insertAdjacentElement('beforebegin', transactionPlan);
      }
    }
    // Decision if IS Debt Transaction
    if (transaction.account === `Debt`) {
      const transactionPlan = document.createElement('section');
      if (transaction.timingOptions.paymentCycle === `Bi-Monthly` || transaction.timingOptions.paymentCycle === `Bi-Annual`) {
        transactionPlan.classList.add('transaction-plan__alt-double');
        transactionPlan.classList.add('r__transaction-plan__alt-double');
        numberOfSections = 14;
        while (sectionStart < numberOfSections) {
          // Initialize Variables For First Part
          const transactionPlanPartHeader = document.createElement('header');
          const transactionPlanPartHeaderText = document.createElement('p');
          const transactionPlanPartText = document.createElement('p');

          // Add Classes For First Part
          transactionPlanPartHeader.classList.add('transaction-plan__alt-double__part__header');
          transactionPlanPartHeader.classList.add('r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.classList.add('transaction-plan__alt-double__part__header__text');
          transactionPlanPartHeaderText.classList.add('r__transaction-plan__alt-double__part__header__text');
          transactionPlanPartText.classList.add('transaction-plan__alt-double__part__text');
          transactionPlanPartText.classList.add('r__transaction-plan__alt-double__part__text');

          // Add Content For First Part
          transactionPlanPartHeaderText.textContent = `Date`;
          transactionPlanPartText.textContent = getTransactionPlanDate(transaction.date);

          const transactionPlanPart = document.createElement('section');
          transactionPlanPart.classList.add(`transaction-plan__alt-double__part`);
          transactionPlan.insertAdjacentElement('beforeend', transactionPlanPart);
          if (sectionStart === 0) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Account`;
            transactionPlanPartText.textContent = `${transaction.account}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Type`;
            transactionPlanPartText.textContent = `${transaction.subAccount}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Lender`;
            transactionPlanPartText.textContent = `${transaction.lender}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Name`;
            transactionPlanPartText.textContent = `${transaction.name}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Location`;
            transactionPlanPartText.textContent = `${transaction.location}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount`;
            transactionPlanPartText.textContent = utility.money.format(transaction.amount);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date One`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[0])}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date Two`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[1])}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 9) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Timing`;
            transactionPlanPartText.textContent = `${transaction.timingOptions.paymentCycle}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 10) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount Saved`;
            transactionPlanPartText.textContent = utility.money.format(transaction.amountSaved);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 11) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Apply Money`;
            const transactionPlanInput = document.createElement('input');
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Apply`;
            transactionPlanInput.classList.add('form__input--transaction-plan');
            transactionPlanInput.classList.add('r__form__input--transaction-plan');
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
            transactionPlanInput.type = 'number';
            transactionPlanInput.min = 0;
            transactionPlanInput.placeholder = '$0.00';
            transactionPlanButton.addEventListener('click', (e) => {
              transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = utility.money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
              transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);

              let updateObject = {
                budgetId: budget._id,
                userId: user._id,
              };
              updateObject.transactions = {
                recentTransactions: budget.transactions.recentTransactions,
                plannedTransactions: transactionPlans,
              };
              placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
              updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user, utility);
            });
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanInput);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 12) {
            transactionPlanPartHeaderText.textContent = `Paid In Full?`;
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Paid`;
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 13) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Status`;
            transactionPlanPartText.textContent = `${transaction.paidStatus}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          sectionStart++;
        }
      }
      if (transaction.timingOptions.paymentCycle !== `Bi-Monthly` && transaction.timingOptions.paymentCycle !== `Bi-Annual`) {
        transactionPlan.classList.add('transaction-plan__alt');
        transactionPlan.classList.add('r__transaction-plan__alt');
        numberOfSections = 13;
        while (sectionStart < numberOfSections) {
          // Initialize Variables For First Part
          const transactionPlanPartHeader = document.createElement('header');
          const transactionPlanPartHeaderText = document.createElement('p');
          const transactionPlanPartText = document.createElement('p');

          // Add Classes For First Part
          transactionPlanPartHeader.classList.add('transaction-plan__alt__part__header');
          transactionPlanPartHeader.classList.add('r__transaction-plan__alt__part__header');
          transactionPlanPartHeaderText.classList.add('transaction-plan__alt__part__header__text');
          transactionPlanPartHeaderText.classList.add('r__transaction-plan__alt__part__header__text');
          transactionPlanPartText.classList.add('transaction-plan__alt__part__text');
          transactionPlanPartText.classList.add('r__transaction-plan__alt__part__text');

          // Add Content For First Part
          transactionPlanPartHeaderText.textContent = `Date`;
          transactionPlanPartText.textContent = getTransactionPlanDate(transaction.date);

          const transactionPlanPart = document.createElement('section');
          transactionPlanPart.classList.add(`transaction-plan__alt__part`);
          transactionPlan.insertAdjacentElement('beforeend', transactionPlanPart);
          if (sectionStart === 0) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Account`;
            transactionPlanPartText.textContent = `${transaction.account}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Type`;
            transactionPlanPartText.textContent = `${transaction.subAccount}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Lender`;
            transactionPlanPartText.textContent = `${transaction.lender}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Name`;
            transactionPlanPartText.textContent = `${transaction.name}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Location`;
            transactionPlanPartText.textContent = `${transaction.location}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount`;
            transactionPlanPartText.textContent = utility.money.format(transaction.amount);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date One`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[0])}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Timing`;
            transactionPlanPartText.textContent = `${transaction.timingOptions.paymentCycle}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 9) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount Saved`;
            transactionPlanPartText.textContent = utility.money.format(transaction.amountSaved);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 10) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Apply Money`;
            const transactionPlanInput = document.createElement('input');
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Apply`;
            transactionPlanInput.classList.add('form__input--transaction-plan');
            transactionPlanInput.classList.add('r__form__input--transaction-plan');
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');
            transactionPlanInput.type = 'number';
            transactionPlanInput.min = 0;
            transactionPlanInput.placeholder = '$0.00';
            transactionPlanButton.addEventListener('click', (e) => {
              transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = utility.money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
              transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);

              let updateObject = {
                budgetId: budget._id,
                userId: user._id,
              };
              updateObject.transactions = {
                recentTransactions: budget.transactions.recentTransactions,
                plannedTransactions: transactionPlans,
              };
              placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
              updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user, utility);
            });
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanInput);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 11) {
            transactionPlanPartHeaderText.textContent = `Paid In Full?`;
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Paid`;
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 12) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Status`;
            transactionPlanPartText.textContent = `${transaction.paidStatus}`;
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartHeader);
            Utility.insertElement(`beforeend`, transactionPlanPartHeader, transactionPlanPartHeaderText);
            Utility.insertElement(`beforeend`, transactionPlanPart, transactionPlanPartText);
          }
          sectionStart++;
        }
      }
      if (transactionPlanCreation) {
        transactionPlanCreation.insertAdjacentElement('beforebegin', transactionPlan);
      }
    }
  });
};

const setupTransactionPlanning = (budget, placeholderBudget, user, utility) => {
  const transactionPlanCreationContainer = document.querySelector('.transaction-plan-creation');
  const transactionRows = document.querySelectorAll('.form__row--transaction');

  const expenseTransactionOptionsArray = [];
  const savingsTransactionOptionsArray = [];
  const debtTransactionOptionsArray = [];
  const surplusTransactionOptionsArray = [];
  const commonTransactionOptionsArray = [expenseTransactionOptionsArray, savingsTransactionOptionsArray, debtTransactionOptionsArray, surplusTransactionOptionsArray];

  const accountOptions = document.querySelectorAll('.form__select__option');
  const transactionPlanAccountOptions = [accountOptions[0], accountOptions[1], accountOptions[2], accountOptions[3]];

  const transactionPlanSections = document.querySelectorAll('.form__section--transaction-plan');
  const accountSelectionContainers = document.querySelectorAll('.form__select--accounts');
  const formSelectSections = document.querySelectorAll('.form__section--select');

  displayExistingTransactionPlans(budget, placeholderBudget, user, utility);
  const submitPlanButton = document.querySelector('.button--extra-extra-small__transaction-plan');

  commonTransactionOptionsArray.forEach((array) => {
    Utility.pushIntoArray(
      [
        transactionPlanSections[4],
        formSelectSections[2],
        transactionPlanSections[0],
        transactionPlanSections[1],
        transactionPlanSections[2],
        transactionPlanSections[3],
        transactionPlanSections[6],
        formSelectSections[1],
        accountSelectionContainers[5],
      ],
      array
    );
  });

  Utility.pushIntoArray([accountSelectionContainers[1], transactionPlanSections[5]], expenseTransactionOptionsArray);
  Utility.pushIntoArray([accountSelectionContainers[2], transactionPlanSections[5]], savingsTransactionOptionsArray);
  Utility.pushIntoArray([accountSelectionContainers[3], formSelectSections[3], accountSelectionContainers[6]], debtTransactionOptionsArray);
  Utility.pushIntoArray([accountSelectionContainers[4]], surplusTransactionOptionsArray);

  transactionPlanAccountOptions.forEach((ao) => {
    if (ao) {
      ao.addEventListener('click', (e) => {
        if (ao.value === `Expense Fund`) {
          showTransactionPlanOptions(expenseTransactionOptionsArray, commonTransactionOptionsArray);
          if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
            transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
          }
        }
        if (ao.value === `Savings Fund`) {
          showTransactionPlanOptions(savingsTransactionOptionsArray, commonTransactionOptionsArray);
          if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
            transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
          }
        }
        if (ao.value === `Debt`) {
          showTransactionPlanOptions(debtTransactionOptionsArray, commonTransactionOptionsArray);
          if (transactionPlanCreationContainer) {
            if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
              transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
            }
          }
        }
        if (ao.value === `Surplus`) {
          showTransactionPlanOptions(surplusTransactionOptionsArray, commonTransactionOptionsArray);
          if (!transactionPlanCreationContainer.classList.contains('extend-transaction-plan')) {
            transactionPlanCreationContainer.classList.toggle('extend-transaction-plan');
          }
        }
      });
    }
  });

  let expenseAppliedTotal = 0;
  let savingsAppliedTotal = 0;
  let debtAppliedTotal = 0;
  let surplusAppliedTotal = 0;
  budget.transactions.plannedTransactions.forEach((transaction, i) => {
    if (transaction.account === `Expense Fund`) {
      expenseAppliedTotal += transaction.amountSaved;
    }
    if (transaction.account === `Savings Fund`) {
      savingsAppliedTotal += transaction.amountSaved;
    }
    if (transaction.account === `Debt`) {
      debtAppliedTotal += transaction.amountSaved;
    }
    if (transaction.account === `Surplus`) {
      surplusAppliedTotal += transaction.amountSaved;
    }
  });

  const smallShortTransactionPlanInputs = document.querySelectorAll('.form__input--small-short');
  if (smallShortTransactionPlanInputs[0]) {
    if (smallShortTransactionPlanInputs[2]) {
      const surplusSwitch = smallShortTransactionPlanInputs[2].closest('.form__section--transaction-plan').nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.nextSibling;
      const surplusSwitchIcon = surplusSwitch.firstChild.nextSibling.firstChild.nextSibling;
      if (surplusSwitch) {
        surplusSwitch.addEventListener('click', (e) => {
          e.preventDefault();
          surplusSwitch.classList.toggle('surplus-container__switch--switched');
          surplusSwitchIcon.classList.toggle('fa-times');
          surplusSwitchIcon.classList.toggle('fa-check');
        });
      }
      if (submitPlanButton) {
        submitPlanButton.addEventListener('click', (e) => {
          createPlannedTransaction(accountSelectionContainers[0], budget, placeholderBudget, user, transactionPlanCreationContainer, utility);
          surplusSwitch.classList.remove('surplus-container__switch--switched');
          surplusSwitchIcon.classList.add('fa-times');
          surplusSwitchIcon.classList.remove('fa-check');
          transactionPlanCreationContainer.classList.add('closed');
          transactionPlanCreationContainer.classList.remove('open');
        });
      }

      const appliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__applied-container__applied');
      const unAppliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__un-applied-container__un-applied');
      const accountTotals = document.querySelectorAll('.container--extra-small-evenly-spaced__content__account-total');

      // ACCOUNT TOTALS
      accountTotals[0].textContent = utility.money.format(budget.accounts.expenseFund.amount);
      accountTotals[1].textContent = utility.money.format(budget.accounts.savingsFund.amount);
      accountTotals[2].textContent = utility.money.format(budget.accounts.debt.amount);
      accountTotals[3].textContent = utility.money.format(budget.accounts.surplus.amount);

      // APPLIED TOTALS
      appliedMoney[0].textContent = utility.money.format(expenseAppliedTotal);
      appliedMoney[1].textContent = utility.money.format(savingsAppliedTotal);
      appliedMoney[2].textContent = utility.money.format(debtAppliedTotal);
      appliedMoney[3].textContent = utility.money.format(surplusAppliedTotal);

      // UNAPPLIED TOTALS
      unAppliedMoney[0].textContent = utility.money.format(budget.accounts.expenseFund.amount - expenseAppliedTotal);
      unAppliedMoney[1].textContent = utility.money.format(budget.accounts.savingsFund.amount - savingsAppliedTotal);
      unAppliedMoney[2].textContent = utility.money.format(budget.accounts.debt.amount - debtAppliedTotal);
      unAppliedMoney[3].textContent = utility.money.format(budget.accounts.surplus.amount - surplusAppliedTotal);

      // transaction-plan__part__text
    }
  }
};

const startPlanning = (budget, placeholderBudget, user) => {
  const transactionPlanCreationContainer = document.querySelector('.transaction-plan-creation');
  transactionPlanCreationContainer.classList.toggle('closed');
  transactionPlanCreationContainer.classList.toggle('open');
  const transactionPlanSelects = document.querySelectorAll('.form__select--accounts');
  transactionPlanSelects[5].value = transactionPlanSelects[5].firstChild.nextSibling.value;
};

export const _watchTransactionPlanner = (budget, placeholderBudget, user, utility) => {
  const borderlessButtons = document.querySelectorAll('.button--borderless');
  const startPlanningButton = borderlessButtons[2];

  const accountSelection = document.querySelectorAll('.form__select--accounts')[0];
  if (startPlanningButton) {
    startPlanningButton.addEventListener('click', (e) => {
      e.preventDefault();
      startPlanning(budget, placeholderBudget, user);
    });
  }

  setupTransactionPlanning(budget, placeholderBudget, user, utility);

  const altMediumInputs = document.querySelectorAll('.form__input--medium__alt');
  const currentDate = altMediumInputs[0];
  if (currentDate) currentDate.value = new Date();
};
