const User = require('./../models/user');
const Item = require('./../models/item');
const bcrypt = require('bcrypt');
const path = require('path');

//Paths
const dirViews = path.join(__dirname, '../../template/views/');

const createItem = (req, res) => {
  let item = new Item({
    code: req.body.code,
    name: req.body.name,
    purchase_price: req.body.purchasePrice,
    sale_price: req.body.salePrice,
    quantity: req.body.quantity,
    descrption: req.body.descrption,
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
  console.log('pass:' + req.body.password);
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
  createItem
}
