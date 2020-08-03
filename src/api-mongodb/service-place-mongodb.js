const ServicePlace = require('./../models/servicePlace');
const servicePlaceUtils = require('./../utils/service-place-utils');

async function findServicePlaceByIdFromRequest(req) {
  return await ServicePlace.findById(req.body._servicePlaceId);
}

//not used yet
async function findServicePlaceByIdFromId(id) {
  return await ServicePlace.findById(id);
}

module.exports = {
  findServicePlaceByIdFromRequest,
  findServicePlaceByIdFromId
}
