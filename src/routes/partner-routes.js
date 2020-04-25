//Requires
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const multer  = require('multer');

require('../helpers/helpers');

const partnerController = require('../api/partner-controller');

//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');

const dirViews = path.join(__dirname, '../../template/views/');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);

var upload = multer({
  limits: {
    fileSize : 10000000 //MB
  },
  fileFilter (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error('Invalid file. Use jpg, png or jpeg files'));
    }
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  //cb(null, false)

  // To accept the file pass `true`, like so:
  cb(null, true);

  // You can always pass an error if something goes wrong:
  //cb(new Error('I don\'t have a clue!'))

  }
});

//used formSearchContact
app.get('/partner', (req, res) => {
  partnerController.getFormPartner(req, res);
});

//used
app.post('/partner', upload.single('image'), (req, res) => {
  partnerController.handlerPost(req, res);
});

module.exports = app;
