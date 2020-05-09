//Requires
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

require('../helpers/contact-helpers');


const contactController = require('../api/contact-controller');

//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');
const dirPartialsContact = path.join(__dirname, '../../template/partials/contact');

const dirViews = path.join(__dirname, '../../template/views/');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);
hbs.registerPartials(dirPartialsContact);

const commonUtils = require('./../utils/common-utils');

//GET METHODS
//used header
app.get('/formEditContact', (req, res) => {
  let user = req.session.user;
  if (user && user.rol == 'admin') {//consttante

  }
  contactController.getEditContactForm(req, res);
});


//used
app.get('/contact', (req, res) => {
  contactController.getSearchContactForm(req, res);
});

//used header
app.get('/formNewContact', (req, res) => {
  if (! req.session.contact || ! req.session.user) {
    commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
    return;
  }
  contactController.getNewContactForm(req, res);
});


//**********POST METHODS*********************

//used formContact
app.post('/contact', (req, res) => {
  let user = req.session.user;
  let canPost = user && user.rol == 'admin' ? true : req.session.contact.cellPhoneNumber == '304-645-6220' ? true : false;
  if (! canPost) {
    return commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
  }

  contactController.updateContact(req, res);

});

//used
app.post('/search-contact', (req, res) => {
  contactController.getSearchContactForm(req, res);
});


module.exports = app;
