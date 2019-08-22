const hbs = require('hbs');

hbs.registerHelper('getSlideIndicators', (allItems) => {
  let iter = 0;
  let html = '';
  allItems.forEach(item => {
    if (iter == 0) {
      html = html + '<li data-target="#carouselIndicators" data-slide-to="0" class="active"></li>';
    } else {
      html = html +
        `<li data-target="#carouselIndicators" data-slide-to="${iter}"></li>`;
    }
    iter ++;
  })
  return html;
});

hbs.registerHelper('getSlideImages', (allItems) => {
  let iter = 0;
  let html = '';
  img = null;
  allItems.forEach(item => {
    img = item.image.toString('base64');
    if (iter == 0) {
      html = html + '<div class="carousel-item active">';
    } else {
      html = html + '<div class="carousel-item">';
    }
    html = html + `<img src="data:img/png;jpeg;jpg;base64, ${img}" class="img-fluid d-block w-100" alt="${item.description}"> </div>`;
    iter ++;
  });

  return html;
})
