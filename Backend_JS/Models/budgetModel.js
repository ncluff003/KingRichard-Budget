const mongoose = require(`mongoose`);
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const budgetSchema = new mongoose.Schema({
  budget: {
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
    accounts: [
      {
        unAllocated: {
          ammount: {
            type: Number,
            default: 0,
          },
        },
        monthlyBudget: {
          ammount: {
            type: Number,
            default: 0,
          },
        },
        emergencyFund: {
          goalType: {
            type: String,
            enum: [`Time`, `Total`],
            required: [true, `You must set a goal type for your emergency fund.`],
          },
          goal: {
            type: Mixed,
            enum: [Number, `${Number} Months`],
            required: [true, `A emergency fund goal is required.`],
          },
          ammount: {
            type: Number,
            default: 0,
          },
        },
        savingsFund: {
          goal: {
            type: Number,
            required: [true, `A savings fund goal is required.`],
          },
          ammount: {
            type: Number,
            default: 0,
          },
        },
        expenseFund: {
          ammount: {
            type: Number,
            default: 0,
          },
        },
        surplus: {
          ammount: {
            type: Number,
            default: 0,
          },
        },
        investmentFund: {
          goal: {
            type: Number,
          },
          ammount: {
            type: Number,
            default: 0,
          },
        },
        debt: {
          ammount: {
            type: Number,
            default: 0,
          },
        },
        tithing: {
          setting: {
            type: String,
            enum: [`Gross`, `Net`, `Surplus`],
          },
          ammount: {
            type: Number,
            default: 0,
          },
        },
      },
    ],
    categories: [
      {
        mainCategories: {
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
              timingFunction: {
                cycle: {
                  type: String,
                  enum: [`Weekly`, `Bi-Weekly`, `Bi-Monthly`, `Monthly`],
                },
                dueDates: [],
                paymentForecast: [],
              },
              goalAmount: {
                type: Number,
                required: [true, `Every Sub Category Needs A Goal.`],
              },
              amountSpent: {
                type: Number,
                default: 0,
              },
              amountRemaining: {
                type: Number,
              },
              percentSpent: {
                type: String,
                default: `0%`,
              },
              surplus: {
                type: Boolean,
                default: false,
              },
            },
          ],
        },
      },
    ],
  },
});

const Budget = new mongoose.model(`Budget`, budgetSchema);

module.exports = Budget;
