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
