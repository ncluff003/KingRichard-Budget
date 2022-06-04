import * as Utility from './../Application/Utility';

const watchInvestmentValueConfirmationButtons = (event, index, secondaryIndex, budget, placeholderBudget, user) => {
  const confirmInvestmentValueButtons = document.querySelectorAll('.button--confirm-value');
  let investments = budget.investments;
  confirmInvestmentValueButtons[index].removeEventListener('click', watchInvestmentValueConfirmationButtons);
  const updateCurrentValueInput = document.querySelectorAll('.form__input--investment');

  investments[secondaryIndex].currentValue = Number(updateCurrentValueInput[index].value);
  investments[secondaryIndex].valueDifference = Number(investments[secondaryIndex].currentValue - investments[secondaryIndex].initialInvestment);
  updateCurrentValueInput[index].setAttribute(`readonly`, true);

  placeholderBudget._updateBudget({ updateObject: { budgetId: budget._id, userId: user._id, investments: investments } }, `Investment-Planner`);
};

const _watchForCurrentValueUpdate = (event, index, secondaryIndex, budget, placeholderBudget, user) => {
  const updateCurrentValueInput = document.querySelectorAll('.form__input--investment');

  if (updateCurrentValueInput[index].readOnly === true) {
    updateCurrentValueInput[index].removeAttribute(`readonly`);

    const confirmInvestmentValueButtons = document.querySelectorAll('.button--confirm-value');

    return confirmInvestmentValueButtons[index].addEventListener('click', watchInvestmentValueConfirmationButtons.bind(null, event, index, secondaryIndex, budget, placeholderBudget, user));
  }
  if (updateCurrentValueInput[index].readOnly === '' || updateCurrentValueInput[index].readOnly === false) {
    return updateCurrentValueInput[index].setAttribute(`readonly`, true);
  }
};

const settleInvestment = (investments, index, dataIndex, budget, placeholderBudget, user) => {
  const investmentContainers = document.querySelectorAll('.investment-container');

  const settledInvestmentShellContainer = document.createElement('section');
  settledInvestmentShellContainer.classList.add('container--extra-small__margin-left-and-right');
  settledInvestmentShellContainer.classList.add('r__container--extra-small__margin-left-and-right');

  Utility.insertElement(`beforeend`, investmentContainers[1], settledInvestmentShellContainer);

  const settledInvestmentContainerHeader = document.createElement('section');
  settledInvestmentContainerHeader.classList.add('container--extra-small__margin-left-and-right__header');
  settledInvestmentContainerHeader.classList.add('r__container--extra-small__margin-left-and-right__header');

  Utility.insertElement(`beforeend`, settledInvestmentShellContainer, settledInvestmentContainerHeader);

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

    Utility.insertElement(`beforeend`, settledInvestmentContainerHeader, investmentHeaderIcon);
    const investmentHeaderText = document.createElement('p');
    investmentHeaderText.classList.add('container--extra-small__margin-left-and-right__header__text');
    investmentHeaderText.classList.add('r__container--extra-small__margin-left-and-right__header__text');
    investmentHeaderText.textContent = investments[index].firstChild.firstChild.nextSibling.textContent;

    Utility.insertElement(`beforeend`, settledInvestmentContainerHeader, investmentHeaderText);

    // CREATE INVESTMENT CONTENT
    const investmentContent = document.createElement('section');
    investmentContent.classList.add('container--extra-small__margin-left-and-right__content__column');
    investmentContent.classList.add('r__container--extra-small__margin-left-and-right__content__column');

    Utility.insertElement(`beforeend`, settledInvestmentShellContainer, investmentContent);

    // CREATE INVESTMENT EXPLANATORY CONTENT
    const investmentExplanationSection = document.createElement('section');
    investmentExplanationSection.classList.add('investment-explanatory-information');
    investmentExplanationSection.classList.add('r__investment-explanatory-information');

    Utility.insertElement(`beforeend`, investmentContent, investmentExplanationSection);

    const investmentDescription = document.createElement('section');
    investmentDescription.classList.add('investment-description');
    investmentDescription.classList.add('r__investment-description');

    Utility.insertElement(`beforeend`, investmentExplanationSection, investmentDescription);

    const investmentDescriptionText = document.createElement('p');
    investmentDescriptionText.classList.add('investment-description__text');
    investmentDescriptionText.classList.add('r__investment-description__text');
    investmentDescriptionText.textContent = investments[index].firstChild.nextSibling.firstChild.firstChild.firstChild.textContent;

    const settledInvestmentValueContainer = document.createElement('section');
    settledInvestmentValueContainer.classList.add('investment-value-information--settled');
    settledInvestmentValueContainer.classList.add('r__investment-value-information--settled');

    Utility.insertElement(`beforeend`, investmentContent, settledInvestmentValueContainer);

    const settledValueContainerText = document.createElement('p');
    settledValueContainerText.classList.add('investment-value-information--settled__text');
    settledValueContainerText.classList.add('r__investment-value-information--settled__text');

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

    Utility.insertElement(`beforeend`, settledInvestmentValueContainer, settledValueContainerText);
  }

  if (!investments[index].firstChild.firstChild) {
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

    Utility.insertElement(`beforeend`, settledInvestmentContainerHeader, investmentHeaderIcon);
    const investmentHeaderText = document.createElement('p');
    investmentHeaderText.classList.add('container--extra-small__margin-left-and-right__header__text');
    investmentHeaderText.classList.add('r__container--extra-small__margin-left-and-right__header__text');
    investmentHeaderText.textContent = investments[index].firstChild.nextSibling.firstChild.nextSibling.textContent;

    Utility.insertElement(`beforeend`, settledInvestmentContainerHeader, investmentHeaderText);

    // CREATE INVESTMENT CONTENT
    const investmentContent = document.createElement('section');
    investmentContent.classList.add('container--extra-small__margin-left-and-right__content__column');
    investmentContent.classList.add('r__container--extra-small__margin-left-and-right__content__column');

    Utility.insertElement(`beforeend`, settledInvestmentShellContainer, investmentContent);

    // CREATE INVESTMENT EXPLANATORY CONTENT
    const investmentExplanationSection = document.createElement('section');
    investmentExplanationSection.classList.add('investment-explanatory-information');
    investmentExplanationSection.classList.add('r__investment-explanatory-information');

    Utility.insertElement(`beforeend`, investmentContent, investmentExplanationSection);

    const investmentDescription = document.createElement('section');
    investmentDescription.classList.add('investment-description');
    investmentDescription.classList.add('r__investment-description');

    Utility.insertElement(`beforeend`, investmentExplanationSection, investmentDescription);

    const investmentDescriptionText = document.createElement('p');
    investmentDescriptionText.classList.add('investment-description__text');
    investmentDescriptionText.classList.add('r__investment-description__text');

    investmentDescriptionText.textContent = investments[index].firstChild.nextSibling.nextSibling.firstChild.firstChild.textContent;

    Utility.insertElement(`beforeend`, investmentDescription, investmentDescriptionText);

    const settledInvestmentValueContainer = document.createElement('section');
    settledInvestmentValueContainer.classList.add('investment-value-information--settled');
    settledInvestmentValueContainer.classList.add('r__investment-value-information--settled');

    Utility.insertElement(`beforeend`, investmentContent, settledInvestmentValueContainer);

    const settledValueContainerText = document.createElement('p');
    settledValueContainerText.classList.add('investment-value-information--settled__text');
    settledValueContainerText.classList.add('r__investment-value-information--settled__text');

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

    Utility.insertElement(`beforeend`, settledInvestmentValueContainer, settledValueContainerText);
  }

  budget.investments[dataIndex].settled = !budget.investments[dataIndex].settled;
  placeholderBudget._updateBudget({ updateObject: { budgetId: budget._id, userId: user._id, investments: budget.investments } }, `Investment-Planner`);
  investments[index].remove();
  Utility.reloadPage();
};

const renderNewInvestment = (options, utility) => {
  const investmentContainers = document.querySelectorAll('.container--extra-small__margin-left-and-right');
  const investmentAccountPreview = investmentContainers[0];

  const investmentShellContainer = document.createElement('section');
  investmentShellContainer.classList.add('container--extra-small__margin-left-and-right');
  investmentShellContainer.classList.add('r__container--extra-small__margin-left-and-right');

  investmentShellContainer.dataset.investment = options.budget.investments.length;

  investmentAccountPreview.insertAdjacentElement('afterend', investmentShellContainer);
  const investmentHeader = document.createElement('section');
  investmentHeader.classList.add('container--extra-small__margin-left-and-right__header');
  investmentHeader.classList.add('r__container--extra-small__margin-left-and-right__header');
  Utility.insertElement(`beforeend`, investmentShellContainer, investmentHeader);

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

  Utility.insertElement(`beforeend`, investmentHeader, investmentHeaderIcon);
  const investmentHeaderText = document.createElement('p');
  investmentHeaderText.classList.add('container--extra-small__margin-left-and-right__header__text');
  investmentHeaderText.classList.add('r__container--extra-small__margin-left-and-right__header__text');
  investmentHeaderText.textContent = options.name;

  Utility.insertElement(`beforeend`, investmentHeader, investmentHeaderText);

  const investmentHeaderType = document.createElement('p');
  investmentHeaderType.classList.add('container--extra-small__margin-left-and-right__header__investment-type');
  investmentHeaderType.classList.add('r__container--extra-small__margin-left-and-right__header__investment-type');
  investmentHeaderType.textContent = options.type;

  Utility.insertElement(`beforeend`, investmentHeader, investmentHeaderType);

  // CREATE INVESTMENT CONTENT
  const investmentContent = document.createElement('section');
  investmentContent.classList.add('container--extra-small__margin-left-and-right__content__column');
  investmentContent.classList.add('r__container--extra-small__margin-left-and-right__content__column');

  Utility.insertElement(`beforeend`, investmentShellContainer, investmentContent);

  // CREATE INVESTMENT EXPLANATORY CONTENT
  const investmentExplanationSection = document.createElement('section');
  investmentExplanationSection.classList.add('investment-explanatory-information');
  investmentExplanationSection.classList.add('r__investment-explanatory-information');

  Utility.insertElement(`beforeend`, investmentContent, investmentExplanationSection);

  const investmentDescription = document.createElement('section');
  investmentDescription.classList.add('investment-description');
  investmentDescription.classList.add('r__investment-description');

  Utility.insertElement(`beforeend`, investmentExplanationSection, investmentDescription);

  const investmentDescriptionText = document.createElement('p');
  investmentDescriptionText.classList.add('investment-description__text');
  investmentDescriptionText.classList.add('r__investment-description__text');
  investmentDescriptionText.textContent = options.description;

  Utility.insertElement(`beforeend`, investmentDescription, investmentDescriptionText);

  const investmentSettleContainer = document.createElement('section');
  investmentSettleContainer.classList.add('investment-settle-container');
  investmentSettleContainer.classList.add('r__investment-settle-container');

  Utility.insertElement(`beforeend`, investmentExplanationSection, investmentSettleContainer);

  const investmentSettleButton = document.createElement('button');
  investmentSettleButton.classList.add('button--settle');
  investmentSettleButton.classList.add('r__button--settle');

  Utility.insertElement(`beforeend`, investmentSettleContainer, investmentSettleButton);

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

  Utility.insertElement(`beforeend`, investmentSettleButton, investmentSettleButtonText);

  const investmentValueInformationContainer = document.createElement('section');
  investmentValueInformationContainer.classList.add('investment-value-information');
  investmentValueInformationContainer.classList.add('r__investment-value-information');

  Utility.insertElement(`beforeend`, investmentContent, investmentValueInformationContainer);

  const investmentValueInformationContainerHalfOne = document.createElement('section');
  const investmentValueInformationContainerHalfTwo = document.createElement('section');

  investmentValueInformationContainerHalfOne.classList.add('investment-value-information__half');
  investmentValueInformationContainerHalfOne.classList.add('r__investment-value-information__half');

  investmentValueInformationContainerHalfTwo.classList.add('investment-value-information__half');
  investmentValueInformationContainerHalfTwo.classList.add('r__investment-value-information__half');

  Utility.insertElement(`beforeend`, investmentValueInformationContainer, investmentValueInformationContainerHalfOne);
  Utility.insertElement(`beforeend`, investmentValueInformationContainer, investmentValueInformationContainerHalfTwo);

  const investmentValueInformationContainerHalfOneHeader = document.createElement('p');
  const investmentValueInformationContainerHalfTwoHeader = document.createElement('p');

  investmentValueInformationContainerHalfOneHeader.classList.add('investment-value-information__half__header');
  investmentValueInformationContainerHalfTwoHeader.classList.add('investment-value-information__half__header');
  investmentValueInformationContainerHalfOneHeader.classList.add('r__investment-value-information__half__header');
  investmentValueInformationContainerHalfTwoHeader.classList.add('r__investment-value-information__half__header');

  investmentValueInformationContainerHalfOneHeader.textContent = `Initial Investment`;
  investmentValueInformationContainerHalfTwoHeader.textContent = `Current Value`;

  Utility.insertElement(`beforeend`, investmentValueInformationContainerHalfOne, investmentValueInformationContainerHalfOneHeader);
  Utility.insertElement(`beforeend`, investmentValueInformationContainerHalfTwo, investmentValueInformationContainerHalfTwoHeader);

  const investmentValueInformationContainerHalfOneText = document.createElement('p');
  investmentValueInformationContainerHalfOneText.classList.add('investment-value-information__half__text');
  investmentValueInformationContainerHalfOneText.classList.add('r__investment-value-information__half__text');
  investmentValueInformationContainerHalfOneText.textContent = utility.money.format(options.initialInvestment);

  Utility.insertElement(`beforeend`, investmentValueInformationContainerHalfOne, investmentValueInformationContainerHalfOneText);

  const investmentInputContainer = document.createElement('section');
  investmentInputContainer.classList.add('investment-input-container');
  investmentInputContainer.classList.add('r__investment-input-container');

  Utility.insertElement(`beforeend`, investmentValueInformationContainerHalfTwo, investmentInputContainer);

  const investmentInput = document.createElement('input');
  investmentInput.classList.add('form__input--investment');
  investmentInput.classList.add('r__form__input--investment');
  investmentInput.type = `number`;
  investmentInput.placeholder = `Enter New Value`;
  investmentInput.readOnly = true;

  Utility.insertElement(`beforeend`, investmentInputContainer, investmentInput);

  const investmentValueConfirmationButton = document.createElement('button');
  investmentValueConfirmationButton.classList.add('button--confirm-value');
  investmentValueConfirmationButton.classList.add('r__button--confirm-value');

  const investmentValueConfirmationButtonIcon = document.createElement('i');
  investmentValueConfirmationButtonIcon.classList.add('fas');
  investmentValueConfirmationButtonIcon.classList.add('fa-check');
  investmentValueConfirmationButtonIcon.classList.add('button--confirm-value__icon');
  investmentValueConfirmationButtonIcon.classList.add('r__button--confirm-value__icon');

  Utility.insertElement(`beforeend`, investmentValueConfirmationButton, investmentValueConfirmationButtonIcon);
  Utility.insertElement(`beforeend`, investmentInputContainer, investmentValueConfirmationButton);

  const investmentUpdateValueTextLink = document.createElement('p');
  investmentUpdateValueTextLink.classList.add('investment-value-information__half__update-text');
  investmentUpdateValueTextLink.classList.add('r__investment-value-information__half__update-text');
  investmentUpdateValueTextLink.textContent = `Update Value`;

  Utility.insertElement(`beforeend`, investmentValueInformationContainerHalfTwo, investmentUpdateValueTextLink);

  Utility.reloadPage();
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

export const _watchInvestmentPlanner = (budget, placeholderBudget, user, utility) => {
  const addInvestmentButton = document.querySelector('.container--extra-small__margin-left-and-right__content-icon');
  const closeInvestmentCreationButton = document.querySelector('.button--borderless-narrow__investment');
  const addInvestmentForm = document.querySelector('.form--extra-small__column');
  if (addInvestmentButton) {
    addInvestmentButton.addEventListener('click', (e) => {
      closeInvestmentCreationButton.classList.toggle('open');
      closeInvestmentCreationButton.classList.toggle('closed');
      Utility.replaceClassName(addInvestmentForm, `closed`, `open`);
      Utility.replaceClassName(addInvestmentButton, `open`, `closed`);
      closeInvestmentCreationButton.addEventListener('click', closeInvestmentCreation);
    });
    const investmentType = document.querySelector('.form__select--accounts-short');
    const investmentName = document.getElementById('investmentName');
    const investmentDescription = document.getElementById('investmentDescription');
    const initialInvestment = document.getElementById('initialInvestment');
    const createInvestmentButton = document.querySelector('.button--extra-extra-small__alt');
    createInvestmentButton.addEventListener('click', (e) => {
      e.preventDefault();
      renderNewInvestment(
        {
          type: investmentType.value,
          name: investmentName.value,
          description: investmentDescription.value,
          initialInvestment: Number(initialInvestment.value),
          budget: budget,
          placeholderBudget: placeholderBudget,
          user: user,
        },
        utility
      );
      let updateObject = {
        investments: [],
      };
      let currentValue = initialInvestment.value;
      let valueDifference = Number(currentValue - initialInvestment.value);
      if (isNaN(valueDifference)) valueDifference = 0;

      placeholderBudget.investments.push({
        investmentType: investmentType.value,
        investmentName: investmentName.value,
        investmentDescription: investmentDescription.value,
        initialInvestment: Number(initialInvestment.value),
        currentValue: Number(currentValue),
        valueDifference: valueDifference,
      });

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

      settleInvestment(investmentContainers, currentInvestmentIndex, Number(investmentContainers[currentInvestmentIndex].dataset.investment), budget, placeholderBudget, user);
    });
  });

  const openUpdateCurrentValueButtons = document.querySelectorAll('.investment-value-information__half__update-text');
  if (openUpdateCurrentValueButtons[0]) {
    openUpdateCurrentValueButtons.forEach((button, i) => {
      let index = Number(openUpdateCurrentValueButtons[i].closest('.container--extra-small__margin-left-and-right').dataset.investment);
      let boundListener = _watchForCurrentValueUpdate.bind(null, event, i, index, budget, placeholderBudget, user);

      button.addEventListener('click', boundListener);
    });
  }
};
