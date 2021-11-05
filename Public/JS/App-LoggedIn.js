import { getSomePersonals, updateMe } from './Update-User';

// Opening The Profile Page
const userButton = document.querySelector('.navigation__landing-navigation__user');
const profileBackground = document.querySelector('.user-profile-background');
const profileCard = document.querySelector('.user-profile-card');

export const _watchUserButton = () => {
  userButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    profileBackground.classList.toggle('user-profile-background--open');
    setTimeout(() => {
      profileCard.style.display = 'flex';
    }, 1500);
  });
};

// Activating Correct Card Section
let passwordManagement = false;
let communications = false;
let personalInformation = false;
let accountManagement = false;
const profileSectionRows = document.querySelectorAll('.user-profile-card__user-info__row');
const profileSectionButtons = document.querySelectorAll('.user-profile-card__user-info__row__button');
const userProfileSection = document.querySelector('.user-profile-card__user-info__profile-option-container');
const userProfileSectionHeader = document.querySelector('.user-profile-card__user-info__profile-option-container__header');
const personalInformationContainer = document.querySelector(
  '.unique-profile-content-container.unique-profile-content-container__personal-information',
);
const passwordManagementContainer = document.querySelector(
  '.unique-profile-content-container.unique-profile-content-container__password-management',
);
const communicationsContainer = document.querySelector(
  '.unique-profile-content-container.unique-profile-content-container__communications',
);
const accountManagementContainer = document.querySelector(
  '.unique-profile-content-container.unique-profile-content-container__account-management',
);

// Navigating backwards
const backButton = document.querySelector('.back-button');

// Personal Information Variables
let isLatterDaySaint = false;
let latterDaySwitchActivated = false;

const ldsInfoButton = document.querySelector('.personal-information-form__icon');
const ldsInfoModal = document.querySelector('.personal-information-modal');
const ldsInfoModalClose = document.querySelector('.personal-information-modal__close');

// Password Management Variables
const passwordManagementButtons = document.querySelectorAll('.unique-profile-content-container__password-management__button');
const changePasswordForm = document.querySelector('.change-password-form');

const formatPhoneNumber = (value) => {
  if (!value) return value;
  let phoneNumber = value.replace(/[^\d]/g, '');
  let phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength <= 3) {
    console.log(phoneNumber);
    return phoneNumber;
  }
  console.log(phoneNumberLength);
  if (phoneNumberLength >= 4 && phoneNumberLength < 7) {
    console.log(`(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}`);
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}`;
  }
  let formattedNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)} - ${phoneNumber.slice(6)}`;
  console.log(phoneNumber, formattedNumber);
  return formattedNumber;
};

profileSectionButtons.forEach((psb) => {
  psb.addEventListener('click', (e) => {
    e.preventDefault();
    const clicked = e.target;
    backButton.addEventListener(`click`, (e) => {
      personalInformationContainer.style.display = 'none';
      passwordManagementContainer.style.display = 'none';
      communicationsContainer.style.display = 'none';
      accountManagementContainer.style.display = 'none';
      userProfileSection.style.display = 'none';
      changePasswordForm.style.display = 'none';
      profileSectionRows.forEach((row) => {
        row.style.display = 'flex';
      });
    });
    if (clicked.closest('button') === profileSectionButtons[0]) {
      getSomePersonals();
      profileSectionRows.forEach((row) => {
        row.style.display = 'none';
      });
      personalInformationContainer.style.display = 'flex';
      userProfileSectionHeader.textContent = clicked.closest('button').textContent;
      userProfileSection.style.display = 'flex';

      const ldsSwitch = document.querySelector('.personal-information-form__toggle-switch');
      const ldsSwitchToggle = document.querySelector('.personal-information-form__toggle-switch__switch');
      const ldsSwitchToggleNo = document.querySelector('.personal-information-form__toggle-switch__text--no');
      const ldsSwitchToggleYes = document.querySelector('.personal-information-form__toggle-switch__text--yes');
      const ldsSwitchToggleGlow = document.querySelector('.personal-information-form__toggle-switch__glow');
      const personalFormEditButtons = document.querySelectorAll('.personal-information-form__button');
      const personalFormEditInputs = document.querySelectorAll('.personal-information-form__form-section__input-container__input');

      // Edit Inputs Activation
      personalFormEditButtons.forEach((b, i) => {
        b.addEventListener('click', (e) => {
          e.preventDefault();
          personalFormEditInputs[i].toggleAttribute('readonly');
        });
      });

      // Latter Day Saint Switch Animation
      ldsSwitch.addEventListener('click', (e) => {
        ldsSwitchToggle.classList.toggle('personal-information-form__toggle-switch__switch--toggled');
        ldsSwitchToggleNo.classList.toggle('personal-information-form__toggle-switch__text--no--toggled');
        latterDaySwitchActivated === false ? (latterDaySwitchActivated = true) : (latterDaySwitchActivated = false);
        latterDaySwitchActivated === false ? (isLatterDaySaint = false) : (isLatterDaySaint = true);
        setTimeout(() => {
          ldsSwitch.classList.toggle('personal-information-form__toggle-switch--toggled');
          ldsSwitchToggle.classList.toggle('personal-information-form__toggle-switch__switch--toggled-full');
          ldsSwitchToggleYes.classList.toggle('personal-information-form__toggle-switch__text--yes--displayed');
        }, 200);
        setTimeout(() => {
          ldsSwitchToggleYes.classList.toggle('personal-information-form__toggle-switch__text--yes--toggled');
        }, 250);
        setTimeout(() => {
          ldsSwitchToggleGlow.classList.toggle('personal-information-form__toggle-switch__glow--lit-up');
          ldsSwitchToggleNo.classList.toggle('personal-information-form__toggle-switch__text--no--removed');
        }, 300);
        setTimeout(() => {
          ldsSwitchToggleNo.classList.toggle('personal-information-form__toggle-switch__text--no--repositioned');
        }, 750);
      });

      // Modal For Latter Day Saint Switch
      ldsInfoButton.addEventListener('click', (e) => {
        e.preventDefault();
        ldsInfoModal.style.display = 'flex';
        ldsInfoModalClose.addEventListener('click', (e) => {
          e.preventDefault();
          ldsInfoModal.style.display = 'none';
        });
      });
      const saveButton = document.querySelector('.personal-information-form__button__save');
      saveButton.addEventListener('click', async (e) => {
        e.preventDefault();
        if (ldsSwitchToggle.classList.contains(`personal-information-form__toggle-switch__switch--toggled-full`)) {
          isLatterDaySaint = true;
        } else {
          isLatterDaySaint = false;
        }
        const firstname = personalFormEditInputs[0].value;
        const lastname = personalFormEditInputs[1].value;
        const username = personalFormEditInputs[2].value;
        await updateMe({
          firstname: firstname,
          lastname: lastname,
          username: username,
          latterDaySaint: isLatterDaySaint,
        });
      });
      return;
    }
    if (clicked.closest('button') === profileSectionButtons[1]) {
      profileSectionRows.forEach((row) => {
        row.style.display = 'none';
      });
      userProfileSectionHeader.textContent = clicked.closest('button').textContent;
      userProfileSection.style.display = 'flex';
      passwordManagementContainer.style.display = 'flex';
      passwordManagementButtons[0].addEventListener('click', (e) => {
        e.preventDefault();
        changePasswordForm.style.display = 'flex';
      });
      return;
    }
    if (clicked.closest('button') === profileSectionButtons[2]) {
      getSomePersonals();
      profileSectionRows.forEach((row) => {
        row.style.display = 'none';
      });
      communicationsContainer.style.display = 'flex';
      userProfileSectionHeader.textContent = clicked.closest('button').textContent;
      userProfileSection.style.display = 'flex';

      const communicationFormEditButtons = document.querySelectorAll('.communications-form__button');
      const communicationFormEditInputs = document.querySelectorAll('.communications-form__form-section__input-container__input');
      // Edit Inputs Activation
      communicationFormEditButtons.forEach((b, i) => {
        b.addEventListener('click', (e) => {
          e.preventDefault();
          communicationFormEditInputs[i].toggleAttribute('readonly');
        });
        if (i === 2) {
          communicationFormEditInputs[i].addEventListener('keyup', (e) => {
            e.preventDefault();
            let value = communicationFormEditInputs[i].value;
            communicationFormEditInputs[i].value = formatPhoneNumber(value);
          });
        }
        if (i === 3) {
          communicationFormEditInputs[i].addEventListener('keyup', (e) => {
            e.preventDefault();
            let value = communicationFormEditInputs[i].value;
            communicationFormEditInputs[i].value = formatPhoneNumber(value);
          });
        }
      });
      // Get User Communication Preference
      const saveButton = document.querySelector('.communications-form__button__save');
      saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        const email = communicationFormEditInputs[0].value;
        const newEmail = communicationFormEditInputs[1].value;
        const commSwitch = document.getElementById('commSwitch');
      });
      return;
    }
    if (clicked.closest('button') === profileSectionButtons[3]) {
      profileSectionRows.forEach((row) => {
        row.style.display = 'none';
      });
      accountManagementContainer.style.display = 'flex';
      userProfileSectionHeader.textContent = clicked.closest('button').textContent;
      userProfileSection.style.display = 'flex';
      return;
    }
  });
});
