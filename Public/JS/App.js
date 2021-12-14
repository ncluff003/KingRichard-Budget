import { Validate } from './Validate';
import * as BudgetCard from './Budget-Cards';
import * as AppLoggedIn from './App-LoggedIn';
import { updatePassword } from './Update-User';
import { signup } from './Signup';

///////////////////////////////////////////////
// APP
(function () {
  class App {
    constructor() {
      this._watchFormSubmitButton();
      this._watchResetButton();
      this._watchEntranceButtons();
      this._watchFormClosers();
      this._watchTheSwitch();
      BudgetCard.createBudgetCard(
        `Cluff's Budget`,
        `7 December 2021`,
        `7 December 2021`,
        `Nathan Cluff`,
        `./../DIST/CSS/Images/Default-Budget-Cover-Photo.svg`,
      );
      AppLoggedIn._watchUserProfileButtons();
      AppLoggedIn._watchCommPreference();
      AppLoggedIn._watchSubSectionButtons();
      AppLoggedIn._watchPasswordSubSectionButtons();
      AppLoggedIn._watchPhoneNumberInputs();
      AppLoggedIn._watchForProfileUpdates();
    }

    _watchResetButton() {
      if (resetPasswordButton) {
        resetPasswordButton.addEventListener('click', (e) => {
          e.preventDefault();
          const newPassword = document.getElementById('newPassword').value;
          const newPasswordConfirmed = document.getElementById('newPasswordConfirmed').value;
          updatePassword(newPassword, newPasswordConfirmed);
        });
      }
    }

    _changeLatterDaySaintStatus(lightSwitch, switchClass) {
      lightSwitch.classList.toggle(switchClass);
      isLatterDaySaint = !isLatterDaySaint;
      console.log(isLatterDaySaint);
    }

    _watchTheSwitch() {
      if (latterDaySaint) {
        latterDaySaint.addEventListener('click', (e) => {
          this._changeLatterDaySaintStatus(latterDaySaint, 'signup-form__form-page__section__input--latter-day-saint--switched');
        });
      }
    }

    _closeTheForm(index) {
      forms[index].classList.toggle('form-container--open');
    }

    _submitSignup() {
      const firstname = document.getElementById('firstname').value;
      const lastname = document.getElementById('lastname').value;
      const username = document.getElementById('username').value;
      let latterDaySaint = isLatterDaySaint;
      const email = document.getElementById('email').value;
      const emailConfirmed = document.getElementById('emailConfirmed').value;
      const password = document.getElementById('password').value;
      const passwordConfirmed = document.getElementById('passwordConfirmed').value;
      const signupForm = forms[1];
      // signupForm.submit();
      signup(firstname, lastname, username, latterDaySaint, email, emailConfirmed, password, passwordConfirmed);
    }

    _nextPage(pageNumber) {
      if (pageNumber > 3) this._submitSignup();
      formPages.forEach((fp) => {
        fp.style.display = 'none';
      });
      formPages[pageNumber].style.display = 'flex';
      domSignupFormPageNumber.textContent = `Page ${pageNumber + 1} / 4`;
      console.log(pageNumber);
    }

    _watchFormSubmitButton() {
      if (signupFormSubmit) {
        signupFormSubmit.addEventListener('click', (e) => {
          e.preventDefault();
          signupFormPage++;
          this._nextPage(signupFormPage);
        });
      }
    }

    _setupSignupForm() {
      if (signupFormPage > 0) {
        signupFormPage = 0;
        domSignupFormPageNumber.textContent = `Page ${signupFormPage + 1} / 4`;
      }
      formPages.forEach((fp, i) => {
        fp.style.display = 'none';
      });
      formPages[0].style.display = 'flex';
    }

    _watchFormClosers() {
      signupFormPage = 0;
      formClosers.forEach((fc, i) => {
        fc.addEventListener('click', (e) => {
          e.preventDefault();
          console.log(fc, i);
          this._closeTheForm(i);
        });
      });
      if (domSignupFormPageNumber) {
        domSignupFormPageNumber.textContent = `Page ${signupFormPage + 1} / 4`;
      }
    }

    _watchEntranceButtons() {
      entranceButtons.forEach((eb, i) => {
        if (eb) {
          eb.addEventListener('click', (e) => {
            e.preventDefault();
            forms[i].classList.toggle('form-container--open');
            if (i === 1) this._setupSignupForm();
          });
        }
      });
    }
  }
  const resetPasswordButton = document.querySelector('.reset-password-form__section__button');
  const latterDaySaint = document.querySelector('.signup-form__form-page__section__input--latter-day-saint');
  const latterDaySaintSwitch = document.querySelector('.signup-form__form-page__section__input--latter-day-saint__switch');
  let isLatterDaySaint = false;
  let signupFormPage = 0;
  let domSignupFormPageNumber = document.querySelector('.signup-form__form-page__section__page-number');
  const signupFormSubmit = document.querySelector('.signup-form__form-page__section__button');
  const formClosers = document.querySelectorAll('.form-close-icon');
  const formPages = document.querySelectorAll('.signup-form__form-page');
  const forms = document.querySelectorAll('.form-container');
  const forgottenUsernameOrPasswordLink = document.querySelector('.login-form__section__forgot-username-or-password-link');
  const entranceButtons = [...document.querySelectorAll('.entrance-button'), forgottenUsernameOrPasswordLink];
  const app = new App();
})();
