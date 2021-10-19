/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _classCallCheck; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _createClass; }
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "./Public/JS/Validate.js":
/*!*******************************!*\
  !*** ./Public/JS/Validate.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Validate": function() { return /* binding */ Validate; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");



////////////////////////////////////////////
//  Core Modules
////////////////////////////////////////////
//  Third Party Modules
////////////////////////////////////////////
//  Third Party Module Instances
////////////////////////////////////////////
//  Third Party Config Files
////////////////////////////////////////////
//  Third Party Middleware
////////////////////////////////////////////
//  My Middleware
////////////////////////////////////////////
//  Routing Middleward
////////////////////////////////////////////
//  My Modules
/////////////////////////////////////////
//  Validator Model
var Validator = /*#__PURE__*/function () {
  function Validator() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.default)(this, Validator);
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__.default)(Validator, [{
    key: "isName",
    value: function isName(name) {
      return /^[A-Za-z]+$/.test(name);
    }
  }, {
    key: "isUsername",
    value: function isUsername(username) {
      return /^[A-Z][A-Za-z0-9]*$/.test(username);
    }
  }, {
    key: "isEmail",
    value: function isEmail(email) {
      return /[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money)+$/.test(email.toLowerCase());
    }
  }, {
    key: "isValidEmailSubject",
    value: function isValidEmailSubject(subject) {
      return /^[^`,@,^,&,+,=,<,>,{,},[,\],;,]*^[^`,@,^,&,+,=,<,>,{,},[,\],;,]+$/.test(subject);
    }
  }, {
    key: "isCompany",
    value: function isCompany(companyName) {
      return /^[^?!*,#,%,*,+,=]*^[^?!*,#,%,*,+,=]*$/.test(companyName);
    }
  }, {
    key: "isCompanyPosition",
    value: function isCompanyPosition(position) {
      return /^[^<,>,|,\[,\],?,!,`,~,!,@,#,$,%,^,&,*,+,=,;]*^[^<,>,|,\[,\],?,!,`,~,!,@,#,$,%,^,&,*,+,=,;]*$/.test(position);
    }
  }, {
    key: "is_Eight_Character_One_Upper_Lower_Number_Special",
    value: function is_Eight_Character_One_Upper_Lower_Number_Special(password) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%&\-\_])[A-Za-z\d@$!%&\-\_&]{8,}$/.test(password);
    }
  }]);

  return Validator;
}();

var Validate = new Validator();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************!*\
  !*** ./Public/JS/App.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Validate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Validate */ "./Public/JS/Validate.js");


 ///////////////////////////////////////////////
// APP

(function () {
  var App = /*#__PURE__*/function () {
    function App() {
      (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.default)(this, App);

      this._setUpSignupForm();

      this._watchLandingNavigationButtons();

      this._watchSignupFormButtons();
    }

    (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__.default)(App, [{
      key: "_watchSignupFormButtons",
      value: function _watchSignupFormButtons() {
        var textContent;
        signupFormButtons.forEach(function (b, i) {
          if (i === 0) {
            b.addEventListener('click', function (e) {
              e.preventDefault();
              signupFormPage++;

              if (!_Validate__WEBPACK_IMPORTED_MODULE_2__.Validate.isName(signupInputs[0].value)) {
                textContent = "Your first name must only contain letters!";
                signupErrors[0].textContent = textContent;
                signupErrors[0].style.color = '#cf352e';
                return;
              }

              if (!_Validate__WEBPACK_IMPORTED_MODULE_2__.Validate.isName(signupInputs[1].value)) {
                textContent = "Your last name must only contain letters!";
                signupErrors[0].textContent = textContent;
                signupErrors[0].style.color = '#cf352e';
                return;
              }

              if (!_Validate__WEBPACK_IMPORTED_MODULE_2__.Validate.isUsername(signupInputs[2].value)) {
                textContent = "Usernames must only contain letters and numbers!";
                signupErrors[0].textContent = textContent;
                signupErrors[0].style.color = '#cf352e';
                return;
              }

              signupForm[0].forEach(function (p) {
                p.style.display = 'none';
              });
              signupForm[signupFormPage].forEach(function (p) {
                p.style.display = 'flex';
              });
              formPage.textContent = "".concat(signupFormPage + 1, " / 3");
            });
          }

          if (i === 1) {
            b.addEventListener('click', function (e) {
              e.preventDefault();
              signupFormPage++;

              if (!_Validate__WEBPACK_IMPORTED_MODULE_2__.Validate.isEmail(signupInputs[3].value)) {
                textContent = "Please provide a valid email address!";
                signupErrors[1].textContent = textContent;
                signupErrors[1].style.color = '#cf352e';
                return;
              }

              if (!_Validate__WEBPACK_IMPORTED_MODULE_2__.Validate.isEmail(signupInputs[4].value) || signupInputs[4].value !== signupInputs[3].value) {
                textContent = "Invalid Email or Emails Do not match!";
                signupErrors[1].textContent = textContent;
                signupErrors[1].style.color = '#cf352e';
                return;
              }

              signupForm[0].forEach(function (p) {
                p.style.display = 'none';
              });
              signupForm[1].forEach(function (p) {
                p.style.display = 'none';
              });
              signupForm[signupFormPage].forEach(function (p) {
                p.style.display = 'flex';
              });
              formPage.textContent = "".concat(signupFormPage + 1, " / 3");
            });
          }

          if (i === 2) {
            b.addEventListener('click', function (e) {
              e.preventDefault();

              if (!_Validate__WEBPACK_IMPORTED_MODULE_2__.Validate.is_Eight_Character_One_Upper_Lower_Number_Special(signupInputs[5].value)) {
                textContent = "Password either does not match or have the following: 8 Characters, 1 Upper Case, 1 Lower Case, 1 Number, 1 Special Character (!, @, $, %, &, _, -).";
                signupErrors[2].textContent = textContent;
                signupErrors[2].style.color = '#cf352e';
                return;
              }

              if (!_Validate__WEBPACK_IMPORTED_MODULE_2__.Validate.is_Eight_Character_One_Upper_Lower_Number_Special(signupInputs[6].value) || signupInputs[6].value !== signupInputs[5].value) {
                textContent = "Password either does not match or have the following: 8 Characters, 1 Upper Case, 1 Lower Case, 1 Number, 1 Special Character (!, @, $, %, &, _, -).";
                signupErrors[2].textContent = textContent;
                signupErrors[2].style.color = '#cf352e';
                return;
              }

              signupForm[0].forEach(function (p) {
                p.style.display = 'none';
              });
              signupForm[1].forEach(function (p) {
                p.style.display = 'none';
              });
              signupForm[signupFormPage].forEach(function (p) {
                p.style.display = 'none';
              });
              formPage.style.opacity = 0;
              signupFormPage = 0;
              signup.submit();
            });
          }
        });
      }
    }, {
      key: "_watchLandingNavigationButtons",
      value: function _watchLandingNavigationButtons() {
        landingNavigation.addEventListener('click', function (e) {
          e.preventDefault();
          var clicked = e.target;

          if (clicked.closest('button').classList.contains('navigation__landing-navigation__login') || clicked.closest('button').classList.contains('r__navigation__landing-navigation__login')) {
            loginFormSections.forEach(function (lfs) {
              return lfs.style.display = "flex";
            });
            loginFormMessageSections.forEach(function (lfms) {
              return lfms.style.display = "flex";
            });
            console.log(loginFormSections, loginFormMessageSections);
            return landingForms[0].classList.toggle('form-container--open');
          }

          if (clicked.closest('button').classList.contains('navigation__landing-navigation__signup') || clicked.closest('button').classList.contains('r__navigation__landing-navigation__signup')) {
            signupForm[signupFormPage].forEach(function (p, i) {
              p.style.display = 'flex';
            });
            landingForms[1].classList.toggle('form-container--open');

            if (landingForms[1].style.opacity === 1) {
              signupFormPage = 0;
            }

            return;
          }
        });
      }
    }, {
      key: "_setUpSignupForm",
      value: function _setUpSignupForm() {
        signupFormSections.forEach(function (fs, i) {
          if (i < 3) {
            signupPageOne.push(fs);
          } else if (i > 2 && i < 5) {
            signupPageTwo.push(fs);
          } else {
            signupPageThree.push(fs);
          }
        });
        signupFormMessageSections.forEach(function (fms, i) {
          if (i === 0) {
            signupPageOne.push(fms);
          } else if (i === 1) {
            signupPageTwo.push(fms);
          } else {
            signupPageThree.push(fms);
          }
        });
        signupForm.push(signupPageOne, signupPageTwo, signupPageThree);
      }
    }]);

    return App;
  }();

  var landingNavigation = document.querySelector('.navigation__landing-navigation');
  var loginButton = document.querySelector('.navigation__landing-navigation__login');
  var signupButton = document.querySelector('.navigation__landing-navigation__signup');
  var landingForms = document.querySelectorAll('.form-container');
  var loginFormSections = document.querySelectorAll('.login-form__form-section');
  var loginFormMessageSections = document.querySelectorAll('.login-form__form-section--message');
  var signupFormSections = document.querySelectorAll('.signup-form__form-section');
  var signupFormMessageSections = document.querySelectorAll('.signup-form__form-section--message');
  var signupPageOne = [];
  var signupPageTwo = [];
  var signupPageThree = [];
  var signupForm = [];
  var signupFormPage = 0;
  var signupFormButtons = document.querySelectorAll('.signup-form__form-section--message__form-button');
  var signupInputs = document.querySelectorAll('.signup-form__form-section__input');
  var signupErrors = document.querySelectorAll('.signup-form__form-section--message__message-container');
  var formPage = document.querySelector(".form-page-number");
  var signup = document.querySelector(".signup-form");
  var app = new App();
})();
}();
/******/ })()
;
//# sourceMappingURL=Bundle.js.map