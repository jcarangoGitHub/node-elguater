const Purchase = require('./../models/purchase');
const CartShopping = require('./../models/cartShopping');

const getInstanceOfPurchase = (req, item) => {
  let purchase =  new Purchase({
    _contactId: req.session.contact._id
  });
  let kart = new CartShopping({
    _purchase: purchase._id,
    item: item
  });
  purchase.cartShopping.push(kart);

  return purchase;
}

module.exports = {
  getInstanceOfPurchase
}
