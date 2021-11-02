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
    if (response.statusText === 'OK') {
      window.location.assign(`/`);
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
