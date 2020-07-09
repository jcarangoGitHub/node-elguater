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
  let purchase = req.session.purchase;
  //purchase.cartShopping.find(elt => {elt == })

  let kartFound = purchase.cartShopping.find(elt => elt._id === _kartId);
  let index = purchase.cartShopping.indexOf(kartFound);
  kartFound.quantity = kartFound.quantity + 1;
  purchase.cartShopping.splice(index, 1, kartFound);

  req.session.purchase = purchase;
  handlerSuccess(req, res);
}

async function subQuantity(req, res) {
  let _kartId = req.query.code;
  let purchase = req.session.purchase;
  //purchase.cartShopping.find(elt => {elt == })

  let kartFound = purchase.cartShopping.find(elt => elt._id === _kartId);
  let index = purchase.cartShopping.indexOf(kartFound);
  kartFound.quantity = kartFound.quantity - 1;
  purchase.cartShopping.splice(index, 1, kartFound);

  req.session.purchase = purchase;
  handlerSuccess(req, res);
}

async function removeItemFromPurchase(req, res) {
  let purchase = req.session.purchase;
  let _kartId = req.query.code;

  let kartFound = purchase.cartShopping.find(elt => elt._id === _kartId);
  let index = purchase.cartShopping.indexOf(kartFound);
  purchase.cartShopping.splice(index, 1);  

  req.session.purchase = purchase;
  handlerSuccess(req, res);
}

module.exports = {
  getFormPurchase,
  addQuantity,
  subQuantity,
  removeItemFromPurchase
}
