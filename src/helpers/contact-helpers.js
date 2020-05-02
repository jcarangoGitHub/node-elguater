const hbs = require('hbs');

//used contactAdditionalInfo.hbs
hbs.registerHelper('getContactTypeIdSelected', (contact, option) => {
  let typeId = contact.typeId;
  if (typeId === option) {
    return 'selected';
  } else {
    return '';
  }
});

hbs.registerHelper('getUserRolSelected', (user, option) => {
  let rol = user.rol;
  if (rol === option) {
    return 'selected';
  } else {
    return '';
  }
});
