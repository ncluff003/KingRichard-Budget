import * as Login from './Login';
import * as Signup from './Signup';
import * as Password from './Reset-Password';
import * as Person from './Person';

//////////////////////////////
// Actually Close The Form
const _closeTheForm = (index, page, pageElement, form) => {
  console.log(index);
  form[index].classList.toggle('closed');
  form[index].classList.toggle('open');
  if (pageElement) {
    pageElement.textContent = `Page ${page + 1} / 4`;
  }
};

//////////////////////////////
// Watch Form Closing Buttons
export const _watchFormClosers = (pageElement, page, form) => {
  const formClosers = document.querySelectorAll('.form-closure-icon');
  const budgetCreationFormClosers = document.querySelectorAll('.form-closure-icon--budget-creation');
  console.log(formClosers);
  page = 0;
  if (formClosers[0]) {
    formClosers.forEach((fc, i) => {
      fc.addEventListener('click', (e) => {
        e.preventDefault();
        _closeTheForm(i, page, pageElement, form);
      });
    });
  }
};

const getLoggedIn = () => {
  event.preventDefault();
  const loginUsername = document.getElementById('loginUsername').value;
  const loginPassword = document.getElementById('loginPassword').value;
  const buttons = document.querySelectorAll('.button');
  const loginSubmit = buttons[2];
  loginSubmit.removeEventListener('click', getLoggedIn);
  console.log(`Listener Stopped.`);
  Login.login(loginUsername, loginPassword);
};

////////////////////////////////////
// Watch Button To Reset Password
export const _watchPasswordResetButton = () => {
  const resetPasswordButton = document.querySelector('.reset-password-form__section__button');
  if (resetPasswordButton) {
    resetPasswordButton.addEventListener('click', (e) => {
      e.preventDefault();
      const newPassword = document.getElementById('newPassword').value;
      const newPasswordConfirmed = document.getElementById('newPasswordConfirmed').value;
      Password.updatePassword(newPassword, newPasswordConfirmed);
    });
  }
};

export const _watchEntranceButtons = (person, form, formPage) => {
  //////////////////////////////
  // Initialize Entrance Buttons.
  const buttons = document.querySelectorAll('.button');
  const entranceButtons = [buttons[0], buttons[1], buttons[3]];
  entranceButtons.forEach((eb, i) => {
    if (eb) {
      eb.addEventListener('click', (e) => {
        e.preventDefault();
        //////////////////////////////////////////////////////////////
        // OPEN UP THE SELECTED FORM
        if (form[i] !== undefined) {
          form[i].classList.toggle('closed');
          form[i].classList.toggle('open');
        }

        //////////////////////////////////////////////////////////////
        // OPEN UP THE SELECTED FORM
        if (i === 0) {
          const loginSubmit = buttons[2];
          if (loginSubmit) {
            loginSubmit.addEventListener('click', getLoggedIn);
            console.log(`Listener Started.`);
          }
        }

        //////////////////////////////////////////////////////////////
        // SETUP THE SIGNUP FORM IF IT IS THE SELECTED FORM
        if (i === 1) {
          const formPages = document.querySelectorAll('.form__page');
          console.log(formPage);
          Signup._setupSignupForm(formPage, formPages, person);
        }
      });
    }
  });
};
