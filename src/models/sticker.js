const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stickerSchema = new Schema({
  _servicePlaceId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  header: {
    type: String,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  text: {
    type: String,
    trim: true
  },
  showSticker: Boolean
});

const Sticker = mongoose.model('Sticker', stickerSchema);

module.exports = Sticker
