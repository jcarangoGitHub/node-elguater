const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  cellPhoneNumber: {
    type: String,
    unique: [true, 'Sorry, the cell phone number has been already registered'],
    index: true
  },
  rol: {
    type: String,
    enum: ['admin', 'partner', 'user'],
    require: [true, 'Please select a Rol']
  },
  email: {
    type: String,
    tirm: true
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
