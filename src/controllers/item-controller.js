const Item = require('./../models/item');
const Contact = require('./../models/contact');
const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');
const Sticker = require('./../models/sticker');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const validator = require('./../validators/partner-validator');
const commonUtils = require('./../utils/common-utils');

const instanceOfItemAccordingToImage = (req) => {
  let image = req.file ? req.file.buffer : req.body.imageUploadedItem;
  let priceNumber = parseInt(req.body.itemPrice.toString().replace(',', ''));
  if (image) {
    return item = new Item({
      _partnerId: req.body._partnerId,
      _servicePlaceId: req.body._servicePlaceId,
      name: req.body.itemName,
      description: req.body.itemDescription,
      price_string: req.body.itemPrice.toString(),
      price_number: priceNumber,
      images: [image],
      showItem: req.body.showItem == 'on' ? true : false
    });
  } else {
    return item = new Item({
      _partnerId: req.body._partnerId,
      _servicePlaceId: req.body._servicePlaceId,
      name: req.body.itemName,
      description: req.body.itemDescription,
      price_string: req.body.itemPrice.toString(),
      price_number: priceNumber,
      showItem: req.body.showItem == 'on' ? true : false
    });
  }
}

async function handlerSuccess(req, res, item, msg) {
  if (item) {
    let resPartner = await Partner.findById(item._partnerId);
    let resServicePlace = await ServicePlace.findById(resPartner.servicePlaces[0]);
    let resContact = await Contact.findById(resPartner._contactId);
    let resItems = await Item.find({_partnerId: resPartner._id});
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
  } else {
    handlerError('', res);
  }
}

const handlerError = (err, res) => {
  console.log(err);
  res.render(dirViews + 'formSearchContact', {
    errorMsg: err
  });
}

async function handlerPost(req, res) {
  if (! validator.canShowPartnerForm(req)) {
    return commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
  }

  try {
    let itemId = req.body._itemId;
    if (req.query.isEdit) {
      updateItem(req, res, itemId);
      return;
    }
    if (req.query.isRemove) {
      removeItem(req, res);
      return;
    }
    createItem(req, res);

  } catch (e) {
    handlerError(e, res);
  }
}

async function removeItem(req, res) {
  let resDelete = await Item.deleteOne({_id: req.body._itemId});
  if (resDelete && resDelete.ok == 1) {
    let item = new Item({_partnerId: req.body._partnerId});
    handlerSuccess(req, res, item, 'Producto eliminado exitósamente!');
    return;
  }
  handlerError('Error al eliminar un producto', res);
  return;
}

async function updateItem(req, res, itemId) {
  let image = req.file ? req.file.buffer : null;
  let resItem = await Item.findByIdAndUpdateAccordingToImage(req, itemId, image);
  if (resItem) {
    handlerSuccess(req, res, resItem, 'Producto actualizado exitósamente!');
    return;
  }

}

const createItem = (req, res) => {
  let item = instanceOfItemAccordingToImage(req);
  item.save((errItem, resItem) => {
    if (errItem) {
      handlerError(errItem, res);
      return;
    }

    if (resItem) {
      handlerSuccess(req, res, resItem, 'Producto creado exitósamente!');
      return;
    }
  });
}

//***********GETS*****************************/
async function getEditItemForm(req, res) {
  if (! validator.canShowPartnerForm(req)) {
    return commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
  }

  let idItem = req.query.item;
  try {
    let resItem = await Item.findById(idItem);
    let resContactId = await Partner.findById(resItem._partnerId, '_contactId');
    let resCellPhone = await Contact.findById(resContactId._contactId, 'cellPhoneNumber');
    res.render(dirViews + 'formEditItem', {
      contactSession: req.session.contact,
      userSession: req.session.user,
      item: resItem,
      isEdit: true,
      cellPhoneNumber: resCellPhone.cellPhoneNumber
    });
  } catch (e) {
    res.render(dirViews + 'formEditItem', {
      errorMsg: e
    });
  }
}





module.exports = {
  handlerPost,
  getEditItemForm
}
