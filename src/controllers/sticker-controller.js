//Model objects
const Sticker = require('./../models/sticker');
const ServicePlace = require('./../models/servicePlace');
const Partner = require('./../models/partner');
const Item = require('./../models/item');
const Contact = require('./../models/contact');

const commonUtils = require('./../utils/common-utils');

const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

async function handlerError(err, req, res, sticker) {
  let resServicePlace = await ServicePlace.findById(sticker._servicePlaceId);
  let resPartner = await Partner.findById(resServicePlace._partnerId);
  let resItems = await Item.find({_partnerId: resPartner._id});
  let resContact = await Contact.findById(resPartner._contactId);
  let resStickers = await Sticker.find({_servicePlaceId: resServicePlace._id});

  res.render(dirViews + 'formPartner', {
    contactSession: req.session.contact,
    userSession: req.session.user,
    errorMsg: err,
    contact: resContact,
    partner: resPartner,
    servicePlace: resServicePlace,
    items: resItems,
    stickers: resStickers
  });
}

async function handlerSuccess(req, res, sticker, msg) {
  let resServicePlace = await ServicePlace.findById(sticker._servicePlaceId);
  let resPartner = await Partner.findById(resServicePlace._partnerId);
  let resItems = await Item.find({_partnerId: resPartner._id});
  let resContact = await Contact.findById(resPartner._contactId);
  let resStickers = await Sticker.find({_servicePlaceId: resServicePlace._id});

  res.render(dirViews + 'formPartner', {
    contactSession: req.session.contact,
    userSession: req.session.user,
    successMsg: msg,
    contact: resContact,
    partner: resPartner,
    servicePlace: resServicePlace,
    items: resItems,
    stickers: resStickers
  });
}

//***********GETS*****************************/
async function getEditStickerForm(req, res) {
  try {
    let stickerId = req.query.sticker;
    let resSticker = await Sticker.findById(stickerId);
    let resPartnerId = await ServicePlace.findById(resSticker._servicePlaceId, '_partnerId');
    let resContactId = await Partner.findById(resPartnerId._partnerId, '_contactId');
    let resCellPhone = await Contact.findById(resContactId._contactId, 'cellPhoneNumber');
    res.render(dirViews + 'formEditSticker' , {
      contactSession: req.session.contact,
      userSession: req.session.user,
      sticker: resSticker,
      cellPhoneNumber: resCellPhone.cellPhoneNumber
    });
  } catch (e) {
    console.log(e);
    return commonUtils.handlerError(req, e, res, 'index');
  }
}


//update and create
async function updateSticker(req, res) {
  let stickerId = req.body.stickerId ? req.body.stickerId : await new Sticker()._id;

  let resSticker = await Sticker.findByIdAndUpdate(stickerId, {
    _servicePlaceId: req.body.servicePlace_Id,
    header: req.body.cardHeader,
    title: req.body.cardTitle,
    text: req.body.cardText,
    showSticker: req.body.showSticker == 'on' ? true : false
  }, {new: true, upsert: true});

  if (resSticker) {
    handlerSuccess(req, res, resSticker, 'Sticker actualizado!')
  }
}

async function  removeSticker(req, res) {
  let sticker = new Sticker({_servicePlaceId: req.body.servicePlace_Id});
  if (req.body._stickerId) {
    let resRemove = await Sticker.findByIdAndRemove(req.body._stickerId, {rawResult:true});
    if (resRemove && resRemove.ok == 1) {
      handlerSuccess(req, res, sticker, 'Sticker eliminado!');
      return;
    }
    handlerError('No fue posible eliminar el sticker', req, res, sticker);
    return;
  } else {
    handlerError('Sitcker Id para eliminar no encontrado', req, res, sticker);
    return;
  }

}

async function handlerPost(req, res) {
  try {
    if (req.query.isRemove) {
      removeSticker(req, res);
    } else {
      updateSticker(req, res);
    }


  } catch (e) {
    console.log(e);
    return commonUtils.handlerError(req, e, res, 'index');
  }
}

module.exports = {
  handlerPost,
  getEditStickerForm
}
