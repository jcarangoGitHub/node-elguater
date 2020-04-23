const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

const handlerError = (msj, res, form) => {
  res.render(dirViews + form, {
    errorMsg: msj
  });
}

const handerSuccesIndexWithSession = (req, res, allServicePlaces) => {
  res.render('index', {
    session: true,
    contactSession: req.session.contact,
    user: req.session.user,
    allServicePlaces: allServicePlaces
  });
}

const handerSuccesIndex = (req, res, allServicePlaces, warningMsg) => {
  res.render('index', {
    allServicePlaces: allServicePlaces,
    warningMsg: warningMsg,
    contactSession: req.session.contact ? req.session.contact : null,
    user: req.session.user ? req.session.user : null
  });
}

module.exports = {
  handlerError,
  handerSuccesIndexWithSession,
  handerSuccesIndex
}
