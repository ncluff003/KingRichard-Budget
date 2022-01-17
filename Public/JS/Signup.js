import axios from 'axios';
import qs from 'qs';

//////////////////////
// USER SIGN UP
export const signup = async (firstname, lastname, username, latterDaySaint, email, emailConfirmed, password, passwordConfirmed) => {
  try {
    const response = await axios({
      method: `POST`,
      url: `/users/signup`,
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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

//////////////////////////////
// SIGN UP FORM FUNCTIONALITY

const _submitSignup = (person) => {
  signup(person.firstname, person.lastname, person.username, person.latterDaySaint, person.email, person.emailConfirmed, person.password, person.passwordConfirmed);
};

// Go To Next Page
export const _nextPage = (pageNumber, pages, pageElement, person) => {
  if (pageNumber > 3) _submitSignup(person);
  pages.forEach((p) => {
    p.style.display = 'none';
  });
  pages[pageNumber].style.display = 'flex';
  pageElement.textContent = `Page ${pageNumber + 1} / 4`;
};

// Change Latter Day Saint Status
const _changeLatterDaySaintStatus = (lightSwitch, switchClass, person) => {
  lightSwitch.classList.toggle(switchClass);
  // isLatterDaySaint = !isLatterDaySaint;
  person.latterDaySaint = !person.latterDaySaint;
  console.log(person.latterDaySaint);
};

// Watching The Latter Day Saint Switch
export const _watchTheSwitch = (person) => {
  const latterDaySaint = document.querySelector('.signup-form__form-page__section__input--latter-day-saint');
  if (latterDaySaint) {
    latterDaySaint.addEventListener('click', (e) => {
      _changeLatterDaySaintStatus(latterDaySaint, 'signup-form__form-page__section__input--latter-day-saint--switched', person);
    });
  }
};

// Watch The Submit Button
export const _watchFormSubmitButton = (page, pages, pageElement, person) => {
  const signupFormSubmit = document.querySelector('.signup-form__form-page__section__button');
  if (signupFormSubmit) {
    signupFormSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      page++;
      if (page + 1 === 2) {
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        person.firstname = firstname;
        person.lastname = lastname;
      }
      if (page + 1 === 3) {
        const username = document.getElementById('username').value;
        person.username = username;
      }
      if (page + 1 === 4) {
        const email = document.getElementById('email').value;
        const emailConfirmed = document.getElementById('emailConfirmed').value;
        person.email = email;
        person.emailConfirmed = emailConfirmed;
      }
      if (page + 1 === 5) {
        const password = document.getElementById('password').value;
        const passwordConfirmed = document.getElementById('passwordConfirmed').value;
        person.password = password;
        person.passwordConfirmed = passwordConfirmed;
      }
      _nextPage(page, pages, pageElement, person);
    });
  }
};

/////////////////////////
// SIGN UP FORM SETUP
export const _setupSignupForm = (page, pages, person) => {
  let domSignupFormPageNumber = document.querySelector('.signup-form__form-page__section__page-number');
  _watchFormSubmitButton(page, pages, domSignupFormPageNumber, person);
  if (page > 0 || page === undefined) {
    page = 0;
    domSignupFormPageNumber.textContent = `Page ${page + 1} / 4`;
  }
  pages.forEach((fp, i) => {
    fp.style.display = 'none';
  });
  pages[0].style.display = 'flex';
};
