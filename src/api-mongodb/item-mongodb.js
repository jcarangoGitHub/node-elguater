const Item = require('./../models/item');
//const bankAccountUtils = require('./../utils/bank-account-utils');


async function getAllItemsByPartnerId(partnerId) {
  return Item.find({_partnerId: partnerId});
}

module.exports = {
  getAllItemsByPartnerId
}
