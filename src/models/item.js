const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Partner = require('./partner');

const itemSchema = new Schema({
  _partnerId: Schema.Types.ObjectId,
  _servicePlaceId: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    tirm: true
  },
  description: {
    type: String,
    trim: true
  },
  price_string: {
    type: String,
    required: true
  },
  price_number: {
    type: Number,
    required: true
  },
  images: [Buffer],
  showItem: Boolean
});

//static functions
itemSchema.statics.findByIdAndUpdateAccordingToImage = function(req, id, image) {
  let priceNumber = parseInt(req.body.itemPrice.toString().replace(',', ''));
  if (image) {
    return this.findByIdAndUpdate({_id: id},
                                  {name: req.body.itemName,
                                  description: req.body.itemDescription,
                                  price_string: req.body.itemPrice.toString(),
                                  price_number: priceNumber,
                                  images: [image],
                                  showItem: req.body.showItem == 'on' ? true : false},
                                  {new: true});
  } else {
    return res = this.findByIdAndUpdate({_id: id},
                                  {name: req.body.itemName,
                                  description: req.body.itemDescription,
                                  price_string: req.body.itemPrice.toString(),
                                  price_number: priceNumber,
                                  showItem: req.body.showItem == 'on' ? true : false},
                                  {new: true});
  }
}

itemSchema.statics.findAvailablesByPartner = function(partnerId) {
  return this.find({_partnerId: partnerId, showItem: true});
}

itemSchema.statics.getServicePlaceItem = function() {
  let resServicePlaces = Partner.findById(this._partnerId, 'servicePlaces');
  return resServicePlace && resServicePlace.servicePlaces && resServicePlace.servicePlaces[0] ?
    resServicePlace.servicePlaces[0] : null;
}

const Item = mongoose.model('Item', itemSchema);

module.exports = Item
