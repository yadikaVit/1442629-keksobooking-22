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
  filterHousingType.addEventListener('change', () => {
    onChangeFilter()
  })

  filterHousingRooms.addEventListener('change', () => {
    onChangeFilter()
  })

  filterHousingGuests.addEventListener('change', () => {
    onChangeFilter()
  })

  filterHousingPrice.addEventListener('change', () => {
    onChangeFilter()
  })

  filterHousingFeatures.addEventListener('click', () => {
    onChangeFilter()
  })
};

const offerFilter = function(offer) {
  const filteredByHouseType = typeFilter(offer);
  const filteredByPrice = priceFilter(offer);
  const filteredByRoom = roomFilter(offer);
  const filteredByGuest = guestFilter(offer);
  const filteredByFeature = featuresFilter(offer);
  return filteredByHouseType && filteredByPrice && filteredByRoom && filteredByGuest && filteredByFeature;
};

const typeFilter = function(offer) {
  return filterHousingType.value === offer.offer.type || filterHousingType.value === 'any';
};

const priceFilter = (offer) => {
  switch (filterHousingPrice.value) {
    case 'low':
      return offer.offer.price < LOW_PRICE;
    case 'middle':
      return offer.offer.price >= LOW_PRICE && offer.offer.price < HIGH_PRICE;
    case 'high':
      return offer.offer.price >= HIGH_PRICE;
    default:
      return filterHousingPrice.value === 'any';
  }
};

const roomFilter = function(offer) {
  return Number(filterHousingRooms.value) === offer.offer.rooms || filterHousingRooms.value === 'any';
};

const guestFilter = function(offer) {
  return Number(filterHousingGuests.value) === offer.offer.guests || filterHousingGuests.value === 'any';
};

function featuresFilter(offers) {
  const selectedFeatures = [];
  const featuresInput = filterHousingFeatures.querySelectorAll('[name="features"]')

  featuresInput.forEach(feature => {

    if (feature.checked) {
      selectedFeatures.push(feature.value)
    }
  });

  if (selectedFeatures.length === 0) {
    return true;
  }

  const reducer = (accumulator, feature) => accumulator && offers.offer.features.includes(feature);
  return selectedFeatures.reduce(reducer, true);
}
