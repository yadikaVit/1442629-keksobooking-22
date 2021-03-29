'use strict';

export {filterOffer, setupFilters};
const HIGH_PRICE = 50000;
const LOW_PRICE = 10000;

const filterHousingType = document.querySelector('#housing-type');
const filterHousingPrice = document.querySelector('#housing-price');
const filterHousingRooms = document.querySelector('#housing-rooms');
const filterHousingGuests = document.querySelector('#housing-guests');
const filterHousingFeatures = document.querySelector('#housing-features');

const setupFilters = function(onChangeFilter) {
  filterHousingType.addEventListener('change', function() {
    onChangeFilter()
  })

  filterHousingRooms.addEventListener('change', function() {
    onChangeFilter()
  })

  filterHousingGuests.addEventListener('change', function() {
    onChangeFilter()
  })

  filterHousingPrice.addEventListener('change', function() {
    onChangeFilter()
  })

  filterHousingFeatures.addEventListener('click', function() {
    onChangeFilter()
  })
};

const filterOffer = function (offer) {
  const filteredByHouseType = filterByType(offer);
  const filteredByOfferPrice = filterByPrice(offer);
  const filteredByHouseRoom = filterByRoom(offer);
  const filteredByOfferGuest = filterByGuest(offer);
  const filteredByOfferFeature = filterByFeatures(offer);
  return filteredByHouseType && filteredByOfferPrice && filteredByHouseRoom && filteredByOfferGuest && filteredByOfferFeature;
};

const filterByType = function (offer) {
  return filterHousingType.value === offer.offer.type || filterHousingType.value === 'any';
};

const filterByPrice = function (offer) {
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

const filterByRoom = function(offer) {
  return Number(filterHousingRooms.value) === offer.offer.rooms || filterHousingRooms.value === 'any';
};

const filterByGuest = function(offer) {
  return Number(filterHousingGuests.value) === offer.offer.guests || filterHousingGuests.value === 'any';
};

function filterByFeatures (offers) {
  const selectedFeatures = [];
  const featuresInput = filterHousingFeatures.querySelectorAll('[name="features"]')

  featuresInput.forEach(function (feature) {

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
