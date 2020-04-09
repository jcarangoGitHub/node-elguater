const Contact = require('./../models/contact');
const User = require('./../models/user');
const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');
const Item = require('./../models/item');

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
        res.render(dirViews + 'formSearchContact', {
          errorMsg: err
        });
      }
      if (result.ok === 1) {
        Contact.findById(_id, (err, result) => {
          if (err) {
            res.render(dirViews + 'formSearchContact', {
              errorMsg: err
            });
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
  let bodyCellPhone = req.body.cellPhoneToSearch;
  let queryCellPhone = req.query.cellPhoneToSearch;
  if ((typeof bodyCellPhone !== 'undefined' && bodyCellPhone) ||
       typeof queryCellPhone !== 'undefined' && queryCellPhone) {
    let cellPhoneToSearch = bodyCellPhone ? bodyCellPhone : queryCellPhone;
    var query  = Contact.where({ cellPhoneNumber: cellPhoneToSearch});
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

const getUpdateContactForm = (req, res) => {
  Contact.findById(req.session.user._contactId).exec((err, result) => {
    if (err) {
      res.render(dirViews + 'index', {
        msg: err
      });
    }
    res.render(dirViews + 'formContact', {
      isUpdate: true,
      user    : req.session.user,
      contact : result
    });
  });
}

const handlerError = (msj, res) => {
  res.render(dirViews + 'formPartner', {
    errorMsg: msj
  });
}

async function getFormPartner(req, res) {
  let cellPhone = req.query.cell;
  try {
    let contact = await Contact.findByCellPhone(cellPhone);
    if (contact === null) {
      handlerError('El número ' + cellPhone + ' no está registrado', res);
      return;
    } else if(contact._partnerId) {
      let partner = await Partner.findById(contact._partnerId);
      if (partner.servicePlaces[0]) {
        let servicePlace = await ServicePlace.findById(partner.servicePlaces[0]);
        let items = await Item.find({_partnerId: partner._id});
        res.render(dirViews + 'formPartner', {
          contact: contact,
          partner: partner,
          servicePlace: servicePlace,
          items: items
        });
      }
    } else {
      res.render(dirViews + 'formPartner', {
        contact: contact
      });
    }
  } catch(e) {
    handlerError(e, res);
  }
}

/******************************************************************************/

module.exports = {
  updateContact,
  createContact,
  getNewContactForm,
  getSearchContactForm,
  getUpdateContactForm,
  getFormPartner
}
