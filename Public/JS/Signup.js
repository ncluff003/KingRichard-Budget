import axios from 'axios';
import qs from 'qs';

export const signup = async (firstname, lastname, username, email, emailConfirmed, password, passwordConfirmed) => {
  try {
    const response = await axios({
      method: `POST`,
      url: `/users/signup`,
      data: qs.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        emailConfirmed: emailConfirmed,
        password: password,
        passwordConfirmed: passwordConfirmed,
      }),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
