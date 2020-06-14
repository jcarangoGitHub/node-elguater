const contactSessionCreated = (req) => {
  let contact = req.session.contact;
  return contact ? true : false;
}

module.exports = {
  contactSessionCreated
}
