const hbs = require('hbs');

//used formPurchase.hbs
hbs.registerHelper('get-carousel-item', (index, item) => {
  let carousel = '';
  if (index === 0) {
    carousel = '<div class="carousel-item active">';
  } else {
    carousel = '<div class="carousel-item">';
  }
  carousel = carousel + `${item.name} </br>
              <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
              $ ${item.price_default}
            </div>`;
  return carousel;
});
