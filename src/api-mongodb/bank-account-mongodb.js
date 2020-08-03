const BankAccount = require('./../models/bankAccount');
const bankAccountUtils = require('./../utils/bank-account-utils');

async function createBankAccount(req) {
  let bankAccount = await bankAccountUtils.getInstanceOfBankAccount(req);
  return await bankAccount.save();
}

async function editBankAccount(req) {
  let image = req.file ? req.file.buffer : null;  
  let resBankAccount = await BankAccount.findByIdAndUpdateAccordingToImage(req, req.body._bankAccountId, image);
  return resBankAccount;
}

async function removeBankAccountById(req) {
  let resRemove = await BankAccount.findByIdAndRemove(req.body._bankAccountId, {rawResult:true});
  if (resRemove && resRemove.ok == 1) {
    return true;
  }
  return false;
}

async function getAllBankAccountByServicePlaceId(servicePlaceId) {
  return BankAccount.find({_servicePlaceId: servicePlaceId});
}

async function findBankAccountByIdFromId(id) {
  return BankAccount.findById(id);
}

module.exports = {
  createBankAccount,
  getAllBankAccountByServicePlaceId,
  removeBankAccountById,
  findBankAccountByIdFromId,
  editBankAccount
}
