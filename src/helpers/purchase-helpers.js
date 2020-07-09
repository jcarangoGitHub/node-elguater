const hbs = require('hbs');
const commonUtils = require('./../utils/common-utils');

//used formPurchase.hbs
hbs.registerHelper('getSubtotal', (price, quantity) => {
  let subTotal = price * quantity;
  let subTotal_string = commonUtils.formatMilesSeparetor(subTotal);
  return subTotal_string;
});
