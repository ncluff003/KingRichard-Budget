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
