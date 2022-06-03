import * as Utility from './../Application/Utility';

const getReceiptTotal = (transaction) => {
  let total = 0;
  transaction.receipt.forEach((receiptItem) => {
    total += receiptItem.amount;
  });
  return total;
};

const processReceipt = (transaction, button) => {
  const viewReceiptButtons = [...document.querySelectorAll('.button--extra-extra-small__view-receipt')];
  const viewReceiptButtonIndex = viewReceiptButtons.indexOf(button);
  const receiptLocation = document.querySelector('.modal--receipt__digital-receipt__container__header__title');
  receiptLocation.textContent = `${Utility._capitalize(transaction.location)}`;

  const receiptItemContainer = document.querySelector('.modal--receipt__digital-receipt__container__item-container');
  // receiptItemContainer.innerHTML = '';
  while (receiptItemContainer.firstChild) {
    receiptItemContainer.removeChild(receiptItemContainer.firstChild);
  }
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
  let receiptTotal = 0;
  transaction.receipt.forEach((receiptItem, i) => {
    const receiptRow = document.createElement('section');
    receiptRow.classList.add('modal--receipt__digital-receipt__container__item-container__row');
    receiptRow.classList.add('r__modal--receipt__digital-receipt__container__item-container__row');
    Utility.insertElement(`beforeend`, receiptItemContainer, receiptRow);

    const receiptDetailsSection = document.createElement('section');
    receiptDetailsSection.classList.add('receipt-row__transaction-details-section');
    receiptDetailsSection.classList.add('r__receipt-row__transaction-details-section');
    Utility.insertElement(`beforeend`, receiptRow, receiptDetailsSection);

    const receiptCostSection = document.createElement('section');
    receiptCostSection.classList.add('receipt-row__transaction-cost-section');
    receiptCostSection.classList.add('r__receipt-row__transaction-cost-section');
    Utility.insertElement(`beforeend`, receiptRow, receiptCostSection);

    if (receiptItem.account === `Debt`) {
      const receiptItemDetail = document.createElement('p');
      receiptItemDetail.classList.add('receipt-row__transaction-details-section__name');
      receiptItemDetail.classList.add('r__receipt-row__transaction-details-section__name');
      const receiptItemDetailTwo = document.createElement('p');
      receiptItemDetailTwo.classList.add('receipt-row__transaction-details-section__name');
      receiptItemDetailTwo.classList.add('r__receipt-row__transaction-details-section__name');
      receiptItemDetail.textContent = `Unknown`;
      if (receiptItem.lender) {
        receiptItemDetail.textContent = `${receiptItem.lender}`;
      }
      receiptItemDetailTwo.textContent = `Unknown`;
      if (receiptItem.description) {
        receiptItemDetailTwo.textContent = `${receiptItem.description}`;
      }
      Utility.insertElement(`beforeend`, receiptDetailsSection, receiptItemDetail);
      Utility.insertElement(`beforeend`, receiptDetailsSection, receiptItemDetailTwo);

      const receiptCostDetail = document.createElement('p');
      receiptCostDetail.classList.add('receipt-row__cost-section__cost');
      receiptCostDetail.classList.add('r__receipt-row__cost-section__cost');
      receiptCostDetail.textContent = money.format(receiptItem.amount);
      Utility.insertElement(`beforeend`, receiptCostSection, receiptCostDetail);
    }
    if (receiptItem.account !== `Debt`) {
      const receiptItemDetail = document.createElement('p');
      receiptItemDetail.classList.add('receipt-row__transaction-details-section__name');
      receiptItemDetail.classList.add('r__receipt-row__transaction-details-section__name');
      receiptItemDetail.textContent = Utility._capitalize(`paycheck`);
      if (receiptItem.description) {
        receiptItemDetail.textContent = Utility._capitalize(receiptItem.description);
      }
      Utility.insertElement(`beforeend`, receiptDetailsSection, receiptItemDetail);

      const receiptCostDetail = document.createElement('p');
      receiptCostDetail.classList.add('receipt-row__cost-section__cost');
      receiptCostDetail.classList.add('r__receipt-row__cost-section__cost');
      receiptCostDetail.textContent = money.format(receiptItem.amount);
      Utility.insertElement(`beforeend`, receiptCostSection, receiptCostDetail);
    }
    receiptTotal += receiptItem.amount;
  });
  const receiptFooterTexts = document.querySelectorAll('.footer-title');
  const receiptTotalAmount = receiptFooterTexts[1];
  receiptTotalAmount.textContent = money.format(receiptTotal);
};

const showRecentTransaction = (budget, placeholderBudget, user, transaction) => {
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const receiptModal = document.querySelector('.modal--receipt');
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
      Utility.insertElement(`beforeend`, viewReceiptButton, viewReceiptButtonIcon);
      Utility.insertElement(`beforeend`, viewReceiptButton, viewReceiptButtonText);
      Utility.insertElement(`beforeend`, recentTransactionSection, viewReceiptButton);
      viewReceiptButton.addEventListener('click', (e) => {
        processReceipt(transaction, viewReceiptButton);
        Utility.showElement(receiptModal);
      });
    }
    if (sectionStart === 1) {
      let transactionTypeText = document.createElement('p');
      transactionTypeText.classList.add('recent-transaction__section__text');
      transactionTypeText.classList.add('r__recent-transaction__section__text');
      transactionTypeText.textContent = `${transaction.transactionType}`;
      Utility.insertElement(`beforeend`, recentTransactionSection, transactionTypeText);
    }
    if (sectionStart === 2) {
      let transactionTypeText = document.createElement('p');
      transactionTypeText.classList.add('recent-transaction__section__text');
      transactionTypeText.classList.add('r__recent-transaction__section__text');
      transactionTypeText.textContent = `${new Date(transaction.transactionDate).getDate()} ${months[new Date(transaction.transactionDate).getMonth()]} ${new Date(
        transaction.transactionDate
      ).getFullYear()}`;
      Utility.insertElement(`beforeend`, recentTransactionSection, transactionTypeText);
    }
    if (sectionStart === 3) {
      let transactionTypeText = document.createElement('p');
      transactionTypeText.classList.add('recent-transaction__section__text');
      transactionTypeText.classList.add('r__recent-transaction__section__text');
      transactionTypeText.textContent = `${transaction.location}`;
      Utility.insertElement(`beforeend`, recentTransactionSection, transactionTypeText);
    }
    if (sectionStart === 4) {
      let transactionTypeText = document.createElement('p');
      transactionTypeText.classList.add('recent-transaction__section__text');
      transactionTypeText.classList.add('r__recent-transaction__section__text');
      transactionTypeText.textContent = `${transaction.receipt[0].account}`;
      Utility.insertElement(`beforeend`, recentTransactionSection, transactionTypeText);
    }
    if (sectionStart === 5) {
      let receiptHeaders = Object.keys(transaction.receipt[0]);
      let receiptValues = Object.values(transaction.receipt[0]);
      let transactionSectionPart = document.createElement('section');
      transactionSectionPart.classList.add('recent-transaction__section__part');
      transactionSectionPart.classList.add('r__recent-transaction__section__part');
      Utility.insertElement(`beforeend`, recentTransactionSection, transactionSectionPart);
      let transactionSectionPartHeader = document.createElement('p');
      let transactionSectionPartText = document.createElement('p');
      transactionSectionPartHeader.classList.add(`recent-transaction__section__part__header`);
      transactionSectionPartHeader.classList.add(`r__recent-transaction__section__part__header`);
      transactionSectionPartHeader.textContent = `Receipt Total`;
      transactionSectionPartText.classList.add(`recent-transaction__section__part__text`);
      transactionSectionPartText.classList.add(`r__recent-transaction__section__part__text`);
      transactionSectionPartText.textContent = money.format(getReceiptTotal(transaction));
      Utility.insertElement(`beforeend`, transactionSectionPart, transactionSectionPartHeader);
      Utility.insertElement(`beforeend`, transactionSectionPart, transactionSectionPartText);
    }
    Utility.insertElement(`beforeend`, recentTransaction, recentTransactionSection);
    sectionStart++;
  }
  Utility.insertElement(`beforeend`, recentTransactionDisplay, recentTransaction);
};

export const _watchRecentTransactions = (budget, placeholderBudget, user) => {
  const receiptModal = document.querySelector('.modal--receipt');
  const receiptModalClosureIcon = document.querySelector('.modal--receipt__closure-icon');
  const viewReceiptButton = document.querySelector('.button--extra-extra-small__view-receipt');
  if (placeholderBudget.transactions.recentTransactions.length > 0) {
    placeholderBudget.transactions.recentTransactions.forEach((transaction, i) => {
      showRecentTransaction(budget, placeholderBudget, user, transaction);
    });
    if (receiptModalClosureIcon) {
      receiptModalClosureIcon.addEventListener('click', (e) => {
        Utility.showElement(receiptModal);
      });
    }
    if (viewReceiptButton) {
      viewReceiptButton.addEventListener('click', (e) => {
        Utility.showElement(receiptModal);
      });
    }
  }
};
