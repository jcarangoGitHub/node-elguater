//Model objects
const Contact = require('./../models/contact');
const User = require('./../models/user');

const path = require('path');

const dirViews = path.join(__dirname, '../../template/views/');

const contactUtils = require('./../utils/contact-utils');
const commonUtils = require('./../utils/common-utils');
const userUtils = require('./../utils/user-utils');



//POST

/**
** used!
**/
async function updateContact(req, res) {
  try {
      if (! req.session.contact) {
        commonUtils.handlerError('Permiso denegado', res, 'index');
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
      res.render(dirViews + 'formContact', {
        contact: resContact,
        successMsg: 'Contacto con ID ' + resContact.cellPhoneNumber + ' actualizado exitósamente!'
      });
  } catch (e) {
      commonUtils.handlerError(e, res, 'formContact');
  }
}


/******************************************************************************/

//GETS
//used index.app.get('/formNewContact', (req, res)
const getNewContactForm = (req, res) => {
  if (! req.session.contact) {
    commonUtils.handlerError('Permiso denegado', res, 'index');
    return;
  }

  res.render(dirViews + 'formContact', {
    contact: req.session.contact
  });


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
  getNewContactForm,
  getSearchContactForm
}
