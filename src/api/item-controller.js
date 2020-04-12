const Item = require('./../models/item');
const Contact = require('./../models/contact');
const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const handlerError = (err, res) => {
  res.render(dirViews + 'formSearchContact', {
    errorMsg: err
  });
}

const instanceOfItemAccordingToImage = (req) => {
  let image = req.file ? req.file.buffer : req.body.imageUploadedItem;
  console.log(req.body.itemName);
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

async function handlerSuccess(req, res, item) {
  let resPartner = await Partner.findById(item._partnerId);
  let resServicePlace = await ServicePlace.findById(resPartner.servicePlaces[0]);
  let resContact = await Contact.findById(resPartner._contactId);
  let resItems = await Item.find({_partnerId: resPartner._id});
  res.render(dirViews + 'formPartner', {
    successMsg: 'Producto creado exitósamente!',
    contact: resContact,
    partner: resPartner,
    servicePlace: resServicePlace,
    items: resItems
  });
}

const createItem = (req, res) => {
  let item = instanceOfItemAccordingToImage(req);
  console.log(item);
  item.save((errItem, resItem) => {
    console.log(errItem);
    if (errItem) {
      handlerError(errItem, res);
      return;
    }

    if (resItem) {
      //TODO search for contact, partner, servicePlace
      handlerSuccess(req, res, resItem);
      return;
    }
  });
}





module.exports = {
  createItem
}
