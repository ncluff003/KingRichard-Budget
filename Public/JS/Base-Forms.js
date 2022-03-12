import * as Login from './Login';
import * as Signup from './Signup';

//////////////////////////////
// Actually Close The Form
const _closeTheForm = (index, page, pageElement, form) => {
  form[index].classList.toggle('closed');
  form[index].classList.toggle('open');
  if (pageElement) {
    pageElement.textContent = `Page ${page + 1} / 4`;
  }
};

//////////////////////////////
// Watch Form Closing Buttons
export const _watchFormClosers = (pageElement, page, form) => {
  const formClosers = document.querySelectorAll('.form-closure-icon');
  page = 0;
  formClosers.forEach((fc, i) => {
    fc.addEventListener('click', (e) => {
      e.preventDefault();
      _closeTheForm(i, page, pageElement, form);
    });
  });
};

const getLoggedIn = () => {
  event.preventDefault();
  const loginUsername = document.getElementById('loginUsername').value;
  const loginPassword = document.getElementById('loginPassword').value;
  const buttons = document.querySelectorAll('.button');
  const loginSubmit = buttons[2];
  loginSubmit.removeEventListener('click', getLoggedIn);
  console.log(`Listener Stopped.`);
  Login.login(loginUsername, loginPassword);
};

export const _watchEntranceButtons = (person, form, formPage) => {
  //////////////////////////////
  // Initialize Entrance Buttons.
  const buttons = document.querySelectorAll('.button');
  const entranceButtons = [buttons[0], buttons[1], buttons[3]];
  entranceButtons.forEach((eb, i) => {
    if (eb) {
      eb.addEventListener('click', (e) => {
        e.preventDefault();
        //////////////////////////////////////////////////////////////
        // OPEN UP THE SELECTED FORM
        if (form[i] !== undefined) {
          form[i].classList.toggle('closed');
          form[i].classList.toggle('open');
        }

        //////////////////////////////////////////////////////////////
        // OPEN UP THE SELECTED FORM
        if (i === 0) {
          const loginSubmit = buttons[2];
          loginSubmit.addEventListener('click', getLoggedIn);
          console.log(`Listener Started.`);
        }

        //////////////////////////////////////////////////////////////
        // SETUP THE SIGNUP FORM IF IT IS THE SELECTED FORM
        if (i === 1) {
          const formPages = document.querySelectorAll('.form__page');
          console.log(formPage);
          Signup._setupSignupForm(formPage, formPages, person);
        }
      });
    }
  });
};
