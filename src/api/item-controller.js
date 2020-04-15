const Item = require('./../models/item');
const Contact = require('./../models/contact');
const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');


const instanceOfItemAccordingToImage = (req) => {
  let image = req.file ? req.file.buffer : req.body.imageUploadedItem;
  if (image) {
    return item = new Item({
      _partnerId: req.body._partnerId,
      name: req.body.itemName,
      description: req.body.itemDescription,
      price_default: req.body.itemPrice.toString(),
      images: [image]
    });
  } else {
    return item = new Item({
      _partnerId: req.body._partnerId,
      name: req.body.itemName,
      description: req.body.itemDescription,
      price_default: req.body.itemPrice.toString()
    });
  }
}

async function handlerSuccess(req, res, item, msg) {
  if (item) {
    let resPartner = await Partner.findById(item._partnerId);
    let resServicePlace = await ServicePlace.findById(resPartner.servicePlaces[0]);
    let resContact = await Contact.findById(resPartner._contactId);
    let resItems = await Item.find({_partnerId: resPartner._id});
    res.render(dirViews + 'formPartner', {
      successMsg: msg,
      contact: resContact,
      partner: resPartner,
      servicePlace: resServicePlace,
      items: resItems
    });
  } else {
    handlerError('', res);
  }
}

const handlerError = (err, res) => {
  res.render(dirViews + 'formSearchContact', {
    errorMsg: err
  });
}

async function handlerPost(req, res) {
  try {
    let itemId = req.body._itemId;
    if (itemId) {
      updateItem(req, res, itemId);
    } else {
      createItem(req, res);
    }
  } catch (e) {
    handlerError(e, res);
  }
}

async function updateItem(req, res, itemId) {
  console.log('updating...');
  let image = req.file ? req.file.buffer : null;
  let resItem = await Item.findByIdAndUpdateAccordingToImage(req, itemId, image);
  console.log(resItem);
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
  let idItem = req.query.item;
  try {
    let resItem = await Item.findById(idItem);
    let resContactId = await Partner.findById(resItem._partnerId, '_contactId');
    let resCellPhone = await Contact.findById(resContactId._contactId, 'cellPhoneNumber');
    res.render(dirViews + 'formEditItem', {
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
