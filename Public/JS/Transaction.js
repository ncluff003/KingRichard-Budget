export class Transaction {
  constructor(options) {
    this.transactionDate = new Date(new Date(options.date).setHours(new Date(options.date).getHours() + new Date().getTimezoneOffset() / 60));
    this.transactionType = options.type;
    this.location = options.location;
    this.receipt = [];
  }
  addToReceipt(options) {
    if (this.transactionType === `Deposit`) {
      let receiptObject = {};
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
  }
}
