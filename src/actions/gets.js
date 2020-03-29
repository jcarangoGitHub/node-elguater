const Item = require('./../models/item');
const Contact = require('./../models/contact');
const User = require('./../models/user');

const path = require('path');

//Paths
const dirViews = path.join(__dirname, '../../template/views/');


const getAllItems = (req, res, successForm) => {
  Item.find().exec((err, result) => {
    if (err) {
      res.render(dirViews + 'index', {
        msg: err
      });
    }

    res.render(dirViews + successForm, {
      allItems: result
    });
  });
}

module.exports = {
  getAllItems
}
