//Requires
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require('../helpers/helpers');

//Paths
const dirPartials = path.join(__dirname, '../../template/partials');
const dirViews = path.join(__dirname, '../../template/views/');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);

//GET METHODS
app.get('/', (req, res) => {
  res.render(dirViews + 'index', {

  });
});

module.exports = app;
