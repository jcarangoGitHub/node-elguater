const Contact = require('./../models/contact');
const User = require('./../models/user');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

//PUT ?
const updateContact = (req, res) => {
  let _id = req.body._contactId;
  Contact.updateOne({_id: _id},{
    name: req.body.contactFirstName,
    lastName: req.body.contactLastName,
    typeId: req.body.contactTypeId,
    contactId: req.body.contactNumberID},
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      if (result.ok === 1) {
        Contact.findById(_id, (err, result) => {
          if (err) {
            return console.log(err);
          }
          res.render(dirViews + 'formSearchContact', {
            contact: result,
            successMsg: 'Contacto con ID ' + result.cellPhoneNumber + ' actualizado exitósamente!'
          });
        });
      }
    });
}


//POST
const createContact = (req, res) => {
  let contact = new Contact({
    cellPhoneNumber: req.body.cellPhoneNumber != null && req.body.cellPhoneNumber !== '' ? req.body.cellPhoneNumber : null,
    name: req.body.contactFirstName,
    lastName: req.body.contactLastName,
    typeId: req.body.contactTypeId,
    contactId: req.body.contactNumberID
  });
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
/******************************************************************************/

//GETS
const getNewContactForm = (req, res) => {
  res.render(dirViews + 'formContact', {
    inEditMode: false
  });
}

const getSearchContactForm = (req, res) => {
  if (typeof req.body.cellPhoneToSearch !== 'undefined' && req.body.cellPhoneToSearch) {
    var query  = Contact.where({ cellPhoneNumber: req.body.cellPhoneToSearch});
    query.findOne(function (err, result) {
      res.render(dirViews + 'formSearchContact', {
        contact: result
      });
      return
    });
  } else {
    console.log('---MSG---');
    console.log(req.successMsg);
    res.render(dirViews + 'formSearchContact', {
      successMsg: req.successMsg
    });
  }
}

/******************************************************************************/

module.exports = {
  updateContact,
  createContact,
  getNewContactForm,
  getSearchContactForm,
}
