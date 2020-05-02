const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');
const Contact = require('./../models/contact');
const User = require('./../models/user');

const partnerController = require('./partner-controller');

const commonUtils = require('./../utils/common-utils');

async function getIndexForm(req, res) {
  try {
    let messageWarning;
    if (! req.session.contact) {
      messageWarning = 'Debes iniciar sesión para hacer pedidos.';
    }
    return await commonUtils.handerSuccesIndex(req, res, messageWarning);
  }catch (e) {
    commonUtils.handlerError(req, 'Error cargando index. Consulte con el administrador del sistema: ' + e,
                             res, 'index');
  }
}

async function initSession(req, cellPhoneToSearch) {
  let resContact = await Contact.findByCellPhone(cellPhoneToSearch);
  req.session.contact = resContact ? resContact : new Contact({cellPhoneNumber: req.body.cellPhoneToSearch});
  //req.session.user = resContact && resContact._userId ? await User.findById(resContact._userId) : null;
}

async function handlerLoginPost(req, res) {
  try {
    let cellPhoneToSearch = req.body.cellPhoneToSearch;
    if (cellPhoneToSearch) {
      await initSession(req, cellPhoneToSearch);
      commonUtils.handerSuccesIndexWithSession(req, res);
    }
  } catch (e) {
    commonUtils.handlerError(req, 'Error cargando index. Consulte con el administrador del sistema: ' + e,
                             res, 'index');
  }
}

//*****************************************************************************/
module.exports = {
  getIndexForm,
  handlerLoginPost
}
