const Item = require('./../models/item');
const Contact = require('./../models/contact');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const handlerError = (err, res) => {
  res.render(dirViews + 'formPartner', {
    errorMsg: err
  });
}

const handlerSuccess = (req, res, item) => {
  //make searches and return
  //logic en view when exists item
  res.render(dirViews + 'formPartner', {
    successMsg: 'Producto creado exitósamente!',
    contact: null,
    partner: null,
    servicePlace: null
  });
}

const createItem = (req, res) => {
  let item = instanceOfItem(req);
  item.save((errItem, resItem) => {
    if (errItem) {
      handlerError(errItem, res);
      return;
    }

    if (resItem) {
      //TODO search for contact, partner, servicePlace
      handlerSuccess(resItem, res);
      return;
    }
  });
}



const instanceOfItem = (req) => {
  let image = req.file ? req.file.buffer : req.body.imageUploadedItem;
  if (image) {
    return item = new Item({
      _partnerId: req.body._partnerId,
      name: req.body.itemName,
      description: req.body.itemDescription,
      price_default: req.body.itemPrice,
      images: [image]
    });
  } else {
    return item = new Item({
      _partnerId: req.body._partnerId,
      name: req.body.itemName,
      description: req.body.itemDescription,
      price_default: req.body.itemPrice
    });
  }
}

module.exports = {
  createItem
}
