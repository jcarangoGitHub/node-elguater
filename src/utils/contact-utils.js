const Contact = require('./../models/contact');

const getInstanceOfContact = (req) => {
  return new Contact({
    cellPhoneNumber: req.body.cellPhoneToSearch != null && req.body.cellPhoneToSearch !== '' ? req.body.cellPhoneToSearch : null,
    name: req.body.contactFirstName,
    lastName: req.body.contactLastName,
    typeId: req.body.contactTypeId,
    contactId: req.body.contactNumberID
  });
}

module.exports = {
  getInstanceOfContact
}
