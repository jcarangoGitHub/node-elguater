const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');
const Contact = require('./../models/contact');
const Item = require('./../models/item');
const User = require('./../models/user');

const bcrypt = require('bcrypt');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const partnerUtils = require('./../utils/partner-utils');
const servicePlaceUtils = require('./../utils/service-place-utils');
const commonUtils = require('./../utils/common-utils');

const indexController = require('./index-controller');
const validator = require('./../validator/partner-validator');


const handlerSuccess = (req, res, contact, partner, servicePlace, items, msg) => {
  res.render(dirViews + 'formPartner', {
    contactSession: req.session.contact,
    userSession: req.session.user,
    successMsg: msg,
    contact: contact,
    partner: partner,
    servicePlace: servicePlace,
    items: items
  });
}

//private functions
async function updatePartnerAndServicePlacesById(req, res) {
  try {
    let resPartner = await Partner.findById({_id: req.body._partnerId});
    if (resPartner) {
      let resServicePlace;
      for (const element of resPartner.servicePlaces) {
        resServicePlace = await ServicePlace.findByIdAndUpdateAccordingToImage(req, element);
      }

      if (resServicePlace) {
        let resContact = await Contact.findById(req.body._contactId);
        if (resContact) {
          handlerSuccess(req, res, resContact, resPartner, resServicePlace, null, 'Datos actualizados!');
          return;
        }//if resContact
      }//if resServicePlace
    }
    res.render('formPartner');
  } catch(e) {
    res.render(dirViews + 'formPartner', {
      errorMsg: errPartner
    });
    return;
  }
}//async function updatePartnerByIdWithoutImage

async function createPartnerAndServicePlaces(req, res) {
  try {
    let image = req.file ? req.file.buffer : req.body.imageUploaded;
    let contactId = req.body._contactId;
    let servicePlace = servicePlaceUtils.getInstanceOfServicePlace(req, image);
    let partner = partnerUtils.getInstanceOfPartnerAccordingToImage(req.body._contactId, servicePlace, image);
    let resPartner = await partner.save();
    if (resPartner && resPartner._id) {
      servicePlace._partnerId = resPartner._id;
      let resServicePlace = await servicePlace.save();
      let resContact = await Contact.findByIdAndUpdate(contactId, {_partnerId: resPartner._id}, {new: true});

    handlerSuccess(req, res, resContact, resPartner, resServicePlace, null, 'Ahora somos socios!');
    } else {
      commonUtils.handlerError(req, 'Error inesperado, partner._id no encontado', res, 'formPartner');
    }
  } catch(e) {
    commonUtils.handlerError(req, e, res, 'formPartner');
  }
}

//used index.app.post('/partner', upload.single('image'), (req, res)
async function handlerPost(req, res) {
  try {
    let partnerId = req.body._partnerId;
    //update
    if (partnerId) {
      updatePartnerAndServicePlacesById(req, res);
    } else {
      //create
      createPartnerAndServicePlaces(req, res);
    }

  } catch (e) {
    commonUtils.handlerError(req, e, res, 'formPartner');
  }
}



/**
** used partner-routes.app.get('/partner', (req, res)
**/
async function getFormPartner(req, res) {
  if (! req.session.user) {
    handlerSuccess(req, res, null, null, null, null, null);
    return;
  }

  let cellPhone = req.query.cell ? req.query.cell : req.session.contact.cellPhoneNumber;

  try {
    let contact = await Contact.findByCellPhone(cellPhone);
    if (contact === null) {
      commonUtils.handlerError(req, 'El número ' + cellPhone + ' no está registrado', res, 'formPartner');
      return;
    } else if (contact._partnerId) {
      let partner = await Partner.findById(contact._partnerId);
      if (partner.servicePlaces[0]) {
        let servicePlace = await ServicePlace.findById(partner.servicePlaces[0]);
        let items = await Item.find({_partnerId: partner._id});
        handlerSuccess(req, res, contact, partner, servicePlace, items, null)
        return;
      } else {
        handlerSuccess(req, res, contact, partner, null, null, null);
      }
    }
    handlerSuccess(req, res, contact, null, null, null, null);
    return;
  } catch(e) {
    commonUtils.handlerError(req, e, res, 'formPartner');
  }
}

async function handlerPostLogin(req, res) {
  try {
    let cellPhone = req.body.cellPhoneToSearch;
    if (cellPhone) {
      let contact = await Contact.findByCellPhone(cellPhone);
      if (contact && contact._userId) {
        let user = await User.findById(contact._userId);
        if (bcrypt.compareSync(req.body.userPassword, user.password)) {
          req.session.contact = contact;
          req.session.user = user;
          res.redirect('/partner');
        } else {
            commonUtils.handlerError(req, 'Usuario o contraseña inválido', res, 'formPartner');
        }
      } else {
        commonUtils.handlerError(req, 'Usuario o contraseña inválido', res, 'formPartner');
      }
    }

  } catch (e) {
    commonUtils.handlerError(req, e, res, 'formPartner');
  }
}

//*****************************************************************/
module.exports = {
  getFormPartner,
  handlerPost,
  handlerPostLogin
}
