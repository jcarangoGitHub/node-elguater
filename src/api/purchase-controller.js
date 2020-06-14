const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

const Purchase = require('./../models/purchase');
const CartShopping = require('./../models/cartShopping');


async function handlerSuccess(req, res) {

  res.render(dirViews + 'formPurchase', {
    contactSession: req.session.contact,
    userSession: req.session.user
  });
}

//***********GETS*****************************/
async function getFormPurchase(req, res) {
  handlerSuccess(req, res);
}

async function addQuantity(req, res) {
  let _kartId = req.query.code;
  console.log('_kartId');
  console.log(_kartId);
  console.log('purchase');
  console.log(req.session.purchase);
  let purchase = req.session.purchase;
  //purchase.cartShopping.find(elt => {elt == })

  let kartFound = purchase.cartShopping.find(elt => elt._id === _kartId);
  let index = purchase.cartShopping.indexOf(kartFound);
  kartFound.quantity = kartFound.quantity + 1;
  purchase.cartShopping.splice(index, 1, kartFound);

  console.log('kartFound + 1');
  console.log(purchase);
  req.session.purchase = purchase;
  handlerSuccess(req, res);


}


module.exports = {
  getFormPurchase,
  addQuantity
}
