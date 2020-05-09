//Requires
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const stickerController = require('../api/sticker-controller');

//Partials - Paths
const dirPartials = path.join(__dirname, '../../template/partials');
const dirPartialsServicePlace = path.join(__dirname, '../../template/partials/servicePlace');

const dirViews = path.join(__dirname, '../../template/views/');

const commonUtils = require('./../utils/common-utils');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);
hbs.registerPartials(dirPartialsServicePlace);

app.get('/editSticker', (req, res) => {
  if (! req.session.user) {
    return commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
  }
  stickerController.getEditStickerForm(req, res);
})

app.post('/sticker', (req, res) => {
  if (! req.session.user) {
    return commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
  }
  stickerController.handlerPost(req, res);
});

module.exports = app;
