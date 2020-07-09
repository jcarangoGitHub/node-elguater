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

cartShoppingSchema.virtual('getSubTotal').get(function() {
  console.log('getSubtTotal');
  return 80;
  // Item.findById(this.item, 'price_number', function (err, res){
  //   console.log(Math.imul(res, this.quantity));
  //   return 80;
  // });
});

const CartShopping = mongoose.model('CartShopping', cartShoppingSchema);

module.exports = CartShopping
