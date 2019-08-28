const User = require('./../models/user');
const Item = require('./../models/item');
const bcrypt = require('bcrypt');
const path = require('path');

const getActions = require('../actions/gets');

//Paths
const dirViews = path.join(__dirname, '../../template/views/');

const updateItem = (req, res) => {
  console.log('updating...')
  let img = null
  if (req.file) {
    img = req.file.buffer;
  } else if (req.body.imageUploaded) {
    img = req.body.imageUploaded;
  }
  Item.updateOne({code: req.body.code},
                 {name: req.body.name,
                 purchase_price: parseFloat(req.body.purchasePrice.replace(".", "")),
                 sale_price: parseFloat(req.body.salePrice.replace(".", "")),
                 quantity: parseInt(req.body.quantity),
                 description: req.body.description,
                 comment: req.body.comment,
                 image: img},
                 (err, result) => {
                   if (err) {
                     renderIndex(res, err)
                   }
                   getActions.getAllItems(req, res, 'formSearchItems');
                 })
}

const renderIndex = (res, msg) => {
  res.render(dirViews + 'index', {
    myTitle: msg
  });
}

const createItem = (req, res) => {
  let item = new Item({
    code: req.body.code,
    name: req.body.name,
    purchase_price: parseFloat(req.body.purchasePrice.replace(".", "")),
    sale_price: parseFloat(req.body.salePrice.replace(".", "")),
    quantity: parseInt(req.body.quantity),
    description: req.body.description,
    comment: req.body.comment,
    image: req.file ? req.file.buffer : null
  });

  item.save((err, result) => {
    if (err) {
      res.render(dirViews + 'index', {
        myTitle: err
      });
    }
    res.render(dirViews + 'index', {
      myTitle: 'Artículo creado corréctamente'
    });
  })
}

const login = (req, res) => {
  User.findOne({$or: [{email: req.body.user}, {userName: req.body.user}] }).exec((err, result) => {
    if (err) {
      return console.log(err);
    }
    if (result && bcrypt.compareSync(req.body.password, result.password)) {
        req.session.userId = result._id
        req.session.user = result
        res.render(dirViews + 'index', {
          myTitle: 'Usuario logueado!',
          session   : true,
          user      : req.session.user
        });
    } else {
          res.render(dirViews + 'index', {
            myTitle: 'Usuaio o contraseña no válido'
          });
    }
  });
}

const createUser = (req, res) => {
  let user = new User({
    documentId: req.body.documentId,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    rol: req.body.rol,
    email: req.body.email,
    userName: req.body.userName,
    password: bcrypt.hashSync(req.body.password, 10),
    telephone: req.body.telephone,
    image: req.file ? req.file.buffer : null
  });
  user.save((err, result) => {
    if (err) {
      res.render(dirViews + 'index', {
        myTitle: err
      })
    }

    res.render(dirViews + 'index', {
      myTitle: 'Usuario creado correctamente!!'
    })
  })
}

module.exports = {
  createUser,
  login,
  createItem,
  updateItem
}