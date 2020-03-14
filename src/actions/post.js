const User = require('./../models/user');
const Item = require('./../models/item');
const bcrypt = require('bcrypt');
const path = require('path');

const getActions = require('../actions/gets');

//Paths
const dirViews = path.join(__dirname, '../../template/views/');

const renderView = (res, msg, view) => {
  res.render(dirViews + view, {
    msg: msg
  });
}

const removeItemByCode = (req, res) => {
  Item.findOneAndDelete({code: req.body.code}, req.body, (err, result) => {
    if (err) {
      res.render(dirViews + 'formSearchItems', {
        errorMsg: err
      });
    }
    if (!result) {
      res.render(dirViews + 'formSearchItems', {
        warningMsg: 'El artículo con código ' + req.body.code + ' no existe'
      });
    }

    renderView(res, 'Artículo eliminado correctamente!', 'formSearchItems');
  })
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

const updateItem = (req, res) => {
  if (req.file) {
    img = req.file.buffer;
  } else {
    img = req.body.imageUploaded;
  }
  if (img) {
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
                       renderView(res, err, 'index')
                     }
                     getActions.getAllItems(req, res, 'formSearchItems');
                   });
  } else {
    Item.updateOne({code: req.body.code},
                   {name: req.body.name,
                   purchase_price: parseFloat(req.body.purchasePrice.replace(".", "")),
                   sale_price: parseFloat(req.body.salePrice.replace(".", "")),
                   quantity: parseInt(req.body.quantity),
                   description: req.body.description,
                   comment: req.body.comment},
                   (err, result) => {
                     if (err) {
                       renderView(res, err, 'index')
                     }
                     getActions.getAllItems(req, res, 'formSearchItems');
                   })
  }
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
    renderView(res, 'Artículo creado corréctamente', 'index');
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
  console.log('create user...')
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
    console.log('**ERROR: ' + err)
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
  updateItem,
  removeItemByCode
}
