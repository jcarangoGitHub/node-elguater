const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');
const dirPartialsPurchase = path.join(__dirname, '../../template/partials/purchase');

const dirViews = path.join(__dirname, '../../template/views/');

const purchaseController = require('../controllers/purchase-controller');
const validator = require('../validators/validator');

const commonUtils = require('./../utils/common-utils');

require('../helpers/purchase-helpers');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);
hbs.registerPartials(dirPartialsPurchase);

//used
app.get('/formPurchase', (req, res) => {
  if (! validator.contactSessionCreated(req)) {
    commonUtils.handlerError(req, 'Debe iniciar sesión', res, 'index');
    return;
  }
  purchaseController.getFormPurchase(req, res);
});

app.get('/addQuant', (req, res) => {
  if (! validator.contactSessionCreated(req)) {
    commonUtils.handlerError(req, 'Debe iniciar sesión', res, 'index');
    return;
  }
  purchaseController.addSubQuantity(req, res, 1);
});

app.get('/subQuant', (req, res) => {
  if (! validator.contactSessionCreated(req)) {
    commonUtils.handlerError(req, 'Debe iniciar sesión', res, 'index');
    return;
  }
  purchaseController.addSubQuantity(req, res, 0);
});

app.get('/remKart', (req, res) => {
  if (! validator.contactSessionCreated(req)) {
    commonUtils.handlerError(req, 'Debe iniciar sesión', res, 'index');
    return;
  }
  purchaseController.removeItemFromPurchase(req, res);
});

app.post('/step', (req, res) => {
  if (! validator.contactSessionCreated(req)) {
    commonUtils.handlerError(req, 'Debe iniciar sesión', res, 'index');
    return;
  }

  switch (req.body.step) {
    case '1':
      purchaseController.stepOne(req, res);
      break;

    case '2':
      purchaseController.stepTwo(req, res);
      break;

    case '3':
      purchaseController.stepThree(req, res);
      break;

    default:
      break;
  }
});

module.exports = app;
