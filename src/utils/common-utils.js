const ServicePlace = require('./../models/servicePlace');


const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

const handlerError = (req, msj, res, form) => {
  res.render(dirViews + form, {
    errorMsg: msj,
    contactSession: req.session.contact ? req.session.contact : null,
    userSession: req.session.user ? req.session.user : null
  });
}

async function handlerErrorIndex(req, res, msg) {
  let resAllServicePlaces = await ServicePlace.find();
  res.render('index', {
    contactSession: req.session.contact ? req.session.contact : null,
    userSession: req.session.user ? req.session.user : null,
    allServicePlaces: resAllServicePlaces,
    errorMsg: msg,
  });
}

async function handerSuccesIndexWithSession(req, res, allServicePlaces) {
  let resAllServicePlaces = await ServicePlace.find();

  res.render('index', {
    session: true,
    contactSession: req.session.contact,
    userSession: req.session.user,
    allServicePlaces: resAllServicePlaces
  });
}

async function handerSuccesIndex(req, res, warningMsg) {
  let resAllServicePlaces = await ServicePlace.find();
  res.render('index', {
    contactSession: req.session.contact ? req.session.contact : null,
    userSession: req.session.user ? req.session.user : null,
    allServicePlaces: resAllServicePlaces,
    warningMsg: warningMsg
  });
}

async function getMsgWhenSessionDoesntExist(req) {
  if (! req.session.contact) {
    return 'Debes iniciar sesión para hacer pedidos. Ingresa tu número celular';
  }
  return null;
}

const formatMilesSeparetor = (number) => {
  var num = number.toString().replace(/\,/g,'');
  if (!isNaN(num)) {
    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1,');
    num = num.split('').reverse().join('').replace(/^[\.]/,'');
    //input.value = num;
    return num;
  }
  return null;
}

module.exports = {
  handlerError,
  handerSuccesIndexWithSession,
  handerSuccesIndex,
  handlerErrorIndex,
  getMsgWhenSessionDoesntExist,
  formatMilesSeparetor
}
