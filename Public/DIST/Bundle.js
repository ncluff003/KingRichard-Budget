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
/******/ })()
;
//# sourceMappingURL=Bundle.js.map