const ServicePlace = require('./../models/servicePlace');

const getInstanceOfServicePlace = (req, image) => {
  return servicePlace = image ? new ServicePlace({
      name: req.body.servicePlaceName,
      address: req.body.servicePlaceAddress,
      description: req.body.servicePlaceDescription,
      images: [image]
    }) : new ServicePlace({
        name: req.body.servicePlaceName,
        address: req.body.servicePlaceAddress,
        description: req.body.servicePlaceDescription});
}

module.exports = {
  getInstanceOfServicePlace
}
