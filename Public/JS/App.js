import { Validate } from './Validate';
import * as BudgetCard from './Budget-Cards';
import * as AppLoggedIn from './App-LoggedIn';
import { updatePassword } from './Update-User';
import * as Signup from './Signup';
import * as Categories from './Budget-Categories';
import * as Budget from './Budget-Creation';
import * as Person from './Person';

///////////////////////////////////////////////
// APP
(function () {
  class App {
    constructor() {
      this._startApp();
      // this._watchFormSubmitButton(); #3 Because without it, #4, go to the next page, would not know to run.
      this._watchResetButton();
      // this._watchEntranceButtons();  #1 Because there is nothing else to click.
      // this._watchFormClosers(); #2 Because every form will need to be able to close after they are opened via the entrance buttons.
      // this._watchTheSwitch();
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
      Budget._watchEmergencyGoalSettings();
      Budget._watchBudgetCreation();
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
    }

    _watchTheSwitch() {
      if (latterDaySaint) {
        latterDaySaint.addEventListener('click', (e) => {
          this._changeLatterDaySaintStatus(latterDaySaint, 'signup-form__form-page__section__input--latter-day-saint--switched');
        });
      }
    }

    _closeTheForm(index, page, pageElement) {
      forms[index].classList.toggle('form-container--open');
      if (pageElement) {
        pageElement.textContent = `Page ${page + 1} / 4`;
      }
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

    // _nextPage(pageNumber) {
    //   if (pageNumber > 3) this._submitSignup();
    //   formPages.forEach((fp) => {
    //     fp.style.display = 'none';
    //   });
    //   formPages[pageNumber].style.display = 'flex';
    //   domSignupFormPageNumber.textContent = `Page ${pageNumber + 1} / 4`;
    // }

    // _watchFormSubmitButton() {
    //   if (signupFormSubmit) {
    //     signupFormSubmit.addEventListener('click', (e) => {
    //       e.preventDefault();
    //       signupFormPage++;
    //       this._nextPage(signupFormPage);
    //     });
    //   }
    // }

    _watchFormClosers(pageElement, page) {
      page = 0;
      formClosers.forEach((fc, i) => {
        fc.addEventListener('click', (e) => {
          e.preventDefault();
          this._closeTheForm(i, page, pageElement);
        });
      });
    }

    _watchEntranceButtons() {
      //////////////////////////////
      // Initialize Entrance Buttons.
      const entranceButtons = [...document.querySelectorAll('.entrance-button'), forgottenUsernameOrPasswordLink];
      entranceButtons.forEach((eb, i) => {
        if (eb) {
          eb.addEventListener('click', (e) => {
            e.preventDefault();
            //////////////////////////////////////////////////////////////
            // Login Form Opens From Here, & Goes Straight To The Backend.
            forms[i].classList.toggle('form-container--open');

            //////////////////////////////////////////////////////////////
            // The Forgotten Form Link Is Placed With The Entrance Buttons.

            //////////////////////////////////////////////////////////////
            // Signup Form Opens Here.
            if (i === 1) {
              const formPages = document.querySelectorAll('.signup-form__form-page');
              Signup._setupSignupForm(signupFormPage, formPages);
              this._watchTheSwitch();
            }
          });
        }
      });
    }
    _startApp() {
      signupFormPage = 0;
      console.log(`App Has Started!`);
      let domSignupFormPageNumber = document.querySelector('.signup-form__form-page__section__page-number');
      // WATCH THE ENTRANCE BUTTONS
      this._watchEntranceButtons();
      // WATCH THE FORM CLOSING BUTTONS
      this._watchFormClosers(domSignupFormPageNumber, signupFormPage);
    }
  }
  const resetPasswordButton = document.querySelector('.reset-password-form__section__button');
  const latterDaySaint = document.querySelector('.signup-form__form-page__section__input--latter-day-saint');
  const latterDaySaintSwitch = document.querySelector('.signup-form__form-page__section__input--latter-day-saint__switch');
  let isLatterDaySaint = false;
  let signupFormPage;
  const formClosers = document.querySelectorAll('.form-close-icon');
  const forms = document.querySelectorAll('.form-container');
  const forgottenUsernameOrPasswordLink = document.querySelector('.login-form__section__forgot-username-or-password-link');
  // const entranceButtons = [...document.querySelectorAll('.entrance-button'), forgottenUsernameOrPasswordLink];
  const app = new App();
})();
