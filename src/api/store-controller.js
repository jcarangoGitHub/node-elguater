const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

const ServicePlace = require('./../models/servicePlace');
const Item = require('./../models/item');
const Sticker = require('./../models/sticker');

const commonUtils = require('./../utils/common-utils');

async function handlerSuccess(req, res, servicePlace) {
  let items = await Item.findAvailablesByPartner(servicePlace._partnerId);
  let resStickers = await Sticker.find({_servicePlaceId: servicePlace._id});
  let warningMsg = await commonUtils.getMsgWhenSessionDoesntExist(req);
  res.render('formStore', {
    contactSession: req.session.contact,
    userSession: req.session.user,
    items: items,
    servicePlace: servicePlace,
    stickersByServicePlace: resStickers,
    warningMsg: warningMsg
  });
}

/**
** used index.app.get('/formStore', (req, res)
**/
async function getFormPartner(req, res) {
  let servicePlaceId = req.query.servicePlaceId;
  let servicePlace = await ServicePlace.findById(servicePlaceId);
  if (servicePlace) {
    return handlerSuccess(req, res, servicePlace);
  }
  return commonUtils.handlerErrorIndex(req, res, 'ServicePlace: ' + servicePlaceId + ' no existe');
}


//*****************************************************************/
module.exports = {
  getFormPartner
}
