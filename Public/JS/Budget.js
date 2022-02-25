import * as Budgets from './Create-Budget';
import * as Categories from './Budget-Categories';
class Account {
  constructor(options) {
    this.amount = options.amount;
  }
}
export class Budget {
  constructor() {
    this.name = '';
    this.accounts = {};
    this.mainCategories = [];
  }

  _addName(name) {
    this.name = name;
  }

  _addMainCategory(icon, title) {
    this.mainCategories.push(new Categories.MainCategory({ icon: icon, title: title }));
  }

  _addSubCategory(index, title) {
    this.mainCategories[index].subCategories.push(new Categories.SubCategory({ title: title }));
  }

  _addAccounts() {
    this.accounts.unAllocated = new Account({ amount: 0 });
    this.accounts.monthlyBudget = new Account({ amount: 0 });
    this.accounts.emergencyFund = new Account({ amount: 0 });
    this.accounts.savingsFund = new Account({ amount: 0 });
    this.accounts.expenseFund = new Account({ amount: 0 });
    this.accounts.surplus = new Account({ amount: 0 });
    this.accounts.investmentFund = new Account({ amount: 0 });
    this.accounts.debt = new Account({ amount: 0, debtAmount: 0 });
  }

  _addTithingAccount(user) {
    if (user.latterDaySaint === true) this.accounts.tithing = { amount: 0 };
  }

  _setTithingSetting(setting) {
    this.accounts.tithing.tithingSetting = setting;
  }

  _setEmergencyGoal() {
    if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
      this.accounts.emergencyFund.emergencyFundGoal = Number(document.querySelector('#timingNumber').value);
      this.accounts.emergencyFund.emergencyFundGoalTiming = document.querySelector('.budget-creation-form__page__section__select').value;
      console.log(this);
    }
    if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
      this.accounts.emergencyFund.emergencyFundGoal = Number(document.querySelector('#emergencyGoal').value);
      console.log(this);
    }
  }

  _setSavingsGoal() {
    this.accounts.savingsFund.savingsPercentage = Number(document.querySelector('#savingsPercentGoal').value) / 100;
    this.accounts.savingsFund.savingsGoal = Number(document.querySelector('#savingsGoal').value);
    console.log(this);
  }

  _setInvestmentGoal() {
    this.accounts.investmentFund.investmentPercentage = Number(document.querySelector('#investmentPercentGoal').value) / 100;
    this.accounts.investmentFund.investmentGoal = Number(document.querySelector('#investmentGoal').value);
    console.log(this);
  }

  _submit(budget, user) {
    Budgets.createBudget(budget, user);
  }
}

export const startToCreate = () => {
  const budget = new Budget();
  budget._addAccounts();
  return budget;
};
