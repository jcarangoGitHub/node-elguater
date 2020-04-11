const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  cellPhoneNumber:{
    type: String,
    required: [true, 'Debes ingresar el número celular del contacto'],
    unique: [true, 'Sorry, the cell phone number has been already registered'],
    index: true
  },
  name: {
    type: String,
    uppercase: true,
    trim: true
  },
  lastName: {
    type: String,
    uppercase: true,
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
  _partnerId: Schema.Types.ObjectId,
  landLine: {
    type: Number
  },
  address: {
    type: String,
    uppercase: true,
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

//virtual functions
contactSchema.virtual('fullName').get(function() {
  return this.name + ' ' + this.lastName;
});


//static functions
contactSchema.statics.findByCellPhone = function(cellPhone) {
  return this.findOne({ cellPhoneNumber: cellPhone});
}

const Contact = mongoose.model('Contact', contactSchema);



module.exports = Contact
