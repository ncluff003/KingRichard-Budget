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
