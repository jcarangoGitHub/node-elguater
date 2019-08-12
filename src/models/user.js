const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  documentId: {
    type: Number,
    require: true,
    unique: [true, 'Document Id is already created, please try with other'],
    tirm: true
  },
  lastName: {
    type: String,
    require: true,
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
    enum: ['admin', 'customer'],
    require: [true, 'Please select a Rol']
  },
  telephone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    require: true,
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
  }
})


const User = mongoose.model('User', userSchema);

module.exports = User
