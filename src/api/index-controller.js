const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');
const Contact = require('./../models/contact');
const User = require('./../models/user');

const partnerController = require('./partner-controller');

const commonUtils = require('./../utils/common-utils');

async function getIndexForm(req, res) {
  try {
    let resAllServicePlaces = await ServicePlace.find();
    let messageWarning;
    if (!req.session.contact) {
      messageWarning = 'Debes iniciar sesión para hacer pedidos.';
    }
    res.render('index', {
      allServicePlaces: resAllServicePlaces,
      warningMsg: messageWarning
    });
  }catch(e) {
    commonUtils.handlerError('Error cargando index. Consulte con el administrador del sistema',
                             res, 'index');
  }
}

async function handlerLoginPost(req, res) {
  try {
    let cellPhoneToSearch = req.body.cellPhoneToSearch;
    let resAllServicePlaces = await ServicePlace.find();
    if (cellPhoneToSearch) {
      let resContact = await Contact.findByCellPhone(cellPhoneToSearch);
        req.session.contact = resContact ? resContact : new Contact({cellPhoneNumber: req.body.cellPhoneToSearch});
        req.session.user = resContact && resContact._userId ? await User.findById(resContact._userId) : null;
        res.render('index', {
          session: true,
          allServicePlaces: resAllServicePlaces,
          contact: req.session.contact
        });
    }

  } catch(e) {
    commonUtils.handlerError('Error cargando index. Consulte con el administrador del sistema',
                             res, 'index');
  }
}

//*****************************************************************************/
module.exports = {
  getIndexForm,
  handlerLoginPost
}
