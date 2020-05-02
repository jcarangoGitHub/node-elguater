const bcrypt = require('bcrypt');

const User = require('./../models/user');

const getInstanceOfUser = (req, contactId) => {
  return new User({
    cellPhoneNumber: req.session.contact.cellPhoneNumber,
    password: bcrypt.hashSync(req.body.userPassword, 10),
    rol: req.body.userRol,
    _contactId: contactId
  });
}

module.exports = {
  getInstanceOfUser
}
