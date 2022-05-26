import * as Budgets from './Create-Budget';
import * as Manage from './Manage-Budget';
import * as Maintain from './Maintain-Budget';
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

  async getBudget(id, user) {
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

  _addBudgetTransactions() {
    this.transactions = [];
  }

  _addBudgetInvestments() {
    this.investments = [];
  }

  _addBudgetDebts() {
    this.debts = [];
  }

  _updateBudgetName(name) {
    return (this.name = name);
  }

  _addMainCategory(icon, title) {
    // This is how main categories are added as objects with an icon and title.
    this.mainCategories.push(new Categories.MainCategory({ icon: icon, title: title }));
  }

  _updateMainCategory() {
    console.log(`Main Category`);
  }

  _removeMainCategory(title) {
    this.mainCategories = this.mainCategories.filter((mc, i) => mc.title !== title);
    console.log(`SUCCESSFUL DELETION`);
  }

  _addSubCategory(index, title) {
    this.mainCategories[index].subCategories.push(new Categories.SubCategory({ title: title }));
    console.log(this.mainCategories[index].subCategories);
  }

  _deleteSubCategory(mainIndex, subIndex) {
    this.mainCategories[mainIndex].subCategories = this.mainCategories[mainIndex].subCategories.filter((sc) => {
      return sc !== this.mainCategories[mainIndex].subCategories[subIndex];
    });
    console.log(`SUCCESSFUL DELETION`);
  }

  _makeSurplusSubCategory(options) {
    this.mainCategories[options.mainIndex].subCategories[options.subIndex].surplus = !this.mainCategories[options.mainIndex].subCategories[options.subIndex].surplus;
    console.log(this.mainCategories[options.mainIndex].subCategories[options.subIndex]);
    if (!this.mainCategories[options.mainIndex].subCategories[options.subIndex].createAt) {
      this.mainCategories[options.mainIndex].subCategories[options.subIndex].createdAt = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));
    }
    this.mainCategories[options.mainIndex].subCategories[options.subIndex].lastUpdated = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));
    this.mainCategories[options.mainIndex].subCategories[options.subIndex].updated = true;
  }

  _updateSubCategoryTiming(options) {
    this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.paymentCycle = options.paymentCycle;
    this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.paymentSchedule = options.paymentSchedule;
    this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.dueDates = [
      this.mainCategories[options.index].subCategories[options.subCategoryIndex].timingOptions.paymentSchedule[0],
    ];
  }

  _finalizeSubCategoryCreation(options) {
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

  _updateEmergencyMeasurement(options) {
    this.accounts.emergencyFund.emergencyGoalMeasurement = options.setting;
  }

  _updateEmergencyGoal(options) {
    if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
      this.accounts.emergencyFund.emergencyFundGoal = options.goal;
      this.accounts.emergencyFund.emergencyFundGoalTiming = options.goalTiming;
      this.accounts.emergencyFund.amount = options.amount;
    }
    if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
      this.accounts.emergencyFund.emergencyFundGoal = options.goal;
      this.accounts.emergencyFund.amount = options.amount;
    }
  }

  _updateSavingsFund(options) {
    this.accounts.savingsFund.savingsPercentage = Number(options.percentage);
    this.accounts.savingsFund.savingsGoal = Number(options.goal);
    this.accounts.savingsFund.amount = Number(options.amount);
  }

  _updateInvestmentFund(options) {
    this.accounts.investmentFund.investmentPercentage = Number(options.percentage);
    this.accounts.investmentFund.investmentGoal = Number(options.goal);
    this.accounts.investmentFund.amount = Number(options.amount);
    if (isNaN(Number(options.investedAmount))) {
      options.investedAmount = 0;
    }
    this.accounts.investmentFund.investedAmount = Number(options.investedAmount);
  }

  _updateTithingAccount(options) {
    this.accounts.tithing.tithingSetting = options.setting;
    this.accounts.tithing.amount = Number(options.amount);
  }

  _updateExpenseFund(options) {
    this.accounts.expenseFund.amount = Number(options.amount);
  }

  _updateSurplus(options) {
    this.accounts.surplus.amount = Number(options.amount);
  }

  _updateMonthlyBudgetAccount(options) {
    this.accounts.monthlyBudget.amount = Number(options.amount);
  }

  _updateDebtAccount(options) {
    this.accounts.debt.amount = Number(options.amount);
    this.accounts.debt.debtAmount = Number(options.debtAmount);
  }

  _enterIncome(options, pageLink) {
    console.log(`Entering Income...`, options);
    Manage.updateMyBudget(options.updateObject, pageLink);
  }

  _updateBudget(mode, update, options, pageLink) {
    if (mode === `Update`) {
      let updateObject = options.updateObject;
      if (update === `Budget Management`) {
        console.log(options.user);
        updateObject.budgetId = options.budgetId;
        updateObject.userId = options.userId;
        updateObject.name = options.name;
        updateObject.accounts = {
          unAllocated: {
            amount: options.unAllocatedAmount,
          },
          monthlyBudget: {
            amount: options.monthlyBudgetAmount,
          },
          emergencyFund: options.emergencyFund,
          savingsFund: options.savingsFund,
          expenseFund: {
            amount: options.expenseFundAmount,
          },
          surplus: {
            amount: options.surplusAmount,
          },
          investmentFund: options.investmentFund,
          debt: {
            amount: options.debtAmount,
            debtAmount: options.debtTotal,
          },
        };
        if (options.user.latterDaySaint === true) {
          updateObject.accounts.tithing = options.tithing;
        }
        console.log(updateObject);
        Manage.updateMyBudget(updateObject, pageLink);
      }
      if (update === `Edit Category Goals`) {
        console.log(options.updateObject);
        console.log(`Updating Category Goals...`);
        // GLITCH : For some reason, ONLY the last Main Category had been pushed through.  So, the previous two had been erased completely.
        console.log(updateObject.mainCategories);
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      if (update === `Manage Categories`) {
        console.log(`Updating Categories...`);
        console.log(options, options.updateObject);
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      if (update === `Enter Income`) {
        console.log(`Entering Income...`, options);
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      if (update === `Allocate Income`) {
        console.log(`Allocating...`);
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      if (update === `Transaction Planner`) {
        console.log(`Planning...`, options);
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      if (update === `Apply Money`) {
        console.log(`Applying...`, options);
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      if (update === `Add Investment`) {
        console.log(`Investing...`, options, options.investments);
        const investmentType = document.querySelector('.form__select--accounts-short');
        const investmentName = document.getElementById('investmentName');
        const investmentDescription = document.getElementById('investmentDescription');
        const initialInvestment = document.getElementById('initialInvestment');
        let currentValue = initialInvestment.value;
        let valueDifference = Number(currentValue - initialInvestment.value);
        if (isNaN(valueDifference)) valueDifference = 0;
        options.updateObject.investments.push({
          investmentType: investmentType.value,
          investmentName: investmentName.value,
          investmentDescription: investmentDescription.value,
          initialInvestment: Number(initialInvestment.value),
          currentValue: Number(currentValue),
          valueDifference: valueDifference,
        });
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      if (update === `Update Investment`) {
        console.log(`Updating...`, options);
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      if (update === `Settle Investment`) {
        console.log(`Settling...`, options);
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      if (update === `Add Debt`) {
        console.log(`Adding Debt...`, options);
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      if (update === `Enter Transaction`) {
        console.log(`Entering...`, options);
        Manage.updateMyBudget(options.updateObject, pageLink);
      }

      console.log(`Updating...`);
    }
  }

  _setInvestmentGoal() {
    this.accounts.investmentFund.investmentPercentage = Number(document.querySelector('#investmentPercentGoal').value) / 100;
    this.accounts.investmentFund.investmentGoal = Number(document.querySelector('#investmentGoal').value);
  }

  _submit(budget, user) {
    Budgets.createBudget(budget, user);
  }

  _buildPlaceHolderBudget(budget, user) {
    if (budget) {
      this._addTithingAccount(user);
      this._updateBudgetName(budget.name);
      if (user.latterDaySaint === true) {
        this._updateTithingAccount({ setting: budget.accounts.tithing.tithingSetting, amount: budget.accounts.tithing.amount });
      }
      this._updateEmergencyMeasurement({ setting: budget.accounts.emergencyFund.emergencyGoalMeasurement });
      if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
        this._updateEmergencyGoal({
          goal: budget.accounts.emergencyFund.emergencyFundGoal,
          goalTiming: budget.accounts.emergencyFund.emergencyFundGoalTiming,
          amount: budget.accounts.emergencyFund.amount,
        });
      }
      if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
        this._updateEmergencyGoal({ goal: budget.accounts.emergencyFund.emergencyFundGoal, amount: budget.accounts.emergencyFund.amount });
      }
      this._updateMonthlyBudgetAccount({ amount: budget.accounts.monthlyBudget.amount });
      this._updateSavingsFund({
        goal: budget.accounts.savingsFund.savingsGoal,
        percentage: budget.accounts.savingsFund.savingsPercentage,
        amount: budget.accounts.savingsFund.amount,
      });
      this._updateInvestmentFund({
        goal: budget.accounts.investmentFund.investmentGoal,
        percentage: budget.accounts.investmentFund.investmentPercentage,
        investedAmount: budget.accounts.investmentFund.investedAmount,
        amount: budget.accounts.investmentFund.amount,
      });
      this._updateExpenseFund({ amount: budget.accounts.expenseFund.amount });
      this._updateSurplus({ amount: budget.accounts.surplus.amount });
      this._updateDebtAccount({ amount: budget.accounts.debt.amount, debtAmount: budget.accounts.debt.debtAmount });
      budget.mainCategories.forEach((mc) => {
        let subCategories = [];
        mc.subCategories.forEach((sc) => {
          subCategories.push({
            title: sc.title,
            createdAt: sc.createdAt,
            lastUpdated: sc.lastUpdated,
            timingOptions: sc.timingOptions,
            goalAmount: sc.goalAmount,
            amountSpent: sc.amountSpent,
            amountRemaining: sc.amountRemaining,
            percentageSpent: sc.percentageSpent,
            surplus: sc.surplus,
          });
        });
        this.mainCategories.push({ icon: mc.icon, title: mc.title, createdAt: mc.createAt, lastUpdated: mc.lastUpdated, subCategories: subCategories });
      });
      this.transactions = budget.transactions;
      this.investments = budget.investments;
      this.debts = budget.debts;
    }
  }
}

export const startToCreate = () => {
  const budget = new Budget();
  budget._addAccounts();
  budget._addBudgetTransactions();
  budget._addBudgetInvestments();
  budget._addBudgetDebts();
  return budget;
};
