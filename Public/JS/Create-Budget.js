import * as Budget from './Budget-Creation';
import axios from 'axios';
import qs from 'qs';

//////////////////////
// USER SIGN UP
export const createBudget = async (firstname, lastname, username, latterDaySaint, email, emailConfirmed, password, passwordConfirmed) => {
  try {
    const response = await axios({
      method: `POST`,
      url: `/users/signup`,
      data: qs.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        latterDaySaint: latterDaySaint,
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
