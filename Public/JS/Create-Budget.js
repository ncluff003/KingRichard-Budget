import * as Budget from './Budget-Creation';
import axios from 'axios';
import qs from 'qs';

//////////////////////
// USER SIGN UP
export const createBudget = async (budget) => {
  try {
    const response = await axios({
      method: `POST`,
      url: `/users/budgets`,
      data: qs.stringify({
        budget: budget,
      }),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
