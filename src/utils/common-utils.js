const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

const handlerError = (req, msj, res, form) => {
  res.render(dirViews + form, {
    errorMsg: msj,
    contactSession: req.session.contact ? req.session.contact : null,
    userSession: req.session.user ? req.session.user : null
  });
}

const handerSuccesIndexWithSession = (req, res, allServicePlaces) => {
  res.render('index', {
    session: true,
    contactSession: req.session.contact,
    userSession: req.session.user,
    allServicePlaces: allServicePlaces
  });
}

const handerSuccesIndex = (req, res, allServicePlaces, warningMsg) => {
  res.render('index', {
    allServicePlaces: allServicePlaces,
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
