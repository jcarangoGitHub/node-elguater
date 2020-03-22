function updateFieldWithValue(field, value) {
  document.getElementById(field).value = value;
}

function enableFields(event) {
  document.getElementById("contactFirstName").readOnly = false;
  document.getElementById("contactTipeId_div").style.visibility = 'visible';
}
