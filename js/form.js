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


const validityForm = function () {
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
}

const dependenceRoomGuest = function (evt) {
  const guestsNumber = document.querySelector('#capacity');
  const guestNumberOne = guestsNumber.querySelector('option[value=\'1\']');
  const guestNumberTwo = guestsNumber.querySelector('option[value=\'2\']');
  const guestNumberThree = guestsNumber.querySelector('option[value=\'3\']');
  const guestNumberNull = guestsNumber.querySelector('option[value=\'0\']');

  guestNumberOne.setAttribute('disabled', 'disabled');
  guestNumberTwo.setAttribute('disabled', 'disabled');
  guestNumberThree.setAttribute('disabled', 'disabled');
  guestNumberNull.setAttribute('disabled', 'disabled');

  switch (evt.target.value) {
    case '2':
      guestNumberTwo.removeAttribute('disabled', 'disabled');
      guestNumberTwo.setAttribute('selected', 'selected');
      guestNumberOne.removeAttribute('disabled', 'disabled');
      break;

    case '3':
      guestNumberTwo.removeAttribute('disabled', 'disabled');
      guestNumberOne.removeAttribute('disabled', 'disabled');
      guestNumberThree.removeAttribute('disabled', 'disabled');
      guestNumberThree.setAttribute('selected', 'selected');
      break;

    case '100':
      guestNumberNull.removeAttribute('disabled', 'disabled');
      guestNumberNull.setAttribute('selected', 'selected');
      break;

    default:
      guestNumberOne.setAttribute('selected', 'selected');
      guestNumberOne.removeAttribute('disabled', 'disabled');
  }
}


const setupForm = function () {
  const timeInSelect = document.querySelector('#timein');
  const timeOutSelect = document.querySelector('#timeout');
  const typeSelect = document.querySelector('#type');
  const roomsNumber = document.querySelector('#room_number');

  document.addEventListener('DOMContentLoaded', function(evt) {
    setupMinPrice(evt);
    dependenceRoomGuest(evt);
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

  roomsNumber.addEventListener('change', function(evt) {
    dependenceRoomGuest(evt);
  });

  validityForm();
}
