const Partner = require('./../models/partner');
const partnerUtils = require('./../utils/partner-utils');

async function findPartnerByIdFromId(id) {
  return await Partner.findById(id);
}

module.exports = {
  findPartnerByIdFromId
}
