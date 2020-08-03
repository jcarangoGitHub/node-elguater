const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');
const dirPartialsStore = path.join(__dirname, '../../template/partials/store');

const dirViews = path.join(__dirname, '../../template/views/');

const storeController = require('../controllers/store-controller');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartialsStore);

//used
app.get('/formStore', (req, res) => {
  storeController.getFormPartner(req, res);
});

//used from itemsStoreSession
app.post('/cart', (req, res) => {
  storeController.handlerPost(req,res);
});

module.exports = app;
