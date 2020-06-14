//Requires
require('./config/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // to insert information in forms
const mongoose = require('mongoose');
var session = require('express-session');
var MemoryStore = require('memorystore')(session);

//Constants
const app = express();
const server = require('http').createServer(app);

//Paths
const dirPublic = path.join(__dirname, '../public');
const dirNodeModules = path.join(__dirname, '../node_modules');

//PORT
const port = process.env.PORT || 3000;

//static
app.use(express.static(dirPublic));
app.use('/js', express.static(dirNodeModules + '/jquery/'));
app.use('/js', express.static(dirNodeModules + '/popper.js/'));

//SESSION
/*
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: 'keyboard cat'
}));
*/

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


//MIDDLEWARE
app.use((req, res, next) => {
  console.log('MIDDLEWARE...');
  res.locals.session = req.session.contact ? true : false;
  res.locals.sessionContact = req.session.contact ? req.session.contact : null;
  res.locals.sessionUser = req.session.user ? req.session.user : null;
  res.locals.sessionCart = req.session.cartShopping ? req.session.cartShopping : null;
  res.locals.sessionPurchase = req.session.purchase ? req.session.purchase : null;
  console.log(req.session.purchase);
  next();
});

//Body parser
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/partner-routes'));
app.use(require('./routes/contact-routes'));
app.use(require('./routes/item-routes'));
app.use(require('./routes/store-routes'));
app.use(require('./routes/sticker-routes'));
app.use(require('./routes/purchase-routes'));



//Mongo connection
// autoIndex: false } pdn
mongoose.connect(process.env.URLDB, {useNewUrlParser: true}, (err, resutl) => {
  if (err) {
    return console.log('Error connecting db guater-mongo-db: ' + err)
  }
  return console.log('Connected to guater-mongo-db successfully!')
});
mongoose.set('useFindAndModify', false);

//Server
server.listen(port, () => {
  console.log('Listening on port ' + port);
});
