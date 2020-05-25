const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

const ServicePlace = require('./../models/servicePlace');
const Item = require('./../models/item');
const Sticker = require('./../models/sticker');
const Partner = require('./../models/partner');

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
    warningMsg: warningMsg,
    req: req
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

async function handlerPost(req, res) {
  let resItem = await Item.findById(req.body._itemId);
  if (! req.session.cartShopping) {
    req.session.cartShopping = [];
    req.session.cartShopping.push(resItem);
  } else {
    req.session.cartShopping.push(resItem);
  }
  console.log('controller');
  console.log(req.session.cartShopping);
  let resPartner = await Partner.findById(resItem._partnerId, 'servicePlaces');
  let resServicePlace = await ServicePlace.findById(resPartner.servicePlaces[0]);
  handlerSuccess(req, res, resServicePlace);
}


//*****************************************************************/
module.exports = {
  getFormPartner,
  handlerPost
}
