const Contact = require('./../../models/contact');
const User = require('./../../models/user');

const path = require('path');

const dirViews = path.join(__dirname, '../../../template/views/');

const createContact = (req, res) => {
  console.log('***CEL****...');
  console.log(req.body.cellPhoneNumber);
  console.log(req.body.cellPhoneNumber === '');
  console.log(req.body.cellPhoneNumber !== '');
  let contact = new Contact({
    cellPhoneNumber: req.body.cellPhoneNumber != null && req.body.cellPhoneNumber !== '' ? req.body.cellPhoneNumber : null,
    name: req.body.contactFirstName,
    lastName: req.body.contactLastName,
    typeId: req.body.contactTypeId,
    contactId: req.body.contactNumberID
  });
  console.log(contact);
  contact.save((err, resContact) => {
    if (err) {
      console.log(err);
      res.render(dirViews + 'formContact', {
        inEditMode: false,
        errorMsg: err
      });
      return;
    }
    console.log(resContact);
    console.log(req.body.userPassword.value)
    if (typeof req.body.userPassword === String) {
      console.log('creating user');
      let user = new User({
        cellPhoneNumber: req.body.userCellPhoneNumber,
        password: req.body.userPassword,
        rol: req.body.userRol,
        _contactId: resContact._id
      });
      user.save((err, resUser) => {
        if (err) {
          console.log(err);
          res.render(dirViews + 'formContact', {
            inEditMode: false,
            errorMsg: err
          });
        }
        console.log(resUser);
      });
    }
    res.render(dirViews + 'formContact', {
      inEditMode: false,
      contact: resContact,
      successMsg: 'Contacto con ID ' + resContact.cellPhoneNumber + ' creado exitósamente!'
    });
  });
}

module.exports = {
  createContact
}
