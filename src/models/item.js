const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  _partnerId: Schema.Types.ObjectId,
  name: {
    type: String,
    require: true,
    uppercase: true,
    tirm: true,
    unique: true
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

const Item = mongoose.model('Item', itemSchema);

module.exports = Item
