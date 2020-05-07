//Model objects
const Sticker = require('./../models/sticker');
const ServicePlace = require('./../models/servicePlace');
const Partner = require('./../models/partner');
const Item = require('./../models/item');
const Contact = require('./../models/contact');

const commonUtils = require('./../utils/common-utils');

const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

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

async function handlerPost(req, res) {
  try {
    if (! req.session.user) {
      return commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
    }
    console.log('Mostrar:');
    console.log(req.body.showSticker);
    console.log(req.body.showSticker == 'on');
    let stickerId = req.body.stickerId ? req.body.stickerId : await new Sticker()._id; 
    let resSticker = await Sticker.findByIdAndUpdate(stickerId, {
      _servicePlaceId: req.body.servicePlace_Id,
      header: req.body.cardHeader,
      title: req.body.cardTitle,
      text: req.body.cardText,
      showSticker: req.body.showSticker == 'on' ? true : false
    }, {new: true, upsert: true});

    if (resSticker) {
      let resServicePlace = await ServicePlace.findById(resSticker._servicePlaceId);
      let resPartner = await Partner.findById(resServicePlace._partnerId);
      let resItems = await Item.find({_partnerId: resPartner._id});
      let resContact = await Contact.findById(resPartner._contactId);
      handlerSuccess(req, res, resContact, resPartner, resServicePlace, resItems, 'Sticker actualizado!')
    }

  } catch (e) {
    console.log(e);
    return commonUtils.handlerError(req, e, res, 'index');
  }
}

module.exports = {
  handlerPost
}
