// Opening The Profile Page
const userButton = document.querySelector('.navigation__landing-navigation__user');
const profileBackground = document.querySelector('.user-profile-background');
const profileCard = document.querySelector('.user-profile-card');

export const _watchUserButton = () => {
  userButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    console.log(`Button is working.`);
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
const userProfileSectionHeader = document.querySelector(
  '.user-profile-card__user-info__profile-option-container__header',
);
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
const passwordManagementButtons = document.querySelectorAll(
  '.unique-profile-content-container__password-management__button',
);
const changePasswordForm = document.querySelector('.change-password-form');

console.log(profileSectionButtons);

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
      ldsSwitch.addEventListener('click', (e) => {
        ldsSwitchToggle.classList.toggle('personal-information-form__toggle-switch__switch--toggled');
        ldsSwitchToggleNo.classList.toggle('personal-information-form__toggle-switch__text--no--toggled');
        latterDaySwitchActivated === false ? (latterDaySwitchActivated = true) : (latterDaySwitchActivated = false);
        latterDaySwitchActivated === false ? (isLatterDaySaint = false) : (isLatterDaySaint = true);
        console.log(latterDaySwitchActivated, isLatterDaySaint);
        setTimeout(() => {
          ldsSwitch.classList.toggle('personal-information-form__toggle-switch--toggled');
          ldsSwitchToggle.classList.toggle('personal-information-form__toggle-switch__switch--toggled-full');
          ldsSwitchToggleYes.classList.toggle('personal-information-form__toggle-switch__text--yes--displayed');
        }, 450);
        setTimeout(() => {
          ldsSwitchToggleYes.classList.toggle('personal-information-form__toggle-switch__text--yes--toggled');
        }, 500);
        setTimeout(() => {
          ldsSwitchToggleGlow.classList.toggle('personal-information-form__toggle-switch__glow--lit-up');
          ldsSwitchToggleNo.classList.toggle('personal-information-form__toggle-switch__text--no--removed');
        }, 750);
        setTimeout(() => {
          ldsSwitchToggleNo.classList.toggle('personal-information-form__toggle-switch__text--no--repositioned');
        }, 1000);
      });
      ldsInfoButton.addEventListener('click', (e) => {
        e.preventDefault();
        ldsInfoModal.style.display = 'flex';
        ldsInfoModalClose.addEventListener('click', (e) => {
          e.preventDefault();
          ldsInfoModal.style.display = 'none';
        });
      });
      return console.log(clicked.closest('button').textContent);
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
      return console.log(clicked.closest('button').textContent);
    }
    if (clicked.closest('button') === profileSectionButtons[2]) {
      profileSectionRows.forEach((row) => {
        row.style.display = 'none';
      });
      communicationsContainer.style.display = 'flex';
      userProfileSectionHeader.textContent = clicked.closest('button').textContent;
      userProfileSection.style.display = 'flex';
      return console.log(clicked.closest('button').textContent);
    }
    if (clicked.closest('button') === profileSectionButtons[3]) {
      profileSectionRows.forEach((row) => {
        row.style.display = 'none';
      });
      accountManagementContainer.style.display = 'flex';
      userProfileSectionHeader.textContent = clicked.closest('button').textContent;
      userProfileSection.style.display = 'flex';
      return console.log(clicked.closest('button').textContent);
    }
  });
});
