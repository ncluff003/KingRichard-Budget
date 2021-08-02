/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./Public/JS/App.js ***!
  \**************************/
var questions = document.querySelectorAll(".question");
var questionLabels = document.querySelectorAll(".question-label");
console.log(questions, questionLabels);
questions.forEach(function (question, i) {
  if (question === questions[0]) return;else {
    question.style.display = 'none';
    questionLabels[i].style.display = 'none';
  }
});
var questionContainer = document.querySelector('.signup-form_questions-and-submit-container--question');
var buttonContinue = document.querySelector('.signup-form_questions-and-submit-container--continue');
buttonContinue.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(questions[0].value);
});
var closeSignupButton = document.querySelector(".signup-form-container--close");
var signupButton = document.querySelector(".navigation_user-login_signup");
var loginButton = document.querySelector(".navigation_user-login_login");
var signupFormContainer = document.querySelector('.signup-form-container');
var loginFormContainer = document.querySelector(".navigation_login-form-container");
signupButton.addEventListener("click", function () {
  signupFormContainer.classList.toggle("signup-form-container--shown");
});
loginButton.addEventListener("click", function () {
  loginFormContainer.classList.toggle("navigation_login-form-container--shown");
});
/******/ })()
;
//# sourceMappingURL=Bundle.js.map