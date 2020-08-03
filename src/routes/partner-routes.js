//Requires
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const multer  = require('multer');

require('../helpers/helpers');

const partnerController = require('../controllers/partner-controller');

//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');
const dirPartialsServicePlace = path.join(__dirname, '../../template/partials/servicePlace');

const dirViews = path.join(__dirname, '../../template/views/');

const validator = require('../validators/validator');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);
hbs.registerPartials(dirPartialsServicePlace);

const commonUtils = require('./../utils/common-utils');

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

app.get('/editBankAccount', (req, res) => {
  if (! validator.contactSessionCreated(req)) {
    commonUtils.handlerError(req, 'Debe iniciar sesión', res, 'index');
    return;
  }
  partnerController.getFormEditBankAccount(req, res);
});

//used
app.post('/partner', upload.fields([{name: 'image'}, {name: 'imageQR'}]), (req, res) => {
  partnerController.handlerPost(req, res);
});

app.post('/login-partner', (req, res) => {
  partnerController.handlerPostLogin(req, res);
});

app.post('/account', upload.single('imageQR'), (req, res) => {
  if (! validator.contactSessionCreated(req)) {
    commonUtils.handlerError(req, 'Debe iniciar sesión', res, 'index');
    return;
  }

  partnerController.handlerPostAccount(req, res);
});

app.post('/removeBankAccount', (req, res) => {
  if (! validator.contactSessionCreated(req)) {
    commonUtils.handlerError(req, 'Debe iniciar sesión', res, 'index');
    return;
  }
  partnerController.handlerRemoveBankAccount(req, res);
});

module.exports = app;
