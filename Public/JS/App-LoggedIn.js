import * as Create from './Budget-Creation';
import * as Budget from './Budget';
import * as Budgeting from './Maintain-Budget';
import * as Manage from './Manage-Budget';
import * as Person from './Person';

let latterDaySaint = false;

const getBudget = async (budgetId, user) => {
  await Manage.renderBudget(budgetId, user);
};

const _watchBudgetSelection = (user) => {
  const budgetCards = document.querySelectorAll('.budget-card-container__card');
  budgetCards.forEach((bc, i) => {
    bc.addEventListener('click', (e) => {
      const clicked = e.target;
      const id = clicked.closest('.budget-card-container__card').dataset.budgetid;
      getBudget(id, user);
    });
  });
};

const _watchForProfileUpdates = async (user, person) => {
  const userProfileFormButtons = document.querySelectorAll('.user-profile-form__button');
  const userProfileSubSectionFormButtons = document.querySelectorAll('.user-profile-form__section__sub-section__button');
  const transparentButtons = document.querySelectorAll('.button--small-transparent');
  const latterDaySaintSwitch = document.querySelector('.form__input--latter-day-saint');
  let communicationSwitch = document.getElementById('commSwitch');
  let commPreference;
  let latterDaySaint;
  console.log(transparentButtons);
  transparentButtons.forEach((b, i) => {
    b.addEventListener('click', async (e) => {
      e.preventDefault();
      if (i === 0) {
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const username = document.getElementById('username').value;
        latterDaySaintSwitch.classList.contains('form__input--latter-day-saint--switched') ? (latterDaySaint = true) : (latterDaySaint = false);
        const updatedUserInfo = await person._updatePerson({
          firstname: firstname,
          lastname: lastname,
          username: username,
          latterDaySaint: latterDaySaint,
          id: user._id,
        });
      }
      if (i === 1) {
        communicationSwitch.classList.contains('form__input--comms--text-preferred') ? (commPreference = `Text`) : (commPreference = `Email`);
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
        const updateUserInfo = await person._updatePerson({
          email: newEmail,
          emailConfirmed: newEmailConfirmed,
          phoneNumber: newPhoneNumber,
          phoneNumberConfirmed: newPhoneNumberConfirmed,
          communicationPreference: commPreference,
          id: user._id,
        });
      }

      if (i === 5) {
        await person._logMeOut(user._id);
      }

      if (i === 6) {
        await person._deactivateMe(user._id);
      }

      if (i === 7) {
        await person._deleteMe(user._id);
      }
    });
  });
  transparentButtons[3].addEventListener('click', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const newPasswordConfirmed = document.getElementById('newPasswordConfirmed').value;
    const updateUserInfo = await person._updatePersonPassword(currentPassword, newPassword, newPasswordConfirmed, user._id);
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
  const userProfileInputs = document.querySelectorAll('.form__input--dark-small');
  const userProfileSubInputs = document.querySelectorAll('.form__input--dark-extra-small');
  formatPhoneNumber(userProfileInputs[4].value);
  userProfileSubInputs[2].addEventListener('keyup', (e) => {
    userProfileSubInputs[2].value = formatPhoneNumber(userProfileSubInputs[2].value, number);
  });
  userProfileSubInputs[3].addEventListener('keyup', (e) => {
    userProfileSubInputs[3].value = formatPhoneNumber(userProfileSubInputs[3].value, number);
  });
};

const _togglePasswordSubSections = () => {
  const userProfileSubSections = document.querySelectorAll('.form__section--sub-section');
  _openSubSections([userProfileSubSections[4]], 'closed');
  _openSubSections([userProfileSubSections[5]], 'closed');
  _openSubSections([userProfileSubSections[6]], 'closed');
  _openSubSections([userProfileSubSections[7]], 'closed');
};

export const _watchPasswordSubSectionButtons = () => {
  const userProfilePasswordSubSectionButtons = document.querySelectorAll('.user-profile-form__section__button__password-button');
  const transparentButtons = document.querySelectorAll('.button--small-transparent');
  transparentButtons[2].addEventListener('click', (e) => {
    e.preventDefault();
    console.log(transparentButtons[2]);
    return _togglePasswordSubSections();
  });
};

// Open User Profile Form Sub Sections
const _openSubSections = (subSectionArray, className) => {
  subSectionArray.forEach((ss) => ss.classList.toggle(className));
  // subSection.classList.toggle(className);
};

export const _watchSubSectionButtons = () => {
  const userProfileSubSections = document.querySelectorAll('.form__section--sub-section');
  const userProfileFormSectionButtons = document.querySelectorAll('.button--borderless-narrow');
  userProfileFormSectionButtons.forEach((button, i) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (i === 0) {
        _openSubSections([userProfileSubSections[0], userProfileSubSections[1]], 'closed');
        button.classList.toggle('button--borderless-narrow--clicked');
      }
      if (i === 1) {
        _openSubSections([userProfileSubSections[2], userProfileSubSections[3]], 'closed');
        button.classList.toggle('button--borderless-narrow--clicked');
      }
    });
  });
};

//////////////////////////////////////////////////
// ALL ABOUT WATCHING COMMUNICATION PREFERENCES
const _changeCommPreference = (communicationSwitch, commPreference) => {
  return communicationSwitch.classList.contains('form__input--comms--text-preferred') ? (commPreference = `Text`) : (commPreference = `Email`);
};

export const _watchCommPreference = (communicationSwitch, commPreference) => {
  if (communicationSwitch) {
    communicationSwitch.addEventListener('click', (e) => {
      communicationSwitch.classList.toggle('form__input--comms--text-preferred');
      communicationSwitch.classList.toggle('form__input--comms');
      commPreference = _changeCommPreference(communicationSwitch, commPreference);
      console.log(commPreference);
    });
  }
};

////////////////////////////////////////////
// ALL ABOUT WATCHING USER PROFILE BUTTONS

const _watchLatterDaySaintSwitch = (ldsSwitch) => {
  ldsSwitch.addEventListener('click', (e) => {
    e.preventDefault();
    ldsSwitch.classList.toggle('r__form__input--latter-day-saint--switched');
  });
};

export const _showProfileForm = (forms, index) => {
  forms.forEach((form) => {
    form.classList.add(`closed`);
    form.classList.remove(`open`);
  });
  forms[index].classList.toggle('closed');
  forms[index].classList.toggle('open');
};

export const _watchUserProfileButtons = (communicationPreference, person) => {
  const userProfileForms = document.querySelectorAll('.form--full-width');
  console.log(userProfileForms);
  const userProfileHeader = document.querySelector('.user-profile-section__header__text');
  const userProfileContainer = document.querySelector('.user-profile-section');
  const userProfileContainerClose = document.querySelector('.user-profile-closure-icon');
  const userProfileButtons = document.querySelectorAll('.navigation--side-screen__section--account-links__link-container__link--link');
  const latterDaySaintSwitch = document.querySelector('.form__input--latter-day-saint');
  if (userProfileButtons[0]) {
    userProfileButtons.forEach((pb, i) => {
      pb.addEventListener('click', async (e) => {
        e.preventDefault();
        const clicked = e.target;
        userProfileHeader.textContent = clicked.closest('button').textContent;
        _showProfileForm(userProfileForms, i);
        if (i === 0) {
          userProfileContainer.classList.remove('closed');
          userProfileContainer.classList.add('open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.add('closed');
            userProfileContainer.classList.remove('open');
          });

          _watchLatterDaySaintSwitch(latterDaySaintSwitch);
        }
        if (i === 1) {
          userProfileContainer.classList.remove('closed');
          userProfileContainer.classList.add('open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.add('closed');
            userProfileContainer.classList.remove('open');
          });
          /////////////////////////////////
          // GET COMMUNICATION PREFERENCE
          const userInfo = await person._getPersonData();
          const user = userInfo.data.data.user;
          communicationPreference = user.communicationPreference;
        }
        if (i === 2) {
          userProfileContainer.classList.remove('closed');
          userProfileContainer.classList.add('open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.add('closed');
            userProfileContainer.classList.remove('open');
          });
        }
        if (i === 3) {
          userProfileContainer.classList.remove('closed');
          userProfileContainer.classList.add('open');
          userProfileContainerClose.addEventListener('click', (e) => {
            userProfileContainer.classList.add('closed');
            userProfileContainer.classList.remove('open');
          });
        }
      });
    });
  }
};

//////////////////////////////
// Actually Close The Form
const _closeTheForm = (form) => {
  form.classList.toggle('closed');
  form.classList.toggle('open');
};

const openPhotoUpdateModal = (modal) => {
  modal.classList.toggle('closed');
  modal.classList.toggle('open');
};

const _watchForProfilePictureChange = (user, person) => {
  console.log('Watching...');
  const startUpdatingPhotoButton = document.querySelectorAll('.button--extra-small')[0];
  const photoUpdateModal = document.querySelector('.modal--update-photo');
  startUpdatingPhotoButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(startUpdatingPhotoButton);
    openPhotoUpdateModal(photoUpdateModal);
  });

  const stopUpdatingPhotoButton = document.querySelector('.form-closure-icon__alt');
  stopUpdatingPhotoButton.addEventListener('click', (e) => {
    _closeTheForm(photoUpdateModal);
  });

  // Works as the image preview code.
  const previewPath = document.querySelector('.form__path-preview');
  const photoInput = document.getElementById('photo');
  const image = document.querySelector('.form__preview-photo-container__picture-frame__image');
  const reader = new FileReader();

  // Update.updateMe()

  reader.onload = (e) => {
    image.src = e.target.result;
  };

  photoInput.onchange = (e) => {
    const [file] = e.target.files;
    console.log(file);
    reader.readAsDataURL(file);
    previewPath.textContent = file.name;
  };

  console.log(photoInput.value);

  const saveProfilePictureButton = document.querySelector('.button--update-photo');
  saveProfilePictureButton.addEventListener('click', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('userId', `${user._id}`);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form.data);

    person._updatePhoto(form);
    Budgeting.reloadPage();
  });
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
    const commSwitch = document.getElementById('commSwitch');
    let formattedNumber;
    ///////////////////////////////////////
    // GET USER
    const placeholderUser = new Person.Person(``, ``, ``, ``, ``, ``, ``, ``);
    const userInfo = await placeholderUser._getPersonData();
    const user = userInfo.data.data.user;
    placeholderUser._createPlaceholderUser(user, placeholderUser);
    console.log(placeholderUser);
    /////////////////////////////////////////////////
    // START BY WATCHING FOR PROFILE PICTURE CHANGE
    _watchForProfilePictureChange(user, placeholderUser);
    // WATCHING USER PROFILE NAVIGATION BUTTONS
    _watchUserProfileButtons(commPreference, placeholderUser);
    // WATCHING COMMUNICATION PREFERENCES
    _watchCommPreference(commSwitch, commPreference);
    // WATCHING URSER PROFILE FORM BUTTONS
    _watchSubSectionButtons();
    _watchPasswordSubSectionButtons();
    // WATCH FOR PHONE NUMBER UPDATES
    _watchPhoneNumberInputs(formattedNumber);
    // WATCH FOR USER PROFILE UPDATES
    _watchForProfileUpdates(user, placeholderUser);
    // WATCHING FOR BUDGET SELECTION
    _watchBudgetSelection(user);
    // WATCHING FOR CREATION OF BUDGETS
    Create._watchForBudgetCreation(placeholderUser);
  }
};
