export {setupForm};

const setupMinPrice = function (evt) {

  const addMinPrice = function (price) {
    const priceInput = document.querySelector('#price');
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
