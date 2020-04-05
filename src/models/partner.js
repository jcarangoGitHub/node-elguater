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
  }
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner
