const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankAccountSchema = new Schema({
  _servicePlaceId: Schema.Types.ObjectId,
  accountName: {
    type: String,
    tirm: true
  },
  accountNumber: {
    type: String,
    tirm: true
  },
  imageQR: Buffer
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
