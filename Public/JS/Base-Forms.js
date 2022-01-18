import * as Signup from './Signup';

//////////////////////////////
// Actually Close The Form
const _closeTheForm = (index, page, pageElement, form) => {
  form[index].classList.toggle('form-container--open');
  if (pageElement) {
    pageElement.textContent = `Page ${page + 1} / 4`;
  }
};

//////////////////////////////
// Watch Form Closing Buttons
export const _watchFormClosers = (pageElement, page, form) => {
  const formClosers = document.querySelectorAll('.form-close-icon');
  page = 0;
  formClosers.forEach((fc, i) => {
    fc.addEventListener('click', (e) => {
      e.preventDefault();
      _closeTheForm(i, page, pageElement, form);
    });
  });
};

export const _watchEntranceButtons = (person, form, formPage) => {
  //////////////////////////////
  // Initialize Entrance Buttons.
  const forgottenUsernameOrPasswordLink = document.querySelector('.login-form__section__forgot-username-or-password-link');
  const entranceButtons = [...document.querySelectorAll('.entrance-button'), forgottenUsernameOrPasswordLink];
  entranceButtons.forEach((eb, i) => {
    if (eb) {
      eb.addEventListener('click', (e) => {
        e.preventDefault();
        //////////////////////////////////////////////////////////////
        // OPEN UP THE SELECTED FORM
        form[i].classList.toggle('form-container--open');

        //////////////////////////////////////////////////////////////
        // SETUP THE SIGNUP FORM IF IT IS THE SELECTED FORM
        if (i === 1) {
          const formPages = document.querySelectorAll('.signup-form__form-page');
          Signup._setupSignupForm(formPage, formPages, person);
        }
      });
    }
  });
};
