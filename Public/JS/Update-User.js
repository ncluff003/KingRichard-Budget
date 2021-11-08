import axios from 'axios';
import qs from 'qs';

export const getSomePersonals = async () => {
  try {
    const response = await axios({
      method: `GET`,
      url: `/users/me`,
    });
    if (response[0] === `Email`) console.log(true);
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

      // Check if email is not undefined or empty.
      !options.email === undefined && !options.email === ''
        ? (document.getElementById('email').value = options.value)
        : (document.getElementById('email').value = document.getElementById('email').value);

      document.getElementById('newEmail').value = '';
      document.getElementById('newEmailConfirmed').value = '';

      // Check if phone number is not undefined or empty.
      !options.phoneNumber === undefined && !options.phoneNumber === ''
        ? (document.getElementById('phone').value = options.value)
        : (document.getElementById('phone').value = '');

      // Check if username is not undefined or empty.
      document.getElementById('phoneConfirmed').value = '';
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
