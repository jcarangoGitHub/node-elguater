const User = require('./../models/user');

const getInstanceOfUser = (req, contactId) => {
  return new User({
    cellPhoneNumber: req.session.contact.cellPhoneNumber,
    password: req.body.userPassword,
    rol: req.body.userRol,
    _contactId: contactId
  });
}

module.exports = {
  getInstanceOfUser
}
