const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Partner = require('./partner');

const itemSchema = new Schema({
  _partnerId: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    tirm: true
  },
  description: {
    type: String,
    trim: true
  },
  price_default: {
    type: String
  },
  images: [Buffer],
  showItem: Boolean
});

//static functions
itemSchema.statics.findByIdAndUpdateAccordingToImage = function(req, id, image) {
  if (image) {
    return this.findByIdAndUpdate({_id: id},
                                  {name: req.body.itemName,
                                  description: req.body.itemDescription,
                                  price_default: req.body.itemPrice.toString(),
                                  images: [image],
                                  showItem: req.body.showItem == 'on' ? true : false},
                                  {new: true});
  } else {
    return res = this.findByIdAndUpdate({_id: id},
                                  {name: req.body.itemName,
                                  description: req.body.itemDescription,
                                  price_default: req.body.itemPrice.toString(),
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
