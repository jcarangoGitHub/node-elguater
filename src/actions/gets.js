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

const getNewContactForm = (req, res) => {
  res.render(dirViews + 'formContact', {
    inEditMode: true
  });
}

const getUpdateConctactForm = (req, res) => {

  Contact.findById(req.session.user._contactId).exec((err, result) => {
    if (err) {
      res.render(dirViews + 'index', {
        msg: err
      });
    }
    res.render(dirViews + 'formContact', {
      isUpdate: true,
      user    : req.session.user,
      contact : result
    });
  });
}

module.exports = {
  getAllItems,
  getNewContactForm,
  getUpdateConctactForm
}
