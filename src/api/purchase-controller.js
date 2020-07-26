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
    delivery: step == 'delivery' ? true : false,
    payment: step == 'payment' ? true : false
  });
}

//***********GETS*****************************/
async function getFormPurchase(req, res) {
  if (req.query.step) {
    switch (req.query.step) {
      case '1':
        handlerSuccess(req, res, 'commit');
        break;

      case '2':
        handlerSuccess(req, res, 'delivery');
        break;

      case '3':
        handlerSuccess(req, res, 'payment');
        break;

      default:
        break;
    }
  } else {
    handlerSuccess(req, res, 'commit');
  }
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
async function stepTwo(req, res) {
  handlerSuccess(req, res, 'delivery');
}

async function stepOne(req, res) {
  handlerSuccess(req, res, 'commit');
}

async function stepThree(req, res) {
  console.log('start controller-stepThree');
  let purchase = req.session.purchase;
  purchase.wayToDelivery = req.body.radioWayToDelivery;
  purchase.dateOfDelivery = req.body.deliveryDate;

  req.session.purchase = purchase;
  console.log(req.session.purchase);
  handlerSuccess(req, res, 'payment');
  console.log('end stepThree');
}

module.exports = {
  getFormPurchase,
  addSubQuantity,
  removeItemFromPurchase,
  stepOne,
  stepTwo,
  stepThree
}
