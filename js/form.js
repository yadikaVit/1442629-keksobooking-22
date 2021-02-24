const addMinPrice = function (price) {
  const priceInput = document.querySelector('#price');
  priceInput.placeholder = price.toString();
  priceInput.setAttribute('min', price);
}

const typeSelect = document.querySelector('#type');
typeSelect.addEventListener('change', function() {

  if (typeSelect.value === 'bungalow') {
    addMinPrice(0);
  } else if (typeSelect.value === 'flat') {
    addMinPrice(1000);
  } else if (typeSelect.value === 'house') {
    addMinPrice(5000);
  } else if (typeSelect.value === 'palace') {
    addMinPrice(10000);
  }
});


