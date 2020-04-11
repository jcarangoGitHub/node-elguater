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

//static functions
servicePlaceSchema.statics.findByIdAndUpdateAccordingToImage = function(req, id) {
  let image = req.file ? req.file.buffer : req.body.imageUploaded;
  console.log('imageeee');
  console.log(image);
  if (image) {
    return this.findByIdAndUpdate({_id: id},
                            {name: req.body.servicePlaceName,
                            address: req.body.servicePlaceAddress,
                            description: req.body.servicePlaceDescription,
                            images: [image]},
                            {new: true});
  } else {
    return this.findByIdAndUpdate({_id: id},
                            {name: req.body.servicePlaceName,
                            address: req.body.servicePlaceAddress,
                            description: req.body.servicePlaceDescription},
                            {new: true});
  }
}

const ServicePlace = mongoose.model('ServicePlace', servicePlaceSchema);

module.exports = ServicePlace
