import * as Budget from './Budget-Creation';
import * as Budgeting from './Maintain-Budget';
import * as App from './App-LoggedIn';
import axios from 'axios';
import qs from 'qs';

//////////////////////
// CREATE BUDGET
export const createBudget = async (budget, user) => {
  console.log(user);
  try {
    const response1 = await axios({
      method: `POST`,
      url: `/App/Users/${user._id}/Budgets`,
      data: qs.stringify({
        budget: budget,
      }),
    });
    if (response1.statusText === `Created`) {
      console.log(`Budget Created`);
      console.log(`Retrieving Budget...`);
      const response2 = await axios({
        method: `GET`,
        url: `/App/Users/${user._id}/Budgets/RetrieveBudget/`,
      });
      if (response2.statusText === `OK`) {
        let budgetId = response2.data.data.budget._id;
        const response3 = await axios({
          method: `GET`,
          url: `/App/Users/${user._id}/Budgets/${budgetId}/Dashboard`,
          data: qs.stringify({
            budget: budget,
          }),
        });
        document.open(`text/html`).write(response3.data);
        window.location.assign(`/App/Users/${user._id}/Budgets/${budgetId}/Dashboard`);
        Budgeting._watchBudget();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
