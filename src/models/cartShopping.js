const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartShoppingSchema = new Schema({
  _purchase: {
    type: Schema.Types.ObjectId,
    required: true
  },
  item: {
    type: Schema.Types.Mixed,
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    required: true
  }
});

const CartShopping = mongoose.model('CartShopping', cartShoppingSchema);

module.exports = CartShopping
