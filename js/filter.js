export {typeFilter, setupFilter};

const filterHousingType = document.querySelector('#housing-type');

let filter = 'any';

const setupFilter = function(onChangeFilter) {
  filterHousingType.addEventListener('change', (evt) => {
    filter = evt.target.value;
    onChangeFilter()
  });
}

const typeFilter = function(oldOffer) {
  return filter === oldOffer.offer.type || filter === 'any';
};

