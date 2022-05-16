export class Transaction {
  constructor(options) {
    this.transactionDate = new Date(new Date(options.date).setHours(new Date(options.date).getHours() + new Date().getTimezoneOffset() / 60));
    // this.transactionType = options.type;
    this.location = options.location;
    this.receipt = [];
  }
  addToReceipt(options) {
    let receiptObject = {};
    if (this.transactionType === `Deposit`) {
      receiptObject.account = options.account;
      receiptObject.grossAmount = options.grossAmount;
      receiptObject.netAmount = options.netAmount;
      receiptObject.amount = options.deposited;
      if (options.user.latterDaySaint === true) {
        if (options.budget.accounts.tithing.tithingSetting !== `Surplus`) {
          receiptObject.tithed = options.tithed;
        }
      }
      this.receipt.push(receiptObject);
    }
    if (this.transactionType === `Withdrawal`) {
      if ((options.accountSelected = `Monthly Budget`)) {
        receiptObject.category = options.mainCategory;
        receiptObject.subCategory = options.subCategory;
        receiptObject.amount = options.amount;
        if (options.description) {
          receiptObject.description = options.description;
        }
      }
      if (options.accountSelected === `Emergency Fund`) {
        receiptObject.amount = options.amount;
        receiptObject.description = options.description;
      }
    }
    this.receipt.push(receiptObject);
  }
  removeFromReceipt(index) {
    this.receipt = this.receipt.filter((item, i) => {
      if (item !== this.receipt[index]) return item;
    });
  }
}
