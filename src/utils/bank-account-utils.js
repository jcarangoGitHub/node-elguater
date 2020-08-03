const BankAccount = require('./../models/bankAccount');

async function getInstanceOfBankAccount(req) {
  let image = req.file ? req.file.buffer : req.body.imageQRUploaded;
  console.log(image);
  return bankAccount = image ? new BankAccount({
    _servicePlaceId: req.body._servicePlaceId,
    accountName: req.body.accountName,
    accountNumber: req.body.accountNumber,
    imageQR: image
  }) : new BankAccount({
    _servicePlaceId: req.body._servicePlaceId,
    accountName: req.body.accountName,
    accountNumber: req.body.accountNumber
  });
}

module.exports = {
  getInstanceOfBankAccount
}
