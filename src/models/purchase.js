const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const purchaseSchema = new Schema({
  _contactId: Schema.Types.ObjectId,
  _partnerId: Schema.Types.ObjectId,
  servicePlace: {
    type: Schema.Types.Mixed,
    required: true
  },
  cartShopping: [Schema.Types.Mixed],
  totalPaid: {
    type: Currency,
    required: true
  },
  requestDate: {
    type: Date,
    required: true
  },
  dateOfDelivery: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'preparing', 'on route', 'delivered'],
    required: true
  },
  wayToDelivery: {
    type: String,
    enum: ['on site', 'delivery'],
    required: true
  },
  wayToPayment: {
    type: String,
    enum: ['transfer', 'nequi', 'cash'],
    required: true
  },
  bankTransfer: Schema.Types.ObjectId  
});

purchaseSchema.virtual('getTotal').get(function() {
  let total = 0;
   this.cartShopping.forEach((item, i) => {
    total = total + item.item.price_number * item.quantity;
  });
  return total;
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase
