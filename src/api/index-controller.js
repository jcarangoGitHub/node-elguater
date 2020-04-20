const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');
const Contact = require('./../models/contact');

const partnerController = require('./partner-controller');

const commonUtils = require('./../utils/common-utils');

async function getIndexForm(req, res) {
  try {
    let resAllServicePlaces = await ServicePlace.find();
    let messageWarning;
    if (!req.session.contact) {
      messageWarning = 'Debes iniciar sesión para hacer pedidos. Sólo déjanos' +
                        ' un número celular donde podamos contactarnos';
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
        req.session.contact = resContact;
        res.render('index', {
          session: true,
          allServicePlaces: resAllServicePlaces,
          contact: resContact
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
