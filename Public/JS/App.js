const questions = document.querySelectorAll(`.question`);
const questionLabels = document.querySelectorAll(`.question-label`);

console.log(questions, questionLabels);
questions.forEach((question, i) => {
  if (question === questions[0]) return;
  else {
    question.style.display = 'none';
    questionLabels[i].style.display = 'none';
  }
});

const questionContainer = document.querySelector('.signup-form_questions-and-submit-container--question');
const buttonContinue = document.querySelector('.signup-form_questions-and-submit-container--continue');

buttonContinue.addEventListener(`click`, function (e) {
  e.preventDefault();
  console.log(questions[0].value);
});

const closeSignupButton = document.querySelector(`.signup-form-container--close`);
const signupButton = document.querySelector(`.navigation_user-login_signup`);
const loginButton = document.querySelector(`.navigation_user-login_login`);
const signupFormContainer = document.querySelector('.signup-form-container');
const loginFormContainer = document.querySelector(`.navigation_login-form-container`);

signupButton.addEventListener(`click`, function () {
  signupFormContainer.classList.toggle(`signup-form-container--shown`);
});

loginButton.addEventListener(`click`, function () {
  loginFormContainer.classList.toggle(`navigation_login-form-container--shown`);
});
