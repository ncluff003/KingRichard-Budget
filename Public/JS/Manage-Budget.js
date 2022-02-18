import axios from 'axios';
import qs from 'qs';
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

export const deleteMyBudget = async (id, userId) => {
  try {
    const response = await axios({
      method: `DELETE`,
      url: `/App/Users/${userId}/Budgets/${id}/Budget-Management`,
      data: qs.stringify({
        id: id,
      }),
    });
    console.log(response);
    if (response.statusText === 'No Content') {
      window.location.assign(`/App/Users/${userId}`);
    }
  } catch (error) {
    console.log(error);
  }
};
