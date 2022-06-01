import axios from 'axios';
import qs from 'qs';
import * as Utility from './Utility';

export const login = async (username, password) => {
  try {
    const options = {
      username: username,
      password: password,
    };

    // FIRST SEARCH FOR THE USER
    const response1 = await axios({
      method: `POST`,
      url: `/App/User`,
      data: qs.stringify(options),
    });
    if (response1.data.status === 'Success') {
      let user = response1.data.data.user;
      const options = {
        username: username,
        password: password,
        id: user._id,
      };
      // LOG IN
      const response2 = await axios({
        method: `POST`,
        url: `/App/Users/${user._id}`,
        data: qs.stringify(options),
      });
      if (response2.statusText === 'OK') {
        document.open(`text/html`).write(response2.data);
        // RE-ASSIGN URL ADDRESS
        window.location.assign(`/App/Users/${user._id}`);
      }
    }
  } catch (error) {
    const loginFormHeader = document.querySelector('.form__header__title');
    Utility.showError(loginFormHeader, `${error.response.data.message}`, `Login`, `negative-centered`, 5000);
    console.log(error);
  }
};

export const logout = async (id) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `/App/Users/${id}/Logout`,
    });
    if (response.data.status === 'Success') {
      window.location.assign(`/App`);
    }
  } catch (error) {
    console.log(error);
  }
};
