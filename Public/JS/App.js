import * as Form from './Base-Forms';
import * as AppLoggedIn from './App-LoggedIn';
import * as Person from './Person';

///////////////////////////////////////////////
// APP
(function () {
  class App {
    constructor() {
      /////////////////////////////
      // START UP THE APPLICATION
      this._startApp();
    }

    _startApp() {
      signupFormPage = 0;
      isLoggedIn = false;
      console.log(`App Has Started!`);
      let domSignupFormPageNumber = document.querySelector('.form__page-number');
      const newPerson = new Person.Person(``, ``, ``, ``, ``, ``, ``, ``);
      // WATCH THE ENTRANCE BUTTONS
      Form._watchEntranceButtons(newPerson, forms, signupFormPage);
      // WATCH THE FORM CLOSING BUTTONS
      Form._watchFormClosers(domSignupFormPageNumber, signupFormPage, forms);
      // WATCH RESET BUTTON FOR PASSWORD RESETS
      Form._watchPasswordResetButton();
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
