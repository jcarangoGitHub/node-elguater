const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  cellPhoneNumber: {
    type: String,
    unique: [true, 'Sorry, the cell phone number has been already registered'],
    index: true
  },
  documentId: {
    type: Number,
    unique: [true, 'Document Id is already created, please try with other'],
    tirm: true
  },
  lastName: {
    type: String,
    lowercase: true,
    tirm: true
  },
  firstName: {
    type: String,
    require: true,
    tirm: true
  },
  rol: {
    type: String,
    enum: ['admin', 'partner', 'user'],
    require: [true, 'Please select a Rol']
  },
  telephone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    tirm: true
  },
  userName: {
    type: String,
    tirm: true,
    unique: [true, 'User name is already created, please try with other']
  },
  password: {
    type: String,
    require: true
  },
  image: {
    type: Buffer,
    require: true
  },
  _contactId: Schema.Types.ObjectId
})


const User = mongoose.model('User', userSchema);

module.exports = User
