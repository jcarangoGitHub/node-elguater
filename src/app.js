//Requires
require('./config/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // to insert information in forms
const mongoose = require('mongoose');
var session = require('express-session');

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
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//MIDDLEWARE
app.use((req, res, next) => {
  console.log('MIDDLEWARE...');
  if (req.session.user) {
    res.locals.session = true
    res.locals.name = req.session.user.firstName
  }
  next()
});

//Body parser
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use(require('./routes/index'));

//Mongo connection
// autoIndex: false } pdn
mongoose.connect(process.env.URLDB, {useNewUrlParser: true}, (err, resutl) => {
  if (err) {
    return console.log('Error connecting db guater-mongo-db: ' + err)
  }
  return console.log('Connected to guater-mongo-db successfully!')
});

//Server
server.listen(port, () => {
  console.log('Listening on port ' + port);
});
