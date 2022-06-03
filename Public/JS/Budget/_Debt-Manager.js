import * as Utility from './../Application/Utility';

const payDebtOff = (budget, placeholderBudget, user, debt, paidSections, sectionStart) => {
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
    Utility.insertElement(`beforeend`, paidDebt, debtSection);
    if (sectionStart === 0) {
      const sectionHeader = document.createElement('p');
      sectionHeader.classList.add('debt--paid-title');
      sectionHeader.classList.add('r__debt--paid-title');
      sectionHeader.textContent = `Date`;

      const sectionContent = document.createElement('p');
      sectionContent.classList.add('debt--paid-text');
      sectionContent.classList.add('r__debt--paid-text');
      sectionContent.textContent = `${new Date(debt.date).getDate()} ${months[new Date(debt.date).getMonth()]} ${new Date(debt.date).getFullYear()}`;
      Utility.insertElement(`beforeend`, debtSection, sectionHeader);
      Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

      Utility.insertElement(`beforeend`, debtSection, sectionHeader);
      Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

      Utility.insertElement(`beforeend`, debtSection, sectionHeader);
      Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

      Utility.insertElement(`beforeend`, debtSection, sectionHeader);
      Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

      Utility.insertElement(`beforeend`, debtSection, sectionHeader);
      Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

      Utility.insertElement(`beforeend`, debtSection, sectionHeader);
      Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

export const _watchDebtManager = (budget, placeholderBudget, user) => {
  const debtDisplay = document.querySelectorAll('.debt-display--paid');
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
        Utility.insertElement(`beforeend`, debt, debtSection);

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
          Utility.insertElement(`beforeend`, debtSection, sectionHeader);
          Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

          Utility.insertElement(`beforeend`, debtSection, sectionHeader);
          Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

          Utility.insertElement(`beforeend`, debtSection, sectionHeader);
          Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

          Utility.insertElement(`beforeend`, debtSection, sectionHeader);
          Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

          Utility.insertElement(`beforeend`, debtSection, sectionHeader);
          Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

          Utility.insertElement(`beforeend`, debtSection, sectionHeader);
          Utility.insertElement(`beforeend`, debtSection, sectionContent);
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

          Utility.insertElement(`beforeend`, paidOffButton, paidOffButtonIcon);
          Utility.insertElement(`beforeend`, paidOffButton, paidOffButtonText);
          Utility.insertElement(`beforeend`, debtSection, paidOffButton);

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
      placeholderBudget._updateBudget({ updateObject: updateObject }, `Debt-Manager`);
      Utility.reloadPage();
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
  }
};
