//Requires
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');


require('../helpers/helpers');

const indexController = require('../api/index-controller');
const storeController = require('../api/store-controller');




//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');
const dirViews = path.join(__dirname, '../../template/views/');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);

//GET METHODS
app.get('/', (req, res) => {
  indexController.getIndexForm(req, res);
});

//used
app.get('/formStore', (req, res) => {
  storeController.getFormPartner(req, res);
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err);
    res.redirect('/');
  });
});

//PUT METHODS

//**********POST METHODS*********************
//index.hbs
app.post('/login', (req, res) => {
  indexController.handlerLoginPost(req, res);
});


module.exports = app;
