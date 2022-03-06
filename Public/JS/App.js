import { Validate } from './Validate';
import * as Form from './Base-Forms';
import * as BudgetCard from './Budget-Cards';
import * as AppLoggedIn from './App-LoggedIn';
import * as Update from './Update-User';
import * as Signup from './Signup';
import * as Categories from './Budget-Categories';
import * as Budget from './Budget-Creation';
import * as Person from './Person';

///////////////////////////////////////////////
// APP
(function () {
  class App {
    constructor() {
      /////////////////////////////
      // START UP THE APPLICATION
      this._startApp(); // Eventually, this will be the ONLY function being ran from the constructor of the the app.
      // Budget._watchEmergencyGoalSettings(); // Eventually this will move to the Budget-Creation.js under Watch Budget Creation for page 6 for LDS and 5 for Non-LDS.
    }

    _startApp() {
      signupFormPage = 0;
      isLoggedIn = false;
      console.log(`App Has Started!`);
      let domSignupFormPageNumber = document.querySelector('.signup-form__form-page__section__page-number');
      const formButtons = document.querySelectorAll('.buttons');
      const newPerson = Person.newPerson;
      newPerson.latterDaySaint = isLatterDaySaint;
      // WATCH THE ENTRANCE BUTTONS
      Form._watchEntranceButtons(newPerson, forms, signupFormPage);
      // WATCH THE FORM CLOSING BUTTONS
      Form._watchFormClosers(domSignupFormPageNumber, signupFormPage, forms);
      // WATCH LATTER DAY SAINT SWITCH
      Signup._watchTheLatterDaySaintSwitch(newPerson);
      // WATCH RESET BUTTON FOR PASSWORD RESETS
      Update._watchPasswordResetButton(formButtons);
      // WATCH FOR USER LOGIN
      AppLoggedIn._watchForLogin(isLoggedIn);
    }
  }
  ////////////////////////////////////////////////
  // INITIALIZE SOME STARTING VARIABLES FOR THE APP
  let isLatterDaySaint = false;
  let signupFormPage, isLoggedIn;
  const forms = document.querySelectorAll('.form-container');
  /////////////////////////////////////////////////
  // IMMEDIATELY MAKE AN INSTANCE OF THE APP CLASS
  const app = new App();
})();
