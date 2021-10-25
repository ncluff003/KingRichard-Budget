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
const profileSectionButtons = document.querySelectorAll('.user-profile-card__user-info__row__button');
const userProfileSectionHeader = document.querySelector(
  '.user-profile-card__user-info__profile-option-container__header',
);
console.log(profileSectionButtons);

profileSectionButtons.forEach((psb) => {
  psb.addEventListener('click', (e) => {
    e.preventDefault();
    const clicked = e.target;
    if (clicked.closest('button') === profileSectionButtons[0]) {
      userProfileSectionHeader.textContent = clicked.closest('button').textContent;
      return console.log(clicked.closest('button').textContent);
    }
    if (clicked.closest('button') === profileSectionButtons[1]) {
      userProfileSectionHeader.textContent = clicked.closest('button').textContent;
      return console.log(clicked.closest('button').textContent);
    }
    if (clicked.closest('button') === profileSectionButtons[2]) {
      userProfileSectionHeader.textContent = clicked.closest('button').textContent;
      return console.log(clicked.closest('button').textContent);
    }
    if (clicked.closest('button') === profileSectionButtons[3]) {
      userProfileSectionHeader.textContent = clicked.closest('button').textContent;
      return console.log(clicked.closest('button').textContent);
    }
  });
});
