//Requires
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

require('../helpers/helpers');


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


//GET METHODS
//used header
app.get('/formEditContact', (req, res) => {
  contactController.getEditContactForm(req, res);
});


//used
app.get('/contact', (req, res) => {
  contactController.getSearchContactForm(req, res);
});

//used header
app.get('/formNewContact', (req, res) => {
  contactController.getNewContactForm(req, res);
});


//**********POST METHODS*********************

//used formContact
app.post('/contact', (req, res) => {
  contactController.updateContact(req, res);
});

//used
app.post('/search-contact', (req, res) => {
  contactController.getSearchContactForm(req, res);
});


module.exports = app;
