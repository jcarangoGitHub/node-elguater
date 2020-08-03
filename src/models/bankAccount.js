const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankAccountSchema = new Schema({
  _servicePlaceId: Schema.Types.ObjectId,
  accountName: {
    type: String,
    tirm: true
  },
  accountNumber: {
    type: String,
    tirm: true
  },
  imageQR: Buffer
});

//static functions
bankAccountSchema.statics.findByIdAndUpdateAccordingToImage = function(req, id, image) {
  if (image) {
    return this.findByIdAndUpdate({_id: id},
                                  {accountName: req.body.accountName,
                                  accountNumber: req.body.accountNumber,
                                  imageQR: image},
                                  {new: true});
  } else {
    return this.findByIdAndUpdate({_id: id},
                           {accountName: req.body.accountName,
                            accountNumber: req.body.accountNumber},
                           {new: true});
  }
}

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
