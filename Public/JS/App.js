import { Validate } from './Validate';
import * as AppLoggedIn from './App-LoggedIn';
import { updatePassword } from './Update-User';
import login from './Login';

///////////////////////////////////////////////
// APP
(function () {
  class App {
    constructor() {
      this._setUpSignupForm();
      this._watchLandingNavigationButtons();
      this._watchSignupFormButtons();
      this._watchForgottenEmailForm();
      this._checkForAndWatchForPasswordResetForm();
      AppLoggedIn._watchUserButton();
    }

    _checkForAndWatchForPasswordResetForm() {
      if (!passwordResetForm) return;
      const passwordSubmit = document.getElementById('passwordSubmit');
      passwordSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const passwordConfirmed = document.getElementById('passwordConfirmed').value;
        updatePassword(password, passwordConfirmed);
      });
    }

    _watchForgottenEmailForm() {
      const forgot = document.querySelectorAll(`.forgotten-form__form-section--message__form-button`)[1];
      if (forgot) {
        forgot.addEventListener(`click`, (e) => {
          e.preventDefault();
          landingForms[1].style.display = `none`;
          landingForms[0].style.display = `flex`;
          landingForms[0].style.width = `100%`;
          landingForms[0].style.opacity = 1;
          forgottenFormSections.forEach((ffs) => {
            ffs.style.display = 'flex';
          });
          forgottenFormMessageSections.forEach((ffms) => {
            ffms.style.display = 'flex';
          });
          const forgotEmailButton = document.getElementById('forgottenEmailSubmit');
          forgotEmailButton.style.width = '25%';
          forgotEmailButton.addEventListener('click', (e) => {
            const forgotForm = document.querySelector('.forgotten-form');
            forgotForm.submit();
          });
          const closeForgotForm = document.getElementById('closeForgottenForm').addEventListener('click', (e) => {
            e.preventDefault();
            landingForms[1].style.display = `flex`;
            landingForms[0].style.display = `none`;
          });
        });
      }
    }

    _watchSignupFormButtons() {
      let textContent;
      signupFormButtons.forEach((b, i) => {
        if (i === 0) {
          b.addEventListener('click', (e) => {
            e.preventDefault();
            signupFormPage++;
            if (!Validate.isName(signupInputs[0].value)) {
              textContent = `Your first name must only contain letters!`;
              signupErrors[0].textContent = textContent;
              signupErrors[0].style.color = '#cf352e';
              return;
            }
            if (!Validate.isName(signupInputs[1].value)) {
              textContent = `Your last name must only contain letters!`;
              signupErrors[0].textContent = textContent;
              signupErrors[0].style.color = '#cf352e';
              return;
            }
            if (!Validate.isUsername(signupInputs[2].value)) {
              textContent = `Usernames must only contain letters and numbers!`;
              signupErrors[0].textContent = textContent;
              signupErrors[0].style.color = '#cf352e';
              return;
            }
            signupForm[0].forEach((p) => {
              p.style.display = 'none';
            });
            signupForm[signupFormPage].forEach((p) => {
              p.style.display = 'flex';
            });
            formPage.textContent = `${signupFormPage + 1} / 3`;
          });
        }

        if (i === 1) {
          b.addEventListener('click', (e) => {
            e.preventDefault();
            signupFormPage++;
            if (!Validate.isEmail(signupInputs[3].value)) {
              textContent = `Please provide a valid email address!`;
              signupErrors[1].textContent = textContent;
              signupErrors[1].style.color = '#cf352e';
              return;
            }
            if (!Validate.isEmail(signupInputs[4].value) || signupInputs[4].value !== signupInputs[3].value) {
              textContent = `Invalid Email or Emails Do not match!`;
              signupErrors[1].textContent = textContent;
              signupErrors[1].style.color = '#cf352e';
              return;
            }
            signupForm[0].forEach((p) => {
              p.style.display = 'none';
            });
            signupForm[1].forEach((p) => {
              p.style.display = 'none';
            });
            console.log(signupFormPage);
            signupForm[signupFormPage].forEach((p) => {
              p.style.display = 'flex';
            });
            formPage.textContent = `${signupFormPage + 1} / 3`;
          });
        }
        if (i === 2) {
          b.addEventListener('click', (e) => {
            e.preventDefault();
            if (!Validate.is_Eight_Character_One_Upper_Lower_Number_Special(signupInputs[5].value)) {
              textContent = `Password either does not match or have the following: 8 Characters, 1 Upper Case, 1 Lower Case, 1 Number, 1 Special Character (!, @, $, %, &, _, -).`;
              signupErrors[2].textContent = textContent;
              signupErrors[2].style.color = '#cf352e';
              return;
            }
            if (
              !Validate.is_Eight_Character_One_Upper_Lower_Number_Special(signupInputs[6].value) ||
              signupInputs[6].value !== signupInputs[5].value
            ) {
              textContent = `Password either does not match or have the following: 8 Characters, 1 Upper Case, 1 Lower Case, 1 Number, 1 Special Character (!, @, $, %, &, _, -).`;
              signupErrors[2].textContent = textContent;
              signupErrors[2].style.color = '#cf352e';
              return;
            }
            signupForm[0].forEach((p) => {
              p.style.display = 'none';
            });
            signupForm[1].forEach((p) => {
              p.style.display = 'none';
            });
            signupForm[signupFormPage].forEach((p) => {
              p.style.display = 'none';
            });
            formPage.style.opacity = 0;
            signupFormPage = 0;
            signup.submit();
          });
        }
      });
    }

    _watchLandingNavigationButtons() {
      landingNavigation.addEventListener('click', (e) => {
        e.preventDefault();
        const clicked = e.target;
        if (
          clicked.closest('button').classList.contains('navigation__landing-navigation__login') ||
          clicked.closest('button').classList.contains('r__navigation__landing-navigation__login')
        ) {
          loginFormSections.forEach((lfs) => {
            return (lfs.style.display = `flex`);
          });
          loginFormMessageSections.forEach((lfms) => {
            return (lfms.style.display = `flex`);
          });
          console.log(loginFormSections, loginFormMessageSections);
          return landingForms[1].classList.toggle('form-container--open');
        }
        if (
          clicked.closest('button').classList.contains('navigation__landing-navigation__signup') ||
          clicked.closest('button').classList.contains('r__navigation__landing-navigation__signup')
        ) {
          signupForm[signupFormPage].forEach((p, i) => {
            p.style.display = 'flex';
          });
          landingForms[2].classList.toggle('form-container--open');
          if (landingForms[2].style.opacity === 1) {
            signupFormPage = 0;
          }
          return;
        }
      });
    }
    _setUpSignupForm() {
      signupFormSections.forEach((fs, i) => {
        if (i < 3) {
          signupPageOne.push(fs);
        } else if (i > 2 && i < 5) {
          signupPageTwo.push(fs);
        } else {
          signupPageThree.push(fs);
        }
      });
      signupFormMessageSections.forEach((fms, i) => {
        if (i === 0) {
          signupPageOne.push(fms);
        } else if (i === 1) {
          signupPageTwo.push(fms);
        } else {
          signupPageThree.push(fms);
        }
      });
      signupForm.push(signupPageOne, signupPageTwo, signupPageThree);
    }
  }
  const landingNavigation = document.querySelector('.navigation__landing-navigation');
  const loginButton = document.querySelector('.navigation__landing-navigation__login');
  const signupButton = document.querySelector('.navigation__landing-navigation__signup');
  const landingForms = document.querySelectorAll('.form-container');
  const forgottenFormSections = document.querySelectorAll('.forgotten-form__form-section');
  const forgottenFormMessageSections = document.querySelectorAll('.forgotten-form__form-section--message');
  const loginFormSections = document.querySelectorAll('.login-form__form-section');
  const loginFormMessageSections = document.querySelectorAll('.login-form__form-section--message');
  const signupFormSections = document.querySelectorAll('.signup-form__form-section');
  const signupFormMessageSections = document.querySelectorAll('.signup-form__form-section--message');
  const signupPageOne = [];
  const signupPageTwo = [];
  const signupPageThree = [];
  let signupForm = [];
  let signupFormPage = 0;
  const signupFormButtons = document.querySelectorAll('.signup-form__form-section--message__form-button');
  const signupInputs = document.querySelectorAll('.signup-form__form-section__input');
  const signupErrors = document.querySelectorAll('.signup-form__form-section--message__message-container');
  let formPage = document.querySelector(`.form-page-number`);
  const signup = document.querySelector(`.signup-form`);
  const passwordResetForm = document.querySelector('.password-reset-form');
  const app = new App();
})();
