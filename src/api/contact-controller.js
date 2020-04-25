//Model objects
const Contact = require('./../models/contact');
const User = require('./../models/user');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const contactUtils = require('./../utils/contact-utils');
const commonUtils = require('./../utils/common-utils');
const userUtils = require('./../utils/user-utils');


const handlerSuccess = (req, res, formToRender, contact, successMsg) => {
  res.render(dirViews + formToRender, {
    contactSession: req.session.contact,
    userSession: req.session.user,
    contact: contact,
    successMsg: successMsg
  });
}

//POST

/**
** used
**/
async function updateContact(req, res) {
  try {
      if (! req.session.contact) {
        commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
        return;
      }

      let resContact = await Contact.findByIdAndUpdate(req.session.contact._id, {
          cellPhoneNumber: req.body.cellPhoneToSearch,
          name: req.body.contactFirstName,
          lastName: req.body.contactLastName,
          typeId: req.body.contactTypeId,
          contactId: req.body.contactNumberID}, {new: true, upsert: true});

      if (resContact) {
        let userPassword = req.body.userPassword;
        if (typeof userPassword !== 'undefined' && userPassword) {
          let user = await userUtils.getInstanceOfUser(req, resContact._id);
          let resUser = await user.save();
          resContact = await Contact.findByIdAndUpdate(resContact._id, {_userId: resUser}, {new: true});
        }
      }

      req.session.contact = resContact;
      handlerSuccess(req, res, 'formContact', resContact, 'Contacto con ID ' + resContact.cellPhoneNumber + ' actualizado exitósamente!');
  } catch (e) {
      commonUtils.handlerError(req, e, res, 'formContact');
  }
}

/******************************************************************************/

//GETS
//used contact-route.get('/formNewContact', (req, res)
const getNewContactForm = (req, res) => {
  if (! req.session.contact || ! req.session.user) {
    commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
    return;
  }
  handlerSuccess(req, res, 'formContact', null, null);
}

const getEditContactForm = (req, res) => {
  if (! req.session.contact) {
    commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
    return;
  }
  handlerSuccess(req, res, 'formContact', req.session.contact, null);
}

//used
async function getSearchContactForm(req, res) {
  if (! req.session.contact || ! req.session.user) {
    commonUtils.handlerError(req, 'Permiso denegado', res, 'index');
    return;
  }
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
