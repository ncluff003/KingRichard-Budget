const mongoose = require(`mongoose`);
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
  accounts: [
    {
      name: String,
      amount: {
        type: Number,
        default: 0,
      },
    },
    {
      name: String,
      ammount: {
        type: Number,
        default: 0,
      },
    },
    {
      name: String,
      ammount: {
        type: Number,
        default: 0,
      },
      goalMeasurement: {
        type: String,
        enum: [`Length Of Time`, `Total Amount`],
        required: [true, `You must set a goal type for your emergency fund.`],
      },
      goal: {
        type: mongoose.Mixed,
        enum: [Number, `${Number} Months`],
        required: [true, `An emergency fund goal is required.`],
      },
    },
    {
      name: String,
      goal: {
        type: Number,
        required: [true, `A savings fund goal is required.`],
      },
      ammount: {
        type: Number,
        default: 0,
      },
    },
    {
      name: String,
      amount: {
        type: Number,
        default: 0,
      },
    },
    {
      name: String,
      amount: {
        type: Number,
        default: 0,
      },
    },
    {
      name: String,
      goal: {
        type: Number,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
    {
      name: String,
      amount: {
        type: Number,
        default: 0,
      },
    },
    {
      name: String,
      setting: {
        type: String,
        enum: [`Gross`, `Net`, `Surplus`],
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
  ],
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
            paymentSchedule: [Date],
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
});

const Budget = new mongoose.model(`Budget`, budgetSchema);

module.exports = Budget;
