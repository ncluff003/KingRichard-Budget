import { getSomePersonals, updateMe, updateMyPassword, deactivateMe, deleteMe } from './Update-User';
import { logout } from './Login';
import * as Categories from './Budget-Categories';
import * as Budget from './Budget-Creation';
import * as Update from './Update-User';

let commPreference;
let latterDaySaint = false;

// const _getUserInfo = () => {
//   getSomePersonals();
//   latterDaySaint = user.latterDaySaint;
// };

///////////////////////////////////////////////////
// ALL ABOUT WATCHING USER PROFILE FORM BUTTONS
export const _watchForProfileUpdates = () => {
  const userProfileFormButtons = document.querySelectorAll('.user-profile-form__button');
  const userProfileSubSectionFormButtons = document.querySelectorAll('.user-profile-form__section__sub-section__button');
  const latterDaySaintSwitch = document.querySelector('.user-profile-form__section__input--latter-day-saint');
  userProfileFormButtons.forEach((b, i) => {
    b.addEventListener('click', async (e) => {
      e.preventDefault();
      if (i === 0) {
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const username = document.getElementById('username').value;
        if (latterDaySaintSwitch.classList.contains('user-profile-form__section__input--latter-day-saint--switched')) {
          latterDaySaint = true;
        }
        const updatedUserInfo = await updateMe({
          firstname: firstname,
          lastname: lastname,
          username: username,
          latterDaySaint: latterDaySaint,
        });
      }
      if (i === 1) {
        console.log(commPreference);
        let newEmail = document.getElementById('newEmail').value;
        let newEmailConfirmed = document.getElementById('newEmailConfirmed').value;
        if (newEmail === '') {
          newEmail = document.getElementById('email').value;
        }
        if (newEmailConfirmed === '') {
          newEmailConfirmed = document.getElementById('email').value;
        }

        let newPhoneNumber = document.getElementById('newPhoneNumber').value;
        let newPhoneNumberConfirmed = document.getElementById('newPhoneNumberConfirmed').value;
        if (newPhoneNumber === '') {
          newPhoneNumber = document.getElementById('phoneNumber').value;
        }
        if (newPhoneNumberConfirmed === '') {
          newPhoneNumberConfirmed = document.getElementById('phoneNumber').value;
        }
        const updateUserInfo = await updateMe({
          email: newEmail,
          emailConfirmed: newEmailConfirmed,
          phoneNumber: newPhoneNumber,
          phoneNumberConfirmed: newPhoneNumberConfirmed,
          communicationPreference: commPreference,
        });
      }

      if (i === 2) {
        await logout();
      }

      if (i === 3) {
        await deactivateMe();
      }

      if (i === 4) {
        await deleteMe();
      }
    });
  });
  userProfileSubSectionFormButtons[0].addEventListener('click', async (e) => {
    e.preventDefault();
    console.log(userProfileSubSectionFormButtons);
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const newPasswordConfirmed = document.getElementById('newPasswordConfirmed').value;
    const updateUserInfo = await updateMyPassword(currentPassword, newPassword, newPasswordConfirmed);
  });
};

const formatPhoneNumber = (value, number) => {
  if (!value) return value;
  let phoneNumber = value.replace(/[^\d]/g, '');
  let phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength <= 3) {
    return phoneNumber;
  }
  if (phoneNumberLength >= 4 && phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}`;
  }
  number = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)} - ${phoneNumber.slice(6)}`;
  return number;
};

export const _watchPhoneNumberInputs = (number) => {
  const userProfileInputs = document.querySelectorAll('.user-profile-form__section__input');
  const userProfileSubInputs = document.querySelectorAll('.user-profile-form__section__sub-section__input');
  formatPhoneNumber(userProfileInputs[4].value);
  userProfileSubInputs[2].addEventListener('keyup', (e) => {
    userProfileSubInputs[2].value = formatPhoneNumber(userProfileSubInputs[2].value, number);
  });
  userProfileSubInputs[3].addEventListener('keyup', (e) => {
    userProfileSubInputs[3].value = formatPhoneNumber(userProfileSubInputs[3].value, number);
  });
};

const _togglePasswordSubSections = () => {
  const userProfileSubSections = document.querySelectorAll('.user-profile-form__section__sub-section');
  _openSubSections(userProfileSubSections[4], 'user-profile-form__section__sub-section--show');
  _openSubSections(userProfileSubSections[5], 'user-profile-form__section__sub-section--show');
  _openSubSections(userProfileSubSections[6], 'user-profile-form__section__sub-section--show');
  _openSubSections(userProfileSubSections[7], 'user-profile-form__section__sub-section--show');
};

export const _watchPasswordSubSectionButtons = () => {
  const userProfilePasswordSubSectionButtons = document.querySelectorAll('.user-profile-form__section__button__password-button');
  userProfilePasswordSubSectionButtons[0].addEventListener('click', (e) => {
    e.preventDefault();
    _togglePasswordSubSections();
  });
};

// Open User Profile Form Sub Sections
const _openSubSections = (subSection, className) => {
  subSection.classList.toggle(className);
};

export const _watchSubSectionButtons = () => {
  const userProfileSubSections = document.querySelectorAll('.user-profile-form__section__sub-section');
  const userProfileFormSectionButtons = document.querySelectorAll('.user-profile-form__section__button');
  userProfileFormSectionButtons.forEach((button, i) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (i === 0) {
        _openSubSections(userProfileSubSections[0], 'user-profile-form__section__sub-section--show');
        _openSubSections(userProfileSubSections[1], 'user-profile-form__section__sub-section--show');
        button.classList.toggle('user-profile-form__section__button--clicked');
      }
      if (i === 1) {
        _openSubSections(userProfileSubSections[2], 'user-profile-form__section__sub-section--show');
        _openSubSections(userProfileSubSections[3], 'user-profile-form__section__sub-section--show');
        button.classList.toggle('user-profile-form__section__button--clicked');
      }
    });
  });
};

//////////////////////////////////////////////////
// ALL ABOUT WATCHING COMMUNICATION PREFERENCES
const _changeCommPreference = () => {
  console.log(commPreference);
  if (commPreference === `Email`) {
    return (commPreference = `Text`);
  } else {
    return (commPreference = `Email`);
  }
};

export const _watchCommPreference = (communicationSwitch) => {
  communicationSwitch.addEventListener('click', (e) => {
    communicationSwitch.classList.toggle('user-profile-form__section__comm-switch--text-preferred');
    _changeCommPreference();
    console.log(commPreference);
  });
};

////////////////////////////////////////////
// ALL ABOUT WATCHING USER PROFILE BUTTONS

const _watchLatterDaySaintSwitch = (ldsSwitch) => {
  ldsSwitch.addEventListener('click', (e) => {
    ldsSwitch.classList.toggle('user-profile-form__section__input--latter-day-saint--switched');
    ldsSwitch.classList.toggle('r__user-profile-form__section__input--latter-day-saint--switched');
  });
};

export const _showProfileForm = (forms, index) => {
  forms.forEach((form) => {
    form.style.display = 'none';
  });
  forms[index].style.display = 'flex';
};

export const _watchUserProfileButtons = () => {
  const userProfileForms = document.querySelectorAll('.user-profile-form');
  const userProfileHeader = document.querySelector('.user-profile-container__header__text');
  const userProfileContainer = document.querySelector('.user-profile-container');
  const userProfileContainerClose = document.querySelector('.user-profile-container__close');
  const userProfileButtons = document.querySelectorAll('.app-navigation__main__navigation-links__link-container__link--link');
  const latterDaySaintSwitch = document.querySelector('.user-profile-form__section__input--latter-day-saint');
  if (userProfileButtons[0]) {
    userProfileButtons.forEach((pb, i) => {
      pb.addEventListener('click', async (e) => {
        e.preventDefault();
        const clicked = e.target;
        userProfileHeader.textContent = clicked.closest('button').textContent;
        _showProfileForm(userProfileForms, i);
        if (i === 0) {
          userProfileContainer.classList.add('user-profile-container--open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.remove('user-profile-container--open');
          });

          _watchLatterDaySaintSwitch(latterDaySaintSwitch);
        }
        if (i === 1) {
          userProfileContainer.classList.add('user-profile-container--open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.remove('user-profile-container--open');
          });
          /////////////////////////////////
          // GET COMMUNICATION PREFERENCE
          const userInfo = await Update.getSomePersonals();
          const user = userInfo.data.data.user;
          commPreference = user.communicationPreference;
        }
        if (i === 2) {
          userProfileContainer.classList.add('user-profile-container--open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.remove('user-profile-container--open');
          });
        }
        if (i === 3) {
          userProfileContainer.classList.add('user-profile-container--open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.remove('user-profile-container--open');
          });
        }
      });
    });
  }
};

const checkLoginStatus = (login, checkElement) => {
  if (checkElement) {
    return (login = !login);
  }
};

export const _watchForLogin = (login) => {
  const appViewport = document.querySelector('.app-viewport');
  const status = checkLoginStatus(login, appViewport);
  status === true ? console.log(`Logged In`) : console.log(`Logged Out`);
  const commSwitch = document.querySelector('.user-profile-form__section__comm-switch');
  let formattedNumber;
  if (status === true) {
    // WATCHING USER PROFILE NAVIGATION BUTTONS
    _watchUserProfileButtons();
    // WATCHING COMMUNICATION PREFERENCES
    _watchCommPreference(commSwitch);
    // WATCHING URSER PROFILE FORM BUTTONS
    _watchSubSectionButtons();
    _watchPasswordSubSectionButtons();
    // WATCH FOR PHONE NUMBER UPDATES
    _watchPhoneNumberInputs(formattedNumber);
    // WATCH FOR USER PROFILE UPDATES
    _watchForProfileUpdates();
    // WATCHING FOR CREATION OF BUDGETS
    Budget._watchBudgetCreation();
  }
};
