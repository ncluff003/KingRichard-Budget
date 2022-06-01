import axios from 'axios';
import qs from 'qs';
import * as Person from './Person';
import * as Utility from './Utility';

//////////////////////
// USER SIGN UP
export const signup = async (firstname, lastname, username, latterDaySaint, email, emailConfirmed, password, passwordConfirmed) => {
  try {
    const response1 = await axios({
      method: `POST`,
      url: `/App/Users/Signup`,
      data: qs.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        latterDaySaint: latterDaySaint,
        email: email,
        emailConfirmed: emailConfirmed,
        password: password,
        passwordConfirmed: passwordConfirmed,
      }),
    });
    if (response1.statusText === `OK`) {
      let user = response1.data.data.user;
      const response2 = await axios({
        method: `POST`,
        url: `App/Users/${user._id}`,
        data: qs.stringify({
          username: username,
          password: password,
        }),
      });
      if (response2.statusText === 'OK') {
        document.open(`text/html`).write(response2.data);
        window.location.assign(`/App/Users/${user._id}`);
      }
    }
    console.log(response1);
  } catch (error) {
    const signupFormHeader = document.querySelectorAll('.form__header__title')[1];
    Utility.showError(signupFormHeader, `${error.response.data.message}`, `Signup`, `negative-centered`, 5000);
    console.log(error);
  }
};

//////////////////////////////
// SIGN UP FORM FUNCTIONALITY
const _submitSignup = (person) => {
  console.log(person.latterDaySaint);
  signup(person.firstname, person.lastname, person.username, person.latterDaySaint, person.email, person.emailConfirmed, person.password, person.passwordConfirmed);
};

// Go To Next Page
export const _nextPage = (pageNumber, pages, pageElement, person) => {
  if (pageNumber > 3) {
    return _submitSignup(person);
  }
  // if (pageNumber > 3) {
  //   const signupFormSubmit = document.querySelector('.signup-form__form-page__section__button');
  // }
  pages.forEach((p) => {
    p.style.display = 'none';
  });
  pages[pageNumber].style.display = 'flex';
  pageElement.textContent = `Page ${pageNumber + 1} / 4`;
};

// Toggling the Latter Day Saint Switch
const _changeLatterDaySaintStatus = (valueOne, valueTwo, visibilityClassOne, visibilityClassTwo, switchClass) => {
  valueOne.classList.toggle(switchClass);
  valueTwo.forEach((value) => {
    value.classList.toggle(visibilityClassOne);
    value.classList.toggle(visibilityClassTwo);
  });
};

// Watching The Latter Day Saint Switch
export const _watchTheLatterDaySaintSwitch = () => {
  const latterDaySaint = document.querySelector('.form__input--latter-day-saint');
  const latterDaySaintValues = document.querySelectorAll('.form__input--latter-day-saint__text');
  if (latterDaySaint) {
    latterDaySaint.addEventListener('click', (e) => {
      e.preventDefault();
      _changeLatterDaySaintStatus(latterDaySaint, latterDaySaintValues, 'closed', 'open', 'form__input--latter-day-saint--switched');
    });
  }
};

// Watch The Submit Button
export const _watchFormSubmitButton = (page, pages, pageElement, person) => {
  const formButtons = document.querySelectorAll('.button--small');
  console.log(formButtons);
  const signupFormSubmit = formButtons[1];
  const latterDaySaintSwitch = document.querySelector('.form__input--latter-day-saint');
  _watchTheLatterDaySaintSwitch(person);
  if (signupFormSubmit) {
    signupFormSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      page++;
      if (page + 1 === 2) {
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        person._updateFirstName(firstname);
        person._updateLastName(lastname);
      }
      if (page + 1 === 3) {
        const username = document.getElementById('username').value;
        person._updateUsername(username);
        if (latterDaySaintSwitch.classList.contains('form__input--latter-day-saint--switched')) {
          person._updateLatterDaySaintStatus();
        }
      }
      if (page + 1 === 4) {
        const email = document.getElementById('email').value;
        const emailConfirmed = document.getElementById('emailConfirmed').value;
        person._updateEmail(email);
        person._updateEmailConfirmed(emailConfirmed);
      }
      if (page + 1 === 5) {
        const password = document.getElementById('password').value;
        const passwordConfirmed = document.getElementById('passwordConfirmed').value;
        person._updatePassword(password);
        person._updatePasswordConfirmed(passwordConfirmed);
      }
      _nextPage(page, pages, pageElement, person);
    });
  }
};

/////////////////////////
// SIGN UP FORM SETUP
export const _setupSignupForm = (page, pages, person) => {
  let domSignupFormPageNumber = document.querySelector('.form__page-number');
  if (domSignupFormPageNumber) {
    _watchFormSubmitButton(page, pages, domSignupFormPageNumber, person);
    if (page > 0 || page === undefined) {
      page = 0;
      domSignupFormPageNumber.textContent = `Page ${page + 1} / 4`;
    }
    pages.forEach((fp, i) => {
      fp.style.display = 'none';
    });
    pages[0].style.display = 'flex';
  }
};
