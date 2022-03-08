import { getSomePersonals, updateMe, updateMyPassword, deactivateMe, deleteMe } from './Update-User';
import { logout } from './Login';
import * as Categories from './Budget-Categories';
import * as Budget from './Budget-Creation';
import * as Budgeting from './Maintain-Budget';
import * as Update from './Update-User';
import * as Manage from './Manage-Budget';

let latterDaySaint = false;

// const _getUserInfo = () => {
//   getSomePersonals();
//   latterDaySaint = user.latterDaySaint;
// };

const enterBudget = async (budgetId, user) => {
  await Manage.getMyBudget(budgetId, user);
};

const _watchBudgetSelection = (user) => {
  const budgetCards = document.querySelectorAll('.budget-card-container__card');
  budgetCards.forEach((bc, i) => {
    bc.addEventListener('click', (e) => {
      const clicked = e.target;
      const id = clicked.closest('.budget-card-container__card').dataset.budgetid;
      enterBudget(id, user);
    });
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
  const userProfileInputs = document.querySelectorAll('.form__section__input');
  const userProfileSubInputs = document.querySelectorAll('.form--user-profile__section__sub-section__input');
  console.log(userProfileInputs, userProfileSubInputs);
  formatPhoneNumber(userProfileInputs[4].value);
  userProfileSubInputs[2].addEventListener('keyup', (e) => {
    userProfileSubInputs[2].value = formatPhoneNumber(userProfileSubInputs[2].value, number);
  });
  userProfileSubInputs[3].addEventListener('keyup', (e) => {
    userProfileSubInputs[3].value = formatPhoneNumber(userProfileSubInputs[3].value, number);
  });
};

const _togglePasswordSubSections = () => {
  const userProfileSubSections = document.querySelectorAll('.form--user-profile__section__sub-section');
  _openSubSections(userProfileSubSections[4], 'form--user-profile__section__sub-section--show');
  _openSubSections(userProfileSubSections[5], 'form--user-profile__section__sub-section--show');
  _openSubSections(userProfileSubSections[6], 'form--user-profile__section__sub-section--show');
  _openSubSections(userProfileSubSections[7], 'form--user-profile__section__sub-section--show');
};

export const _watchPasswordSubSectionButtons = () => {
  const userProfilePasswordSubSectionButtons = document.querySelectorAll('.user-profile-form__section__button__password-button');
  const transparentButtons = document.querySelectorAll('.button--small-transparent');
  console.log(transparentButtons);
  transparentButtons[1].addEventListener('click', (e) => {
    e.preventDefault();
    _togglePasswordSubSections();
  });
};

// Open User Profile Form Sub Sections
const _openSubSections = (subSection, className) => {
  subSection.classList.toggle(className);
};

export const _watchSubSectionButtons = () => {
  const userProfileSubSections = document.querySelectorAll('.form--user-profile__section__sub-section');
  const userProfileFormSectionButtons = document.querySelectorAll('.button--borderless-narrow');
  userProfileFormSectionButtons.forEach((button, i) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (i === 0) {
        _openSubSections(userProfileSubSections[0], 'form--user-profile__section__sub-section--show');
        _openSubSections(userProfileSubSections[1], 'form--user-profile__section__sub-section--show');
        button.classList.toggle('button--borderless-narrow--clicked');
      }
      if (i === 1) {
        _openSubSections(userProfileSubSections[2], 'form--user-profile__section__sub-section--show');
        _openSubSections(userProfileSubSections[3], 'form--user-profile__section__sub-section--show');
        button.classList.toggle('button--borderless-narrow--clicked');
      }
    });
  });
};

//////////////////////////////////////////////////
// ALL ABOUT WATCHING COMMUNICATION PREFERENCES
const _changeCommPreference = () => {
  if (commPreference === `Email`) {
    return (commPreference = `Text`);
  } else {
    return (commPreference = `Email`);
  }
};

export const _watchCommPreference = (communicationSwitch) => {
  if (communicationSwitch) {
    communicationSwitch.addEventListener('click', (e) => {
      communicationSwitch.classList.toggle('switch--comms--text-preferred');
      _changeCommPreference();
    });
  }
};

////////////////////////////////////////////
// ALL ABOUT WATCHING USER PROFILE BUTTONS

const _watchLatterDaySaintSwitch = (ldsSwitch) => {
  ldsSwitch.addEventListener('click', (e) => {
    ldsSwitch.classList.toggle('switch--latter-day-saint--switched');
    ldsSwitch.classList.toggle('r__switch--latter-day-saint--switched');
  });
};

export const _showProfileForm = (forms, index) => {
  forms.forEach((form) => {
    form.style.display = 'none';
  });
  forms[index].style.display = 'flex';
};

export const _watchUserProfileButtons = (communicationPreference) => {
  const userProfileForms = document.querySelectorAll('.form--user-profile');
  const userProfileHeader = document.querySelector('.user-profile-section__header__text');
  const userProfileContainer = document.querySelector('.user-profile-section');
  const userProfileContainerClose = document.querySelector('.user-profile-closure-icon');
  const userProfileButtons = document.querySelectorAll('.application-navigation__section--account-links__link-container__link--link');
  const latterDaySaintSwitch = document.querySelector('.switch--latter-day-saint');
  if (userProfileButtons[0]) {
    userProfileButtons.forEach((pb, i) => {
      pb.addEventListener('click', async (e) => {
        e.preventDefault();
        const clicked = e.target;
        userProfileHeader.textContent = clicked.closest('button').textContent;
        _showProfileForm(userProfileForms, i);
        if (i === 0) {
          userProfileContainer.classList.add('user-profile-section--open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.remove('user-profile-section--open');
          });

          _watchLatterDaySaintSwitch(latterDaySaintSwitch);
        }
        if (i === 1) {
          userProfileContainer.classList.add('user-profile-section--open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.remove('user-profile-section--open');
          });
          /////////////////////////////////
          // GET COMMUNICATION PREFERENCE
          const userInfo = await Update.getSomePersonals();
          const user = userInfo.data.data.user;
          communicationPreference = user.communicationPreference;
        }
        if (i === 2) {
          userProfileContainer.classList.add('user-profile-section--open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.remove('user-profile-section--open');
          });
        }
        if (i === 3) {
          userProfileContainer.classList.add('user-profile-section--open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.remove('user-profile-section--open');
          });
        }
      });
    });
  }
};

const checkLoginStatus = (login, checkElement) => {
  const appViewport = document.querySelector('.application-viewport');
  if (appViewport) {
    return (login = !login);
  }
};

export const _watchForLogin = async (login) => {
  const status = checkLoginStatus(login);
  status === true ? console.log(`Logged In`) : console.log(`Logged Out`);
  if (status === true) {
    let commPreference;
    const commSwitch = document.querySelector('.switch--comms');
    let formattedNumber;
    ///////////////////////////////////////
    // GET USER
    const userInfo = await Update.getSomePersonals();
    const user = userInfo.data.data.user;
    // WATCHING USER PROFILE NAVIGATION BUTTONS
    _watchUserProfileButtons(commPreference);
    // WATCHING COMMUNICATION PREFERENCES
    _watchCommPreference(commSwitch);
    // WATCHING URSER PROFILE FORM BUTTONS
    _watchSubSectionButtons();
    _watchPasswordSubSectionButtons();
    // WATCH FOR PHONE NUMBER UPDATES
    _watchPhoneNumberInputs(formattedNumber);
    // WATCH FOR USER PROFILE UPDATES
    Update._watchForProfileUpdates(user);
    // WATCHING FOR BUDGET SELECTION
    _watchBudgetSelection(user);
    // WATCHING FOR CREATION OF BUDGETS
    Budget._watchForBudgetCreation();
  }
};
