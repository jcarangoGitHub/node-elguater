const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

const ServicePlace = require('./../models/servicePlace');
const Item = require('./../models/item');
const Sticker = require('./../models/sticker');
const Partner = require('./../models/partner');
const CartShopping = require('./../models/cartShopping');

const commonUtils = require('./../utils/common-utils');
const purchaseUtils = require('./../utils/purchase-utils');

async function handlerSuccess(req, res, servicePlace, successMsg) {
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
    successMsg: successMsg,
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
    return handlerSuccess(req, res, servicePlace, null);
  }
  return commonUtils.handlerErrorIndex(req, res, 'ServicePlace: ' + servicePlaceId + ' no existe');
}

async function handlerPost(req, res) {
  let resItem = await Item.findById(req.body._itemId);
  let resServicePlace = await ServicePlace.findById(resItem._servicePlaceId);
  let purchase;
  if (! req.session.purchase) {
    purchase = purchaseUtils.getInstanceOfPurchase(req, resItem, resServicePlace);
  } else {
    purchase = req.session.purchase;
    let kart = new CartShopping({
      _purchase: purchase._id,
      item: resItem
    });
    purchase.cartShopping.push(kart);
  }
  req.session.purchase = purchase;
  let resPartner = await Partner.findById(resItem._partnerId, 'servicePlaces');
  //let resServicePlace = await ServicePlace.findById(resPartner.servicePlaces[0]);
  handlerSuccess(req, res, resServicePlace, resItem.name + ' añadido al carrito corréctamente!');
}


//*****************************************************************/
module.exports = {
  getFormPartner,
  handlerPost
}
