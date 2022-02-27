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
    // This is how main categories are added as objects with an icon and title.
    this.mainCategories.push(new Categories.MainCategory({ icon: icon, title: title }));
  }

  _updateMainCategory() {
    console.log(`Main Category`);
  }

  _deleteMainCategory(title) {
    this.mainCategories = this.mainCategories.filter((mc, i) => mc.title !== title);
    console.log(`SUCCESSFUL DELETION`);
  }

  _addSubCategory(index, title) {
    this.mainCategories[index].subCategories.push(new Categories.SubCategory({ title: title }));
    console.log(this.mainCategories[index].subCategories);
  }

  _updateSubCategory(mode, update, options) {
    if (mode === `Creation`) {
      if (update === `Timing`) {
        this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.paymentCycle = options.paymentCycle;
        this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.paymentSchedule = options.paymentSchedule;
        this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.dueDates = [
          this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.paymentSchedule[0],
        ];
      }

      if (update === `Surplus`) {
        this.mainCategories[options.mainIndex].subCategories[options.subIndex].surplus = !this.mainCategories[options.mainIndex].subCategories[options.subIndex].surplus;
        console.log(this.mainCategories[options.mainIndex].subCategories[options.subIndex]);
      }

      if (update === `Finalizing Sub-Categories`) {
        let index = 0;
        this.mainCategories.forEach((mc, i) => {
          mc.subCategories.forEach((sc, i) => {
            if (Number(options.goals[index].value) === undefined || typeof Number(options.goals[index].value) !== `number`) options.goals[index].value = Number(0);
            sc.goalAmount = Number(options.goals[index].value);
            sc.amountSpent = 0;
            sc.amountRemaining = Number(sc.goalAmount - sc.amountSpent);
            sc.percentageSpent = Number(sc.amountSpent / sc.goalAmount);
            if (isNaN(sc.percentageSpent)) sc.percentageSpent = 0;
            index++;
          });
        });
      }
    }
    if (mode === `Updating`) {
      console.log(`Updating Sub-Category...`);
    }

    /*
      This is where updating the goals SHOULD BE.

        TO SOME DEGREE, THIS IS HOW THE UPDATING SUB CATEGORIES SHOULD BE.
         _finishUpdatingSubCategory(goal) {
        let categoryGoal = goal;
        if (categoryGoal === undefined || typeof categoryGoal !== `number`) categoryGoal = 0;
        this.goalAmount = categoryGoal;
        this.amountSpent = 0;
        this.amountRemaining = this.goalAmount - this.amountSpent;
        this.percentageSpent = this.amountSpent / this.goalAmount;
        if (isNaN(this.percentageSpent)) this.percentageSpent = 0;

    */
  }

  _deleteSubCategory(mainIndex, subIndex) {
    this.mainCategories[mainIndex].subCategories = this.mainCategories[mainIndex].subCategories.filter((sc) => {
      return sc !== this.mainCategories[mainIndex].subCategories[subIndex];
    });
    // this.mainCategories[mainIndex]._deleteSubCategory(subIndex);
    console.log(this.mainCategories[mainIndex].subCategories);
    console.log(`SUCCESSFUL DELETION`);
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
    }
    if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
      this.accounts.emergencyFund.emergencyFundGoal = Number(document.querySelector('#emergencyGoal').value);
    }
  }

  _setSavingsGoal() {
    this.accounts.savingsFund.savingsPercentage = Number(document.querySelector('#savingsPercentGoal').value) / 100;
    this.accounts.savingsFund.savingsGoal = Number(document.querySelector('#savingsGoal').value);
  }

  _setInvestmentGoal() {
    this.accounts.investmentFund.investmentPercentage = Number(document.querySelector('#investmentPercentGoal').value) / 100;
    this.accounts.investmentFund.investmentGoal = Number(document.querySelector('#investmentGoal').value);
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
