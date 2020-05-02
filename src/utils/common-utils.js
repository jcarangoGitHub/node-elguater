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
  console.log(warningMsg);
  let resAllServicePlaces = await ServicePlace.find();
  res.render('index', {
    allServicePlaces: resAllServicePlaces,
    warningMsg: warningMsg,
    contactSession: req.session.contact ? req.session.contact : null,
    userSession: req.session.user ? req.session.user : null
  });
}

module.exports = {
  handlerError,
  handerSuccesIndexWithSession,
  handerSuccesIndex
}
