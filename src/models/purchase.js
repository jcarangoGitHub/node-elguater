const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const purchaseSchema = new Schema({
  _contactId: Schema.Types.ObjectId,
  _items:[{type: Schema.ObjectId, ref: 'Item'}],
  quantity: Integer,
  totalPaid: {
    type: Currency,
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now,
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
  }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase
