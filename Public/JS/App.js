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
      BudgetCard.createBudgetCard(`Cluff's Budget`, `7 December 2021`, `7 December 2021`, `Nathan Cluff`, `./../DIST/CSS/Images/Default-Budget-Cover-Photo.svg`);
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

    _closeTheForm(index, page, pageElement) {
      forms[index].classList.toggle('form-container--open');
      if (pageElement) {
        pageElement.textContent = `Page ${page + 1} / 4`;
      }
    }

    _watchFormClosers(pageElement, page) {
      page = 0;
      formClosers.forEach((fc, i) => {
        fc.addEventListener('click', (e) => {
          e.preventDefault();
          this._closeTheForm(i, page, pageElement);
        });
      });
    }

    _watchEntranceButtons(person) {
      console.log(person);
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
              Signup._setupSignupForm(signupFormPage, formPages, person);
            }
          });
        }
      });
    }
    _startApp() {
      signupFormPage = 0;
      console.log(`App Has Started!`);
      let domSignupFormPageNumber = document.querySelector('.signup-form__form-page__section__page-number');
      const newPerson = Person.newPerson;
      newPerson.latterDaySaint = isLatterDaySaint;
      // WATCH THE ENTRANCE BUTTONS
      this._watchEntranceButtons(newPerson);
      // WATCH THE FORM CLOSING BUTTONS
      this._watchFormClosers(domSignupFormPageNumber, signupFormPage);
      // WATCH LATTER DAY SAINT SWITCH
      Signup._watchTheSwitch(newPerson);
      // WATCH RESET BUTTON FOR PASSWORD RESETS
      this._watchResetButton();
    }
  }
  const resetPasswordButton = document.querySelector('.reset-password-form__section__button');
  let isLatterDaySaint = false;
  let signupFormPage;
  const formClosers = document.querySelectorAll('.form-close-icon');
  const forms = document.querySelectorAll('.form-container');
  const forgottenUsernameOrPasswordLink = document.querySelector('.login-form__section__forgot-username-or-password-link');
  const app = new App();
})();
