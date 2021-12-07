export const createBudgetCard = (budgetName, createdAt, lastUpdated, administrators, coverPhoto) => {
  // CREATE BASE CARD ELEMENTS
  const budgetCardContainer = document.querySelector('.budget-card-container');
  const budgetCard = document.createElement('section');
  const budgetHeader = document.createElement('header');
  const budgetContent = document.createElement('section');
  const budgetFooter = document.createElement('section');
  budgetCard.classList.add('budget-card-container__card');
  budgetHeader.classList.add('budget-card-container__card__header');
  budgetContent.classList.add('budget-card-container__card__content');
  budgetFooter.classList.add('budget-card-container__card__footer');
  budgetCard.insertAdjacentElement('beforeend', budgetHeader);
  budgetCard.insertAdjacentElement('beforeend', budgetContent);
  budgetCard.insertAdjacentElement('beforeend', budgetFooter);

  // HEADER
  // CREATE HEADER ELEMENTS
  const cardTitle = document.createElement('p');
  const deleteButton = document.createElement('i');
  // ADD CLASSES TO HEADER ELEMENTS
  cardTitle.classList.add('budget-card-container__card__header__text');
  deleteButton.classList.add('fas');
  deleteButton.classList.add('fa-trash-alt');
  deleteButton.classList.add('budget-card-container__card__header__icon');
  // ADD CONTENT TO HEADER ELEMENTS
  cardTitle.textContent = budgetName;
  // INSERT HEADER ELEMENTS INTO HEADER
  budgetHeader.insertAdjacentElement('beforeend', cardTitle);
  budgetHeader.insertAdjacentElement('beforeend', deleteButton);

  // CONTENT
  // CREATE CONTENT ELEMENTS
  // ADD CLASSES TO CONTENT ELEMENTS
  // ADD CONTENT TO CONTENT ELEMENTS
  // INSERT CONTENT ELEMENTS INTO CONTENT

  // FOOTER
  // CREATE FOOTER ELEMENTS
  // ADD CLASSES TO FOOTER ELEMENTS
  // ADD CONTENT TO FOOTER ELEMENTS
  // INSERT FOOTER ELEMENTS INTO FOOTER

  // ADD CARD TO CONTAINER
  budgetCardContainer.insertAdjacentElement('afterbegin', budgetCard);
  console.log(budgetCardContainer);
};
