import axios from 'axios';
import * as Budget from './Budget';

export const getMyBudget = async (id) => {
  try {
    const response = await axios({
      method: `GET`,
      url: `/users/budgets/${id}`,
    });
    document.open(`text/html`).write(response.data);
    window.location.assign(`/users/budgets/${id}`);
    console.log(response);
    Budget._watchBudget(user);
  } catch (error) {
    console.log(error);
  }
};
