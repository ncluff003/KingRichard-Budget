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

  _addName(name) {
    return (this.name = name);
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
        console.log(options.index, options.subCategoryIndex);
        /*
          GLITCH : In the place of setting timings for both the Budget Creation and Editing Category Goals, the main category titles and icons are both placed and cycled differently.
            With creation, it just removes the class that the main category has for the icon, and adds the next or previous one.  It does the same thing for the titles.  In editing, it displays all 3, while making the main one as display: flex.  The method works on creation, so I likely
            will adjust the edit category goals one for that purpose, with making sure that it does NOT negatively affect other things.
        */
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

  _updateAccounts(mode, update, options) {
    if (mode === `Creation`) {
      if (update === `Tithing Setting`) {
        this.accounts.tithing.tithingSetting = options.setting;
      }
      if (update === `Emergency Measurement`) {
        this.accounts.emergencyFund.emergencyGoalMeasurement = options.setting;
      }
      if (update === `Emergency Goal`) {
        if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
          this.accounts.emergencyFund.emergencyFundGoal = options.goal;
          this.accounts.emergencyFund.emergencyFundGoalTiming = options.goalTiming;
        }
        if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
          this.accounts.emergencyFund.emergencyFundGoal = options.goal;
        }
      }
      if (update === `Savings`) {
        this.accounts.savingsFund.savingsPercentage = Number(options.percentage);
        this.accounts.savingsFund.savingsGoal = Number(options.goal);
      }
      if (update === `Investment`) {
        this.accounts.investmentFund.investmentPercentage = Number(options.percentage);
        this.accounts.investmentFund.investmentGoal = Number(options.goal);
      }
      if (update === `Debt`) {
        this.accounts.debt.amount = Number(options.amount);
        this.accounts.debt.debtAmount = Number(options.debtAmount);
      }
    }
  }

  _updateBudget(mode, update, options) {
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
        Manage.updateMyBudget(updateObject);
      }
      if (update === `Edit Category Goals`) {
        console.log(options.updateObject);
        // Start Update Object With Budget And User IDs.
        // let updateObject = options.updateObject;
        // updateObject.budgetId = options.budgetId;
        // updateObject.userId = options.userId;
        // updateObject.mainCategories = [];
        // const mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');

        // let mainCategoryIndex = 0;
        // let subCategoryIndex = 0;

        // let emptyArray = [];
        // let temporaryObject;

        // options.budgetMainCategories.forEach((bmc, i) => {
        //   temporaryObject = Object.fromEntries([
        //     [`title`, mainCategoryTitles[i].textContent],
        //     [`icon`, options.budgetMainCategories[i].icon],
        //     [`subCategories`, emptyArray],
        //   ]);
        //   updateObject.mainCategories.push(temporaryObject);

        //   let tempArray = Array.from(document.querySelectorAll(`.sub-category-display__sub-category[data-subcategory="${i}"]`));
        //   let mainCategoryIndex = i;
        //   tempArray.forEach((temp, i) => {
        //     let title = temp.firstChild.nextSibling.firstChild.textContent;
        //     let goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
        //     let amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
        //     let amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
        //     let percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
        //     let timingOptions = bmc.subCategories[i].timingOptions;

        //     temporaryObject.subCategories.push(
        //       Object.fromEntries([
        //         [`title`, title],
        //         [`goalAmount`, goalAmount],
        //         [`amountSpent`, amountSpent],
        //         [`amountRemaining`, amountRemaining],
        //         [`percentageSpent`, percentageSpent],
        //         [`timingOptions`, timingOptions],
        //       ])
        //     );
        //     if (temporaryObject.subCategories.length === tempArray.length) {
        //       mainCategoryIndex++;
        //       if (temporaryObject === undefined) return;
        //       temporaryObject.subCategories = [];
        //       return mainCategoryIndex;
        //     }
        //     if (i === tempArray.length) {
        //       mainCategoryIndex++;
        //     }
        //   });

        //   if (updateObject.mainCategories.length === options.budgetMainCategories.length) {
        //     return (mainCategoryIndex = 0);
        //   }
        // });

        // updateObject.mainCategories.forEach((mc, i) => {
        //   // Maintain.fillSubCategoryArray(updateObject, i);
        //   let mainCategoryIndex = i;
        //   let tempArray = Array.from(document.querySelectorAll(`.sub-category-display__sub-category[data-subcategory="${i}"]`));
        //   tempArray.forEach((temp, i) => {
        //     let title = temp.firstChild.nextSibling.firstChild.textContent;
        //     let goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
        //     let amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
        //     let amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
        //     let percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
        //     let timingOptions = options.budgetMainCategories[mainCategoryIndex].subCategories[i].timingOptions;

        //     updateObject.mainCategories[mainCategoryIndex].subCategories.push(
        //       Object.fromEntries([
        //         [`title`, title],
        //         [`goalAmount`, goalAmount],
        //         [`amountSpent`, amountSpent],
        //         [`amountRemaining`, amountRemaining],
        //         [`percentageSpent`, percentageSpent],
        //         [`timingOptions`, timingOptions],
        //       ])
        //     );
        //     if (updateObject.mainCategories[mainCategoryIndex].subCategories.length === tempArray.length) {
        //       mainCategoryIndex++;
        //       if (updateObject.mainCategories[mainCategoryIndex] === undefined) return;
        //       updateObject.mainCategories[mainCategoryIndex].subCategories = [];
        //       return mainCategoryIndex;
        //     }
        //     if (i === tempArray.length) {
        //       mainCategoryIndex++;
        //     }
        //   });
        // });
        console.log(`Updating Category Goals...`);
        // GLITCH : For some reason, ONLY the last Main Category had been pushed through.  So, the previous two had been erased completely.
        console.log(updateObject.mainCategories);
        Manage.updateMyBudget(options.updateObject);
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
      this._addName(budget.name);
      if (user.latterDaySaint === true) {
        this._updateAccounts(`Creation`, `Tithing Setting`, { setting: budget.accounts.tithing.tithingSetting });
      }
      this._updateAccounts(`Creation`, `Emergency Measurement`, { setting: budget.accounts.emergencyFund.emergencyGoalMeasurement });
      if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Length Of Time`) {
        this._updateAccounts(`Creation`, `Emergency Goal`, {
          goal: budget.accounts.emergencyFund.emergencyFundGoal,
          goalTiming: budget.accounts.emergencyFund.emergencyFundGoalTiming,
        });
      }
      if (this.accounts.emergencyFund.emergencyGoalMeasurement === `Total Amount`) {
        this._updateAccounts(`Creation`, `Emergency Goal`, { goal: budget.accounts.emergencyFund.emergencyFundGoal });
      }
      this._updateAccounts(`Creation`, `Savings`, { goal: budget.accounts.savingsFund.savingsGoal, percentage: budget.accounts.savingsFund.savingsPercentage });
      this._updateAccounts(`Creation`, `Investment`, { goal: budget.accounts.investmentFund.investmentGoal, percentage: budget.accounts.investmentFund.investmentPercentage });
      this._updateAccounts(`Creation`, `Debt`, { amount: budget.accounts.debt.amount, debtAmount: budget.accounts.debt.debtAmount });
      budget.mainCategories.forEach((mc) => {
        let subCategories = [];
        mc.subCategories.forEach((sc) => {
          subCategories.push({
            title: sc.title,
            timingOptions: sc.timingOptions,
            goalAmount: sc.goalAmount,
            amountSpent: sc.amountSpent,
            amountRemaining: sc.amountRemaining,
            percentageSpent: sc.percentageSpent,
            surplus: sc.surplus,
          });
        });
        this.mainCategories.push({ icon: mc.title, title: mc.title, subCategories: subCategories });
      });
      this.transactions = budget.transactions;
      this.investments = budget.investments;
      console.log(budget);
    }
  }
}

export const startToCreate = () => {
  const budget = new Budget();
  budget._addAccounts();
  return budget;
};
