//Requires
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require('../helpers/helpers');

const postActions = require('../actions/post')

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

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err)
  });
  res.redirect('/');
});

app.get('/formUsers', (req, res) => {
  res.render(dirViews + 'formUsers', {
    isUpdate: false
  });
});

//POST METHODS
app.post('/postUser', (req, res) => {
  postActions.createUser(req, res);
});

app.post('/login', (req, res) => {
  postActions.login(req, res);
});

module.exports = app;
