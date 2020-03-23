const Contact = require('./../models/contact');
const User = require('./../models/user');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const createContact = (req, res) => {
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
      });
    }
    res.render(dirViews + 'formSearchContact', {
      inEditMode: false,
      contact: resContact,
      successMsg: 'Contacto con ID ' + resContact.cellPhoneNumber + ' creado exitósamente!'
    });
  });
}

const getNewContactForm = (req, res) => {
  res.render(dirViews + 'formContact', {
    inEditMode: false
  });
}

const getSearchContactForm = (req, res) => {
  if (typeof req.body.cellPhoneToSearch !== 'undefined' && req.body.cellPhoneToSearch) {
    console.log('cellPhoneToSearch !== null' + req.body.cellPhoneToSearch);
    var query  = Contact.where({ cellPhoneNumber: req.body.cellPhoneToSearch});
    query.findOne(function (err, result) {
      res.render(dirViews + 'formSearchContact', {
        contact: result
      });
      return
    });
  } else {
    res.render(dirViews + 'formSearchContact', {
      successMsg: req.successMsg
    });
  }
}

module.exports = {
  createContact,
  getNewContactForm,
  getSearchContactForm
}
