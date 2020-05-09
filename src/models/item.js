const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  _partnerId: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    uppercase: true,
    tirm: true
  },
  description: {
    type: String,
    uppercase: true,
    trim: true
  },
  price_default: {
    type: String
  },
  images: [Buffer]
});

//static functions
itemSchema.statics.findByIdAndUpdateAccordingToImage = function(req, id, image) {  
  if (image) {
    return this.findByIdAndUpdate({_id: id},
                                  {name: req.body.itemName,
                                  description: req.body.itemDescription,
                                  price_default: req.body.itemPrice.toString(),
                                  images: [image]},
                                  {new: true});
  } else {
    return res = this.findByIdAndUpdate({_id: id},
                                  {name: req.body.itemName,
                                  description: req.body.itemDescription,
                                  price_default: req.body.itemPrice.toString()},
                                  {new: true});
  }
}

const Item = mongoose.model('Item', itemSchema);

module.exports = Item
