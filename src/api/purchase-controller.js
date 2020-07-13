const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

const Purchase = require('./../models/purchase');
const CartShopping = require('./../models/cartShopping');

const commonUtils = require('./../utils/common-utils');
const purchaseUtils = require('./../utils/purchase-utils');

async function handlerSuccess(req, res, step) {
  res.render(dirViews + 'formPurchase', {
    contactSession: req.session.contact,
    userSession: req.session.user,
    commit: step == 'commit' ? true : false,
    delivery: step == 'delivery' ? true : false
  });
}

//***********GETS*****************************/
async function getFormPurchase(req, res) {
  handlerSuccess(req, res, 'commit');
}

/**
** oper 1: add otherwise sub
**/
async function addSubQuantity(req, res, oper) {
  let _kartId = req.query.code;
  let purchase = req.session.purchase;
  //purchase.cartShopping.find(elt => {elt == })

  let kartFound = purchase.cartShopping.find(elt => elt._id === _kartId);
  let index = purchase.cartShopping.indexOf(kartFound);
  kartFound.quantity = oper == 1 ? kartFound.quantity + 1 : kartFound.quantity - 1;
  purchase.cartShopping.splice(index, 1, kartFound);

  req.session.purchase = purchase;
  handlerSuccess(req, res, 'commit');
}

async function removeItemFromPurchase(req, res) {
  let purchase = req.session.purchase;
  let _kartId = req.query.code;

  let kartFound = purchase.cartShopping.find(elt => elt._id === _kartId);
  let index = purchase.cartShopping.indexOf(kartFound);
  purchase.cartShopping.splice(index, 1);

  req.session.purchase = purchase;
  handlerSuccess(req, res, 'commit');
}

//***********POST*****************************/
async function nextStepOne(req, res) {
  handlerSuccess(req, res, 'delivery');
  // let sessionPurchase = req.session.purchase;
  // let purchase = purchaseUtils.getInstanceOfPurchaseFromObject(sessionPurchase)
  // console.log(purchase);
  // console.log(purchase.getTotal);

}

module.exports = {
  getFormPurchase,
  addSubQuantity,
  removeItemFromPurchase,
  nextStepOne
}
