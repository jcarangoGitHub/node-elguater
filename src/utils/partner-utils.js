const Partner = require('./../models/partner');

const getInstanceOfPartnerAccordingToImage = (contactId, servicePlace, image) => {
  return partner = image ? new Partner({
    _contactId: contactId,
    servicePlaces: [servicePlace],
    images: [image]
  }) : new Partner({
    _contactId: contactId,
    servicePlaces: [servicePlace]
  });
}

module.exports = {
  getInstanceOfPartnerAccordingToImage
}
