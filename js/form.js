const addMinPrice = function (price) {
  const priceInput = document.querySelector('#price');
  priceInput.placeholder = price.toString();
  priceInput.setAttribute('min', price);
};

const typeSelect = document.querySelector('#type');
typeSelect.addEventListener('change', function(evt) {
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
    default:
      addMinPrice(10000);
      break;
  }
});

const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');

timeInSelect.addEventListener('change', function(evt) {
  timeOutSelect.value = evt.target.value;
});

timeOutSelect.addEventListener('change', function(evt) {
  timeInSelect.value = evt.target.value;
});
