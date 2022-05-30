import * as Calendar from './FrontEnd-Calendar';
import * as Budgeting from './Manage-Budget';
import * as Budget from './Budget';
import * as Edit from './Budget-Creation';
import * as Categories from './Budget-Categories';
import * as Transaction from './Transaction';
import * as Person from './Person';

// Class of the 'days' on the Calendar.
// bill-calendar-container__calendar-container__calendar__days__single-day

export const reloadPage = () => {
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

const showElement = (element) => {
  element.classList.toggle('closed');
  element.classList.toggle('open');
};

const showRecentTransaction = (budget, placeholderBudget, user, transaction) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const receiptModal = document.querySelector('.modal--receipt');
  console.log(`Showing...`);
  console.log(transaction);
  const recentTransactionDisplay = document.querySelector('.recent-transaction-display');
  const recentTransaction = document.createElement('section');
  recentTransaction.classList.add('recent-transaction');
  recentTransaction.classList.add('r__recent-transaction');
  let numberOfSections = 6;
  let sectionStart = 0;
  while (sectionStart < numberOfSections) {
    let recentTransactionSection = document.createElement('section');
    recentTransactionSection.classList.add(`recent-transaction__section`);
    recentTransactionSection.classList.add(`r__recent-transaction__section`);
    if (sectionStart === 0) {
      let viewReceiptButton = document.createElement('button');
      viewReceiptButton.classList.add('button--extra-extra-small__view-receipt');
      viewReceiptButton.classList.add('r__button--extra-extra-small__view-receipt');
      let viewReceiptButtonIcon = document.createElement('i');
      viewReceiptButtonIcon.classList.add('fas');
      viewReceiptButtonIcon.classList.add('fa-receipt');
      viewReceiptButtonIcon.classList.add('button--extra-extra-small__view-receipt__icon');
      viewReceiptButtonIcon.classList.add('r__button--extra-extra-small__view-receipt__icon');
      let viewReceiptButtonText = document.createElement('p');
      viewReceiptButtonText.classList.add('button--extra-extra-small__view-receipt__text');
      viewReceiptButtonText.classList.add('r__button--extra-extra-small__view-receipt__text');
      viewReceiptButtonText.textContent = `View Full Transaction`;
      insertElement(viewReceiptButton, viewReceiptButtonIcon);
      insertElement(viewReceiptButton, viewReceiptButtonText);
      insertElement(recentTransactionSection, viewReceiptButton);
      viewReceiptButton.addEventListener('click', (e) => {
        console.log(viewReceiptButton);
        showElement(receiptModal);
      });
    }
    if (sectionStart === 1) {
      let transactionTypeText = document.createElement('p');
      transactionTypeText.classList.add('recent-transaction__section__text');
      transactionTypeText.classList.add('r__recent-transaction__section__text');
      transactionTypeText.textContent = `${transaction.transactionType}`;
      insertElement(recentTransactionSection, transactionTypeText);
    }
    if (sectionStart === 2) {
      let transactionTypeText = document.createElement('p');
      transactionTypeText.classList.add('recent-transaction__section__text');
      transactionTypeText.classList.add('r__recent-transaction__section__text');
      transactionTypeText.textContent = `${new Date(transaction.transactionDate).getDate()} ${months[new Date(transaction.transactionDate).getMonth()]} ${new Date(
        transaction.transactionDate
      ).getFullYear()}`;
      insertElement(recentTransactionSection, transactionTypeText);
    }
    insertElement(recentTransaction, recentTransactionSection);
    sectionStart++;
  }
  insertElement(recentTransactionDisplay, recentTransaction);
};

const _watchRecentTransactions = (budget, placeholderBudget, user) => {
  console.log(`Listing Transactions`);
  const receiptModal = document.querySelector('.modal--receipt');
  const receiptModalClosureIcon = document.querySelector('.modal--receipt__closure-icon');
  const viewReceiptButton = document.querySelector('.button--extra-extra-small__view-receipt');
  if (viewReceiptButton) {
    viewReceiptButton.addEventListener('click', (e) => {
      console.log(viewReceiptButton);
      showElement(receiptModal);
    });
    receiptModalClosureIcon.addEventListener('click', (e) => {
      showElement(receiptModal);
    });

    placeholderBudget.transactions.recentTransactions.forEach((transaction, i) => {
      showRecentTransaction(budget, placeholderBudget, user, transaction);
    });
  }
};

const payDebtOff = (budget, placeholderBudget, user, debt, paidSections, sectionStart) => {
  console.log(`Paying Off...`, debt);
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  sectionStart = 0;
  paidSections = 6;
  const debtDisplay = document.querySelectorAll('.debt-display--paid')[0];
  const upaidDebts = document.querySelectorAll('.debt');
  const paidDebts = document.querySelectorAll('.debt--paid');
  const paidDebt = document.createElement('section');
  paidDebt.classList.add('debt--paid');
  paidDebt.classList.add('r__debt--paid');
  paidDebt.dataset.debt = budget.debts.indexOf(debt);

  let updateObject = {
    budgetId: budget._id,
    userId: user._id,
    debts: budget.debts,
  };

  if (paidDebts.length === 0) {
    debtDisplay.insertAdjacentElement('afterbegin', paidDebt);
  }
  if (paidDebts.length > 0) {
    paidDebts[paidDebts.length - 1].insertAdjacentElement('afterend', paidDebt);
  }

  while (sectionStart < paidSections) {
    const debtSection = document.createElement('section');
    debtSection.classList.add('form__section--debt-paid');
    debtSection.classList.add('r__form__section--debt-paid');
    insertElement(paidDebt, debtSection);
    console.log(debtDisplay, sectionStart);
    if (sectionStart === 0) {
      const sectionHeader = document.createElement('p');
      sectionHeader.classList.add('debt--paid-title');
      sectionHeader.classList.add('r__debt--paid-title');
      sectionHeader.textContent = `Date`;

      const sectionContent = document.createElement('p');
      sectionContent.classList.add('debt--paid-text');
      sectionContent.classList.add('r__debt--paid-text');
      sectionContent.textContent = `${new Date(debt.date).getDate()} ${months[new Date(debt.date).getMonth()]} ${new Date(debt.date).getFullYear()}`;
      insertElement(debtSection, sectionHeader);
      insertElement(debtSection, sectionContent);
    }

    if (sectionStart === 1) {
      const sectionHeader = document.createElement('p');
      sectionHeader.classList.add('debt--paid-title');
      sectionHeader.classList.add('r__debt--paid-title');
      sectionHeader.textContent = `Lender`;

      const sectionContent = document.createElement('p');
      sectionContent.classList.add('debt--paid-text');
      sectionContent.classList.add('r__debt--paid-text');
      sectionContent.textContent = debt.lender;

      insertElement(debtSection, sectionHeader);
      insertElement(debtSection, sectionContent);
    }

    if (sectionStart === 2) {
      const sectionHeader = document.createElement('p');
      sectionHeader.classList.add('debt--paid-title');
      sectionHeader.classList.add('r__debt--paid-title');
      sectionHeader.textContent = `Type`;

      const sectionContent = document.createElement('p');
      sectionContent.classList.add('debt--paid-text');
      sectionContent.classList.add('r__debt--paid-text');
      sectionContent.textContent = debt.debtType;

      insertElement(debtSection, sectionHeader);
      insertElement(debtSection, sectionContent);
    }

    if (sectionStart === 3) {
      const sectionHeader = document.createElement('p');
      sectionHeader.classList.add('debt--paid-title');
      sectionHeader.classList.add('r__debt--paid-title');
      sectionHeader.textContent = `Initial Debt`;

      const sectionContent = document.createElement('p');
      sectionContent.classList.add('debt--paid-text');
      sectionContent.classList.add('r__debt--paid-text');
      sectionContent.textContent = money.format(Number(debt.initialDebt));

      insertElement(debtSection, sectionHeader);
      insertElement(debtSection, sectionContent);
    }

    if (sectionStart === 4) {
      const sectionHeader = document.createElement('p');
      sectionHeader.classList.add('debt--paid-title');
      sectionHeader.classList.add('r__debt--paid-title');
      sectionHeader.textContent = `Amount Owed`;

      const sectionContent = document.createElement('p');
      sectionContent.classList.add('debt--paid-text');
      sectionContent.classList.add('r__debt--paid-text');
      sectionContent.textContent = money.format(Number(debt.amountOwed));

      insertElement(debtSection, sectionHeader);
      insertElement(debtSection, sectionContent);
    }

    if (sectionStart === 5) {
      const sectionHeader = document.createElement('p');
      sectionHeader.classList.add('debt--paid-title');
      sectionHeader.classList.add('r__debt--paid-title');
      sectionHeader.textContent = `Status`;

      const sectionContent = document.createElement('p');
      sectionContent.classList.add('debt--paid-text');
      sectionContent.classList.add('r__debt--paid-text');
      sectionContent.textContent = `${debt.status}`;

      insertElement(debtSection, sectionHeader);
      insertElement(debtSection, sectionContent);
    }
    sectionStart++;
  }
  updateObject.debts[budget.debts.indexOf(debt)].status = `Paid Off`;
  updateObject.debts[budget.debts.indexOf(debt)].datePaid = new Date();
  let amountOfDebt = 0;
  budget.debts.forEach((debt) => {
    if (debt.status !== `Paid Off`) {
      amountOfDebt += debt.amountOwed;
    }
  });
  budget.accounts.debt.debtAmount = Number(amountOfDebt);
  updateObject.accounts = budget.accounts;
  placeholderBudget._updateBudget({ updateObject: updateObject }, `Debt-Manager`);
};

const _watchDebtManager = (budget, placeholderBudget, user) => {
  console.log(`Watching Your Debts...`);
  const debtDisplay = document.querySelectorAll('.debt-display--paid');
  console.log(debtDisplay);
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const addDebtButton = document.getElementById('addDebtButton');
  const debtLender = document.getElementById('debtLender');
  const debtAmount = document.getElementById('debtAmount');
  const debtTypes = document.querySelectorAll('.form__select--accounts')[0];
  const debts = document.querySelectorAll('.debt');
  let numberOfUnpaidSections, numberOfPaidSections, sectionStart;

  let updateObject = {
    budgetId: budget._id,
    userId: user._id,
    debts: budget.debts,
  };

  if (addDebtButton) {
    addDebtButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(debtLender.value, Number(debtAmount.value), debtTypes.value);
      const debtDisplay = document.querySelector('.debt-display');
      const debt = document.createElement('section');
      let debtObject = {};
      numberOfUnpaidSections = 7;
      numberOfPaidSections = 6;
      sectionStart = 0;
      debt.classList.add('debt');
      debt.classList.add('r__debt');
      debt.dataset.debt = budget.debts.length;
      if (debts.length === 0) {
        debtDisplay.insertAdjacentElement('afterbegin', debt);
      }
      if (debts.length > 0) {
        debts[debts.length - 1].insertAdjacentElement('afterend', debt);
      }
      while (sectionStart < numberOfUnpaidSections) {
        const debtSection = document.createElement('section');
        debtSection.classList.add('form__section--debt');
        debtSection.classList.add('r__form__section--debt');
        insertElement(debt, debtSection);

        if (sectionStart === 0) {
          const sectionHeader = document.createElement('p');
          sectionHeader.classList.add('debt-title');
          sectionHeader.classList.add('r__debt-title');
          sectionHeader.textContent = `Date`;

          const sectionContent = document.createElement('p');
          sectionContent.classList.add('debt-text');
          sectionContent.classList.add('r__debt-text');
          sectionContent.textContent = `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getFullYear()}`;
          debtObject.date = new Date();
          insertElement(debtSection, sectionHeader);
          insertElement(debtSection, sectionContent);
        }

        if (sectionStart === 1) {
          const sectionHeader = document.createElement('p');
          sectionHeader.classList.add('debt-title');
          sectionHeader.classList.add('r__debt-title');
          sectionHeader.textContent = `Lender`;

          const sectionContent = document.createElement('p');
          sectionContent.classList.add('debt-text');
          sectionContent.classList.add('r__debt-text');
          sectionContent.textContent = debtLender.value;
          debtObject.lender = debtLender.value;

          insertElement(debtSection, sectionHeader);
          insertElement(debtSection, sectionContent);
        }

        if (sectionStart === 2) {
          const sectionHeader = document.createElement('p');
          sectionHeader.classList.add('debt-title');
          sectionHeader.classList.add('r__debt-title');
          sectionHeader.textContent = `Type`;

          const sectionContent = document.createElement('p');
          sectionContent.classList.add('debt-text');
          sectionContent.classList.add('r__debt-text');
          sectionContent.textContent = debtTypes.value;
          debtObject.debtType = debtTypes.value;

          insertElement(debtSection, sectionHeader);
          insertElement(debtSection, sectionContent);
        }

        if (sectionStart === 3) {
          const sectionHeader = document.createElement('p');
          sectionHeader.classList.add('debt-title');
          sectionHeader.classList.add('r__debt-title');
          sectionHeader.textContent = `Initial Debt`;

          const sectionContent = document.createElement('p');
          sectionContent.classList.add('debt-text');
          sectionContent.classList.add('r__debt-text');
          sectionContent.textContent = money.format(Number(debtAmount.value));
          debtObject.initialDebt = Number(debtAmount.value);

          insertElement(debtSection, sectionHeader);
          insertElement(debtSection, sectionContent);
        }

        if (sectionStart === 4) {
          const sectionHeader = document.createElement('p');
          sectionHeader.classList.add('debt-title');
          sectionHeader.classList.add('r__debt-title');
          sectionHeader.textContent = `Amount Owed`;

          const sectionContent = document.createElement('p');
          sectionContent.classList.add('debt-text');
          sectionContent.classList.add('r__debt-text');
          sectionContent.textContent = money.format(Number(debtAmount.value));
          debtObject.amountOwed = debtObject.initialDebt;

          insertElement(debtSection, sectionHeader);
          insertElement(debtSection, sectionContent);
        }

        if (sectionStart === 5) {
          const sectionHeader = document.createElement('p');
          sectionHeader.classList.add('debt-title');
          sectionHeader.classList.add('r__debt-title');
          sectionHeader.textContent = `Status`;

          const sectionContent = document.createElement('p');
          sectionContent.classList.add('debt-text');
          sectionContent.classList.add('r__debt-text');
          sectionContent.textContent = `Unpaid`;
          debtObject.status = `Unpaid`;

          insertElement(debtSection, sectionHeader);
          insertElement(debtSection, sectionContent);
        }

        if (sectionStart === 6) {
          const paidOffButton = document.createElement('button');
          paidOffButton.classList.add('button--extra-extra-small__transaction-plan');
          paidOffButton.classList.add('r__button--extra-extra-small__transaction-plan');

          const paidOffButtonIcon = document.createElement('i');
          paidOffButtonIcon.classList.add('fas');
          paidOffButtonIcon.classList.add('fa-handshake');
          paidOffButtonIcon.classList.add('button--extra-extra-small__transaction-plan__icon');
          paidOffButtonIcon.classList.add('r__button--extra-extra-small__transaction-plan__icon');

          const paidOffButtonText = document.createElement('p');
          paidOffButtonText.classList.add('button--extra-extra-small__transaction-plan__text');
          paidOffButtonText.classList.add('r__button--extra-extra-small__transaction-plan__text');
          paidOffButtonText.textContent = `Paid Off`;

          insertElement(paidOffButton, paidOffButtonIcon);
          insertElement(paidOffButton, paidOffButtonText);
          insertElement(debtSection, paidOffButton);

          // paidOffButton.addEventListener('click', (e) => {
          //   e.preventDefault();
          //   payDebtOff(budget, placeholderBudget, user, debtObject, numberOfPaidSections, sectionStart);
          // });
        }
        sectionStart++;
      }
      updateObject.debts.push(debtObject);
      let amountOfDebt = 0;
      budget.debts.forEach((debt) => {
        if (debt.status !== `Paid Off`) {
          amountOfDebt += debt.amountOwed;
        }
      });
      budget.accounts.debt.debtAmount = Number(amountOfDebt);
      updateObject.accounts = budget.accounts;
      console.log(updateObject);
      placeholderBudget._updateBudget({ updateObject: updateObject }, `Debt-Manager`);
      reloadPage();
    });

    const debtPayOffButtons = document.querySelectorAll('.button--extra-extra-small__debt-transaction-plan');
    const debts = document.querySelectorAll('.debt');
    debtPayOffButtons.forEach((button, i) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        numberOfPaidSections = 6;
        sectionStart = 0;
        payDebtOff(budget, placeholderBudget, user, budget.debts[debts[i].dataset.debt], numberOfPaidSections, sectionStart);
        debts[i].remove();
      });
    });
    console.log(debtPayOffButtons);
  }
};

const settleInvestment = (investments, index, dataIndex, budget, placeholderBudget, user) => {
  console.log(investments, index);

  const investmentContainers = document.querySelectorAll('.investment-container');
  console.log(investmentContainers);

  const settledInvestmentShellContainer = document.createElement('section');
  settledInvestmentShellContainer.classList.add('container--extra-small__margin-left-and-right');
  settledInvestmentShellContainer.classList.add('r__container--extra-small__margin-left-and-right');

  insertElement(investmentContainers[1], settledInvestmentShellContainer);

  const settledInvestmentContainerHeader = document.createElement('section');
  settledInvestmentContainerHeader.classList.add('container--extra-small__margin-left-and-right__header');
  settledInvestmentContainerHeader.classList.add('r__container--extra-small__margin-left-and-right__header');

  insertElement(settledInvestmentShellContainer, settledInvestmentContainerHeader);

  const investmentTypeIcons = [`arrow-trend-up`, `sign-hanging`, `calendar-clock`, `asterisk`];
  const investmentHeaderIcon = document.createElement('i');
  investmentHeaderIcon.classList.add(`fas`);
  investmentHeaderIcon.classList.add('container--extra-small__margin-left-and-right__header__icon');
  investmentHeaderIcon.classList.add('r__container--extra-small__margin-left-and-right__header__icon');

  if (investments[index].firstChild.firstChild) {
    if (investments[index].firstChild.firstChild.classList.contains(`fa-chart-line`)) {
      investmentHeaderIcon.classList.add(`fa-chart-line`);
    }
    if (investments[index].firstChild.firstChild.classList.contains('fa-sign-hanging')) {
      investmentHeaderIcon.classList.add(`fa-sign-hanging`);
    }
    if (investments[index].firstChild.firstChild.classList.contains('fa-clock')) {
      investmentHeaderIcon.classList.add(`fa-clock`);
    }
    if (investments[index].firstChild.firstChild.classList.contains('fa-asterisk')) {
      investmentHeaderIcon.classList.add(`fa-asterisk`);
    }

    insertElement(settledInvestmentContainerHeader, investmentHeaderIcon);
    const investmentHeaderText = document.createElement('p');
    investmentHeaderText.classList.add('container--extra-small__margin-left-and-right__header__text');
    investmentHeaderText.classList.add('r__container--extra-small__margin-left-and-right__header__text');
    investmentHeaderText.textContent = investments[index].firstChild.firstChild.nextSibling.textContent;

    insertElement(settledInvestmentContainerHeader, investmentHeaderText);

    // CREATE INVESTMENT CONTENT
    const investmentContent = document.createElement('section');
    investmentContent.classList.add('container--extra-small__margin-left-and-right__content__column');
    investmentContent.classList.add('r__container--extra-small__margin-left-and-right__content__column');

    insertElement(settledInvestmentShellContainer, investmentContent);

    // CREATE INVESTMENT EXPLANATORY CONTENT
    const investmentExplanationSection = document.createElement('section');
    investmentExplanationSection.classList.add('investment-explanatory-information');
    investmentExplanationSection.classList.add('r__investment-explanatory-information');

    insertElement(investmentContent, investmentExplanationSection);

    const investmentDescription = document.createElement('section');
    investmentDescription.classList.add('investment-description');
    investmentDescription.classList.add('r__investment-description');

    insertElement(investmentExplanationSection, investmentDescription);

    const investmentDescriptionText = document.createElement('p');
    investmentDescriptionText.classList.add('investment-description__text');
    investmentDescriptionText.classList.add('r__investment-description__text');
    investmentDescriptionText.textContent = investments[index].firstChild.nextSibling.firstChild.firstChild.firstChild.textContent;

    const settledInvestmentValueContainer = document.createElement('section');
    settledInvestmentValueContainer.classList.add('investment-value-information--settled');
    settledInvestmentValueContainer.classList.add('r__investment-value-information--settled');

    insertElement(investmentContent, settledInvestmentValueContainer);

    const settledValueContainerText = document.createElement('p');
    settledValueContainerText.classList.add('investment-value-information--settled__text');
    settledValueContainerText.classList.add('r__investment-value-information--settled__text');
    console.log(investments[index].firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling, investments[index].firstChild.nextSibling.firstChild.nextSibling.firstChild);

    if (budget.investments[dataIndex].valueDifference < 0) {
      settledValueContainerText.textContent = `Lost ${Number(budget.investments[dataIndex].initialInvestment - budget.investments[dataIndex].currentValue)}`;
      settledInvestmentShellContainer.classList.add('negative-investment');
    }
    if (budget.investments[dataIndex].valueDifference === 0) {
      settledValueContainerText.textContent = `Broke Even`;
      settledInvestmentShellContainer.classList.add('neutral-investment');
    }
    if (budget.investments[dataIndex].valueDifference > 0) {
      settledValueContainerText.textContent = `Gained ${Number(budget.investments[dataIndex].currentValue - budget.investments[dataIndex].initialInvestment)}`;
      settledInvestmentShellContainer.classList.add('positive-investment');
    }

    const investmentInitialValue = Number(investments[index].firstChild.nextSibling.firstChild.nextSibling.firstChild.firstChild.nextSibling.textContent.split('$')[1]);
    console.log(investmentInitialValue);

    insertElement(settledInvestmentValueContainer, settledValueContainerText);
  }

  if (!investments[index].firstChild.firstChild) {
    console.log(investments[index].firstChild.nextSibling.firstChild);
    if (investments[index].firstChild.nextSibling.firstChild.classList.contains(`fa-chart-line`)) {
      investmentHeaderIcon.classList.add(`fa-chart-line`);
    }
    if (investments[index].firstChild.nextSibling.firstChild.classList.contains('fa-sign-hanging')) {
      investmentHeaderIcon.classList.add(`fa-sign-hanging`);
    }
    if (investments[index].firstChild.nextSibling.firstChild.classList.contains('fa-clock')) {
      investmentHeaderIcon.classList.add(`fa-clock`);
    }
    if (investments[index].firstChild.nextSibling.firstChild.classList.contains('fa-asterisk')) {
      investmentHeaderIcon.classList.add(`fa-asterisk`);
    }

    insertElement(settledInvestmentContainerHeader, investmentHeaderIcon);
    const investmentHeaderText = document.createElement('p');
    investmentHeaderText.classList.add('container--extra-small__margin-left-and-right__header__text');
    investmentHeaderText.classList.add('r__container--extra-small__margin-left-and-right__header__text');
    investmentHeaderText.textContent = investments[index].firstChild.nextSibling.firstChild.nextSibling.textContent;

    insertElement(settledInvestmentContainerHeader, investmentHeaderText);

    // CREATE INVESTMENT CONTENT
    const investmentContent = document.createElement('section');
    investmentContent.classList.add('container--extra-small__margin-left-and-right__content__column');
    investmentContent.classList.add('r__container--extra-small__margin-left-and-right__content__column');

    insertElement(settledInvestmentShellContainer, investmentContent);

    // CREATE INVESTMENT EXPLANATORY CONTENT
    const investmentExplanationSection = document.createElement('section');
    investmentExplanationSection.classList.add('investment-explanatory-information');
    investmentExplanationSection.classList.add('r__investment-explanatory-information');

    insertElement(investmentContent, investmentExplanationSection);

    const investmentDescription = document.createElement('section');
    investmentDescription.classList.add('investment-description');
    investmentDescription.classList.add('r__investment-description');

    insertElement(investmentExplanationSection, investmentDescription);

    const investmentDescriptionText = document.createElement('p');
    investmentDescriptionText.classList.add('investment-description__text');
    investmentDescriptionText.classList.add('r__investment-description__text');
    console.log(investments[index].firstChild.nextSibling.nextSibling.firstChild.firstChild.textContent);
    investmentDescriptionText.textContent = investments[index].firstChild.nextSibling.nextSibling.firstChild.firstChild.textContent;

    insertElement(investmentDescription, investmentDescriptionText);

    const settledInvestmentValueContainer = document.createElement('section');
    settledInvestmentValueContainer.classList.add('investment-value-information--settled');
    settledInvestmentValueContainer.classList.add('r__investment-value-information--settled');

    insertElement(investmentContent, settledInvestmentValueContainer);

    const settledValueContainerText = document.createElement('p');
    settledValueContainerText.classList.add('investment-value-information--settled__text');
    settledValueContainerText.classList.add('r__investment-value-information--settled__text');
    console.log(investments[index].firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling, investments[index].firstChild.nextSibling.firstChild.nextSibling.firstChild);

    if (budget.investments[index - 1].valueDifference < 0) {
      settledValueContainerText.textContent = `Lost ${Number(budget.investments[index - 1].initialInvestment - budget.investments[index - 1].currentValue)}`;
      settledInvestmentShellContainer.classList.add('negative-investment');
    }
    if (budget.investments[index - 1].valueDifference === 0) {
      settledValueContainerText.textContent = `Broke Even`;
      settledInvestmentShellContainer.classList.add('neutral-investment');
    }
    if (budget.investments[index - 1].valueDifference > 0) {
      settledValueContainerText.textContent = `Gained ${Number(budget.investments[index - 1].currentValue - budget.investments[index - 1].initialInvestment)}`;
      settledInvestmentShellContainer.classList.add('positive-investment');
    }

    const investmentInitialValue = Number(investments[index].firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.firstChild.nextSibling.textContent.split('$')[1]);
    console.log(investmentInitialValue);

    insertElement(settledInvestmentValueContainer, settledValueContainerText);
  }

  console.log(index, index - 1);

  budget.investments[dataIndex].settled = !budget.investments[dataIndex].settled;
  console.log(budget.investments[index].settled);
  placeholderBudget._updateBudget({ updateObject: { budgetId: budget._id, userId: user._id, investments: budget.investments } }, `Investment-Planner`);
  investments[index].remove();
  window.location.reload();
};

const watchInvestmentValueConfirmationButtons = (event, index, secondaryIndex, budget, placeholderBudget, user) => {
  // const e = event;
  // e.preventDefault();
  const confirmInvestmentValueButtons = document.querySelectorAll('.button--confirm-value');
  // const clicked = e.target.closest('.button--confirm-value');
  // let index = [...confirmInvestmentValueButtons].indexOf(clicked);
  console.log(index);
  let investments = budget.investments;
  console.log(investments[index]);
  confirmInvestmentValueButtons[index].removeEventListener('click', watchInvestmentValueConfirmationButtons);
  const updateCurrentValueInput = document.querySelectorAll('.form__input--investment');
  console.log(Number(updateCurrentValueInput[index].value));
  investments[secondaryIndex].currentValue = Number(updateCurrentValueInput[index].value);
  investments[secondaryIndex].valueDifference = Number(investments[secondaryIndex].currentValue - investments[secondaryIndex].initialInvestment);
  updateCurrentValueInput[index].setAttribute(`readonly`, true);
  console.log(investments[secondaryIndex]);
  placeholderBudget._updateBudget({ updateObject: { budgetId: budget._id, userId: user._id, investments: investments } }, `Investment-Planner`);
};

const _watchForCurrentValueUpdate = (event, index, secondaryIndex, budget, placeholderBudget, user) => {
  const updateCurrentValueInput = document.querySelectorAll('.form__input--investment');
  console.log(index);
  if (updateCurrentValueInput[index].readOnly === true) {
    updateCurrentValueInput[index].removeAttribute(`readonly`);
    console.log(updateCurrentValueInput[index].readOnly);
    const confirmInvestmentValueButtons = document.querySelectorAll('.button--confirm-value');
    console.log(confirmInvestmentValueButtons[index]);
    return confirmInvestmentValueButtons[index].addEventListener('click', watchInvestmentValueConfirmationButtons.bind(null, event, index, secondaryIndex, budget, placeholderBudget, user));
  }
  console.log(updateCurrentValueInput[index].readOnly);
  if (updateCurrentValueInput[index].readOnly === '' || updateCurrentValueInput[index].readOnly === false) {
    return updateCurrentValueInput[index].setAttribute(`readonly`, true);
  }
  console.log(`I want to update.`);
  console.log(index);
};

const closeInvestmentCreation = (event) => {
  const closeInvestmentCreationButton = document.querySelector('.button--borderless-narrow__investment');
  const addInvestmentButton = document.querySelector('.container--extra-small__margin-left-and-right__content-icon');
  const addInvestmentForm = document.querySelector('.form--extra-small__column');
  closeInvestmentCreationButton.removeEventListener(`click`, closeInvestmentCreation);
  replaceClassName(closeInvestmentCreationButton, `open`, `closed`);
  replaceClassName(addInvestmentForm, `open`, `closed`);
  replaceClassName(addInvestmentButton, `closed`, `open`);
};

const renderNewInvestment = (options) => {
  console.log(options);
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  const investmentContainers = document.querySelectorAll('.container--extra-small__margin-left-and-right');
  const investmentAccountPreview = investmentContainers[0];
  console.log(investmentContainers);
  const investmentShellContainer = document.createElement('section');
  investmentShellContainer.classList.add('container--extra-small__margin-left-and-right');
  investmentShellContainer.classList.add('r__container--extra-small__margin-left-and-right');

  investmentShellContainer.dataset.investment = options.budget.investments.length;
  console.log(investmentShellContainer.dataset.investment);

  investmentAccountPreview.insertAdjacentElement('afterend', investmentShellContainer);
  const investmentHeader = document.createElement('section');
  investmentHeader.classList.add('container--extra-small__margin-left-and-right__header');
  investmentHeader.classList.add('r__container--extra-small__margin-left-and-right__header');
  insertElement(investmentShellContainer, investmentHeader);
  // Set Appropriate Icons For Investment Type
  // In order: Stock, Real Estate, Timeshare, Other
  const investmentTypeIcons = [`arrow-trend-up`, `sign-hanging`, `calendar-clock`, `asterisk`];
  const investmentHeaderIcon = document.createElement('i');
  investmentHeaderIcon.classList.add(`fas`);
  investmentHeaderIcon.classList.add('container--extra-small__margin-left-and-right__header__icon');
  investmentHeaderIcon.classList.add('r__container--extra-small__margin-left-and-right__header__icon');
  if (options.type === `Stock`) {
    investmentHeaderIcon.classList.add(`fa-chart-line`);
  }
  if (options.type === `Real Estate`) {
    investmentHeaderIcon.classList.add(`fa-sign-hanging`);
  }
  if (options.type === `Timeshare`) {
    investmentHeaderIcon.classList.add(`fa-clock`);
  }
  if (options.type === `Other`) {
    investmentHeaderIcon.classList.add(`fa-asterisk`);
  }

  insertElement(investmentHeader, investmentHeaderIcon);
  const investmentHeaderText = document.createElement('p');
  investmentHeaderText.classList.add('container--extra-small__margin-left-and-right__header__text');
  investmentHeaderText.classList.add('r__container--extra-small__margin-left-and-right__header__text');
  investmentHeaderText.textContent = options.name;

  insertElement(investmentHeader, investmentHeaderText);

  const investmentHeaderType = document.createElement('p');
  investmentHeaderType.classList.add('container--extra-small__margin-left-and-right__header__investment-type');
  investmentHeaderType.classList.add('r__container--extra-small__margin-left-and-right__header__investment-type');
  investmentHeaderType.textContent = options.type;

  insertElement(investmentHeader, investmentHeaderType);

  // CREATE INVESTMENT CONTENT
  const investmentContent = document.createElement('section');
  investmentContent.classList.add('container--extra-small__margin-left-and-right__content__column');
  investmentContent.classList.add('r__container--extra-small__margin-left-and-right__content__column');

  insertElement(investmentShellContainer, investmentContent);

  // CREATE INVESTMENT EXPLANATORY CONTENT
  const investmentExplanationSection = document.createElement('section');
  investmentExplanationSection.classList.add('investment-explanatory-information');
  investmentExplanationSection.classList.add('r__investment-explanatory-information');

  insertElement(investmentContent, investmentExplanationSection);

  const investmentDescription = document.createElement('section');
  investmentDescription.classList.add('investment-description');
  investmentDescription.classList.add('r__investment-description');

  insertElement(investmentExplanationSection, investmentDescription);

  const investmentDescriptionText = document.createElement('p');
  investmentDescriptionText.classList.add('investment-description__text');
  investmentDescriptionText.classList.add('r__investment-description__text');
  investmentDescriptionText.textContent = options.description;

  insertElement(investmentDescription, investmentDescriptionText);

  const investmentSettleContainer = document.createElement('section');
  investmentSettleContainer.classList.add('investment-settle-container');
  investmentSettleContainer.classList.add('r__investment-settle-container');

  insertElement(investmentExplanationSection, investmentSettleContainer);

  const investmentSettleButton = document.createElement('button');
  investmentSettleButton.classList.add('button--settle');
  investmentSettleButton.classList.add('r__button--settle');

  insertElement(investmentSettleContainer, investmentSettleButton);

  const investmentSettleButtonText = document.createElement('p');
  investmentSettleButtonText.classList.add('button--settle__text');
  investmentSettleButtonText.classList.add('r__button--settle__text');
  investmentSettleButtonText.textContent = `Settle`;
  investmentSettleButton.addEventListener('click', (e) => {
    e.preventDefault();
    const clicked = e.target;
    const investmentShellContainers = document.querySelectorAll('.container--extra-small__margin-left-and-right');
    const currentInvestmentIndex = [...investmentShellContainers].indexOf(clicked.closest('.container--extra-small__margin-left-and-right'));
    settleInvestment(
      investmentShellContainers,
      currentInvestmentIndex,
      Number(investmentShellContainers[currentInvestmentIndex].dataset.investment),
      options.budget,
      options.placeholderBudget,
      options.user
    );
  });

  insertElement(investmentSettleButton, investmentSettleButtonText);

  const investmentValueInformationContainer = document.createElement('section');
  investmentValueInformationContainer.classList.add('investment-value-information');
  investmentValueInformationContainer.classList.add('r__investment-value-information');

  insertElement(investmentContent, investmentValueInformationContainer);

  const investmentValueInformationContainerHalfOne = document.createElement('section');
  const investmentValueInformationContainerHalfTwo = document.createElement('section');

  investmentValueInformationContainerHalfOne.classList.add('investment-value-information__half');
  investmentValueInformationContainerHalfOne.classList.add('r__investment-value-information__half');

  investmentValueInformationContainerHalfTwo.classList.add('investment-value-information__half');
  investmentValueInformationContainerHalfTwo.classList.add('r__investment-value-information__half');

  insertElement(investmentValueInformationContainer, investmentValueInformationContainerHalfOne);
  insertElement(investmentValueInformationContainer, investmentValueInformationContainerHalfTwo);

  const investmentValueInformationContainerHalfOneHeader = document.createElement('p');
  const investmentValueInformationContainerHalfTwoHeader = document.createElement('p');

  investmentValueInformationContainerHalfOneHeader.classList.add('investment-value-information__half__header');
  investmentValueInformationContainerHalfTwoHeader.classList.add('investment-value-information__half__header');
  investmentValueInformationContainerHalfOneHeader.classList.add('r__investment-value-information__half__header');
  investmentValueInformationContainerHalfTwoHeader.classList.add('r__investment-value-information__half__header');

  investmentValueInformationContainerHalfOneHeader.textContent = `Initial Investment`;
  investmentValueInformationContainerHalfTwoHeader.textContent = `Current Value`;

  insertElement(investmentValueInformationContainerHalfOne, investmentValueInformationContainerHalfOneHeader);
  insertElement(investmentValueInformationContainerHalfTwo, investmentValueInformationContainerHalfTwoHeader);

  const investmentValueInformationContainerHalfOneText = document.createElement('p');
  investmentValueInformationContainerHalfOneText.classList.add('investment-value-information__half__text');
  investmentValueInformationContainerHalfOneText.classList.add('r__investment-value-information__half__text');
  investmentValueInformationContainerHalfOneText.textContent = money.format(options.initialInvestment);

  insertElement(investmentValueInformationContainerHalfOne, investmentValueInformationContainerHalfOneText);

  const investmentInputContainer = document.createElement('section');
  investmentInputContainer.classList.add('investment-input-container');
  investmentInputContainer.classList.add('r__investment-input-container');

  insertElement(investmentValueInformationContainerHalfTwo, investmentInputContainer);

  const investmentInput = document.createElement('input');
  investmentInput.classList.add('form__input--investment');
  investmentInput.classList.add('r__form__input--investment');
  investmentInput.type = `number`;
  investmentInput.placeholder = `Enter New Value`;
  investmentInput.readOnly = true;

  insertElement(investmentInputContainer, investmentInput);

  const investmentValueConfirmationButton = document.createElement('button');
  investmentValueConfirmationButton.classList.add('button--confirm-value');
  investmentValueConfirmationButton.classList.add('r__button--confirm-value');

  const investmentValueConfirmationButtonIcon = document.createElement('i');
  investmentValueConfirmationButtonIcon.classList.add('fas');
  investmentValueConfirmationButtonIcon.classList.add('fa-check');
  investmentValueConfirmationButtonIcon.classList.add('button--confirm-value__icon');
  investmentValueConfirmationButtonIcon.classList.add('r__button--confirm-value__icon');

  insertElement(investmentValueConfirmationButton, investmentValueConfirmationButtonIcon);
  insertElement(investmentInputContainer, investmentValueConfirmationButton);

  const investmentUpdateValueTextLink = document.createElement('p');
  investmentUpdateValueTextLink.classList.add('investment-value-information__half__update-text');
  investmentUpdateValueTextLink.classList.add('r__investment-value-information__half__update-text');
  investmentUpdateValueTextLink.textContent = `Update Value`;

  insertElement(investmentValueInformationContainerHalfTwo, investmentUpdateValueTextLink);

  // window.location.reload();

  // GLITCH: RIGHT NOW, WHAT HAPPENS IS THAT UNLESS THE USER REFRESHES THE BROWSER, THEY CANNOT UPDATE THE NEWEST OR NEWLY CREATED INVESTMENTS.
  // Right now, I am forcing the reload of the page to solve the issue for now.  However, I would like to not have to do that.

  // if (openUpdateCurrentValueButtons[0]) {
  //   openUpdateCurrentValueButtons.forEach((button, i) => {
  //     if (i === openUpdateCurrentValueButtons.length - 1) {
  //       let index = i;
  //       let boundListener = _watchForCurrentValueUpdate.bind(null, event, index, options.budget, options.placeholderBudget, options.user);
  //       button.removeEventListener('click', boundListener);
  //       const openUpdateCurrentValueButtons = document.querySelectorAll('.investment-value-information__half__update-text');
  //     }
  //   });
  //   openUpdateCurrentValueButtons.forEach((button, i) => {
  //     let index = i;
  //     if (i === openUpdateCurrentValueButtons.length - 1) {
  //       let boundListener = _watchForCurrentValueUpdate.bind(null, event, index, options.budget, options.placeholderBudget, options.user);
  //       console.log(button, openUpdateCurrentValueButtons);
  //       button.addEventListener('click', boundListener);
  //     }
  //   });
  // }
};

const _watchInvestmentPlanner = (budget, placeholderBudget, user) => {
  // const longFormSections = document.querySelectorAll('.form__section--long');
  // if (longFormSections[0] && longFormSections[0].classList.contains('closed')) {
  //   console.log(longFormSections[0]);
  // replaceClassName(longFormSections[0], `closed`, `open`);

  const addInvestmentButton = document.querySelector('.container--extra-small__margin-left-and-right__content-icon');
  const closeInvestmentCreationButton = document.querySelector('.button--borderless-narrow__investment');
  const addInvestmentForm = document.querySelector('.form--extra-small__column');
  if (addInvestmentButton) {
    addInvestmentButton.addEventListener('click', (e) => {
      closeInvestmentCreationButton.classList.toggle('open');
      closeInvestmentCreationButton.classList.toggle('closed');
      replaceClassName(addInvestmentForm, `closed`, `open`);
      replaceClassName(addInvestmentButton, `open`, `closed`);
      closeInvestmentCreationButton.addEventListener('click', closeInvestmentCreation);
    });
    const investmentType = document.querySelector('.form__select--accounts-short');
    const investmentName = document.getElementById('investmentName');
    const investmentDescription = document.getElementById('investmentDescription');
    const initialInvestment = document.getElementById('initialInvestment');
    const createInvestmentButton = document.querySelector('.button--extra-extra-small__alt');
    createInvestmentButton.addEventListener('click', (e) => {
      e.preventDefault();
      renderNewInvestment({
        type: investmentType.value,
        name: investmentName.value,
        description: investmentDescription.value,
        initialInvestment: Number(initialInvestment.value),
        budget: budget,
        placeholderBudget: placeholderBudget,
        user: user,
      });
      let updateObject = {
        investments: [],
      };
      let currentValue = initialInvestment.value;
      let valueDifference = Number(currentValue - initialInvestment.value);
      if (isNaN(valueDifference)) valueDifference = 0;

      console.log(placeholderBudget.investments);
      placeholderBudget.investments.push({
        investmentType: investmentType.value,
        investmentName: investmentName.value,
        investmentDescription: investmentDescription.value,
        initialInvestment: Number(initialInvestment.value),
        currentValue: Number(currentValue),
        valueDifference: valueDifference,
      });
      console.log(placeholderBudget.investments);

      placeholderBudget._updateBudget(
        {
          updateObject: {
            budgetId: budget._id,
            userId: user._id,
            investments: placeholderBudget.investments,
          },
        },
        `Investment-Planner`
      );
    });
  }

  const investmentContainers = document.querySelectorAll('.container--extra-small__margin-left-and-right');
  const investmentValueInformationContainers = document.querySelectorAll('.investment-value-information');
  const investmentSettleButtons = document.querySelectorAll('.button--settle');
  investmentSettleButtons.forEach((button, i) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      let clicked = e.target;
      const currentInvestmentIndex = [...investmentContainers].indexOf(clicked.closest('.container--extra-small__margin-left-and-right'));
      console.log(currentInvestmentIndex, investmentContainers[currentInvestmentIndex].dataset.investment);
      settleInvestment(investmentContainers, currentInvestmentIndex, Number(investmentContainers[currentInvestmentIndex].dataset.investment), budget, placeholderBudget, user);
    });
  });
  console.log(investmentValueInformationContainers, investmentContainers);

  const openUpdateCurrentValueButtons = document.querySelectorAll('.investment-value-information__half__update-text');
  if (openUpdateCurrentValueButtons[0]) {
    openUpdateCurrentValueButtons.forEach((button, i) => {
      let index = Number(openUpdateCurrentValueButtons[i].closest('.container--extra-small__margin-left-and-right').dataset.investment);
      let boundListener = _watchForCurrentValueUpdate.bind(null, event, i, index, budget, placeholderBudget, user);
      // button.removeEventListener(`click`, boundListener);
      button.addEventListener('click', boundListener);
      // addEventListener('click', myPrettyHandler.bind(null, event, arg1, ... ));
    });
  }
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

const watchForBudgetDeletion = () => {
  const budgetDeleteButton = document.querySelectorAll(`.button--extra-extra-small__wide`)[1];
  const budgetId = window.location.pathname.split('/')[5];
  const userId = window.location.pathname.split('/')[3];
  budgetDeleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    Budgeting.deleteMyBudget(budgetId, userId);
  });
};

const watchForBudgetExit = () => {
  const submitButtons = document.querySelectorAll(`.button--extra-extra-small__wide`);
  const exitButton = document.querySelectorAll(`.button--extra-extra-small__wide`)[0];
  const userId = window.location.pathname.split('/')[3];
  exitButton.addEventListener('click', (e) => {
    e.preventDefault();
    Budgeting.exitBudget(userId);
  });
};

const setMainCategoryTitle = (mainCategory, title) => {
  return (mainCategory.title = title);
};

export const fillSubCategoryArray = (updateObject, index) => {
  let mainCategoryIndex = index;
  let tempArray = Array.from(document.querySelectorAll(`.sub-category-display__sub-category[data-subcategory="${index}"]`));
  tempArray.forEach((temp, i) => {
    let title = temp.firstChild.nextSibling.firstChild.textContent;
    let goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
    let amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
    let amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
    let percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
    updateObject.mainCategories[index].subCategories.push(
      Object.fromEntries([
        [`title`, title],
        [`goalAmount`, goalAmount],
        [`amountSpent`, amountSpent],
        [`amountRemaining`, amountRemaining],
        [`percentageSpent`, percentageSpent],
      ])
    );
    if (updateObject.mainCategories[mainCategoryIndex] === undefined) return;
    if (updateObject.mainCategories[mainCategoryIndex].subCategories.length === tempArray.length) {
      mainCategoryIndex++;
      updateObject.mainCategories[mainCategoryIndex].subCategories = [];
      return mainCategoryIndex;
    }
    if (index === tempArray.length) {
      mainCategoryIndex++;
    }
  });
};

const buildUpdateObject = (budget, user, customObject, budgetName, customProperties, objects) => {
  let budgetUpdateObject = {
    budgetId: budget._id,
    userId: user._id,
  };

  if (customObject === `Accounts`) {
    budgetUpdateObject.name = budgetName;
    budgetUpdateObject.accounts = {};
    customProperties.forEach((c, i) => {
      budgetUpdateObject.accounts[c] = objects[i];
    });
  }

  if (customObject === `Main Categories`) {
    // budget.mainCategories would be the Custom Properties
    const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
    const mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
    const mainCategoryObject = {};
    const subCategoryObject = {};
    let emptyArray = [];
    budgetUpdateObject.mainCategories = [];
    let mainCategoryIndex = 0;
    let subCategoryIndex = 0;
    let entries = [];
    const subCategoriesSplitArray = [];
    let subCategorySubArray = [];

    // EVERYTHING DONE IN THIS 'FOREACH' IS DONE 3 TIMES!!!
    customProperties.forEach((cp, i) => {
      budgetUpdateObject.mainCategories.push(
        Object.fromEntries([
          [`title`, mainCategoryTitles[i].textContent],
          [`subCategories`, emptyArray],
        ])
      );
      if (budgetUpdateObject.mainCategories.length === customProperties.length) {
        return (mainCategoryIndex = 0);
      }
    });
    budgetUpdateObject.mainCategories.forEach((mc, i) => {
      fillSubCategoryArray(budgetUpdateObject, i);
    });
  }

  return budgetUpdateObject;
};

const getSubCategoryTiming = (budget, category) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let wording;
  if (category.timingOptions.paymentCycle === `Weekly`) {
    let day = days[new Date(`${category.timingOptions.dueDates[0]}`).getDay()];
    wording = `Due every ${day} of the month.`;
    return wording;
  }
  if (category.timingOptions.paymentCycle === `Bi-Weekly`) {
    let date = new Date(`${category.timingOptions.dueDates[0]}`);
    let day = date.getDate();
    let endDigit = Number(date.getDate().toString().split('')[date.getDate().toString().length - 1]);
    let dayEnding;
    dayEnding = Edit.calculateDayEnding(endDigit, dayEnding, date);
    wording = `Due ${days[date.getDay()]}, the ${day}${dayEnding} of ${months[date.getMonth()]}.`;
    return wording;
  }
  if (category.timingOptions.paymentCycle === `Bi-Monthly`) {
    let dayOne, dayTwo, dayEnding, dayEndingTwo;
    category.timingOptions.dueDates[0].forEach((dd, i) => {
      if (i === 0) {
        dayOne = new Date(`${dd}`);
      }
      if (i === 1) {
        dayTwo = new Date(`${dd}`);
      }
    });
    let endDigit = Number(dayOne.getDate().toString().split('')[dayOne.getDate().toString().length - 1]);
    let endDigitTwo = Number(dayTwo.getDate().toString().split('')[dayTwo.getDate().toString().length - 1]);
    dayEnding = Edit.calculateDayEnding(endDigit, dayEnding, dayOne.getDate());
    dayEndingTwo = Edit.calculateDayEnding(endDigit, dayEndingTwo, dayTwo.getDate());
    wording = `Due the ${dayOne.getDate()}${dayEnding} & ${dayTwo.getDate()}${dayEndingTwo}, of ${months[dayOne.getMonth()]}`;
    return wording;
  }
  if (category.timingOptions.paymentCycle === `Monthly`) {
    let date = new Date(`${category.timingOptions.dueDates[0]}`);
    let day = date.getDate();
    let endDigit = Number(date.getDate().toString().split('')[date.getDate().toString().length - 1]);
    let dayEnding;
    dayEnding = Edit.calculateDayEnding(endDigit, dayEnding, date);
    wording = `Due ${days[date.getDay()]}, the ${day}${dayEnding} of ${months[date.getMonth()]}.`;
    return wording;
  }
};

const getSinglePercentageSpent = (spent, total) => {
  let percentage = (spent / total).toFixed(2);
  if (isNaN(percentage)) percentage = (0.0).toFixed(2);
  return percentage;
};

const getOverallPercentageSpent = (total, part) => {
  let percent = (part / total).toFixed(2);
  if (percent === NaN) percent = 0;
  return percent;
};

const getOverallSpent = (subCategories, overall) => {
  let arrayOfTotals = [];
  subCategories.forEach((sc, i) => {
    let subCategoryTotal = Number(sc.firstChild.nextSibling.nextSibling.firstChild.textContent);
    sc.firstChild.nextSibling.nextSibling.firstChild.textContent === `$${sc.firstChild.nextSibling.nextSibling.firstChild.textContent.split('$')[1]}`
      ? (subCategoryTotal = Number(sc.firstChild.nextSibling.nextSibling.firstChild.textContent.split('$')[1]))
      : (subCategoryTotal = 0);
    arrayOfTotals.push(subCategoryTotal);
  });
  let initialValue = 0;
  overall = arrayOfTotals.reduce((previous, current) => Number(previous) + Number(current), initialValue);
  return overall;
};

const getOverallBudget = (subCategories, overall) => {
  let arrayOfTotals = [];
  subCategories.forEach((sc, i) => {
    const subCategoryTotal = sc.firstChild.nextSibling.nextSibling.firstChild.value;
    arrayOfTotals.push(subCategoryTotal);
  });
  let initialValue = 0;
  overall = arrayOfTotals.reduce((previous, current) => Number(previous) + Number(current), initialValue);
  return overall;
};

const insertElement = (container, element) => {
  if (container) {
    container.insertAdjacentElement('beforeend', element);
  }
};

const displayTransaction = (container, plan) => {
  container.insertAdjacentElement('beforebegin', plan);
};

const getPaymentSchedule = (paymentArray, paymentCycle, dates) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let payments;
  let paymentStart = 0;
  console.log(`Scheduling Payments...`);
  console.log(paymentCycle, dates);
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

const getDueDate = (date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const selectedDate = new Date(date);
  const currentTimezoneOffset = selectedDate.getTimezoneOffset() / 60;
  return `${new Date(selectedDate.setHours(selectedDate.getHours() + new Date().getTimezoneOffset() / 60)).getDate()} ${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
};

const getTransactionPlanDate = (date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${new Date(date).getDate()} ${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
};

const getCurrentDate = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${new Date().getDate()} ${months[new Date().getMonth()]} ${new Date().getFullYear()}`;
};

const replaceClassName = (element, classReplaced, replacementClass) => {
  element.classList.remove(classReplaced);
  element.classList.add(replacementClass);
};

const finalizeTransactionPlan = (budget, placeholderBudget, user, selects, smallInputs, mediumInputs) => {
  console.log(budget, user);
  let updateObject = {
    budgetId: budget._id,
    userId: user._id,
  };
  let plannedTransaction = {};
  updateObject.transactions = {};
  updateObject.transactions.recentTransactions = budget.transactions.recentTransactions;
  updateObject.transactions.plannedTransactions = budget.transactions.plannedTransactions;
  console.log(selects[0].value);

  // The ones before the conditional should be the ones which ALL transaction plans should have.

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
    console.log(`2 Payments..`);
  }
  plannedTransaction.timingOptions.paymentSchedule = [];
  // After the due dates, it is setting the payment schedule using the selected payment cycle.
  getPaymentSchedule(plannedTransaction.timingOptions.paymentSchedule, plannedTransaction.timingOptions.paymentCycle, plannedTransaction.timingOptions.dueDates);
  plannedTransaction.name = smallInputs[1].value;
  plannedTransaction.amountSaved = 0;
  plannedTransaction.paid = false;
  plannedTransaction.paidStatus = `Unpaid`;

  console.log(selects);
  if (selects[0].value === `Expense Fund`) {
    plannedTransaction.subAccount = selects[1].value;
    console.log(smallInputs[2].closest('.form__section--transaction-plan').nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.nextSibling);
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

const buildTransactionPlan = (budget, placeholderBudget, user, number, numberOfSections, plan, classType) => {
  const transactionPlanSelects = document.querySelectorAll('.form__select--accounts');
  const smallShortTransactionPlanInputs = document.querySelectorAll('.form__input--small-short');
  const altMediumTransactionPlanInputs = document.querySelectorAll('.form__input--medium__alt');
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
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
      if (numberOfSections === 13) replaceClassName(transactionPlanPart, 'transaction-plan__part', 'transaction-plan__double__part');
      plan.insertAdjacentElement('beforeend', transactionPlanPart);

      if (number === 0) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 1) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Account`;
        transactionPlanPartText.textContent = `${transactionPlanSelects[0].value}`;
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 2) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Transaction Type`;
        console.log(transactionPlanSelects[0].value);
        console.log(transactionPlanSelects[1], transactionPlanSelects[1].value);
        if (transactionPlanSelects[0].value === `Expense Fund`) {
          console.log(transactionPlanSelects[1], transactionPlanSelects[1].value);
          transactionPlanPartText.textContent = `${transactionPlanSelects[1].value}`;
        }
        if (transactionPlanSelects[0].value === `Savings Fund`) {
          transactionPlanPartText.textContent = `${transactionPlanSelects[2].value}`;
        }
        if (transactionPlanSelects[0].value === `Surplus`) {
          transactionPlanPartText.textContent = `${transactionPlanSelects[4].value}`;
        }
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 3) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Transaction Name`;
        transactionPlanPartText.textContent = `${smallShortTransactionPlanInputs[1].value}`;
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 4) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Location`;
        transactionPlanPartText.textContent = `${smallShortTransactionPlanInputs[0].value}`;
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 5) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Amount`;
        transactionPlanPartText.textContent = `${money.format(Number(smallShortTransactionPlanInputs[2].value))}`;
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 6) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Due Date One`;
        transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[0].value);
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 7) {
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
          replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Due Date Two`;
          transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[1].value);
        }
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 8) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Amount Saved`;
        transactionPlanPartText.textContent = money.format(0);

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Timing`;
          transactionPlanPartText.textContent = `${transactionPlanSelects[5].value}`;
        }
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 9) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
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

          insertElement(transactionPlanPart, transactionPlanInput);
          insertElement(transactionPlanPart, transactionPlanButton);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Amount Saved`;
          transactionPlanPartText.textContent = money.format(0);
          insertElement(transactionPlanPart, transactionPlanPartText);
        }
      }
      if (number === 10) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = `Paid In Full?`;
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Paid`;
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

          insertElement(transactionPlanPart, transactionPlanButton);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
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

          insertElement(transactionPlanPart, transactionPlanInput);
          insertElement(transactionPlanPart, transactionPlanButton);
        }
      }
      if (number === 11) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = `Status`;
          transactionPlanPartText.textContent = `Unpaid`;

          insertElement(transactionPlanPart, transactionPlanPartText);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Paid In Full?`;
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Paid`;
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

          insertElement(transactionPlanPart, transactionPlanButton);
        }
      }
      if (number === 12) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, `transaction-plan__part__header`, 'transaction-plan__double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__part__header`, 'r__transaction-plan__double__part__header');
          transactionPlanPartHeaderText.textContent = `Status`;
          transactionPlanPartText.textContent = `Unpaid`;

          insertElement(transactionPlanPart, transactionPlanPartText);
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
      if (numberOfSections === 14) replaceClassName(transactionPlanPart, 'transaction-plan__alt__part', 'transaction-plan__alt-double__part');
      plan.insertAdjacentElement('beforeend', transactionPlanPart);

      if (number === 0) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 1) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Account`;
        transactionPlanPartText.textContent = `${transactionPlanSelects[0].value}`;
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 2) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Transaction Type`;
        transactionPlanPartText.textContent = `${transactionPlanSelects[3].value}`;
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 3) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Lender`;
        transactionPlanPartText.textContent = `${transactionPlanSelects[6].value}`;
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 4) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Transaction Name`;
        transactionPlanPartText.textContent = `${smallShortTransactionPlanInputs[1].value}`;
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 5) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Location`;
        transactionPlanPartText.textContent = `${smallShortTransactionPlanInputs[0].value}`;
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 6) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Amount`;
        transactionPlanPartText.textContent = `${money.format(Number(smallShortTransactionPlanInputs[2].value))}`;
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 7) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Due Date One`;
        transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[0].value);
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
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
          replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Due Date Two`;
          transactionPlanPartText.textContent = getDueDate(altMediumTransactionPlanInputs[1].value);
        }
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 9) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        transactionPlanPartHeaderText.textContent = `Amount Saved`;
        transactionPlanPartText.textContent = money.format(0);

        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Timing`;
          transactionPlanPartText.textContent = `${transactionPlanSelects[5].value}`;
        }
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        insertElement(transactionPlanPart, transactionPlanPartText);
      }
      if (number === 10) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
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

          insertElement(transactionPlanPart, transactionPlanInput);
          insertElement(transactionPlanPart, transactionPlanButton);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Amount Saved`;
          transactionPlanPartText.textContent = money.format(0);
          insertElement(transactionPlanPart, transactionPlanPartText);
        }
      }
      if (number === 11) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = `Paid In Full?`;
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Paid`;
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

          insertElement(transactionPlanPart, transactionPlanButton);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
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

          insertElement(transactionPlanPart, transactionPlanInput);
          insertElement(transactionPlanPart, transactionPlanButton);
        }
      }
      if (number === 12) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (!altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          transactionPlanPartHeaderText.textContent = `Status`;
          transactionPlanPartText.textContent = `Unpaid`;

          insertElement(transactionPlanPart, transactionPlanPartText);
        }
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Paid In Full?`;
          const transactionPlanButton = document.createElement('button');
          transactionPlanButton.textContent = `Paid`;
          transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
          transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

          insertElement(transactionPlanPart, transactionPlanButton);
        }
      }
      if (number === 13) {
        // INSERT DOM ELEMENTS INTO FIRST PART
        insertElement(transactionPlanPart, transactionPlanPartHeader);
        insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
        if (altMediumTransactionPlanInputs[1].closest('.form__section--transaction-plan').classList.contains('open')) {
          replaceClassName(transactionPlanPartHeader, `transaction-plan__alt__part__header`, 'transaction-plan__alt-double__part__header');
          replaceClassName(transactionPlanPartHeader, `r__transaction-plan__alt__part__header`, 'r__transaction-plan__alt-double__part__header');
          transactionPlanPartHeaderText.textContent = `Status`;
          transactionPlanPartText.textContent = `Unpaid`;

          insertElement(transactionPlanPart, transactionPlanPartText);
        }
      }
      number++;
    }
  }
  finalizeTransactionPlan(budget, placeholderBudget, user, transactionPlanSelects, smallShortTransactionPlanInputs, altMediumTransactionPlanInputs);
};

const createPlannedTransaction = (accountSelect, budget, placeholderBudget, user, creationContainer) => {
  console.log(`Creating Plan...`);
  const transactionDisplay = document.querySelector('.transaction-plan-display');
  const transactionPlanSelects = document.querySelectorAll('.form__select--accounts');
  let numSections;
  let sectionStart = 0;
  if (accountSelect.value === `Expense Fund` || accountSelect.value === `Savings Fund` || accountSelect.value === `Surplus`) {
    const transactionPlan = document.createElement('section');
    numSections = 12;
    if (transactionPlanSelects[5].value === `Bi-Monthly` || transactionPlanSelects[5].value === `Bi-Annual`) numSections = 13;

    buildTransactionPlan(budget, placeholderBudget, user, sectionStart, numSections, transactionPlan, `original`);
    numSections === 13 ? transactionPlan.classList.add('transaction-plan__double') : transactionPlan.classList.add('transaction-plan');
    numSections === 13 ? transactionPlan.classList.add('r__transaction-plan__double') : transactionPlan.classList.add('r__transaction-plan');
    displayTransaction(creationContainer, transactionPlan);
  }
  if (accountSelect.value === `Debt`) {
    const altTransactionPlan = document.createElement('section');
    numSections = 13;
    if (transactionPlanSelects[5].value === `Bi-Monthly` || transactionPlanSelects[5].value === `Bi-Annual`) numSections = 14;

    buildTransactionPlan(budget, placeholderBudget, user, sectionStart, numSections, altTransactionPlan, `alt`);
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

const updateTransactionPlanningAccountDisplays = (budget, placeholderBudget, user) => {
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  console.log(`Updating...`);
  const appliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__applied-container__applied');
  const unAppliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__un-applied-container__un-applied');

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

  // APPLIED TOTALS
  appliedMoney[0].textContent = money.format(expenseAppliedTotal);
  appliedMoney[1].textContent = money.format(savingsAppliedTotal);
  appliedMoney[2].textContent = money.format(debtAppliedTotal);
  appliedMoney[3].textContent = money.format(surplusAppliedTotal);

  // UNAPPLIED TOTALS
  unAppliedMoney[0].textContent = money.format(budget.accounts.expenseFund.amount - expenseAppliedTotal);
  unAppliedMoney[1].textContent = money.format(budget.accounts.savingsFund.amount - savingsAppliedTotal);
  unAppliedMoney[2].textContent = money.format(budget.accounts.debt.amount - debtAppliedTotal);
  unAppliedMoney[3].textContent = money.format(budget.accounts.surplus.amount - surplusAppliedTotal);
};

const displayExistingTransactionPlans = (budget, placeholderBudget, user) => {
  console.log(`These are existing.`);
  const transactionPlanCreation = document.querySelector('.transaction-plan-creation');
  const transactionPlans = [];
  let numberOfSections;
  budget.transactions.plannedTransactions.forEach((transaction, i) => {
    transactionPlans.push(transaction);
    transactionPlans.sort((a, b) => new Date(a.date) - new Date(b.date));
  });
  console.log(
    transactionPlans
    // transactionPlans.sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
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
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Account`;
            transactionPlanPartText.textContent = `${transaction.account}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Type`;
            transactionPlanPartText.textContent = `${transaction.subAccount}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Name`;
            transactionPlanPartText.textContent = `${transaction.name}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Location`;
            transactionPlanPartText.textContent = `${transaction.location}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount`;
            transactionPlanPartText.textContent = money.format(transaction.amount);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date One`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[0])}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date Two`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[1])}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Timing`;
            transactionPlanPartText.textContent = `${transaction.timingOptions.paymentCycle}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 9) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount Saved`;
            transactionPlanPartText.textContent = money.format(transaction.amountSaved);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
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
              console.log(transactionPlanInput.value, typeof transactionPlanInput.value);
              console.log(transactionPlanButton.parentElement.previousSibling);
              transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
              transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);
              console.log(transaction.amountSaved);
              let updateObject = {
                budgetId: budget._id,
                userId: user._id,
              };
              updateObject.transactions = {
                recentTransactions: budget.transactions.recentTransactions,
                plannedTransactions: transactionPlans,
              };
              placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
              updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user);
            });
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanInput);
            insertElement(transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 11) {
            transactionPlanPartHeaderText.textContent = `Paid In Full?`;
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Paid`;
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 12) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Status`;
            transactionPlanPartText.textContent = `${transaction.paidStatus}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
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
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Account`;
            transactionPlanPartText.textContent = `${transaction.account}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Type`;
            transactionPlanPartText.textContent = `${transaction.subAccount}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Name`;
            transactionPlanPartText.textContent = `${transaction.name}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Location`;
            transactionPlanPartText.textContent = `${transaction.location}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount`;
            transactionPlanPartText.textContent = money.format(transaction.amount);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date One`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[0])}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Timing`;
            transactionPlanPartText.textContent = `${transaction.timingOptions.paymentCycle}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount Saved`;
            transactionPlanPartText.textContent = money.format(transaction.amountSaved);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
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
              console.log(transactionPlanInput.value, typeof transactionPlanInput.value);
              console.log(transactionPlanButton.parentElement.previousSibling);
              transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
              transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);
              console.log(transaction.amountSaved, transactionPlans);
              let updateObject = {
                budgetId: budget._id,
                userId: user._id,
              };
              updateObject.transactions = {
                recentTransactions: budget.transactions.recentTransactions,
                plannedTransactions: transactionPlans,
              };
              placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
              updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user);
            });
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanInput);
            insertElement(transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 10) {
            transactionPlanPartHeaderText.textContent = `Paid In Full?`;
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Paid`;
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 11) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Status`;
            transactionPlanPartText.textContent = `${transaction.paidStatus}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
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
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Account`;
            transactionPlanPartText.textContent = `${transaction.account}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Type`;
            transactionPlanPartText.textContent = `${transaction.subAccount}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Lender`;
            transactionPlanPartText.textContent = `${transaction.lender}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Name`;
            transactionPlanPartText.textContent = `${transaction.name}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Location`;
            transactionPlanPartText.textContent = `${transaction.location}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount`;
            transactionPlanPartText.textContent = money.format(transaction.amount);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date One`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[0])}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date Two`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[1])}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 9) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Timing`;
            transactionPlanPartText.textContent = `${transaction.timingOptions.paymentCycle}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 10) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount Saved`;
            transactionPlanPartText.textContent = money.format(transaction.amountSaved);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
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
              console.log(transactionPlanInput.value, typeof transactionPlanInput.value);
              console.log(transactionPlanButton.parentElement.previousSibling);
              transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
              transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);
              console.log(transaction.amountSaved);
              let updateObject = {
                budgetId: budget._id,
                userId: user._id,
              };
              updateObject.transactions = {
                recentTransactions: budget.transactions.recentTransactions,
                plannedTransactions: transactionPlans,
              };
              placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
              updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user);
            });
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanInput);
            insertElement(transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 12) {
            transactionPlanPartHeaderText.textContent = `Paid In Full?`;
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Paid`;
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 13) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Status`;
            transactionPlanPartText.textContent = `${transaction.paidStatus}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
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
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 1) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Account`;
            transactionPlanPartText.textContent = `${transaction.account}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 2) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Type`;
            transactionPlanPartText.textContent = `${transaction.subAccount}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 3) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Lender`;
            transactionPlanPartText.textContent = `${transaction.lender}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 4) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Transaction Name`;
            transactionPlanPartText.textContent = `${transaction.name}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 5) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Location`;
            transactionPlanPartText.textContent = `${transaction.location}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 6) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount`;
            transactionPlanPartText.textContent = money.format(transaction.amount);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 7) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Due Date One`;
            transactionPlanPartText.textContent = `${getTransactionPlanDate(transaction.timingOptions.dueDates[0])}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 8) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Timing`;
            transactionPlanPartText.textContent = `${transaction.timingOptions.paymentCycle}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
          }
          if (sectionStart === 9) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Amount Saved`;
            transactionPlanPartText.textContent = money.format(transaction.amountSaved);
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
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
              console.log(transactionPlanInput.value, typeof transactionPlanInput.value);
              console.log(transactionPlanButton.parentElement.previousSibling);
              transactionPlanButton.parentElement.previousSibling.firstChild.nextSibling.textContent = money.format(Number(transactionPlanInput.value) + Number(transaction.amountSaved));
              transaction.amountSaved = Number(transactionPlanInput.value) + Number(transaction.amountSaved);
              console.log(transaction.amountSaved);
              let updateObject = {
                budgetId: budget._id,
                userId: user._id,
              };
              updateObject.transactions = {
                recentTransactions: budget.transactions.recentTransactions,
                plannedTransactions: transactionPlans,
              };
              placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
              updateTransactionPlanningAccountDisplays(budget, placeholderBudget, user);
            });
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanInput);
            insertElement(transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 11) {
            transactionPlanPartHeaderText.textContent = `Paid In Full?`;
            const transactionPlanButton = document.createElement('button');
            transactionPlanButton.textContent = `Paid`;
            transactionPlanButton.classList.add('button--extra-extra-small__transaction-plan-small');
            transactionPlanButton.classList.add('r__button--extra-extra-small__transaction-plan-small');

            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanButton);
          }
          if (sectionStart === 12) {
            // INSERT DOM ELEMENTS INTO FIRST PART
            transactionPlanPartHeaderText.textContent = `Status`;
            transactionPlanPartText.textContent = `${transaction.paidStatus}`;
            insertElement(transactionPlanPart, transactionPlanPartHeader);
            insertElement(transactionPlanPartHeader, transactionPlanPartHeaderText);
            insertElement(transactionPlanPart, transactionPlanPartText);
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

const setupTransactionPlanning = (budget, placeholderBudget, user) => {
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

  displayExistingTransactionPlans(budget, placeholderBudget, user);
  const submitPlanButton = document.querySelector('.button--extra-extra-small__transaction-plan');

  commonTransactionOptionsArray.forEach((array) => {
    pushIntoArray(
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

  pushIntoArray([accountSelectionContainers[1], transactionPlanSections[5]], expenseTransactionOptionsArray);
  pushIntoArray([accountSelectionContainers[2], transactionPlanSections[5]], savingsTransactionOptionsArray);
  pushIntoArray([accountSelectionContainers[3], formSelectSections[3], accountSelectionContainers[6]], debtTransactionOptionsArray);
  pushIntoArray([accountSelectionContainers[4]], surplusTransactionOptionsArray);

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
          createPlannedTransaction(accountSelectionContainers[0], budget, placeholderBudget, user, transactionPlanCreationContainer);
          surplusSwitch.classList.remove('surplus-container__switch--switched');
          surplusSwitchIcon.classList.add('fa-times');
          surplusSwitchIcon.classList.remove('fa-check');
          transactionPlanCreationContainer.classList.add('closed');
          transactionPlanCreationContainer.classList.remove('open');
        });
      }

      const money = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      });

      const appliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__applied-container__applied');
      const unAppliedMoney = document.querySelectorAll('.container--extra-small-evenly-spaced__content__un-applied-container__un-applied');

      // APPLIED TOTALS
      appliedMoney[0].textContent = money.format(expenseAppliedTotal);
      appliedMoney[1].textContent = money.format(savingsAppliedTotal);
      appliedMoney[2].textContent = money.format(debtAppliedTotal);
      appliedMoney[3].textContent = money.format(surplusAppliedTotal);

      // UNAPPLIED TOTALS
      unAppliedMoney[0].textContent = money.format(budget.accounts.expenseFund.amount - expenseAppliedTotal);
      unAppliedMoney[1].textContent = money.format(budget.accounts.savingsFund.amount - savingsAppliedTotal);
      unAppliedMoney[2].textContent = money.format(budget.accounts.debt.amount - debtAppliedTotal);
      unAppliedMoney[3].textContent = money.format(budget.accounts.surplus.amount - surplusAppliedTotal);

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

const _watchTransactionPlanner = (budget, placeholderBudget, user) => {
  console.log(`Planning...`);

  const borderlessButtons = document.querySelectorAll('.button--borderless');
  const startPlanningButton = borderlessButtons[2];

  const accountSelection = document.querySelectorAll('.form__select--accounts')[0];
  if (startPlanningButton) {
    startPlanningButton.addEventListener('click', (e) => {
      e.preventDefault();
      startPlanning(budget, placeholderBudget, user);
    });
  }

  setupTransactionPlanning(budget, placeholderBudget, user);

  const altMediumInputs = document.querySelectorAll('.form__input--medium__alt');
  const currentDate = altMediumInputs[0];
  if (currentDate) currentDate.value = new Date();
};

const _watchIncomeAllocation = (budget, placeholderBudget, user) => {
  const incomeAllocationContainer = document.querySelector('.container--allocate-income');
  const unAllocatedTotal = document.querySelector('.un-allocated-account-total');
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  if (incomeAllocationContainer) {
    console.log(`Allocating...`);
    unAllocatedTotal.textContent = money.format(unAllocatedTotal.textContent);
    const allocateIncomeButton = document.querySelector('.button--small-purple');
    allocateIncomeButton.addEventListener('click', (e) => {
      e.preventDefault();
      // INITIALIZE NEEDED VARIABLES
      let unAllocatedAmount = Number(unAllocatedTotal.textContent.split('$')[1].split(',').join(''));
      let totalAllocationAmount = 0;
      // SELECT INPUTS FOR INCOME ALLOCATION
      const allocationInputs = document.querySelectorAll('.form__input');

      // GET TOTAL AMOUNT OF ALL INPUTS
      allocationInputs.forEach((ai, i) => {
        // ADD VALUE TO CURRENT TOTAL
        totalAllocationAmount += Number(ai.value);
      });

      // DOUBLE CHECK TO MAKE SURE ALLOCATED AMOUNT DOES NOT EXCEED UN-ALLOCATED INCOME
      totalAllocationAmount <= unAllocatedAmount
        ? (unAllocatedTotal.textContent = money.format(unAllocatedAmount - totalAllocationAmount))
        : alert(`You do not have all that money! Please lower one of your accounts amounts!`);

      // INITIALIZE SEPARATE ACCOUNTS ALLOCATED TOTALS
      let monthlyBudgetAllocation, emergencyFundAllocation, savingsFundAllocation, expenseFundAllocation, debtAllocation, investmentFundAllocation;

      // GET EACH SEPARATE ACCOUNTS ALLOCATED INCOME
      monthlyBudgetAllocation = allocationInputs[0].value;
      emergencyFundAllocation = allocationInputs[1].value;
      savingsFundAllocation = allocationInputs[2].value;
      expenseFundAllocation = allocationInputs[3].value;
      debtAllocation = allocationInputs[4].value;
      investmentFundAllocation = allocationInputs[5].value;

      // DOUBLE CHECK IF IT IS A NUMBER
      if (isNaN(monthlyBudgetAllocation)) monthlyBudgetAllocation = 0;
      if (isNaN(emergencyFundAllocation)) emergencyFundAllocation = 0;
      if (isNaN(savingsFundAllocation)) savingsFundAllocation = 0;
      if (isNaN(expenseFundAllocation)) expenseFundAllocation = 0;
      if (isNaN(debtAllocation)) debtAllocation = 0;
      if (isNaN(investmentFundAllocation)) investmentFundAllocation = 0;

      const updateObject = {
        budgetId: budget._id,
        userId: user._id,
        user: user,
        accounts: {
          unAllocated: {
            amount: Number(unAllocatedTotal.textContent.split('$')[1].split(',').join('')),
          },
          monthlyBudget: {
            amount: Number(monthlyBudgetAllocation) + budget.accounts.monthlyBudget.amount,
          },
          emergencyFund: {
            emergencyFundGoal: placeholderBudget.accounts.emergencyFund.emergencyFundGoal,
            emergencyGoalMeasurement: placeholderBudget.accounts.emergencyFund.emergencyGoalMeasurement,
            emergencyFundGoalTiming: placeholderBudget.accounts.emergencyFund.emergencyFundGoalTiming,
            amount: Number(emergencyFundAllocation) + budget.accounts.emergencyFund.amount,
          },
          savingsFund: {
            savingsGoal: placeholderBudget.accounts.savingsFund.savingsGoal,
            savingsPercentage: placeholderBudget.accounts.savingsFund.savingsPercentage,
            amount: Number(savingsFundAllocation) + budget.accounts.savingsFund.amount,
          },
          expenseFund: {
            amount: Number(expenseFundAllocation) + budget.accounts.expenseFund.amount,
          },
          surplus: {
            amount: placeholderBudget.accounts.surplus.amount,
          },
          investmentFund: {
            investmentGoal: placeholderBudget.accounts.investmentFund.investmentGoal,
            investmentPercentage: placeholderBudget.accounts.investmentFund.investmentPercentage,
            amount: Number(investmentFundAllocation) + budget.accounts.investmentFund.amount,
          },
          debt: {
            debtAmount: placeholderBudget.accounts.debt.debtAmount,
            amount: Number(debtAllocation) + budget.accounts.debt.amount,
          },
        },
      };

      placeholderBudget._updateBudget({ updateObject: updateObject }, `Allocate-Income`);

      allocationInputs.forEach((ai) => {
        ai.value = '';
      });
    });
  }
};

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
      // GLITCH: CLICKING THE MAIN CATEGORIES ON THE LEFT MAKES ALL SUB CATEGORIES GO WONKY.
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
      console.log(placeholderBudget);
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
    console.log(placeholderBudget);
    placeholderBudget.mainCategories.forEach((mc, i) => {
      console.log(mc);
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

const _watchManageCategories = (budget, placeholderBudget, user) => {
  const mediumContainers = document.querySelectorAll('.container--medium');
  const manageCategoryContainer = mediumContainers[0];
  let icon, index;
  let subCategoryIndex = 0;
  if (manageCategoryContainer) {
    Categories.createCategories(icon, index);
    Categories._watchCreateCategoryButton(icon, placeholderBudget);
    Edit.setupSubCategoryCreation(placeholderBudget, subCategoryIndex);
    _watchForMainCategorySelection(budget, placeholderBudget, user);
    _watchForBudgetCategoryUpdates(budget, placeholderBudget, user);
  }
};

const _watchEditCategoryGoals = (budget, placeholderBudget, user) => {
  const editCategoryGoalsContainer = document.querySelectorAll('.container--large')[0];
  if (editCategoryGoalsContainer) {
    const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
    const timingFunctionContainer = document.querySelector('.timing-container');
    const editCategoryGoalsSubmit = document.querySelector('.button--large__thin');
    // On load, retrieve the proper timings and dates for the correct sub-categories.

    const mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
    let allCategories = [];
    placeholderBudget.mainCategories.forEach((mct, i) => {
      budget.mainCategories[i].subCategories.forEach((sc, i) => {
        allCategories.push(sc);
      });
    });

    allCategories.forEach((c, i) => {
      if (c.timingOptions.paymentCycle) {
        let timing = getSubCategoryTiming(budget, c);
        if (subCategories[i]) {
          if (subCategories[i].firstChild.nextSibling.firstChild.nextSibling) subCategories[i].firstChild.nextSibling.firstChild.nextSibling.textContent = timing;
        }
      }
    });

    Edit.setupTimingFunctionContainer(timingFunctionContainer);
    let clickedItem, selectedTiming;
    let subCategoryIndex = 0;
    Edit.watchForSettingTiming(placeholderBudget, subCategoryIndex, clickedItem, selectedTiming, `Full Budget`);

    const money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    const individualPayments = document.querySelectorAll('.individual-payment');
    const overallBudget = document.querySelectorAll('.budget-single-goal-summary__amount');
    individualPayments.forEach((ip, i) => {
      let overallSpent = overallBudget[1];
      let overallRemaining = overallBudget[2];
      let overallPercentageSpent = overallBudget[3];
      let total = getOverallBudget(subCategories, overallBudget[0]);
      let part = getOverallSpent(subCategories, overallSpent);
      if (total - part < 0) {
        overallRemaining.classList.add('negative');
        overallRemaining.classList.remove('positive');
      }
      if (total - part === 0) {
        overallRemaining.classList.remove('positive');
        overallRemaining.classList.remove('negative');
      }
      if (total - part > 0) {
        overallRemaining.classList.add('positive');
        overallRemaining.classList.remove('negative');
      }
      let remainingValue = ip.closest('section').nextSibling.nextSibling.firstChild;
      if (Number(remainingValue.textContent.split('$')[1]) > 0) {
        remainingValue.classList.add('positive');
        remainingValue.classList.remove('negative');
      }
      if (Number(remainingValue.textContent.split('$')[1]) === 0) {
        remainingValue.classList.remove('positive');
        remainingValue.classList.remove('negative');
      }
      if (Number(remainingValue.textContent.split('$')[1]) < 0) {
        remainingValue.classList.remove('positive');
        remainingValue.classList.add('negative');
      }
      ip.addEventListener('keyup', (e) => {
        e.preventDefault();
        let spent = ip.closest('section').nextSibling.firstChild;
        let remaining = ip.closest('section').nextSibling.nextSibling.firstChild;
        let percentageSpent = ip.closest('section').nextSibling.nextSibling.nextSibling.firstChild;
        let total = getOverallBudget(subCategories, overallBudget[0]);
        let part = getOverallSpent(subCategories, overallSpent);
        let percentage = getOverallPercentageSpent(total, part);
        overallBudget[0].textContent = money.format(getOverallBudget(subCategories, overallBudget[0]));
        overallSpent.textContent = money.format(part);
        overallRemaining.textContent = money.format(total - part);
        overallPercentageSpent.textContent = `${percentage}%`;
        spent.textContent = money.format(spent.textContent.split('$')[1]);
        remaining.textContent = money.format(ip.value - Number(spent.textContent.split('$')[1]));
        if (total - part < 0) {
          overallRemaining.classList.add('negative');
          overallRemaining.classList.remove('positive');
        }
        if (total - part === 0) {
          overallRemaining.classList.remove('positive');
          overallRemaining.classList.remove('negative');
        }
        if (total - part > 0) {
          overallRemaining.classList.add('positive');
          overallRemaining.classList.remove('negative');
        }
        if (!Number(remaining.textContent.startsWith('-'))) {
          remaining.classList.add('positive');
          remaining.classList.remove('negative');
        }
        if (Number(remaining.textContent.split('$')[1]) === 0) {
          remaining.classList.remove('positive');
          remaining.classList.remove('negative');
        }
        if (Number(remaining.textContent.startsWith('-'))) {
          remaining.classList.remove('positive');
          remaining.classList.add('negative');
        }
        percentageSpent.textContent = `${getSinglePercentageSpent(Number(spent.textContent.split('$')[1]), ip.value)}%`;
      });
      ip.addEventListener('blur', (e) => {
        e.preventDefault();
        ip.value = Number(ip.value).toFixed(2);
      });
    });
    if (editCategoryGoalsSubmit) {
      editCategoryGoalsSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        let updateObject = {};
        updateObject.budgetId = budget._id;
        updateObject.userId = user._id;
        updateObject.mainCategories = [];
        const mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');

        let mainCategoryIndex = 0;
        let subCategoryIndex = 0;

        let emptyArray = [];
        let temporaryObject;

        budget.mainCategories.forEach((bmc, i) => {
          temporaryObject = Object.fromEntries([
            [`title`, placeholderBudget.mainCategories[i].title],
            [`icon`, placeholderBudget.mainCategories[i].icon],
            [`subCategories`, emptyArray],
          ]);
          updateObject.mainCategories[i] = temporaryObject;

          let tempArray = Array.from(document.querySelectorAll(`.sub-category-display__sub-category[data-subcategory="${i}"]`));
          let mainCategoryIndex = i;
          tempArray.forEach((temp, i) => {
            let title = temp.firstChild.nextSibling.firstChild.textContent;
            let goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
            let amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
            let timingOptions = bmc.subCategories[i].timingOptions;
            let createdAt = bmc.subCategories[i].createdAt;
            console.log(createdAt);
            if (!bmc.subCategories[i].createdAt) {
              createdAt = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));
            }
            console.log(createdAt);
            let lastUpdated = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));

            temporaryObject.subCategories.push(
              Object.fromEntries([
                [`title`, title],
                [`createdAt`, createdAt],
                [`lastUpdated`, lastUpdated],
                [`goalAmount`, goalAmount],
                [`amountSpent`, amountSpent],
                [`amountRemaining`, amountRemaining],
                [`percentageSpent`, percentageSpent],
                [`timingOptions`, timingOptions],
              ])
            );
            console.log(temporaryObject);
            if (temporaryObject.subCategories.length === tempArray.length) {
              mainCategoryIndex++;
              if (temporaryObject === undefined) return;
              temporaryObject.subCategories = [];
              return mainCategoryIndex;
            }
            if (i === tempArray.length) {
              mainCategoryIndex++;
            }
          });

          if (updateObject.mainCategories.length === budget.mainCategories.length) {
            return (mainCategoryIndex = 0);
          }
        });

        updateObject.mainCategories.forEach((mc, i) => {
          // Maintain.fillSubCategoryArray(updateObject, i);
          let mainCategoryIndex = i;
          let tempArray = Array.from(document.querySelectorAll(`.sub-category-display__sub-category[data-subcategory="${i}"]`));
          tempArray.forEach((temp, i) => {
            let title = temp.firstChild.nextSibling.firstChild.textContent;
            let goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
            let amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
            let timingOptions = budget.mainCategories[mainCategoryIndex].subCategories[i].timingOptions;
            let createdAt = budget.mainCategories[mainCategoryIndex].subCategories[i].createdAt;
            console.log(createdAt);
            if (!budget.mainCategories[mainCategoryIndex].subCategories[i].createdAt) {
              createdAt = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));
            }
            console.log(createdAt);
            let lastUpdated = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));

            updateObject.mainCategories[mainCategoryIndex].subCategories.push(
              Object.fromEntries([
                [`title`, title],
                [`createdAt`, createdAt],
                [`lastUpdated`, lastUpdated],
                [`goalAmount`, goalAmount],
                [`amountSpent`, amountSpent],
                [`amountRemaining`, amountRemaining],
                [`percentageSpent`, percentageSpent],
                [`timingOptions`, timingOptions],
              ])
            );
            if (updateObject.mainCategories[mainCategoryIndex].subCategories.length === tempArray.length) {
              mainCategoryIndex++;
              if (updateObject.mainCategories[mainCategoryIndex] === undefined) return;
              updateObject.mainCategories[mainCategoryIndex].subCategories = [];
              return mainCategoryIndex;
            }
            if (i === tempArray.length) {
              mainCategoryIndex++;
            }
          });
        });

        placeholderBudget._updateBudget(
          {
            budgetId: budget._id,
            budgetMainCategories: budget.mainCategories,
            userId: user._id,
            user: user,
            updateObject: updateObject,
          },
          `Edit-Category-Goals`
        );
      });
    }
  }
};

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

const _setupBudgetManagement = (budget, placeholderBudget, user) => {
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

const _setupCurrentMonth = (budget) => {
  const categoryIcon = document.querySelector('.main-category-display__category-display__icon');
  const categoryTitle = document.querySelector('.main-category-display__category-display__title');
  const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
  const leftButton = document.querySelector('.left');
  const rightButton = document.querySelector('.right');
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

const selectDayAndShowTransactions = (event) => {
  const upcomingTransactions = document.querySelectorAll('.upcoming-bills__bill');
  const e = event;
  const selectedDay = e.target;
  const monthHeader = document.querySelector('.bill-calendar__header__title');
  const splitMonthHeader = monthHeader.textContent.split(' ');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  console.log(monthHeader.textContent.split(' '));
  console.log(Number(selectedDay.textContent));
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

// DISPLAY UPCOMING TRANSACTIONS -- NEED TO DO THIS HERE INSTEAD OF PUG FOR THE REASON OF THE TRANSACTIONS THAT HAVE TWO DUE DATES.
const displayUpcomingTransactions = (container, transactions) => {
  console.log(`Transactions...`);
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  transactions.forEach((transaction, i) => {
    /*
    This needs to be different.  Based off of the payment cycle, what really needs to happen is to go through the transaction's payment schedule and go through the process of creating the upcoming transactions of those transactions.

    For those which are not bi-annual or bi-monthly it is straightforward.  For those that are, however, it requires another step of going through the each secondary array of dates and THEN creating the upcoming transactions with those.
    
    */

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
          insertElement(upcomingBill, billSection);

          if (billSectionStart === 0) {
            const billAccount = document.createElement('p');
            billAccount.classList.add('upcoming-bills__bill__bill-item__text');
            billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
            billAccount.textContent = transaction.account;
            insertElement(billSection, billAccount);
          }
          if (billSectionStart === 1) {
            const billAccount = document.createElement('p');
            billAccount.classList.add('upcoming-bills__bill__bill-item__text');
            billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
            billAccount.textContent = `${new Date(date).getDate()} ${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
            insertElement(billSection, billAccount);
          }
          if (billSectionStart === 2) {
            const billAccount = document.createElement('p');
            billAccount.classList.add('upcoming-bills__bill__bill-item__text');
            billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
            billAccount.textContent = transaction.lender;
            if (!transaction.lender) {
              billAccount.textContent = transaction.location;
            }
            insertElement(billSection, billAccount);
          }
          if (billSectionStart === 3) {
            const billAccount = document.createElement('p');
            billAccount.classList.add('upcoming-bills__bill__bill-item__text');
            billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
            billAccount.textContent = money.format(transaction.amount);
            insertElement(billSection, billAccount);
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
            insertElement(paidOrNot, paidOrNotInput);
            insertElement(paidOrNot, paidOrNotLabel);
            insertElement(billSection, paidOrNot);
          }
          billSectionStart++;
        }
        insertElement(container, upcomingBill);
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
            insertElement(upcomingBill, billSection);

            if (billSectionStart === 0) {
              const billAccount = document.createElement('p');
              billAccount.classList.add('upcoming-bills__bill__bill-item__text');
              billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
              billAccount.textContent = transaction.account;
              insertElement(billSection, billAccount);
            }
            if (billSectionStart === 1) {
              const billAccount = document.createElement('p');
              billAccount.classList.add('upcoming-bills__bill__bill-item__text');
              billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
              billAccount.textContent = `${new Date(date).getDate()} ${months[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
              insertElement(billSection, billAccount);
            }
            if (billSectionStart === 2) {
              const billAccount = document.createElement('p');
              billAccount.classList.add('upcoming-bills__bill__bill-item__text');
              billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
              billAccount.textContent = transaction.lender;
              if (!transaction.lender) {
                billAccount.textContent = transaction.location;
              }
              insertElement(billSection, billAccount);
            }
            if (billSectionStart === 3) {
              const billAccount = document.createElement('p');
              billAccount.classList.add('upcoming-bills__bill__bill-item__text');
              billAccount.classList.add('r__upcoming-bills__bill__bill-item__text');
              billAccount.textContent = money.format(transaction.amount);
              insertElement(billSection, billAccount);
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
              insertElement(paidOrNot, paidOrNotInput);
              insertElement(paidOrNot, paidOrNotLabel);
              insertElement(billSection, paidOrNot);
            }
            billSectionStart++;
          }
          insertElement(container, upcomingBill);
        });
      });
    }
  });
};

// SETTING UP BILL / TRANSACTION CALENDAR
const _setupBillCalendar = (budget, placeholderBudget, user) => {
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
  displayUpcomingTransactions(upcomingBillsContainer, budget.transactions.plannedTransactions);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const upcomingTransactions = document.querySelectorAll('.upcoming-bills__bill');
  console.log(upcomingTransactions);
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
      console.log(check.closest('.upcoming-bills__bill'));
      let transactionIndex = Number(check.closest('.upcoming-bills__bill').dataset.transaction);
      // let numberIndex = Number(transactionIndex.dataset.transaction);
      // console.log(numberIndex);
      let upcomingBill = document.querySelectorAll('.upcoming-bills__bill')[i];
      console.log(upcomingBill);
      let accountType = upcomingBill.firstChild.firstChild.textContent;
      let transactionDate = upcomingBill.firstChild.nextSibling.firstChild.textContent;
      // let transactionDate = new Date(upcomingBill.firstChild.nextSibling.firstChild.textContent);

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
      console.log(updateObject);
      placeholderBudget._updateBudget({ updateObject: updateObject }, `Dashboard`);
      reloadPage();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000);
    });
  });
};

const calculateTotal = (accountType, budget, debtAccount) => {
  const accountSections = document.querySelectorAll('.container--extra-small__content__account-total');
  const budgetAccounts = budget.accounts;
  let amountOfDebt = 0;
  if (debtAccount) console.log(debtAccount, budgetAccounts);
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
      // let budgetAccountTotals = [];
      // Object.entries(budgetAccounts).forEach((account) => {
      //   if (account[0] === `debt`) {
      //     if (debtAccount) {
      //       debtAccount.forEach((debt, i) => {
      //         if (debt.status !== `Paid Off`) {
      //           amountOfDebt += debt.amountOwed;
      //         }
      //       });
      //     }
      //   }
      //   return amountOfDebt;
      // });
      const bankVaultTotal = budgetAccountTotals.reduce((previous, current) => previous + current, initialDeposit);
      const netValueAccount = accountSections[2];
      let netValue = money.format(bankVaultTotal - amountOfDebt);
      console.log(netValue, bankVaultTotal, amountOfDebt);
      if (netValueAccount) netValueAccount.textContent = netValue;
    }
  }
};

const getDashboardAccountTotals = (budget, placeholderBudget, user) => {
  calculateTotal(`Bank Account`, budget);
  calculateTotal(`Debt`, budget, budget.debts);
  calculateTotal(`Net Value`, budget, budget.debts);

  // budget-container__dashboard__container--extra-small__content__account-total
};

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
            insertElement(transactionItemSelect, option);
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
          insertElement(transactionTypeSelect, option);
        });
      }

      if (transactionItemSelect.childNodes.length === 0) {
        budget.transactions.plannedTransactions.forEach((transaction, i) => {
          if (transaction.account === `Expense Fund`) {
            let option = document.createElement('option');
            option.classList.add('form__select--option');
            option.classList.add('r__form__select--option');
            option.textContent = transaction.name;
            insertElement(transactionItemSelect, option);
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
            insertElement(transactionItemSelect, option);
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
          insertElement(transactionTypeSelect, option);
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
            insertElement(transactionItemSelect, option);
            insertElement(transactionLenderSelect, lenderOption);
          }
        });
      }
    }
    if (optionText === `Tithing`) {
      option.classList.add('lowered');
    }
  });
};

const resetTransactionOptions = (allOptions) => {
  allOptions.forEach((option) => {
    option.forEach((optionItem) => {
      optionItem.classList.remove('open');
      optionItem.classList.add('closed');
    });
  });
};

const toggleClass = (element, className) => {
  return element.classList.toggle(className);
};

const _watchForTransactions = (budget, placeholderBudget, user) => {
  const dashboard = document.querySelector('.budget-dashboard');
  if (dashboard) {
    console.log(placeholderBudget);
    const money = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
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
    console.log(incomePreviewAmounts);
    let tithed = false;

    netIncomeInput.addEventListener('keyup', (e) => {
      e.preventDefault();
      incomePreviewAmounts[0].textContent = money.format(netIncomeInput.value * investmentPercentage);
      incomePreviewAmounts[1].textContent = money.format(netIncomeInput.value * savingsPercentage);
      if (user.latterDaySaint === true) {
        incomePreviewAmounts[2].textContent = money.format(0);
        if (budget.accounts.tithing.tithingSetting === `Gross`) {
          incomePreviewAmounts[2].textContent = money.format(grossIncomeInput.value * 0.1);
        }
        if (budget.accounts.tithing.tithingSetting === `Net`) {
          incomePreviewAmounts[2].textContent = money.format(netIncomeInput.value * 0.1);
        }
        if (budget.accounts.tithing.tithingSetting !== `Surplus`) {
          incomePreviewAmounts[3].textContent = money.format(
            netIncomeInput.value -
              Number(incomePreviewAmounts[0].textContent.split('$')[1]) -
              Number(incomePreviewAmounts[1].textContent.split('$')[1]) -
              Number(incomePreviewAmounts[2].textContent.split('$')[1])
          );
        }
        if (budget.accounts.tithing.tithingSetting === `Surplus`) {
          incomePreviewAmounts[2].textContent = money.format(
            netIncomeInput.value - Number(incomePreviewAmounts[0].textContent.split('$')[1]) - Number(incomePreviewAmounts[1].textContent.split('$')[1])
          );
        }
      }
      if (user.latterDaySaint === false) {
        incomePreviewAmounts[2].textContent = money.format(
          netIncomeInput.value - Number(incomePreviewAmounts[0].textContent.split('$')[1]) - Number(incomePreviewAmounts[1].textContent.split('$')[1])
        );
      }
    });

    const tithedSwitch = document.querySelector('.form__input--tithing');
    if (tithedSwitch) {
      tithedSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        toggleClass(tithedSwitch, `form__input--tithing`);
        toggleClass(tithedSwitch, `form__input--tithing--tithed`);
        tithed = !tithed;
        console.log(tithed);
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
      incomePreviewAmounts[0].textContent = money.format(0);
      incomePreviewAmounts[1].textContent = money.format(0);
      incomePreviewAmounts[2].textContent = money.format(0);
    });
  }

  // ** TOP PRIORITY ** When it is possible, record the income as a deposit transaction in the recent transactions page.

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

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
  console.log(smallContainerButtons);
  console.log(transactionSelects, transactionOptions, transactionButtons, transactionCreationContainer);

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
        console.log(transactionHeaderInputs, transactionHeaderInputsTwo);
        console.log(selectedAccount);
        if (selectedAccount !== `Investment Fund`) {
          // let transaction = new Transaction.Transaction({ date: transactionHeaderInputs[0].value, type: `Withdrawal`, location: transactionHeaderInputsTwo[0].value });
          transaction.transactionType = `Withdrawal`;
          console.log(transaction);
          const receiptRow = document.createElement('section');
          receiptRow.classList.add('receipt-item-container__row');
          receiptRow.classList.add('r__receipt-item-container__row');
          insertElement(receiptItemContainer, receiptRow);

          const transactionDetails = document.createElement('section');
          transactionDetails.classList.add('transaction-item-details');
          transactionDetails.classList.add('r__transaction-item-details');

          insertElement(receiptRow, transactionDetails);

          const transactionCostDetails = document.createElement('section');
          transactionCostDetails.classList.add('transaction-item-cost');
          transactionCostDetails.classList.add('r__transaction-item-cost');
          insertElement(receiptRow, transactionCostDetails);

          let detailCount = 1;
          let detailStart = 0;
          console.log(selectedAccount);
          if (selectedAccount === `Monthly Budget` || selectedAccount === `Debt`) {
            detailCount = 2;
            console.log(detailCount);
          }
          console.log(detailCount);
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
            insertElement(transactionDetails, receiptDetail);
            detailStart++;
          }

          console.log(transactionAmount, transactionAmount.firstChild.value, typeof transactionAmount.firstChild.value, money.format(Number(transactionAmount.value)));
          const receiptDetailCost = document.createElement('p');
          receiptDetailCost.classList.add('transaction-item-cost__cost');
          receiptDetailCost.classList.add('r__transaction-item-cost__cost');
          receiptDetailCost.textContent = money.format(Number(transactionAmount.firstChild.value));
          insertElement(transactionCostDetails, receiptDetailCost);

          const removeTransactionItemIcon = document.createElement('i');
          removeTransactionItemIcon.classList.add('fas');
          removeTransactionItemIcon.classList.add('fa-trash-alt');
          removeTransactionItemIcon.classList.add('remove-transaction');
          removeTransactionItemIcon.classList.add('r__remove-transaction');
          removeTransactionItemIcon.classList.add('closed');
          insertElement(transactionCostDetails, removeTransactionItemIcon);

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
          insertElement(receiptItemContainer, receiptRow);

          const transactionDetails = document.createElement('section');
          transactionDetails.classList.add('transaction-item-details');
          transactionDetails.classList.add('r__transaction-item-details');

          insertElement(receiptRow, transactionDetails);

          const transactionCostDetails = document.createElement('section');
          transactionCostDetails.classList.add('transaction-item-cost');
          transactionCostDetails.classList.add('r__transaction-item-cost');
          insertElement(receiptRow, transactionCostDetails);

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
            insertElement(transactionDetails, receiptDetail);
            detailStart++;
          }

          console.log(transactionAmount, transactionAmount.firstChild.value, typeof transactionAmount.firstChild.value, money.format(Number(transactionAmount.value)));
          const receiptDetailCost = document.createElement('p');
          receiptDetailCost.classList.add('transaction-item-cost__cost');
          receiptDetailCost.classList.add('r__transaction-item-cost__cost');
          receiptDetailCost.textContent = money.format(Number(transactionAmount.firstChild.value));
          insertElement(transactionCostDetails, receiptDetailCost);

          const removeTransactionItemIcon = document.createElement('i');
          removeTransactionItemIcon.classList.add('fas');
          removeTransactionItemIcon.classList.add('fa-trash-alt');
          removeTransactionItemIcon.classList.add('remove-transaction');
          removeTransactionItemIcon.classList.add('r__remove-transaction');
          removeTransactionItemIcon.classList.add('closed');
          insertElement(transactionCostDetails, removeTransactionItemIcon);

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
        fullTransactionCost.textContent = money.format(receiptCost);
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
        // console.log(placeholderBudget);
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
        console.log(updateObject);
        placeholderBudget._updateBudget({ updateObject: updateObject }, `Dashboard`);
        const fullTransactionCost = document.querySelectorAll('.container--small__transaction-total__amount')[0];
        fullTransactionCost.textContent = money.format(0);
      });
    }
  }
};

const _watchBudgetNavigation = () => {
  const budgetNavButton = document.querySelector('.button--budget-navigation');
  const budgetNavigation = document.querySelector('.navigation');
  const linkButtons = document.querySelectorAll('.navigation__link-list__list-item__link-button');

  if (budgetNavButton) {
    budgetNavButton.addEventListener('click', (e) => {
      e.preventDefault();
      budgetNavButton.classList.toggle('button--budget-navigation--clicked');
      budgetNavigation.classList.toggle('closed');
      budgetNavigation.classList.toggle('open-navigation');
      if (!budgetNavButton.classList.contains('budget-navigation--visible')) linkButtons.forEach((lb) => lb.closest('li').nextSibling.classList.add('closed'));
    });
  }
  if (linkButtons) {
    linkButtons.forEach((lb) => {
      lb.addEventListener('click', (e) => {
        e.preventDefault();
        const clicked = e.target.closest('li');
        const siblingLinkContainer = clicked.nextSibling;
        linkButtons.forEach((lb) => {
          // if (lb.closest('li').nextSibling.classList.contains('open')) {
          //   lb.closest('li').nextSibling.classList.add('closed');
          //   lb.closest('li').nextSibling.classList.remove('open');
          // }
          // if (lb.closest('li').nextSibling.classList.contains('closed')) {
          //   lb.closest('li').nextSibling.classList.add('closed');
          //   lb.closest('li').nextSibling.classList.remove('open');
          // }
          lb.closest('li').nextSibling.classList.add('closed');
          lb.closest('li').nextSibling.classList.remove('open');
        });
        if (!siblingLinkContainer.classList.contains('open')) {
          siblingLinkContainer.classList.toggle('closed');
          siblingLinkContainer.classList.toggle('open');
        }
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

const createMonthlyBudgetTransactionPlans = (budget, placeholderBudget, user) => {
  console.log(placeholderBudget.transactions.plannedTransactions, budget.transactions.plannedTransactions);
  let updateObject = { budgetId: budget._id, userId: user._id };
  console.log(updateObject);
  placeholderBudget.mainCategories.forEach((mc, i) => {
    mc.subCategories.forEach((sc, i) => {
      if (sc.timingOptions.paymentSchedule) {
        let index = i;
        // LOOPING THROUGH SUB CATEGORY PAYMENT SCHEDULE
        sc.timingOptions.paymentSchedule.forEach((date, i) => {
          let found = false;
          console.log(date, date.length);
          if (typeof date === `object` && date.length > 1) {
            date.forEach((date) => {
              console.log(new Date(date), new Date(date).toISOString());
            });
          }
          // LOOP THROUGH PLANNED TRANSACTIONS FOR EACH DATE IN PAYMENT SCHEDULE
          placeholderBudget.transactions.plannedTransactions.forEach((plan, i) => {
            // console.log(plan);
            // CHECKING IF THE PLAN IS A MONTHLY BUDGET ONE, AND THAT IT CONTAINS THE MAIN CATEGORY AND SUB CATEGORY
            if (plan.account === `Monthly Budget` && plan.subAccount === mc.title && plan.name === sc.title) {
              // THEN, CHECK IF THE PAYMENT SCHEDULE ITEM IS AN ARRAY OF 2 DATES OR 1.
              if (date.length > 1 && typeof date === `object`) {
                console.log(`Dates...`);
                date.forEach((newDate) => {
                  console.log(new Date(newDate).toISOString());

                  if (plan.timingOptions.dueDates.includes(new Date(newDate).toISOString())) {
                    console.log(plan);
                    console.log(plan.timingOptions.dueDates);
                    if (sc.goalAmount !== plan.amount) {
                      found = true;
                      console.log(`Found |`, `${plan.account} |`, `${plan.subAccount} |`, `${plan.name} |`, `${plan.timingOptions.dueDates} | ${i}`);
                      return (plan.amount = sc.goalAmount);
                    }
                    found = true;
                    return console.log(`Found |`, `${plan.account} |`, `${plan.subAccount} |`, `${plan.name} |`, `${plan.timingOptions.dueDates} | ${i}`);
                  }
                });
              }
              // IF PAYMENT SCHEDULE DATE IS ONE ITEM
              if (date.length === 24) {
                if (plan.timingOptions.dueDates.includes(new Date(date).toISOString())) {
                  console.log(plan);
                  console.log(plan.timingOptions.dueDates);
                  if (sc.goalAmount !== plan.amount) {
                    return (plan.amount = sc.goalAmount);
                  }
                  found = true;
                  return;
                }
              }
            }
            if (plan.account !== `Monthly Budget` || plan.subAccount !== mc.title || plan.name !== sc.title) {
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
            // updateObject.transactions = placeholderBudget.transsactions;
            // placeholderBudget._updateBudget({updateObject: updateObject}, `Transaction-Planner`);
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
              // updateObject.transactions = placeholderBudget.transsactions;
              // placeholderBudget._updateBudget({updateObject: updateObject}, `Transaction-Planner`);
            });
          }
        });
      }
    });
  });
  updateObject.transactions = placeholderBudget.transactions;
  placeholderBudget._updateBudget({ updateObject: updateObject }, `Transaction-Planner`);
};

const setupDashboard = (user, budget, placeholderBudget) => {
  console.log(user);
  // THE LOGGED USER ABOVE SHOWED THAT THE DATE THE PASSWORD WAS CHANGED IS STILL SHOWING. THAT NEEDS TO BE CHANGED.
  ////////////////////////////////////////////
  // WATCH THE BUDGET NAVIGATION
  _watchBudgetNavigation();

  ////////////////////////////////////////////
  // CREATE TRANSACTION PLANS
  createMonthlyBudgetTransactionPlans(budget, placeholderBudget, user);

  ////////////////////////////////////////////
  // WATCH FOR ACCOUNT SELECTION
  _watchForTransactions(budget, placeholderBudget, user);

  ////////////////////////////////////////////
  // GET BANK ACCOUNT TOTAL
  getDashboardAccountTotals(budget, placeholderBudget, user);

  ////////////////////////////////////////////
  // SETUP BILL CALENDAR
  _setupBillCalendar(budget, placeholderBudget, user);
  ////////////////////////////////////////////
  // SETUP BILL CURRENT MONTH
  _setupCurrentMonth(budget);
};

export const _watchBudget = async () => {
  console.log(`WATCHING YOUR BUDGET`);
  /////////////////////////////
  // GET USER
  let person = new Person.Person(``, ``, ``, ``, ``, ``, ``, ``);
  const userInfo = await person._getPersonData();
  const user = userInfo.data.data.user;
  let placeholderUser = await person._getPersonData();

  ////////////////////////////////////////////
  // GET BUDGET INFORMATION
  let currentBudget;
  user.budgets.forEach((b) => {
    if (b._id === window.location.pathname.split('/')[5]) currentBudget = b;
  });
  let budget = Budget.startToCreate();
  budget._buildPlaceHolderBudget(currentBudget, user);
  console.log(budget);

  if (!currentBudget) return;
  ////////////////////////////////////////////
  // WATCH BUDGET MANAGEMENT PAGE
  setupDashboard(user, currentBudget, budget);
  ////////////////////////////////////////////
  // WATCH BUDGET MANAGEMENT PAGE
  _setupBudgetManagement(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH EDIT CATEGORY GOALS PAGE
  _watchEditCategoryGoals(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH MANAGE CATEGORIES PAGE
  _watchManageCategories(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  _watchIncomeAllocation(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  _watchTransactionPlanner(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  _watchInvestmentPlanner(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  _watchDebtManager(currentBudget, budget, user);
  ////////////////////////////////////////////
  // WATCH FOR INCOME ALLOCATION
  _watchRecentTransactions(currentBudget, budget, user);
};
