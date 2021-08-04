const questions = document.querySelectorAll(`.question`);
const questionLabels = document.querySelectorAll(`.question-label`);
const questionContainer = document.querySelector('.signup-form_questions-and-submit-container--question');
const buttonContinue = document.querySelector('.signup-form_questions-and-submit-container--continue');
const closeSignupButton = document.querySelector(`.signup-form-container--close`);
const signupButton = document.querySelector(`.navigation_user-login_signup`);
const loginButton = document.querySelector(`.navigation_user-login_login`);
const signupFormContainer = document.querySelector('.signup-form-container');
const loginFormContainer = document.querySelector(`.navigation_login-form-container`);
class App {
  constructor() {
    console.log(questions);
    this._watchButtons(loginButton, signupButton, buttonContinue);
    this._setupNewUserQuestions(questions, questionLabels);
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

  _watchButtons(loginButton, signupButton, continueButton) {
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
  }

  _getFocus(element) {
    return element.focus(), this;
  }
}

///////////////////////////////////////////////
// APP
const app = new App();
