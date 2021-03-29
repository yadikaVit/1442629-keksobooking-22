'use strict';

export {setupForm, setUserFormSubmit, showAlert};
import {isEscEvent} from './util.js';
import {sendData} from './server.js';
import {resetCoordinates} from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const ALERT_SHOW_TIME = 5000;
const PRICE_BUNGALOW = 0;
const PRICE_FLAT = 1000;
const PRICE_HOUSE = 5000;
const PRICE_PALACE = 10000;
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');

const setupMinPrice = function () {

  const addMinPrice = function (price) {
    priceInput.placeholder = price.toString();
    priceInput.setAttribute('min', price);
  };

  switch (typeSelect.value) {
    case 'bungalow':
      addMinPrice(PRICE_BUNGALOW);
      break;
    case 'flat':
      addMinPrice(PRICE_FLAT);
      break;
    case 'house':
      addMinPrice(PRICE_HOUSE);
      break;
    case 'palace':
      addMinPrice(PRICE_PALACE);
      break;
    default:
      addMinPrice(PRICE_FLAT);
      break;
  }
};


const validityForm = function () {
  const offerTitle = document.querySelector('#title');

  offerTitle.addEventListener('input', function() {
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

  priceInput.addEventListener('input', function() {
    const valuePrice = priceInput.value;
    if (valuePrice > MAX_PRICE) {
      priceInput.setCustomValidity('Цена не должна превышать' + MAX_PRICE);
    } else {
      priceInput.setCustomValidity('');
    }

    priceInput.reportValidity();
  });
}

const roomsNumber = document.querySelector('#room_number');

const syncRoomGuest = function () {
  const guestsNumber = document.querySelector('#capacity');
  const guestNumberOne = guestsNumber.querySelector('option[value=\'1\']');
  const guestNumberTwo = guestsNumber.querySelector('option[value=\'2\']');
  const guestNumberThree = guestsNumber.querySelector('option[value=\'3\']');
  const guestNumberNull = guestsNumber.querySelector('option[value=\'0\']');

  guestNumberOne.disabled = true;
  guestNumberTwo.disabled = true;
  guestNumberThree.disabled = true;
  guestNumberNull.disabled = true;

  switch (roomsNumber.value) {
    case '2':
      guestNumberTwo.disabled = false;
      guestNumberTwo.selected = true;
      guestNumberOne.disabled = false;
      break;

    case '3':
      guestNumberTwo.disabled = false;
      guestNumberOne.disabled = false;
      guestNumberThree.disabled = false;
      guestNumberThree.selected = true;
      break;

    case '100':
      guestNumberNull.disabled = false;
      guestNumberNull.selected = true;
      break;

    default:
      guestNumberOne.selected = true;
      guestNumberOne.disabled = false;
  }
}

const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');

const syncTimeInTimeOut = function () {
  timeInSelect.value = timeOutSelect.value;
}

const syncTimeOutTimeIn = function () {
  timeOutSelect.value = timeInSelect.value;
}

const setupForm = function () {

  document.addEventListener('DOMContentLoaded', function() {
    setupMinPrice();
  });

  typeSelect.addEventListener('change', function() {
    setupMinPrice();
  });

  timeInSelect.addEventListener('change', function() {
    syncTimeOutTimeIn();
  });

  timeOutSelect.addEventListener('change', function() {
    syncTimeInTimeOut();
  });

  roomsNumber.addEventListener('change', function() {
    syncRoomGuest();
  });

  document.addEventListener('DOMContentLoaded', function() {
    syncRoomGuest();
  });

  validityForm();
  clickResetButton();
  setupMinPrice();
}

const clickResetButton = function () {
  const resetButton = adForm.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    adForm.reset();
    setupMinPrice();
    syncRoomGuest();
    resetCoordinates();
  });
}

const showAlert = function (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '30px';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'orange';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(function() {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const adForm = document.querySelector('.ad-form');

const setUserFormSubmit = function() {
  adForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    sendData(
      () => onSuccessPostForm(),
      () => showErrorMessage(),
      formData,
    );
  });
};

const onSuccessPostForm = function () {
  showSuccessMessage();
  adForm.reset();
  syncRoomGuest();
  setupForm();
  resetCoordinates();
};

const main = document.querySelector('.main');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showSuccessMessage = function () {
  const newMainSuccessElement = successTemplate.cloneNode(true);
  main.appendChild(newMainSuccessElement);


  const onDocumentEscKeydown = function (evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      newMainSuccessElement.remove();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  const onDocumentClick = function () {
    newMainSuccessElement.remove();
    document.removeEventListener('click', onDocumentClick);
  };

  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showErrorMessage = function () {
  const newMainErrorElement = errorTemplate.cloneNode(true);
  main.appendChild(newMainErrorElement);

  const onDocumentEscKeydown = function (evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      newMainErrorElement.remove();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }
  };

  const onDocumentClick = function () {
    newMainErrorElement.remove();
    document.removeEventListener('click', onDocumentClick);
  };

  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);
};
