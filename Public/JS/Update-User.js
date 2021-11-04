import axios from 'axios';
import qs from 'qs';

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

export const updateMe = async (...options) => {
  try {
    console.log(options);
    const response = await axios({
      method: `PATCH`,
      url: `/users/updateMe`,
      data: qs.stringify({
        firstname: options.firstname,
        lastname: options.lastname,
        username: options.username,
        latterDaySaint: options.latterDaySaint,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
