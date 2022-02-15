import axios from 'axios';
import * as Budget from './Budget';

export const getMyBudget = async (id, user) => {
  try {
    const response = await axios({
      method: `GET`,
      url: `/App/users/${user._id}/budgets/${id}`,
    });
    document.open(`text/html`).write(response.data);
    window.location.assign(`/App/users/${user._id}/budgets/${id}`);
    console.log(response);
    Budget._watchBudget();
  } catch (error) {
    console.log(error);
  }
};
