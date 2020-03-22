function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

function formatCellPhoneNumber(event, field) {
  var value = event.target.value;
  var newKey = event.key;
  if (value.length == 3 || value.length == 7) {
    value = value + '-';
    document.getElementById(field).value = value;
  }
}
