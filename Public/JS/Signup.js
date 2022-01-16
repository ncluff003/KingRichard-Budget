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

// Go To Next Page
export const _nextPage = (pageNumber, pages, pageElement) => {
  if (pageNumber > 3) this._submitSignup();
  pages.forEach((p) => {
    p.style.display = 'none';
  });
  pages[pageNumber].style.display = 'flex';
  pageElement.textContent = `Page ${pageNumber + 1} / 4`;
};

// Watch The Submit Button
export const _watchFormSubmitButton = (page, pages, pageElement) => {
  const signupFormSubmit = document.querySelector('.signup-form__form-page__section__button');
  if (signupFormSubmit) {
    signupFormSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      page++;
      _nextPage(page, pages, pageElement);
    });
  }
};

/////////////////////////
// SIGN UP FORM SETUP
export const _setupSignupForm = (page, pages) => {
  let domSignupFormPageNumber = document.querySelector('.signup-form__form-page__section__page-number');
  _watchFormSubmitButton(page, pages, domSignupFormPageNumber);
  if (page > 0 || page === undefined) {
    page = 0;
    domSignupFormPageNumber.textContent = `Page ${page + 1} / 4`;
  }
  pages.forEach((fp, i) => {
    fp.style.display = 'none';
  });
  pages[0].style.display = 'flex';
};
