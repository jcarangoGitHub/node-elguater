//Model objects
const Contact = require('./../models/contact');
const User = require('./../models/user');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const contactUtils = require('./../utils/contact-utils');
const commonUtils = require('./../utils/common-utils');
const userUtils = require('./../utils/user-utils');


//PUT ?
//used index.app.post('/contact-put', (req, res)
async function updateContact(req, res) {
  try {
    let id = req.body._contactId;

    let result = await Contact.findByIdAndUpdate(id, {
                  name: req.body.contactFirstName,
                  lastName: req.body.contactLastName,
                  typeId: req.body.contactTypeId,
                  contactId: req.body.contactNumberID}, {new: true});

    res.render(dirViews + 'formSearchContact', {
      contact: result,
      successMsg: 'Contacto con ID ' + result.cellPhoneNumber + ' actualizado exitósamente!'
    });
  } catch(e) {
    commonUtils.handlerError(e, res, 'formSearchContact');
  }
}

//POST

/**
** used!
**/
async function createContact(req, res) {
  try {
      let contact = contactUtils.getInstanceOfContact(req);
      let resContact = await contact.save();
      if (req.body.userPassword) {
        let user = await userUtils.getInstanceOfUser(req, resContact._id);
        let resUser = await user.save();
      }
      res.render(dirViews + 'formSearchContact', {
        contact: resContact,
        successMsg: 'Contacto con ID ' + resContact.cellPhoneNumber + ' creado exitósamente!'
      });
  } catch (e) {
      commonUtils.handlerError(e, res, 'formContact');
  }
}


/******************************************************************************/

//GETS
//used index.app.get('/formNewContact', (req, res)
const getNewContactForm = (req, res) => {
  res.render(dirViews + 'formContact');
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

      res.render(dirViews + 'formSearchContact', {
        contact: contact
      });
    } else {
      res.render(dirViews + 'formSearchContact')
    }
  } catch (e) {
    commonUtils.handlerError(e, res, 'formSearchContact');
  }
}


/******************************************************************************/

module.exports = {
  updateContact,
  createContact,
  getNewContactForm,
  getSearchContactForm
}
