const bcrypt = require('bcrypt');

//Model objects
const Contact = require('./../models/contact');
const User = require('./../models/user');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const contactUtils = require('./../utils/contact-utils');
const commonUtils = require('./../utils/common-utils');
const userUtils = require('./../utils/user-utils');


const handlerSuccess = (req, res, formToRender, contact, successMsg) => {
  let showUserView = false;
  let user = req.session.user;
  if (user && user.rol == 'admin') {
    showUserView = true;
  } else if (req.session.contact.cellPhoneNumber == '304-645-6220') {
    showUserView = true;
  }

  res.render(dirViews + formToRender, {
    contactSession: req.session.contact,
    userSession: req.session.user,
    contact: contact,
    successMsg: successMsg,
    showUserView: showUserView
  });
}

//POST

/**
** used
** update and create
**/
async function updateContact(req, res) {
  try {
      let resContact = await Contact.findByIdAndUpdate(req.body._contactId, {
          cellPhoneNumber: req.body.cellPhoneToSearch,
          name: req.body.contactFirstName,
          lastName: req.body.contactLastName,
          address: req.body.contactAddress}, {new: true, upsert: true});

      if (resContact) {
        let userPassword = req.body.userPassword;
        if (typeof userPassword !== 'undefined' && userPassword) {
          let userId = resContact._userId;
          let resUser;
          if (userId) {
            resUser = await User.findByIdAndUpdate(userId, {
              password: bcrypt.hashSync(req.body.userPassword, 10),
              rol: req.body.userRol}, {new: true});
          } else {
            let user = await userUtils.getInstanceOfUser(req, resContact);
            resUser = await user.save();
          }
          req.session.user = resUser;
          resContact = await Contact.findByIdAndUpdate(resContact._id, {_userId: resUser}, {new: true});
        }
      }

      handlerSuccess(req, res, 'formContact', resContact, 'Contacto con ID ' + resContact.cellPhoneNumber + ' actualizado exitósamente!');
  } catch (e) {
      commonUtils.handlerError(req, e, res, 'formContact');
  }
}

/******************************************************************************/

//GETS
//used contact-route.get('/formNewContact', (req, res)
const getNewContactForm = (req, res) => {
  handlerSuccess(req, res, 'formContact', null, null);
}

async function getEditContactForm(req, res) {
  let cellPhoneNumber = req.query.cell ? req.query.cell: req.session.contact ? req.session.contact.cellPhoneNumber : null;
  if (cellPhoneNumber) {
    let resContact = await Contact.findByCellPhone(cellPhoneNumber);
    if (resContact) {
      return handlerSuccess(req, res, 'formContact', resContact, null);
    } else if (req.session.contact) {
      return handlerSuccess(req, res, 'formContact', req.session.contact);
    }
  }
  return commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
}

//used
async function getSearchContactForm(req, res) {
  try {
    let bodyCellPhone = req.body.cellPhoneToSearch;
    let queryCellPhone = req.query.cellPhoneToSearch;
    if ((typeof bodyCellPhone !== 'undefined' && bodyCellPhone) ||
         typeof queryCellPhone !== 'undefined' && queryCellPhone) {

      let cellPhoneToSearch = bodyCellPhone ? bodyCellPhone : queryCellPhone;
      let contact = await Contact.findByCellPhone(cellPhoneToSearch);
      handlerSuccess(req, res, 'formSearchContact', contact, null);
    } else {
      handlerSuccess(req, res, 'formSearchContact', null, null);
    }
  } catch (e) {
    commonUtils.handlerError(req, e, res, 'formSearchContact');
  }
}


/******************************************************************************/

module.exports = {
  updateContact,
  getNewContactForm,
  getEditContactForm,
  getSearchContactForm
}
