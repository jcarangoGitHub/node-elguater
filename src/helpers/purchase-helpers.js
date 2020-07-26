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

hbs.registerHelper('getDefaultDeliveryDate', () => {
  var milliseconds = Date.now();
  var today = new Date(milliseconds);
  console.log(today);
  today.setHours(today.getHours() + 1);
  console.log(today);
  var formated = dateFormat(today, "yyyy-mm-dd HH:MM").replace(' ', 'T');
  console.log(formated);
  return formated;
});

hbs.registerHelper('getMinDeliveryDate', () => {
  var milliseconds = Date.now();
  var today = new Date(milliseconds);
  today.setMinutes(today.getMinutes() - 1);
  var formated = dateFormat(today, "yyyy-mm-dd HH:MM").replace(' ', 'T');

  return formated;
});

hbs.registerHelper('wayToDeliveryVisivility', (wayToDelivery, div) => {
  return wayToDelivery == div ? 'visibility:visible' : 'visibility:hidden'
});
