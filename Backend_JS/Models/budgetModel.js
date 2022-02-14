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
      goalMeasurement: {
        type: String,
        enum: [`Length Of Time`, `Total Amount`],
        required: [true, `You must set a goal type for your emergency fund.`],
      },
      goal: {
        // type: mongoose.Mixed,
        type: Number,
        // enum: [Number, `${Number} Months`],
        required: [true, `An emergency fund goal is required.`],
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
    savingsFund: {
      goal: {
        type: Number,
        required: [true, `Every Budget Needs A Savings Fund Goal`],
      },
      percentage: {
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
      goal: {
        type: Number,
        required: [true, `Every Budget Needs A Savings Fund Goal`],
      },
      percentage: {
        type: Number,
        required: [true, `Every Budget Needs A Percentage Set`],
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
      setting: {
        type: String,
        enum: [`Gross`, `Net`, `Surplus`],
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
  },
  mainCategories: [
    {
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
        date: {
          type: Date,
          required: [true, `Every Transaction Must Have A Date`],
        },
        type: {
          type: String,
          enum: [`Deposit`, `Withdrawal`],
          required: [true, `Every Transaction Is Either A Deposit Or Withdrawal`],
        },
        location: {
          type: String,
          required: [true, `Every Transaction Happened Somewhere.`],
        },
        account: {
          type: String,
          enum: [`Expense`, `Savings`, `Debt`, `Surplus`],
          required: [true, `Every Transaction Must Come From An Account`], // Goes To Account
        },
        subAccount: {
          type: String,
          enum: [`Bill`, `Debt`, `Subscription`, `Other`],
          required: [true, `Every Transaction Needs A Type Given.`], // Goes To Expenditure In Recent Transactions
        },
        amount: {
          type: Number,
          required: [true, `Every Transaction Had An Ammount.`],
        },
        need: {
          type: String,
          enum: [`Need`, `Surplue`],
          required: [true, `Every Transaction Must Be Deemed Needed Or Surplus.`], // Expenses AND Savings Will Need Option For Whether It Is Surplus Or Not On Enter Transaction Form.
        },
        dueDate: {
          type: Date,
          required: [true, `Every Transaction Must Have A Due Date`],
        },
        timing: {
          type: String,
          enum: [`Weekly`, `Bi-Weekly`, `Bi-Monthly`, `Monthly`, `Quarterly`, `Bi-Annually`, `Annually`],
        },
        description: {
          type: String,
        },
        amountSaved: {
          type: Number,
          default: 0,
        },
        paid: {
          type: Boolean,
          enum: [],
          default: false,
        },
        paidStatus: {
          type: String,
          enum: [`Paid Off`, `Partially Paid`, `Not Paid`],
        },
      },
    ],
    recentTransactions: [
      {
        date: {
          type: Date,
          required: [true, `Every Transaction Must Have A Date`],
        },
        type: {
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
              required: [true, `Every Transaction Must Come From An Account`],
            },
            category: {
              type: String,
            },
            subCategory: {
              type: String,
            },
            timing: {
              type: String,
              enum: [`Weekly`, `Bi-Weekly`, `Bi-Monthly`, `Monthly`, `Quarterly`, `Bi-Annually`, `Annually`],
            },
            expenditure: {
              type: String,
            },
            lender: {
              type: String,
            },
            amount: {
              type: Number,
              required: [true, `Every Transaction Had An Ammount.`],
            },
            description: {
              type: String,
              required: [true, `Every Transaction Must Come From An Account`],
            },
            fullyPaid: {
              type: Boolean,
            },
          },
        ],
      },
    ],
  },
  investments: [
    {
      name: {
        type: String,
        required: [true, `Every Investment Must Have A Name`],
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
});

const Budget = new mongoose.model(`Budget`, budgetSchema);

module.exports = Budget;
