const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');
const Contact = require('./../models/contact');
const Item = require('./../models/item');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const partnerUtils = require('./../utils/partner-utils');
const servicePlaceUtils = require('./../utils/service-place-utils');
const commonUtils = require('./../utils/common-utils');

//private functions
async function updatePartnerAndServicePlacesById(req, res) {
  try {
    let resPartner = await Partner.findById({_id: req.body._partnerId});
    if (resPartner) {
      let resServicePlace;
      for (const element of resPartner.servicePlaces) {
        resServicePlace = await ServicePlace.findByIdAndUpdateAccordingToImage(req, element);
      }

      if (resServicePlace) {
        let resContact = await Contact.findById(req.body._contactId);
        if (resContact) {
          res.render('formPartner', {
            successMsg: 'Socio actualizado!',
            partner: resPartner,
            contact: resContact,
            servicePlace: resServicePlace
          });
          return;
        }//if resContact
      }//if resServicePlace
    }
    res.render('formPartner');
  } catch(e) {
    res.render(dirViews + 'formPartner', {
      errorMsg: errPartner
    });
    return;
  }
}//async function updatePartnerByIdWithoutImage

async function createPartnerAndServicePlaces(req, res) {
  let image = req.file ? req.file.buffer : req.body.imageUploaded;
  let servicePlace = servicePlaceUtils.getInstanceOfServicePlace(req, image)
  let partner = partnerUtils.getInstanceOfPartnerAccordingToImage(req, req.body._contactId, servicePlace, image);
  let resPartner = await partner.save();
  if (resPartner && resPartner._id) {
    servicePlace._partnerId = resPartner._id;
    let resServicePlace = await servicePlace.save();
    let resContact = await Contact.findByIdAndUpdate(contactId, {_partnerId: resPartner._id}, {new: true});

    res.render(dirViews + 'formPartner', {
      successMsg: 'Ahora somos socios!',
      partner: resPartner,
      contact: resContact,
      servicePlace: resServicePlace
    });
  } else {
    commonUtils.handlerError('Error inesperado, partner._id no encontado', res, 'formPartner');
  }
}

//used index.app.post('/partner', upload.single('image'), (req, res)
async function handlerPost(req, res) {
  try {
    //update
    if (partnerId) {
      updatePartnerAndServicePlacesById(req, res);
    } else {
      //create
      createPartnerAndServicePlaces(req, res);
    }

  } catch (e) {
    commonUtils.handlerError(e, res, 'formPartner');
  }
}

/**
** used index.app.get('/partner', (req, res)
**/
async function getFormPartner(req, res) {
  let cellPhone = req.query.cell;
  try {
    let contact = await Contact.findByCellPhone(cellPhone);
    if (contact === null) {
      commonUtils.handlerError('El número ' + cellPhone + ' no está registrado', res, 'formPartner');
      return;
    } else if (contact._partnerId) {
      let partner = await Partner.findById(contact._partnerId);
      if (partner.servicePlaces[0]) {
        let servicePlace = await ServicePlace.findById(partner.servicePlaces[0]);
        let items = await Item.find({_partnerId: partner._id});
        res.render(dirViews + 'formPartner', {
          contact: contact,
          partner: partner,
          servicePlace: servicePlace,
          items: items
        });
        return;
      } else {
        res.render(dirViews + 'formPartner', {
          contact: contact,
          partner: partner
        });
      }
    }

    res.render(dirViews + 'formPartner', {
      contact: contact
    });
    return;
  } catch(e) {
    commonUtils.handlerError(e, res, 'formPartner');
  }
}

//*****************************************************************/
module.exports = {
  getFormPartner,
  handlerPost
}
