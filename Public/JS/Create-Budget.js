import * as Budget from './Budget-Creation';
import * as Budgeting from './Budget';
import axios from 'axios';
import qs from 'qs';

//////////////////////
// CREATE BUDGET
export const createBudget = async (budget) => {
  try {
    const response = await axios({
      method: `POST`,
      url: `/users/budgets`,
      data: qs.stringify({
        budget: budget,
      }),
    });
    if (response.statusText === `Created`) {
      alert(budget);
      const response = await axios({
        method: `GET`,
        url: `/users/budgets`,
        data: qs.stringify({
          budget: budget,
        }),
      });
    }
    document.open(`text/html`).write(response.data);
    window.location.assign(`/users/budgets`);
    console.log(response);
    Budgeting._watchBudget();
  } catch (error) {
    console.log(error);
  }
};
