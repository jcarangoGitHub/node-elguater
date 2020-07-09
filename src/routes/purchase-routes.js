const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');

const dirViews = path.join(__dirname, '../../template/views/');

const purchaseController = require('../api/purchase-controller');
const validator = require('../validators/validator');

const commonUtils = require('./../utils/common-utils');

require('../helpers/purchase-helpers');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);

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
  purchaseController.addQuantity(req, res);
});

app.get('/subQuant', (req, res) => {
  if (! validator.contactSessionCreated(req)) {
    commonUtils.handlerError(req, 'Debe iniciar sesión', res, 'index');
    return;
  }
  purchaseController.subQuantity(req, res);
});

app.get('/remKart', (req, res) => {
  if (! validator.contactSessionCreated(req)) {
    commonUtils.handlerError(req, 'Debe iniciar sesión', res, 'index');
    return;
  }
  purchaseController.removeItemFromPurchase(req, res);
});

module.exports = app;
