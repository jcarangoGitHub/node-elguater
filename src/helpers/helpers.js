const hbs = require('hbs');
const path = require('path');
const dirPublic = path.join(__dirname, '../../public');

hbs.registerHelper('getImageFromItem', (item) => {
  if (item && item.image) {
      return item.image.toString('base64');
  } else {
    return dirPublic + '\\images\\no-image.png';
  }

})

hbs.registerHelper('getTableItems', (allItems) => {
  let iter = 1;
  let html = '';
  img = null;
  allItems.forEach(item => {
    img = null;
    if (item.image) {
        img = item.image.toString('base64');
    }

    html = html +
      `<tr>
        <th scope="row">${iter}</th>
        <td align="center">
          <div class="card align-items-center" style="width: 18rem;">
            <img src="data:img/png;jpeg;jpg;base64, ${img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title" style="color:black;">${item.name}</h5>
              <p class="card-text">${item.description}</p>
              <a href="/formItem?isUpdate=true&item_id=${item._id}" class="btn btn-primary">Actualizar</a>
            </div>
          </div>
        </td>
      </tr>`;
      iter ++;
  });
  return html;
});

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

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

hbs.registerHelper('getSlideImages', (allItems) => {
  let iter = 0;
  let html = '';
  img = null;
  allItems.forEach(item => {
    let strPrice = numberWithCommas(item.sale_price.toString());
    if (item.image) {
      img = item.image.toString('base64');
    }
    if (iter == 0) {
      html = html + '<div class="carousel-item active">';
    } else {
      html = html + '<div class="carousel-item">';
    }
    html = html + `<img src="data:img/png;jpeg;jpg;base64, ${img}" class="img-fluid d-block w-100">
        <div class="carousel-caption d-none d-md-block">
          <h1 class="h1Img">${item.name}</h1>
          <h2 class="h1Img">$ ${strPrice}</h2>
          <a href="https://api.whatsapp.com/send?phone=573046456220&text=Hola!%20Me%20interesa%20
                  el%20artículo:%20${item.name}"
            class="btn btn-primary btn-whatsapp" role="button" aria-pressed="true" target="_blank">
            <i class="fa fa-whatsapp"></i>
            Me interesa</a>

</body>
</html>

        </div>
        </div>`;
    iter ++;
  });

  return html;
})
