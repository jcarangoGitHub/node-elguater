const Purchase = require('./../models/purchase');
const CartShopping = require('./../models/cartShopping');

const getInstanceOfPurchase = (req, item, servicePlace) => {
  console.log(servicePlace);
  let purchase =  new Purchase({
    _contactId: req.session.contact._id,
    servicePlace: servicePlace
  });
  let kart = new CartShopping({
    _purchase: purchase._id,
    item: item
  });
  purchase.cartShopping.push(kart);

  return purchase;
}

const getInstanceOfPurchaseFromObject = (object) => {
  let purchase =  new Purchase({
    _contactId: object._contactId
  });

  purchase.cartShopping = object.cartShopping

  return purchase;
}

module.exports = {
  getInstanceOfPurchase,
  getInstanceOfPurchaseFromObject
}
