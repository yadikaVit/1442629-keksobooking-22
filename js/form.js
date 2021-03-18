export {setupForm};

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const priceInput = document.querySelector('#price');

const setupMinPrice = function (evt) {

  const addMinPrice = function (price) {
    priceInput.placeholder = price.toString();
    priceInput.setAttribute('min', price);
  };

  switch (evt.target.value) {
    case 'bungalow':
      addMinPrice(0);
      break;
    case 'flat':
      addMinPrice(1000);
      break;
    case 'house':
      addMinPrice(5000);
      break;
    case 'palace':
      addMinPrice(10000);
      break;
    default:
      addMinPrice(1000);
      break;
  }
};


const setupForm = function () {
  const timeInSelect = document.querySelector('#timein');
  const timeOutSelect = document.querySelector('#timeout');
  const typeSelect = document.querySelector('#type');

  document.addEventListener('DOMContentLoaded', function(evt) {
    setupMinPrice(evt);
  });

  typeSelect.addEventListener('change', function(evt) {
    setupMinPrice(evt);
  });

  timeInSelect.addEventListener('change', function(evt) {
    timeOutSelect.value = evt.target.value;
  });

  timeOutSelect.addEventListener('change', function(evt) {
    timeInSelect.value = evt.target.value;
  });

}


const offerTitle = document.querySelector('#title');

offerTitle.addEventListener('input', () => {
  const valueLength = offerTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    offerTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    offerTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
  } else {
    offerTitle.setCustomValidity('');
  }

  offerTitle.reportValidity();
});

priceInput.addEventListener('input', () => {
  const valuePrice = priceInput.value;
  if (valuePrice > MAX_PRICE) {
    priceInput.setCustomValidity('Цена не должна превышать' + MAX_PRICE);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});


const dependenceRoomGuest = function () {
  const guestsNumber = document.querySelector('#capacity');
  const roomsNumber = document.querySelector('#room_number');
  roomsNumber.addEventListener('change', function(evt) {

    const guestNumberOne = guestsNumber.querySelector('option[value=\'1\']');
    const guestNumberTwo = guestsNumber.querySelector('option[value=\'2\']');
    const guestNumberThree = guestsNumber.querySelector('option[value=\'3\']');
    const guestNumberNull = guestsNumber.querySelector('option[value=\'0\']');


    if (evt.value = 1) {
      guestNumberOne.setAttribute("selected", "selected");
      guestNumberTwo.setAttribute("disabled", "disabled");
      guestNumberThree.setAttribute("disabled", "disabled");
      guestNumberNull.setAttribute("disabled", "disabled");

    } else if (evt.value = 2) {
      guestNumberTwo.setAttribute("selected", "selected");
      guestNumberThree.setAttribute("disabled", "disabled");
      guestNumberNull.setAttribute("disabled", "disabled");

    } else if (evt.value = 3) {
      guestNumberThree.setAttribute("selected", "selected");
      guestNumberNull.setAttribute("disabled", "disabled");

    } else  {
      guestNumberOne.setAttribute("disabled", "disabled");
      guestNumberTwo.setAttribute("disabled", "disabled");
      guestNumberThree.setAttribute("disabled", "disabled");
      guestNumberNull.setAttribute("selected", "selected");
    }

});
}

dependenceRoomGuest();
