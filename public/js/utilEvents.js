function onchangeSelectAccount(value) {
  console.log(value);
  var id = 'details.' + value
  var allDetails = document.getElementsByClassName("detailsAccount");
  for (i = 0; i < allDetails.length; i++) {
    allDetails[i].style.display = "none";
  }

  var elemDetails = document.getElementById(id);
  if (elemDetails) {
    elemDetails.style.display = "";
  }
}

function copyText(id) {
  var copyText = document.getElementById("accountNumber."+id);
  console.log(copyText);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

function wayToDeliveryCheck(radio) {
  //radio: 1 Delivery; 2 On site
  switch (radio) {
    case '1':
      if (document.getElementById('radioDelivery').checked) {
            document.getElementById('deliveryFields').style.visibility = 'visible';
            document.getElementById('onSiteFields').style.visibility = 'hidden';

      } else {
          document.getElementById('deliveryFields').style.visibility = 'hidden';
      }
      break;

    case '2':
      if (document.getElementById('radioOnSite').checked) {
            document.getElementById('onSiteFields').style.visibility = 'visible';
            document.getElementById('deliveryFields').style.visibility = 'hidden';

      } else {
          document.getElementById('onSiteFields').style.visibility = 'hidden';
      }
      break;


    default:

  }
}

function addOneButton(element) {
    var txtNumber = document.getElementById(element);
    var newNumber = parseInt(txtNumber.value) + 1;
    if (newNumber < 1) {
      return;
    }
    txtNumber.value = newNumber;
}

function substractOneButton(element) {
    var txtNumber = document.getElementById(element);
    var newNumber = parseInt(txtNumber.value) - 1;
    if (newNumber < 1) {
      return;
    }
    txtNumber.value = newNumber;
}


function formatMilesSeparetor(input) {
  var num = input.value.replace(/\,/g,'');
  if (!isNaN(num)) {
    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1,');
    num = num.split('').reverse().join('').replace(/^[\.]/,'');
    input.value = num;
  } else {
    alert('Solo se permiten números');
    input.value = input.value.replace(/[^\d\.]*/g,'');
  }
}

function updateImage(input, fieldImage) {
  console.log(input.files);
  console.log(input.files[0]);
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          $(fieldImage)
              .attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
  }
}

function clearField(fieldId) {
  document.getElementById(fieldId).value = "";
}

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

function onkeypressCellPhoneField(event, field) {
  if (isNumberKey(event)) {
    formatCellPhoneNumber(event, field);
    return true;
  } else {
    return false;
  }
}
