const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partnerSchema = new Schema({
  _contactId: {
    type: Schema.Types.ObjectId,
    unique: true
  },
  servicePlaces:[{type: Schema.ObjectId, ref: 'ServicePlace'}],
  images: [Buffer],
  description: {
    type: String,
    trim: true,
    default: 'Primera generación de socios'
  },
  bank: {
    type: String,
    trim: true
  },
  accountNumber: {
    type: String,
    trim: true
  }
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner
