import axios from 'axios';
import qs from 'qs';

export const getSomePersonals = async () => {
  try {
    const response = await axios({
      method: `GET`,
      url: `/users/me`,
    });
    console.log(response, response[0]);
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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateMe = async (options) => {
  try {
    console.log(options, typeof options.emailConfirmed);
    const response = await axios({
      method: `PATCH`,
      url: `/users/updateMe`,
      data: qs.stringify({
        ...options,
      }),
    });
    console.log(response);
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
  } catch (error) {
    console.log(error);
  }
};
