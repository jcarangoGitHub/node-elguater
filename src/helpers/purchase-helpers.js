const hbs = require('hbs');
const commonUtils = require('./../utils/common-utils');

//used formPurchase.hbs
hbs.registerHelper('getSubtotal', (price, quantity) => {
  let subTotal = price * quantity;
  let subTotal_string = commonUtils.formatMilesSeparetor(subTotal);
  return subTotal_string;
});

hbs.registerHelper('getTotal', (cartShopping) => {
  let total = 0;
  if (cartShopping) {
    cartShopping.forEach((item, i) => {
      total = total + item.item.price_number * item.quantity;
    });
  }
  return commonUtils.formatMilesSeparetor(total);
});
