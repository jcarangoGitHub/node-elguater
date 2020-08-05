const Contact = require('./../models/contact');
const contactUtils = require('./../utils/contact-utils');

async function findContactByIdFromRequest(req) {
  return await Contact.findById(req.body._contactId);
}

async function findContactByIdFromId(id) {
  return await Contact.findById(id);
}

async function findByIdAndUpdate(req) {
  return await Contact.findByIdAndUpdate(req.body._contactId, {
      cellPhoneNumber: req.body.cellPhoneToSearch,
      name: req.body.contactFirstName,
      lastName: req.body.contactLastName,
      address: req.body.contactAddress,
      urlMaps: req.body.contactUrlMaps}, {new: true, upsert: true});
}

module.exports = {
  findContactByIdFromRequest,
  findContactByIdFromId,
  findByIdAndUpdate
}
