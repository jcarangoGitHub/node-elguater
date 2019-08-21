const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  code: {
    type: String,
    require: true,
    lowercase: true,
    tirm: true,
    unique: true
  },
  name: {
    type: String,
    require: true,
    lowercase: true,
    tirm: true,
    unique: true
  },
  purchase_price: {
    type: Number,
    require: true
  },
  sale_price: {
    type: Number,
    require: true
  },
  quantity: {
    type: Number,
    require: true
  },
  descrption: {
    type: String
  },
  comment: {
    type: String
  },
  image: {
    type: Buffer
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item
