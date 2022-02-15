import axios from 'axios';
import * as Budget from './Budget';

export const getMyBudget = async (id, user) => {
  try {
    const response = await axios({
      method: `GET`,
      url: `/App/Users/${user._id}/Budgets/${id}/Dashboard`,
    });
    document.open(`text/html`).write(response.data);
    window.location.assign(`/App/Users/${user._id}/Budgets/${id}/Dashboard`);
    console.log(response);
    Budget._watchBudget();
  } catch (error) {
    console.log(error);
  }
};
