const Item = require('./../models/item');

const path = require('path');

//Paths
const dirViews = path.join(__dirname, '../../template/views/');

const getAllItems = (req, res) => {
  /*Item.find().exec(err, result) => {
    if (err) {
      res.render(dirViews + 'index', {
        myTitle: err
      });
    }
    res.render(dirViews + 'formStore', {
      allItems: result
    });
  }*/
}

module.exports = {
  getAllItems
}
