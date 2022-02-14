import * as Budget from './Budget-Creation';
import * as Budgeting from './Budget';
import axios from 'axios';
import qs from 'qs';

//////////////////////
// CREATE BUDGET
export const createBudget = async (budget, user) => {
  console.log(user);
  try {
    const response = await axios({
      method: `POST`,
      url: `/users/${user._id}/budgets`,
      data: qs.stringify({
        budget: budget,
      }),
    });
    console.log(response.data.data.budget);
    if (response.statusText === `Created`) {
      console.log(`Budget Created`);
      console.log(`Retrieving Budget...`);
      const response = await axios({
        method: `GET`,
        url: `/users/${user._id}/budgets`,
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
