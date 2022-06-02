const mongoose = require(`mongoose`);
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('./userModel');

const budgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Every Budget Must Have A Name`],
  },
  createdAt: Date,
  lastUpdated: Date,
  currentMonth: {
    type: String,
  },
  previousMonth: {
    type: String,
  },
  associatedUsers: [],
  budgetAdmins: [],
  coverPhoto: {
    type: String,
    default: `Default-Budget-Cover-Photo.svg`,
  },
  accounts: {
    unAllocated: {
      amount: {
        type: Number,
        default: 0,
      },
    },
    monthlyBudget: {
      amount: {
        type: Number,
        default: 0,
      },
    },
    emergencyFund: {
      emergencyGoalMeasurement: {
        type: String,
        enum: [`Length Of Time`, `Total Amount`],
        required: [true, `You must set a goal type for your emergency fund.`],
      },
      emergencyFundGoal: {
        // type: mongoose.Mixed,
        type: Number,
        // enum: [Number, `${Number} Months`],
        required: [true, `An emergency fund goal is required.`],
      },
      emergencyFundGoalTiming: {
        type: String,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
    savingsFund: {
      savingsGoal: {
        type: Number,
        required: [true, `Every Budget Needs A Savings Fund Goal`],
      },
      savingsPercentage: {
        type: Number,
        required: [true, `Every Budget Needs A Percentage Set`],
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
    expenseFund: {
      amount: {
        type: Number,
        default: 0,
      },
    },
    surplus: {
      amount: {
        type: Number,
        default: 0,
      },
    },
    investmentFund: {
      investmentGoal: {
        type: Number,
        required: [true, `Every Budget Needs A Savings Fund Goal`],
      },
      investmentPercentage: {
        type: Number,
        required: [true, `Every Budget Needs A Percentage Set`],
      },
      /* 
        Recently, I figured that with the transaction of an investment, the investment acount will need an amount for the allocated funds which have NOT been invested as well as having a value for the 'invested' allocated income.  This will not be reflected in the investment fund total on the page, but rather, it should be reflected in the database and the dashboard under under the bank total, and also affect something like the surplus algorithms.
      */
      investedAmount: {
        type: Number,
        default: 0,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
    debt: {
      amount: {
        type: Number,
        default: 0,
      },
      debtAmount: {
        type: Number,
        default: 0,
      },
    },
    tithing: {
      tithingSetting: {
        type: String,
        enum: [`Gross`, `Net`, `Surplus`],
      },
      amount: {
        type: Number,
      },
    },
  },
  mainCategories: [
    {
      createdAt: {
        type: Date,
        default: new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60)),
      },
      lastUpdated: {
        type: Date,
        default: new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60)),
      },
      icon: {
        type: String,
        required: [true, `Every Main Category Needs An Icon`],
      },
      title: {
        type: String,
        required: [true, `Every Main Category Needs A Title`],
      },
      subCategories: [
        {
          createdAt: {
            type: Date,
            default: new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60)),
          },
          lastUpdated: {
            type: Date,
            default: new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60)),
          },
          title: {
            type: String,
            required: [true, `Every Sub Category Needs A Title`],
          },
          timingOptions: {
            paymentCycle: {
              type: String,
              enum: [`Weekly`, `Bi-Weekly`, `Bi-Monthly`, `Monthly`],
            },
            dueDates: [],
            paymentSchedule: {
              type: mongoose.Mixed,
            },
          },
          goalAmount: {
            type: Number,
            default: 0,
            required: [true, `Every Sub Category Needs A Goal.`],
          },
          amountSpent: {
            type: Number,
            default: 0,
          },
          amountRemaining: {
            type: Number,
          },
          percentageSpent: {
            type: Number,
            default: 0,
          },
          surplus: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
  transactions: {
    plannedTransactions: [
      {
        // Thinking through the timing of the sub-categories to build transaction plans for them.
        date: {
          type: Date, // This should be the last time the sub-categories were last updated.  So..., this will require a model update.
          required: [true, `Every Transaction Must Have A Date`],
        },
        type: {
          type: String,
          enum: [`Deposit`, `Withdrawal`], // Monthly Budget planned transactions will ALWAYS be a withdrawal.
          required: [true, `Every Transaction Is Either A Deposit Or Withdrawal`],
        },
        lender: {
          type: String,
        },
        location: {
          // I either just make the location ALWAYS be online or home, or I figure something else out.  I probably could add a feature to the transaction planner to `edit` the location.
          // I will do the first thought for now, while the other one will come in the future.
          type: String,
          required: [true, `Every Transaction Happened Somewhere.`],
        },
        account: {
          type: String,
          // enum: [`Expense Fund`, `Savings Fund`, `Debt`, `Surplus`],
          required: [true, `Every Transaction Must Come From An Account`], // Goes To Account
        },
        subAccount: {
          type: String,
          // enum: [`Bill`, `Debt`, `Subscription`, `Other`, `Loan`, `Credit Card`, `Taxes`, `Expense`, `Discretionary`, `Food`, `Vacations`, `Tuition`],
          required: [true, `Every Transaction Needs A Type Given.`], // Goes To Expenditure In Recent Transactions
        },
        category: {
          type: String,
        },
        subCategory: {
          type: String,
        },
        amount: {
          type: Number,
          required: [true, `Every Transaction Had An Ammount.`],
        },
        need: {
          type: String,
          enum: [`Need`, `Surplus`],
          required: [true, `Every Transaction Must Be Deemed Needed Or Surplus.`], // Expenses AND Savings Will Need Option For Whether It Is Surplus Or Not On Enter Transaction Form.
        },
        timingOptions: {
          paymentCycle: {
            type: String,
            enum: [`Once`, `Weekly`, `Bi-Weekly`, `Bi-Monthly`, `Monthly`, `Quarterly`, `Bi-Annual`, `Annual`],
          },
          dueDates: [],
          paymentSchedule: {
            type: mongoose.Mixed,
          },
        },
        name: {
          type: String,
        },
        amountSaved: {
          type: Number,
          default: 0,
        },
        paid: {
          type: Boolean,
          default: false,
        },
        paidStatus: {
          type: String,
          enum: [`Overpaid`, `Paid Off`, `Partially Paid`, `Unpaid`],
        },
      },
    ],
    recentTransactions: [
      {
        transactionDate: {
          type: Date,
          required: [true, `Every Transaction Must Have A Date`],
        },
        transactionType: {
          type: String,
          enum: [`Deposit`, `Withdrawal`],
          required: [true, `Every Transaction Is Either A Deposit Or Withdrawal`],
        },
        location: {
          type: String,
          required: [true, `Every Transaction Happened Somewhere.`],
        },
        receipt: [
          {
            account: {
              type: String,
            },
            category: {
              type: String,
            },
            subCategory: {
              type: String,
            },
            timing: {
              type: String,
              enum: [`Once`, `Weekly`, `Bi-Weekly`, `Bi-Monthly`, `Monthly`, `Quarterly`, `Bi-Annual`, `Annual`],
            },
            expenditure: {
              type: String,
            },
            lender: {
              type: String,
            },
            grossAmount: {
              type: Number,
            },
            netAmount: {
              type: Number,
            },
            amount: {
              type: Number,
              required: [true, `Every Transaction Had An Ammount.`],
            },
            transactionName: {
              type: String,
            },
            description: {
              type: String,
            },
            fullyPaid: {
              type: Boolean,
            },
            tithed: {
              type: Boolean,
            },
          },
        ],
      },
    ],
  },
  investments: [
    {
      investmentType: {
        type: String,
        enum: [`Stock`, `Real Estate`, `Timeshare`, `Other`],
        required: [true, `Every Investment Must Have A Type`],
      },
      investmentName: {
        type: String,
        required: [true, `Every Investment Must Be Named`],
      },
      investmentDescription: {
        type: String,
      },
      initialInvestment: {
        type: Number,
        default: 0,
        required: [true, `Every Investment Starts Somewhere`],
      },
      currentValue: {
        type: Number,
        default: this.initialInvestment, // I will review this stuff to see if this is correct.  Also, I can do a bit of trial and error.
      },
      settled: {
        type: Boolean,
        default: false,
      },
      valueDifference: {
        type: Number, // I will find out the correct way to add a function here to simply make the value here the current value minus the initial investment.
      },
    },
  ],
  debts: [
    {
      date: {
        type: Date,
      },
      lender: {
        type: String,
        required: [true, `Every debt requires a lender.`],
      },
      debtType: {
        type: String,
        enum: [`Credit Card`, `Loan`, `Taxes`, `Debt`, `Other`],
      },
      initialDebt: {
        type: Number,
        required: [true, `Every debt started somewhere at a specific number.`],
      },
      amountOwed: {
        type: Number,
        default: this.initialAmount,
      },
      status: {
        type: String,
        enum: [`Unpaid`, `Partially Paid`, `Paid Off`],
        default: `Unpaid`,
      },
      datePaid: {
        type: Date,
      },
    },
  ],
});

const Budget = new mongoose.model(`Budget`, budgetSchema);

module.exports = Budget;
