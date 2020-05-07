const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');

const dirViews = path.join(__dirname, '../../template/views/');

const storeController = require('../api/store-controller');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);

//used
app.get('/formStore', (req, res) => {
  storeController.getFormPartner(req, res);
});

module.exports = app;
