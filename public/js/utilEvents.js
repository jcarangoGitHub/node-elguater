function wayToPaymentCheck(radio) {
  switch (radio) {
    //radio: 1 Transfer; 2 Cash
    case '1':
      if (document.getElementById('radioTransfer').checked) {
        document.getElementById('transferFields').style.visibility = 'visible';
        document.getElementById('cashFields').style.visibility = 'hidden';
        document.getElementById('nequiFields').style.visibility = 'hidden';
      } else {
        document.getElementById('transferFields').style.visibility = 'hidden';
      }
      break;
    case '2':
      if (document.getElementById('radioNequi').checked) {
        document.getElementById('nequiFields').style.visibility = 'visible';
        document.getElementById('transferFields').style.visibility = 'hidden';
        document.getElementById('cashFields').style.visibility = 'hidden';
      } else {
        document.getElementById('nequiFields').style.visibility = 'hidden';
      }

      break;

    case '3':
      if (document.getElementById('radioCash').checked) {
        document.getElementById('cashFields').style.visibility = 'visible';
        document.getElementById('transferFields').style.visibility = 'hidden';
        document.getElementById('nequiFields').style.visibility = 'hidden';
      } else {
        document.getElementById('cashFields').style.visibility = 'hidden';
      }
    default:

  }
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
