const Sticker = require('./../models/sticker');
//const bankAccountUtils = require('./../utils/bank-account-utils');


async function getAllStickersByServiceId(servicePlaceId) {
  return Sticker.find({_servicePlaceId: servicePlaceId});
}

module.exports = {
  getAllStickersByServiceId
}
