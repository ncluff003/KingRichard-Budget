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
  const coverImage = document.createElement('img');
  const changePhotoButton = document.createElement('button');
  const changePhotoIcon = document.createElement('i');
  // ADD CLASSES TO CONTENT ELEMENTS
  coverImage.classList.add('budget-card-container__card__content__cover-photo');
  changePhotoButton.classList.add('budget-card-container__card__content__change-photo-button');
  changePhotoIcon.classList.add('fas');
  changePhotoIcon.classList.add('fa-camera');
  changePhotoIcon.classList.add('budget-card-container__card__content__change-photo-button__icon');
  // ADD CONTENT TO CONTENT ELEMENTS
  coverImage.src = `${coverPhoto}`;
  coverImage.alt = `Budget Cover Photo`;
  changePhotoButton.insertAdjacentElement('beforeend', changePhotoIcon);
  // INSERT CONTENT ELEMENTS INTO CONTENT
  budgetContent.insertAdjacentElement('beforeend', coverImage);
  budgetContent.insertAdjacentElement('beforeend', changePhotoButton);

  // FOOTER
  // CREATE FOOTER ELEMENTS
  const footerTop = document.createElement('section');
  const footerBottom = document.createElement('section');
  const createdAtParagraph = document.createElement('p');
  const lastUpdatedParagraph = document.createElement('p');
  const budgetAdminParagraph = document.createElement('p');
  // ADD CLASSES TO FOOTER ELEMENTS
  footerTop.classList.add('budget-card-container__card__footer--top');
  footerBottom.classList.add('budget-card-container__card__footer--bottom');
  createdAtParagraph.classList.add('budget-card-container__card__footer--top__first');
  lastUpdatedParagraph.classList.add('budget-card-container__card__footer--top__last');
  budgetAdminParagraph.classList.add('budget-card-container__card__footer--bottom__text');
  // ADD CONTENT TO FOOTER ELEMENTS
  createdAtParagraph.textContent = `Created At: ${createdAt}`;
  lastUpdatedParagraph.textContent = `Last Updated: ${lastUpdated}`;
  budgetAdminParagraph.textContent = `Budget Admins: ${administrators}`;
  // INSERT FOOTER ELEMENTS INTO FOOTER
  budgetFooter.insertAdjacentElement('beforeend', footerTop);
  budgetFooter.insertAdjacentElement('beforeend', footerBottom);
  footerTop.insertAdjacentElement('beforeend', createdAtParagraph);
  footerTop.insertAdjacentElement('beforeend', lastUpdatedParagraph);
  footerBottom.insertAdjacentElement('beforeend', budgetAdminParagraph);

  // ADD CARD TO CONTAINER
  budgetCardContainer.insertAdjacentElement('afterbegin', budgetCard);
};
