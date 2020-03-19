const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  cellPhoneNumber:{
    type: Number,
    require: true,
    unique: [true, 'Sorry, the cell phone number has been already registered'],
    index: true
  },
  name: {
    type: String,
    lowercase: true,
    trim: true
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true
  },
  typeId: {
    type: String,
    lowercase: true,
    trim: true
  },
  contactId: {
    type: Number,
    index: true
  },
  landLine: {
    type: Number
  },
  address: {
    type: String,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  updated: {
    type: Date,
    default: Date.now
  },
  image: {
    type: Buffer
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact