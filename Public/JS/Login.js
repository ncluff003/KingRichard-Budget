import axios from 'axios';
import qs from 'qs';

export const login = async (username, password) => {
  try {
    const options = {
      username: username,
      password: password,
    };

    const response = await axios({
      method: `POST`,
      url: `/users/login`,
      data: qs.stringify(options),
    });
    if (response.statusText === `OK`) alert(response, response.data, response.data.user);
  } catch (error) {
    console.log(error);
  }
};
