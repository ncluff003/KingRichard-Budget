import { Validate } from './Validate';
import * as AppLoggedIn from './App-LoggedIn';
import { updatePassword } from './Update-User';

///////////////////////////////////////////////
// APP
(function () {
  class App {
    constructor() {
      this._watchFormSubmitButton();
      this._watchEntranceButtons();
      this._watchFormClosers();
      this._watchTheSwitch();
    }
    _changeLatterDaySaintStatus(lightSwitch, switchClass) {
      lightSwitch.classList.toggle(switchClass);
      isLatterDaySaint = !isLatterDaySaint;
      console.log(isLatterDaySaint);
    }

    _watchTheSwitch() {
      latterDaySaint.addEventListener('click', (e) => {
        this._changeLatterDaySaintStatus(latterDaySaint, 'signup-form__form-page__section__input--latter-day-saint--switched');
      });
    }

    _closeTheForm(index) {
      forms[index].classList.toggle('form-container--open');
    }

    _submitForm(form, index) {}

    _nextPage(pageNumber) {
      formPages.forEach((fp) => {
        fp.style.display = 'none';
      });
      formPages[pageNumber].style.display = 'flex';
      domSignupFormPageNumber.textContent = `Page ${pageNumber + 1} / 4`;
      console.log(pageNumber);
    }

    _watchFormSubmitButton() {
      signupFormSubmit.addEventListener('click', (e) => {
        signupFormPage++;
        this._nextPage(signupFormPage);
      });
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
      domSignupFormPageNumber.textContent = `Page ${signupFormPage + 1} / 4`;
    }

    _watchEntranceButtons() {
      entranceButtons.forEach((eb, i) => {
        eb.addEventListener('click', (e) => {
          e.preventDefault();
          forms[i].classList.toggle('form-container--open');
          if (i === 1) this._setupSignupForm();
        });
      });
    }
  }
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
