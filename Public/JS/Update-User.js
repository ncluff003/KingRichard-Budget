import axios from 'axios';
import qs from 'qs';

export const getSomePersonals = async () => {
  try {
    const response = await axios({
      method: `GET`,
      url: `/users/me`,
    });
    if (response[0] === `Email`) console.log(true);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (password, passwordConfirmed) => {
  try {
    const response = await axios({
      method: `PATCH`,
      url: `/users/resetPassword/${window.location.href.split('/')[5]}`,
      data: qs.stringify({
        password: password,
        passwordConfirmed: passwordConfirmed,
      }),
    });
    if (response.data.status === 'Success') {
      window.location.assign(`/`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateMyPassword = async (currentPassword, newPassword, newPasswordConfirmed) => {
  try {
    const response = await axios({
      method: `POST`,
      url: `/users/updateMyPassword`,
      data: qs.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
        newPasswordConfirmed: newPasswordConfirmed,
      }),
    });
    if (response.statusText === 'OK') {
      document.getElementById('currentPassword').value = newPassword;
      document.getElementById('newPassword').value = ``;
      document.getElementById('newPasswordConfirmed').value = ``;
      // window.location.reload(true);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateMe = async (options) => {
  try {
    const response = await axios({
      method: `PATCH`,
      url: `/users/updateMe`,
      data: qs.stringify({
        ...options,
      }),
    });

    if (response.statusText === 'OK') {
      // Check if first name is not undefined or empty.
      !options.firstname === undefined && !options.firstname === ''
        ? (document.getElementById('firstname').value = options.value)
        : (document.getElementById('firstname').value = document.getElementById('firstname').value);

      // Check if last name is not undefined or empty.
      !options.lastname === undefined && !options.lastname === ''
        ? (document.getElementById('lastname').value = options.value)
        : (document.getElementById('lastname').value = document.getElementById('lastname').value);

      // Check if username is not undefined or empty.
      !options.username === undefined && !options.username === ''
        ? (document.getElementById('username').value = options.value)
        : (document.getElementById('username').value = document.getElementById('username').value);

      // Check if email is not undefined or empty.
      !options.email === undefined && !options.email === ''
        ? (document.getElementById('email').value = options.value)
        : (document.getElementById('email').value = document.getElementById('email').value);

      // Check if email is not undefined or empty.
      !options.emailConfirmed === undefined && !options.emailConfirmed === ''
        ? (document.getElementById('email').value = options.value)
        : (document.getElementById('email').value = document.getElementById('email').value);

      document.getElementById('email').value = options.email;
      document.getElementById('newEmail').value = '';
      document.getElementById('newEmailConfirmed').value = '';

      // Check if phone number is not undefined or empty.
      !options.phoneNumber === undefined && !options.phoneNumber === ''
        ? (document.getElementById('phoneNumber').value = options.value)
        : (document.getElementById('phoneNumber').value = document.getElementById('phoneNumber').value);

      // Check if phone number is not undefined or empty.
      !options.phoneNumberConfirmed === undefined && !options.phoneNumberConfirmed === ''
        ? (document.getElementById('phoneNumber').value = options.value)
        : (document.getElementById('phoneNumber').value = document.getElementById('phoneNumber').value);

      // Check if confirmed phone number is not undefined or empty.
      document.getElementById('phoneNumber').value = options.phoneNumber;
      document.getElementById('newPhoneNumber').value = '';
      document.getElementById('newPhoneNumberConfirmed').value = '';
    }
  } catch (error) {
    console.log(error);
  }
};

export const deactivateMe = async () => {
  try {
    const response = await axios({
      method: `DELETE`,
      url: `/users/deactivateMe`,
    });
    if (response.statusText === 'Success') {
      window.location.assign('/');
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteMe = async () => {
  try {
    const response = await axios({
      method: `DELETE`,
      url: `/users/deleteMe`,
    });
    if (response.statusText === 'No Content') {
      window.location.assign('/');
    }
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////
// Watch Button To Reset Password
export const _watchPasswordResetButton = () => {
  const resetPasswordButton = document.querySelector('.reset-password-form__section__button');
  if (resetPasswordButton) {
    resetPasswordButton.addEventListener('click', (e) => {
      e.preventDefault();
      const newPassword = document.getElementById('newPassword').value;
      const newPasswordConfirmed = document.getElementById('newPasswordConfirmed').value;
      updatePassword(newPassword, newPasswordConfirmed);
    });
  }
};

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
