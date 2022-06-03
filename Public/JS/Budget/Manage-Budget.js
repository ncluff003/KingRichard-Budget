import axios from 'axios';
import qs from 'qs';
import * as Budget from './Watch-Budget';

export const renderBudget = async (id, user) => {
  try {
    const response = await axios({
      method: `GET`,
      url: `/App/Users/${user._id}/Budgets/${id}/Dashboard`,
    });
    document.open(`text/html`).write(response.data);
    window.location.assign(`/App/Users/${user._id}/Budgets/${id}/Dashboard`);
    console.log(response);
    Budget._watchBudget();
  } catch (error) {
    console.log(error);
  }
};

export const updateMyBudget = async (options, pageLink) => {
  try {
    const response = await axios({
      method: `PATCH`,
      url: `/App/Users/${options.userId}/Budgets/${options.budgetId}/${pageLink}`,
      data: qs.parse({
        ...options,
      }),
    });

    if (response.statusText === 'OK') {
      console.log(`It is OKAY!!!`);
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

export const exitBudget = async (id) => {
  try {
    window.location.assign(`/App/Users/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMyBudget = async (id, userId) => {
  try {
    const response = await axios({
      method: `DELETE`,
      url: `/App/Users/${userId}/Budgets/${id}/Budget-Management`,
      data: qs.stringify({
        id: id,
      }),
    });
    console.log(response);
    if (response.statusText === 'No Content') {
      window.location.assign(`/App/Users/${userId}`);
    }
  } catch (error) {
    console.log(error);
  }
};
