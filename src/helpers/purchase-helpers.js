const hbs = require('hbs');
const commonUtils = require('./../utils/common-utils');

var dateFormat = require('dateformat');

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

hbs.registerHelper('radioWayToDeliveryChecked', (wayToDelivery, radio) => {
  return wayToDelivery == radio ? 'checked' : '';
});

hbs.registerHelper('radioWayToPaymentChecked', (wayToPayment, radio) => {
  return wayToPayment == radio ? 'checked' : '';
});

// return one hour after now COL
hbs.registerHelper('getDefaultDeliveryDate', () => {
  var COL_UTC = 5;
  var today = new Date();
  today.setHours(today.getHours() - COL_UTC);
  today.setHours(today.getHours() + 1);
  return today.toISOString().substring(0, 16);
});

//return one minute before now COL
hbs.registerHelper('getMinDeliveryDate', () => {
  var COL_UTC = 5;
  var today = new Date();
  today.setHours(today.getHours() - COL_UTC);
  today.setMinutes(today.getMinutes() - 1);
  return today.toISOString().substring(0, 16);
});

hbs.registerHelper('wayToDeliveryVisivility', (wayToDelivery, div) => {
  return wayToDelivery == div ? 'visibility:visible' : 'visibility:hidden'
});

hbs.registerHelper('getImageBankAccount', (image) => {
  return `<img src="data:img/png;jpeg;jpg;base64, ${image.toString('base64')}" class="img-fluid d-block w-100">`
});

//hbs.registerHelper('getImageBankAccount', (bank))
