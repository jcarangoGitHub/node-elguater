//Requires
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const multer  = require('multer');

require('../helpers/helpers');

const postActions = require('../actions/post');
const getActions = require('../actions/gets');
const contactController = require('../api/contact-controller');

const Item = require('./../models/item');


//Paths
const dirPartials = path.join(__dirname, '../../template/partials');
const dirViews = path.join(__dirname, '../../template/views/');

//Hbs
app.set ('view engine', 'hbs');
app.set ('views', dirViews);
hbs.registerPartials(dirPartials);

//GET METHODS
app.get('/', (req, res) => {
  res.render(dirViews + 'index', {

  });
});

app.get('/formNewContact', (req, res) => {
  contactController.getNewContactForm(req, res);
});

app.get('/contact', (req, res) => {
  contactController.getSearchContactForm(req, res);
});

app.get('/formUpdateContact', (req, res) => {
  getActions.getUpdateContactForm(req, res)
});

app.get('/formSearchItems', (req, res) => {
  getActions.getAllItems(req, res, 'formSearchItems');
});

app.get('/formStore', (req, res) => {
  getActions.getAllItems(req, res, 'formStore');
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return console.log(err)
  });
  res.redirect('/');
});

app.get('/formUsers', (req, res) => {
  res.render(dirViews + 'formUsers', {
    isUpdate: false,
    user    : req.session.user
  });
});

app.get('/formItem', (req, res) => {
  if (req.query.isUpdate) {
    console.log(req.query.item_id)
    Item.findById(req.query.item_id, (err, result) => {
      if (err) {
        return console.log(err)
      }
      res.render(dirViews + 'formItem', {
        isUpdate: true,
        item: result
      });
    })
  } else {
    res.render(dirViews + 'formItem', {
      isUpdate: false
    });
  }

});

//PUT METHODS
app.post('/put-contact', (req, res) => {
  console.log('put contact...');
});

//POST METHODS
app.post('/contact', (req, res) => {
  contactController.createContact(req, res);
});

app.post('/search-contact', (req, res) => {
  contactController.getSearchContactForm(req, res);
});

app.post('/removeItem', (req, res) => {
  postActions.removeItemByCode(req, res);
});

app.post('/postUser', (req, res) => {
  postActions.createUser(req, res);
});

app.post('/login', (req, res) => {
  postActions.login(req, res);
});

var upload = multer({
  limits: {
    fileSize : 10000000 //MB
  },
  fileFilter (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error('Invalid file. Use jpg, png or jpeg files'))
    }
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  //cb(null, false)

  // To accept the file pass `true`, like so:
  cb(null, true)

  // You can always pass an error if something goes wrong:
  //cb(new Error('I don\'t have a clue!'))

  }
});

app.post('/postItem', upload.single('image'), (req, res) => {
  console.log('imagen: ' + req.body.imageUploaded);
  if (req.body.isUpdate == 'true') {
    postActions.updateItem(req, res);
  } else {
    postActions.createItem(req, res);
  }
})
module.exports = app;
