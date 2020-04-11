const path = require('path');
const dirViews = path.join(__dirname, '../../template/views/');

const handlerError = (msj, res, form) => {
  res.render(dirViews + form, {
    errorMsg: msj
  });
}

module.exports = {
  handlerError
}
