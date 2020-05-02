const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const multer  = require('multer');

const itemController = require('../api/item-controller');

//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');
const dirPartialsItems = path.join(__dirname, '../../template/partials/item');

const dirViews = path.join(__dirname, '../../template/views/');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);
hbs.registerPartials(dirPartialsItems);

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

app.get('/editItem', (req, res) => {
  itemController.getEditItemForm(req, res);
});


//used
app.post('/item',  upload.single('image'), (req, res) => {
  itemController.handlerPost(req, res);
});

module.exports = app;
