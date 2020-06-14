const canShowPartnerForm = (req) => {
  let user = req.session.user;
  if (! user) return false;
  return user.rol == 'admin' ? true : false;
}

module.exports = {
  canShowPartnerForm
}
