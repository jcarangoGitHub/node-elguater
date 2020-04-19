const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');

const partnerController = require('./partner-controller');

const commonUtils = require('./../utils/common-utils');

async function getIndexForm(req, res) {
  try {
    let resAllServicePlaces = await ServicePlace.find();
    res.render('index', {
      allServicePlaces: resAllServicePlaces
    });
  }catch(e) {
    commonUtils.handlerError('Error cargando index. Consulte con el administrador del sistema',
                             res, 'index')
  }
}

//*****************************************************************************/
module.exports = {
  getIndexForm
}
