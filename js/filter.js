'use strict';

export {offerFilter, setupFilters};
const HIGH_PRICE = 50000;
const LOW_PRICE = 10000;

const filterHousingType = document.querySelector('#housing-type');
const filterHousingPrice = document.querySelector('#housing-price');
const filterHousingRooms = document.querySelector('#housing-rooms');
const filterHousingGuests = document.querySelector('#housing-guests');
const filterHousingFeatures = document.querySelector('#housing-features');

const setupFilters = function(onChangeFilter) {
  filterHousingType.addEventListener('change', (evt) => {
    filterHousingType.value = evt.target.value;
    onChangeFilter()
  })

  filterHousingRooms.addEventListener('change', (evt) => {
    filterHousingRooms.value = evt.target.value;
    onChangeFilter()
  })

  filterHousingGuests.addEventListener('change', (evt) => {
    filterHousingGuests.value = evt.target.value;
    onChangeFilter()
  })

  filterHousingPrice.addEventListener('change', (evt) => {
    filterHousingPrice.value = evt.target.value;
    onChangeFilter()
  })

  filterHousingFeatures.addEventListener('click', () => {
    onChangeFilter()
  })
};

const offerFilter = function(allOffer) {
  const filteredByHouseType = typeFilter(allOffer);
  const filteredByPrice = priceFilter(allOffer);
  const filteredByRoom = roomFilter(allOffer);
  const filteredByGuest = guestFilter(allOffer);
  const filteredByfeature = featuresFilter(allOffer);
  return filteredByHouseType && filteredByPrice && filteredByRoom && filteredByGuest && filteredByfeature;
};

const typeFilter = function(allOffer) {
  return filterHousingType.value === allOffer.offer.type || filterHousingType.value === 'any';
};

const priceFilter = (allOffer) => {
  switch (filterHousingPrice.value) {
    case 'low':
      return allOffer.offer.price < LOW_PRICE;
    case 'middle':
      return allOffer.offer.price >= LOW_PRICE && allOffer.offer.price < HIGH_PRICE;
    case 'high':
      return allOffer.offer.price >= HIGH_PRICE;
    default:
      return filterHousingPrice.value === 'any';
  }
};

const roomFilter = function(allOffer) {
  return Number(filterHousingRooms.value) === allOffer.offer.rooms || filterHousingRooms.value === 'any';
};

const guestFilter = function(allOffer) {
  return Number(filterHousingGuests.value) === allOffer.offer.guests || filterHousingGuests.value === 'any';
};

function featuresFilter(allOffers) {
  let selectedFeatures = [];
  const featuresInput = filterHousingFeatures.querySelectorAll('[name="features"]')

  featuresInput.forEach(feature => {

    if (feature.checked) {
      selectedFeatures.push(feature.value)
    }
  });

  if (selectedFeatures.length == 0) {
    return true;
  }

  const reducer = (accumulator, feature) => accumulator && allOffers.offer.features.includes(feature);
  const featureReduce = selectedFeatures.reduce(reducer, true);
  return featureReduce;
}
