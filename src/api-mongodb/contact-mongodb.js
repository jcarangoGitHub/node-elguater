const Contact = require('./../models/contact');
const contactUtils = require('./../utils/contact-utils');

async function findContactByIdFromRequest(req) {
  return await Contact.findById(req.body._contactId);
}

async function findContactByIdFromId(id) {
  return await Contact.findById(id);
}

module.exports = {
  findContactByIdFromRequest,
  findContactByIdFromId
}
