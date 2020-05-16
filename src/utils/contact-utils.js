const Contact = require('./../models/contact');

//no used
const getInstanceOfContact = (req) => {
  return new Contact({
    cellPhoneNumber: req.body.cellPhoneToSearch != null && req.body.cellPhoneToSearch !== '' ? req.body.cellPhoneToSearch : null,
    name: req.body.contactFirstName,
    lastName: req.body.contactLastName,
    address: req.body.contactAddress
  });
}

module.exports = {
  getInstanceOfContact
}
