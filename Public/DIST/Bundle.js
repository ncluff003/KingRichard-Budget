/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./Public/JS/App.js ***!
  \**************************/
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var questions = document.querySelectorAll(".question");
var questionLabels = document.querySelectorAll(".question-label");
var questionContainer = document.querySelector('.signup-form_questions-and-submit-container--question');
var buttonContinue = document.querySelector('.signup-form_questions-and-submit-container--continue');
var closeSignupButton = document.querySelector(".signup-form-container--close");
var signupButton = document.querySelector(".navigation_user-login_signup");
var loginButton = document.querySelector(".navigation_user-login_login");
var signupFormContainer = document.querySelector('.signup-form-container');
var loginFormContainer = document.querySelector(".navigation_login-form-container");
var passwordInput = document.querySelector(".password");
var passwordButton = document.querySelector(".password-show");
var passwordButtonIcon1 = document.querySelector(".fa-eye");
var passwordButtonIcon2 = document.querySelector(".fa-eye-slash");

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    console.log(questions);

    this._watchButtons(loginButton, signupButton, buttonContinue, passwordButton);

    this._setupNewUserQuestions(questions, questionLabels);
  }

  _createClass(App, [{
    key: "_showPasswordIcon",
    value: function _showPasswordIcon(element) {
      element.classList.add("password-show--shown");
      element.classList.remove("password-show--hidden");
    }
  }, {
    key: "_hidePasswordIcon",
    value: function _hidePasswordIcon(element) {
      element.classList.add("password-show--hidden");
      element.classList.remove("password-show--shown");
    }
  }, {
    key: "_setupNewUserQuestions",
    value: function _setupNewUserQuestions(questionArray, questionLabels) {
      questions.forEach(function (question, i) {
        if (question === questions[0]) return;else {
          question.style.display = 'none';
          questionLabels[i].style.display = 'none';
        }
      });
    }
  }, {
    key: "_watchButtons",
    value: function _watchButtons(loginButton, signupButton, continueButton, passwordButton) {
      continueButton.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(questions[0].value);
      });
      signupButton.addEventListener("click", function () {
        signupFormContainer.classList.toggle("signup-form-container--shown");
        var firstName = document.querySelector(".first-name");

        app._getFocus(firstName);
      });
      loginButton.addEventListener("click", function () {
        loginFormContainer.classList.toggle("navigation_login-form-container--shown");
        var userName = document.querySelector(".username");

        app._getFocus(userName);
      });
      passwordButton.addEventListener("click", function (e) {
        e.preventDefault();
        passwordInput.type === "password" ? passwordInput.type = "text" : passwordInput.type = "password";
        passwordInput.type === "password" ? app._hidePasswordIcon(passwordButtonIcon1) : app._showPasswordIcon(passwordButtonIcon1);
        passwordInput.type === "password" ? app._showPasswordIcon(passwordButtonIcon2) : app._hidePasswordIcon(passwordButtonIcon2);
      });
    }
  }, {
    key: "_getFocus",
    value: function _getFocus(element) {
      return element.focus(), this;
    }
  }]);

  return App;
}(); ///////////////////////////////////////////////
// APP


var app = new App();
/******/ })()
;
//# sourceMappingURL=Bundle.js.map