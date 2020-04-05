const Partner = require('./../models/partner');
const ServicePlace = require('./../models/servicePlace');
const Contact = require('./../models/contact');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

//private functions
const updatePartnerByIdWithoutImage = (req, res) => {
  Partner.findById({_id: req.body._partnerId}, (errPartner, resPartner) => {
      if (errPartner) {
        res.render(dirViews + 'formPartner', {
          errorMsg: errPartner
        });
        return;
      }

      if (resPartner) {
        resPartner.servicePlaces.forEach(element => {
          ServicePlace.findByIdAndUpdate({_id: element}, {
                                  name: req.body.servicePlaceName,
                                  address: req.body.servicePlaceAddress,
                                  description: req.body.servicePlaceDescription},
                                  {new: true}, (errServicePlace, resServicePlace) => {
            if (resServicePlace) {
              Contact.findById(req.body._contactId, (errContact, resContact) => {
                  if (resContact) {
                    res.render(dirViews + 'formPartner', {
                      successMsg: 'Socio actualizado!',
                      partner: resPartner,
                      contact: resContact,
                      servicePlace: resServicePlace
                    });
                  }//if resContact
                });//Contact.findById
            }//if resServicePlace
          });//ServicePlace.findByIdAndUpdate
        });//for each
      } //if (resPartner)
  });//Partner.findById
}

const updatePartnerByIdWithImage = (req, res) => {
  let image = req.file ? req.file.buffer : req.body.imageUploaded;
  let arrayImages = [image];
  Partner.findByIdAndUpdate({_id: req.body._partnerId}, {images: arrayImages}, {new: true},
                            (errPartner, resPartner) => {
      if (errPartner) {
        res.render(dirViews + 'formPartner', {
          errorMsg: errPartner
        });
        return;
      }

      if (resPartner) {
        resPartner.servicePlaces.forEach(element => {
          ServicePlace.findByIdAndUpdate({_id: element}, {
                                  name: req.body.servicePlaceName,
                                  address: req.body.servicePlaceAddress,
                                  description: req.body.servicePlaceDescription,
                                  images: [image]},
                                  {new: true},
                                  (errServicePlace, resServicePlace) => {
            if (resServicePlace) {
              Contact.findById(req.body._contactId, (errContact, resContact) => {
                  if (resContact) {
                    res.render(dirViews + 'formPartner', {
                      successMsg: 'Socio actualizado!',
                      partner: resPartner,
                      contact: resContact,
                      servicePlace: resServicePlace
                    });
                  }//if resContact
                });//Contact.findByIdAndUpdate
            }//if resServicePlace
          });
        });
      } //if (resPartner)
  }); //Partner.findByIdAndUpdate
} //updatePartnerByIdWithImage

//post
const createPartner = (req, res) => {
  let contactId = req.body._contactId;
  let partnerId = req.body._partnerId;
  let image = req.file ? req.file.buffer : req.body.imageUploaded;
  let arrayImages = [image];
  let servicePlace = image ? new ServicePlace({
      name: req.body.servicePlaceName,
      address: req.body.servicePlaceAddress,
      description: req.body.servicePlaceDescription,
      images: arrayImages
    }) : new ServicePlace({
        name: req.body.servicePlaceName,
        address: req.body.servicePlaceAddress,
        description: req.body.servicePlaceDescription});

  //UPDATE
  if (partnerId) {
    if (image) {
      updatePartnerByIdWithImage(req, res);
      return;
    } else {//if image
      updatePartnerByIdWithoutImage(req, res);
      return;
    }//else
  }
  //CREATE
  let partner = new Partner({
    _contactId: contactId,
    servicePlaces: [servicePlace],
    images: arrayImages
  });

  partner.save((errPartner, resPartner) => {
    if (errPartner) {
      res.render(dirViews + 'formPartner', {
        errorMsg: errPartner
      });
      return
    }

    if (resPartner) {
      servicePlace._partnerId = resPartner._id
      servicePlace.save((errServicePlace, resServicePlace) => {
        if (errServicePlace) {
          res.render(dirViews + 'formPartner', {
            errorMsg: errServicePlace
          });
          return;
        }

        if (resServicePlace) {
          Contact.findByIdAndUpdate(contactId, {_partnerId: resPartner._id}, {new: true},
            (errContact, resContact) => {
              if (errContact) {
                res.render(dirViews + 'formPartner', {
                  errorMsg: errContact
                });
                return;
              }
              if (resContact) {
                res.render(dirViews + 'formPartner', {
                  successMsg: 'Socio creado!',
                  partner: resPartner,
                  contact: resContact,
                  servicePlace: resServicePlace
                });
              }
          });//contact.findByIdAndUpdate
        }//if (resServicePlace)
      });//servicePlace.save
    }//if (resPartner)
  });//partner.save
}//createPartner


//*****************************************************************/
module.exports = {
  createPartner
}
