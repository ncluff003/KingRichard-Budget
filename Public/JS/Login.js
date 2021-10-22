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
    console.log(response);
    // if ((response.data.status = 'Success')) {
    // await axios({
    //   method: `GET`,
    //   url: `/users/login`,
    //   data: qs.stringify(options),
    // });
    // }
  } catch (error) {
    console.log(error);
  }
};
