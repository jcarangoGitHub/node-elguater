const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

const ServicePlace = require('./../models/servicePlace');
const Item = require('./../models/item');

/**
** used index.app.get('/formStore', (req, res)
**/
async function getFormPartner(req, res) {
  let servicePlaceId = req.query.servicePlaceId;
  let servicePlace = await ServicePlace.findById(servicePlaceId);
  let items = await Item.find({_partnerId: servicePlace._partnerId});
  res.render('formStore', {
    items: items,
    servicePlace: servicePlace
  });
}


//*****************************************************************/
module.exports = {
  getFormPartner
}
