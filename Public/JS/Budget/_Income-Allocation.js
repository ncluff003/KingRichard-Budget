export const _watchIncomeAllocation = (budget, placeholderBudget, user, utility) => {
  const incomeAllocationContainer = document.querySelector('.container--allocate-income');
  const unAllocatedTotal = document.querySelector('.un-allocated-account-total');
  if (incomeAllocationContainer) {
    console.log(`Allocating...`);
    unAllocatedTotal.textContent = utility.money.format(unAllocatedTotal.textContent);
    const allocateIncomeButton = document.querySelector('.button--small-purple');
    allocateIncomeButton.addEventListener('click', (e) => {
      e.preventDefault();
      // INITIALIZE NEEDED VARIABLES
      let unAllocatedAmount = Number(unAllocatedTotal.textContent.split('$')[1].split(',').join(''));
      let totalAllocationAmount = 0;
      // SELECT INPUTS FOR INCOME ALLOCATION
      const allocationInputs = document.querySelectorAll('.form__input');

      // GET TOTAL AMOUNT OF ALL INPUTS
      allocationInputs.forEach((ai, i) => {
        // ADD VALUE TO CURRENT TOTAL
        totalAllocationAmount += Number(ai.value);
      });

      // DOUBLE CHECK TO MAKE SURE ALLOCATED AMOUNT DOES NOT EXCEED UN-ALLOCATED INCOME
      totalAllocationAmount <= unAllocatedAmount
        ? (unAllocatedTotal.textContent = utility.money.format(unAllocatedAmount - totalAllocationAmount))
        : alert(`You do not have all that money! Please lower one of your accounts amounts!`);

      // INITIALIZE SEPARATE ACCOUNTS ALLOCATED TOTALS
      let monthlyBudgetAllocation, emergencyFundAllocation, savingsFundAllocation, expenseFundAllocation, debtAllocation, investmentFundAllocation;

      // GET EACH SEPARATE ACCOUNTS ALLOCATED INCOME
      monthlyBudgetAllocation = allocationInputs[0].value;
      emergencyFundAllocation = allocationInputs[1].value;
      savingsFundAllocation = allocationInputs[2].value;
      expenseFundAllocation = allocationInputs[3].value;
      debtAllocation = allocationInputs[4].value;
      investmentFundAllocation = allocationInputs[5].value;

      // DOUBLE CHECK IF IT IS A NUMBER
      if (isNaN(monthlyBudgetAllocation)) monthlyBudgetAllocation = 0;
      if (isNaN(emergencyFundAllocation)) emergencyFundAllocation = 0;
      if (isNaN(savingsFundAllocation)) savingsFundAllocation = 0;
      if (isNaN(expenseFundAllocation)) expenseFundAllocation = 0;
      if (isNaN(debtAllocation)) debtAllocation = 0;
      if (isNaN(investmentFundAllocation)) investmentFundAllocation = 0;

      const updateObject = {
        budgetId: budget._id,
        userId: user._id,
        user: user,
        accounts: {
          unAllocated: {
            amount: Number(unAllocatedTotal.textContent.split('$')[1].split(',').join('')),
          },
          monthlyBudget: {
            amount: Number(monthlyBudgetAllocation) + budget.accounts.monthlyBudget.amount,
          },
          emergencyFund: {
            emergencyFundGoal: placeholderBudget.accounts.emergencyFund.emergencyFundGoal,
            emergencyGoalMeasurement: placeholderBudget.accounts.emergencyFund.emergencyGoalMeasurement,
            emergencyFundGoalTiming: placeholderBudget.accounts.emergencyFund.emergencyFundGoalTiming,
            amount: Number(emergencyFundAllocation) + budget.accounts.emergencyFund.amount,
          },
          savingsFund: {
            savingsGoal: placeholderBudget.accounts.savingsFund.savingsGoal,
            savingsPercentage: placeholderBudget.accounts.savingsFund.savingsPercentage,
            amount: Number(savingsFundAllocation) + budget.accounts.savingsFund.amount,
          },
          expenseFund: {
            amount: Number(expenseFundAllocation) + budget.accounts.expenseFund.amount,
          },
          surplus: {
            amount: placeholderBudget.accounts.surplus.amount,
          },
          investmentFund: {
            investmentGoal: placeholderBudget.accounts.investmentFund.investmentGoal,
            investmentPercentage: placeholderBudget.accounts.investmentFund.investmentPercentage,
            amount: Number(investmentFundAllocation) + budget.accounts.investmentFund.amount,
          },
          debt: {
            debtAmount: placeholderBudget.accounts.debt.debtAmount,
            amount: Number(debtAllocation) + budget.accounts.debt.amount,
          },
        },
      };

      placeholderBudget._updateBudget({ updateObject: updateObject }, `Allocate-Income`);

      allocationInputs.forEach((ai) => {
        ai.value = '';
      });
    });
  }
};
