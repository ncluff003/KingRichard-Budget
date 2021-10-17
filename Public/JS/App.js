import { Validate } from './Validate';

///////////////////////////////////////////////
// APP
(function () {
  class App {
    constructor() {
      this._setUpSignupForm();
      this._watchLandingNavigationButtons();
      this._watchSignupFormButtons();
    }

    _watchSignupFormButtons() {
      let textContent;
      signupFormButtons.forEach((b, i) => {
        if (i === 0) {
          b.addEventListener('click', (e) => {
            e.preventDefault();
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
            signupFormPage++;
          });
        }

        if (i === 1) {
          b.addEventListener('click', (e) => {
            e.preventDefault();
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
            signupForm[signupFormPage].forEach((p) => {
              p.style.display = 'flex';
            });
          });
        }
        if (i === 2) {
          b.addEventListener('click', (e) => {
            // e.preventDefault();
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
            signupFormPage = 0;
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
          return landingForms[0].classList.toggle('form-container--open');
        }
        if (
          clicked.closest('button').classList.contains('navigation__landing-navigation__signup') ||
          clicked.closest('button').classList.contains('r__navigation__landing-navigation__signup')
        ) {
          signupForm[signupFormPage].forEach((p, i) => {
            p.style.display = 'flex';
          });
          landingForms[1].classList.toggle('form-container--open');
          if (landingForms[1].style.opacity === 1) {
            signupFormPage = 0;
          }
          return;
        }
      });
    }
    _setUpSignupForm() {
      formSections.forEach((fs, i) => {
        if (i < 3) {
          signupPageOne.push(fs);
        } else if (i > 2 && i < 5) {
          signupPageTwo.push(fs);
        } else {
          signupPageThree.push(fs);
        }
      });
      formMessageSections.forEach((fms, i) => {
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
  const formSections = document.querySelectorAll('.signup-form__form-section');
  const formMessageSections = document.querySelectorAll('.signup-form__form-section--message');
  const signupPageOne = [];
  const signupPageTwo = [];
  const signupPageThree = [];
  let signupForm = [];
  let signupFormPage = 0;
  const signupFormButtons = document.querySelectorAll('.signup-form__form-section--message__form-button');
  const signupInputs = document.querySelectorAll('.signup-form__form-section__input');
  const signupErrors = document.querySelectorAll('.signup-form__form-section--message__message-container');
  const app = new App();
})();
