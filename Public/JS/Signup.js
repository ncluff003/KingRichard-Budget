import axios from 'axios';
import qs from 'qs';

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
  if (pageNumber > 3) {
    return _submitSignup(person);
  }
  if (pageNumber > 3) {
    const signupFormSubmit = document.querySelector('.signup-form__form-page__section__button');
  }
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
export const _watchTheLatterDaySaintSwitch = (person) => {
  const latterDaySaint = document.querySelector('.form-page__section__input--latter-day-saint');
  if (latterDaySaint) {
    latterDaySaint.addEventListener('click', (e) => {
      _changeLatterDaySaintStatus(latterDaySaint, 'form-page__section__input--latter-day-saint--switched', person);
    });
  }
};

// Watch The Submit Button
export const _watchFormSubmitButton = (page, pages, pageElement, person) => {
  const formButtons = document.querySelectorAll('.button--small');
  console.log(formButtons);
  const signupFormSubmit = formButtons[1];
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
        console.log(person);
      }
      if (page + 1 === 5) {
        const password = document.getElementById('password').value;
        const passwordConfirmed = document.getElementById('passwordConfirmed').value;
        person.password = password;
        person.passwordConfirmed = passwordConfirmed;

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        // CREATING A WAY TO GET THE LATTER DAY SAINT INFO IN WHILE STILL BEING ABLE TO LOG IN RIGHT AFTER SIGNING UP.

        const signupForm = document.querySelector('.signup-form');
        signupFormSubmit.setAttribute(`type`, `submit`);
        const latterDaySaint = document.createElement(`input`);
        latterDaySaint.value = person.latterDaySaint;
        latterDaySaint.setAttribute(`id`, `latterDaySaint`);
        latterDaySaint.setAttribute(`name`, `latterDaySaint`);
        signupForm.insertAdjacentElement(`beforeend`, latterDaySaint);
        latterDaySaint.style.visibility = `hidden`;
        // signupForm.submit();
      }
      _nextPage(page, pages, pageElement, person);
    });
  }
};

/////////////////////////
// SIGN UP FORM SETUP
export const _setupSignupForm = (page, pages, person) => {
  let domSignupFormPageNumber = document.querySelector('.form--signup__section__page-number');
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
