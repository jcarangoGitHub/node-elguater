const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicePlaceSchema = new Schema({
  _partnerId: Schema.Types.ObjectId,
  name: {
    type: String,
    trim: true,
    uppercase: true
  },
  address: {
    type: String,
    trim: true,
    uppercase: true
  },
  description: {
    type: String,
    trim: true,
    uppercase: true
  },
  images: [Buffer]
});

const ServicePlace = mongoose.model('ServicePlace', servicePlaceSchema);

module.exports = ServicePlace
