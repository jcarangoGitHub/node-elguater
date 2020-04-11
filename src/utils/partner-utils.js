const Partner = require('./../models/partner');

const getInstanceOfPartnerAccordingToImage = (req, contactId, servicePlace, image) => {
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
