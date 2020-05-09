const bcrypt = require('bcrypt');

const User = require('./../models/user');

const getInstanceOfUser = (req, contact) => {
  return new User({
    cellPhoneNumber: contact.cellPhoneNumber,
    password: bcrypt.hashSync(req.body.userPassword, 10),
    rol: req.body.userRol,
    _contactId: contact._id
  });
}

module.exports = {
  getInstanceOfUser
}
