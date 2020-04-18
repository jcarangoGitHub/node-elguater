//Requires
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const multer  = require('multer');

require('../helpers/helpers');

const contactController = require('../api/contact-controller');
const partnerController = require('../api/partner-controller');
const itemController = require('../api/item-controller');

const Item = require('./../models/item');


//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');
const dirPartialsItems = path.join(__dirname, '../../template/partials/items');
const dirPartialsServicePlace = path.join(__dirname, '../../template/partials/servicePlace');
const dirPartialsContact = path.join(__dirname, '../../template/partials/contact');

const dirViews = path.join(__dirname, '../../template/views/');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);
hbs.registerPartials(dirPartialsItems);
hbs.registerPartials(dirPartialsServicePlace);
hbs.registerPartials(dirPartialsContact);


//GET METHODS
app.get('/', (req, res) => {
  res.render(dirViews + 'index', {

  });
});

app.get('/editItem', (req, res) => {
  itemController.getEditItemForm(req, res);
});

//used
app.get('/formNewContact', (req, res) => {
  contactController.getNewContactForm(req, res);
});

//used
app.get('/contact', (req, res) => {
  contactController.getSearchContactForm(req, res);
});

//used
app.get('/partner', (req, res) => {
  partnerController.getFormPartner(req, res);
});


app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err)
  });
  res.redirect('/');
});

//PUT METHODS
//used
app.post('/contact-put', (req, res) => {
  contactController.updateContact(req, res);
});

//POST METHODS
//used
app.post('/contact', (req, res) => {
  contactController.createContact(req, res);
});

//used
app.post('/search-contact', (req, res) => {
  contactController.getSearchContactForm(req, res);
});

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

//used
app.post('/partner', upload.single('image'), (req, res) => {
  partnerController.handlerPost(req, res);
});

//used
app.post('/item',  upload.single('image'), (req, res) => {  
  itemController.handlerPost(req, res);
});
module.exports = app;
