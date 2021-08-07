const questions = document.querySelectorAll(`.question`);
const questionLabels = document.querySelectorAll(`.question-label`);
const questionContainer = document.querySelector('.signup-form_questions-and-submit-container--question');
const buttonContinue = document.querySelector('.signup-form_questions-and-submit-container--continue');
const closeSignupButton = document.querySelector(`.signup-form-container--close`);
const signupButton = document.querySelector(`.navigation_user-login_signup`);
const loginButton = document.querySelector(`.navigation_user-login_login`);
const signupFormContainer = document.querySelector('.signup-form-container');
const loginFormContainer = document.querySelector(`.navigation_login-form-container`);
const passwordInput = document.querySelector(`.password`);
const passwordButton = document.querySelector(`.password-show`);
const passwordButtonIcon1 = document.querySelector(`.fa-eye`);
const passwordButtonIcon2 = document.querySelector(`.fa-eye-slash`);
class App {
  constructor() {
    console.log(questions);
    this._watchButtons(loginButton, signupButton, buttonContinue, passwordButton);
    this._setupNewUserQuestions(questions, questionLabels);
  }

  _showPasswordIcon(element) {
    element.classList.add(`password-show--shown`);
    element.classList.remove(`password-show--hidden`);
  }
  _hidePasswordIcon(element) {
    element.classList.add(`password-show--hidden`);
    element.classList.remove(`password-show--shown`);
  }

  _setupNewUserQuestions(questionArray, questionLabels) {
    questions.forEach((question, i) => {
      if (question === questions[0]) return;
      else {
        question.style.display = 'none';
        questionLabels[i].style.display = 'none';
      }
    });
  }

  _watchButtons(loginButton, signupButton, continueButton, passwordButton) {
    continueButton.addEventListener(`click`, function (e) {
      e.preventDefault();
      console.log(questions[0].value);
    });
    signupButton.addEventListener(`click`, function () {
      signupFormContainer.classList.toggle(`signup-form-container--shown`);
      const firstName = document.querySelector(`.first-name`);
      app._getFocus(firstName);
    });
    loginButton.addEventListener(`click`, function () {
      loginFormContainer.classList.toggle(`navigation_login-form-container--shown`);
      const userName = document.querySelector(`.username`);
      app._getFocus(userName);
    });
    passwordButton.addEventListener(`click`, function (e) {
      e.preventDefault();
      passwordInput.type === `password` ? (passwordInput.type = `text`) : (passwordInput.type = `password`);
      passwordInput.type === `password`
        ? app._hidePasswordIcon(passwordButtonIcon1)
        : app._showPasswordIcon(passwordButtonIcon1);
      passwordInput.type === `password`
        ? app._showPasswordIcon(passwordButtonIcon2)
        : app._hidePasswordIcon(passwordButtonIcon2);
    });
  }

  _getFocus(element) {
    return element.focus(), this;
  }
}

///////////////////////////////////////////////
// APP
const app = new App();
