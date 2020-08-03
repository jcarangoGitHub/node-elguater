const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');
const Contact = require('./../models/contact');
const Item = require('./../models/item');
const User = require('./../models/user');
const Sticker = require('./../models/sticker');

const bcrypt = require('bcrypt');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const partnerUtils = require('./../utils/partner-utils');
const servicePlaceUtils = require('./../utils/service-place-utils');
const commonUtils = require('./../utils/common-utils');

const indexController = require('./index-controller');
const validator = require('./../validators/partner-validator');

const bankAccountMongodb = require('./../api-mongodb/bank-account-mongodb');
const contactMongodb = require('./../api-mongodb/contact-mongodb');
const servicePlaceMongodb = require('./../api-mongodb/service-place-mongodb');
const partnerMongodb = require('./../api-mongodb/partner-mongodb');
const itemMongodb = require('./../api-mongodb/item-mongodb');
const stickerMongodb = require('./../api-mongodb/sticker-mongodb');

async function handlerSuccess (req, res, contact, partner, servicePlace, msg) {
  let items = partner ? await itemMongodb.getAllItemsByPartnerId(partner._id) : null;
  let stickers = servicePlace ? await stickerMongodb.getAllStickersByServiceId(servicePlace._id) : null;
  let bankAccounts = await bankAccountMongodb.getAllBankAccountByServicePlaceId(servicePlace._id);

  res.render(dirViews + 'formPartner', {
    contactSession: req.session.contact,
    userSession: req.session.user,
    successMsg: msg,
    contact: contact,
    partner: partner,
    servicePlace: servicePlace,
    bankAccounts: bankAccounts,
    items: items,
    stickers: stickers
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
          return handlerSuccess(req, res, resContact, resPartner, resServicePlace, 'Datos actualizados!');
        }//if resContact
      }//if resServicePlace
    }
    res.render('formPartner');
  } catch(e) {
    res.render(dirViews + 'formPartner', {
      errorMsg: e
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

    return handlerSuccess(req, res, resContact, resPartner, resServicePlace, 'Ahora somos socios!');
    } else {
      return commonUtils.handlerError(req, 'Error inesperado, partner._id no encontado', res, 'formPartner');
    }
  } catch(e) {
    return commonUtils.handlerError(req, e, res, 'formPartner');
  }
}

//used index.app.post('/partner', upload.single('image'), (req, res)
async function handlerPost(req, res) {
  try {
    if (! req.session.user) {
      return commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
    }
    let partnerId = req.body._partnerId;
    //update
    if (partnerId) {
      return updatePartnerAndServicePlacesById(req, res);
    } else {
      //create
      return createPartnerAndServicePlaces(req, res);
    }

  } catch (e) {
    return commonUtils.handlerError(req, e, res, 'formPartner');
  }
}

async function handlerPostAccount(req, res) {
  console.log(req.query.isEdit);
  if (req.query.isEdit) {
    return editBankAccount(req, res);
  } else {
    return createBankAccount(req, res);
  }
}

async function editBankAccount(req, res) {
  try {
    let resBankAccount = await bankAccountMongodb.editBankAccount(req);
    console.log(resBankAccount);
    return handlerResPostBankAccount(req, res, resBankAccount);
  } catch (e) {
    return commonUtils.handlerError(req, e, res, 'formPartner');
  }
}

async function handlerResPostBankAccount(req, res, resBankAccount) {
  if (resBankAccount) {
    let resContact = await contactMongodb.findContactByIdFromRequest(req);
    let resServicePlace = await servicePlaceMongodb.findServicePlaceByIdFromRequest(req);
    let resPartner = await partnerMongodb.findPartnerByIdFromId(resServicePlace._partnerId);
    return handlerSuccess(req, res, resContact, resPartner, resServicePlace,
      'Cuenta bancaria actualizada exitosamente!');
  } else {
    return commonUtils.handlerError(req, 'Error al editar la cuenta bancaria', res, 'formPartner');
  }
}

async function createBankAccount(req, res) {
  try {
    let resBankAccount = await bankAccountMongodb.createBankAccount(req);
    return handlerResPostBankAccount(req, res, resBankAccount);

  } catch (e) {
    return commonUtils.handlerError(req, e, res, 'formPartner');
  }
}

async function handlerRemoveBankAccount(req, res) {
  try {
    let resRemove = await bankAccountMongodb.removeBankAccountById(req);
    if (resRemove) {
      let resServicePlace = await servicePlaceMongodb.findServicePlaceByIdFromRequest(req);
      let resPartner = await partnerMongodb.findPartnerByIdFromId(resServicePlace._partnerId);
      let resContact = await contactMongodb.findContactByIdFromId(resPartner._contactId);

      return handlerSuccess(req, res, resContact, resPartner, resServicePlace,
        'Cuenta bancaria eliminada exitosamente!');
    } else {
      return commonUtils.handlerError(req, 'Error al eliminar cuenta bancaria', res, 'formPartner');
    }
  } catch(e) {
    return commonUtils.handlerError(req, e, res, 'formPartner');
  }
}

async function getFormEditBankAccount(req, res) {
  try {
    let resBankAccount = await bankAccountMongodb.findBankAccountByIdFromId(req.query.id);

    res.render(dirViews + 'formEditBankAccount', {
      bankAccount: resBankAccount,
      servicePlaceId: resBankAccount._servicePlaceId
    });
  } catch (e) {
    return commonUtils.handlerError(req, e, res, 'formPartner');
  }
}

/**
** used partner-routes.app.get('/partner', (req, res)
**/
async function getFormPartner(req, res) {
  let cellPhone = req.query.cell ? req.query.cell : req.session.contact ? req.session.contact.cellPhoneNumber : null;

  try {
    let contact = await Contact.findByCellPhone(cellPhone);
    if (contact === null) {
      return commonUtils.handlerError(req, 'El número ' + cellPhone + ' no está registrado', res, 'formPartner');
    } else if (contact._partnerId) {
      let partner = await Partner.findById(contact._partnerId);
      if (partner.servicePlaces[0]) {
        let servicePlace = await ServicePlace.findById(partner.servicePlaces[0]);
        let stickers = await Sticker.find({_servicePlaceId: servicePlace._id});
        return handlerSuccess(req, res, contact, partner, servicePlace, null)
      } else {
        return handlerSuccess(req, res, contact, partner, null, null);
      }
    }
    return handlerSuccess(req, res, contact, null, null, null);
  } catch(e) {
    return commonUtils.handlerError(req, e, res, 'formPartner');
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
            return commonUtils.handlerError(req, 'Usuario o contraseña inválido', res, 'formPartner');
        }
      } else {
        return commonUtils.handlerError(req, 'Usuario o contraseña inválido', res, 'formPartner');
      }
    }

  } catch (e) {
    return commonUtils.handlerError(req, e, res, 'formPartner');
  }
}

//*****************************************************************/
module.exports = {
  getFormPartner,
  getFormEditBankAccount,
  handlerPost,
  handlerPostLogin,
  handlerPostAccount,
  handlerRemoveBankAccount
}
