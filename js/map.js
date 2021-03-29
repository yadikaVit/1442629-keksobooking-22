'use strict';

export {mapInitialize, disableForm, resetCoordinates};
import {renderOffer} from './popup.js';
import {getServerOffers} from './server.js';
import {showAlert, setUserFormSubmit} from './form.js';
import {filterOffer, setupFilters} from './filter.js';

const COORDINATE_MAIN_PIN_X = 35.68951;
const COORDINATE_MAIN_PIN_Y = 139.69171;
const OFFERS_COUNT = 10;
const RERENDER_DELAY = 500;
const NUMBER_AFTER_COMMA = 5;

/* global L:readonly */
/* global _:readonly */

const disableElements = function (arrayElements) {
  arrayElements.forEach(function (arrayElement) {
    arrayElement.setAttribute('disabled', 'disabled');
  });
};

const activateElements = function (arrayElements) {
  arrayElements.forEach(function (arrayElement) {
    arrayElement.removeAttribute('disabled', 'disabled');
  });
}

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const mapFilterForm = document.querySelector('.map__filters');
const mapFilterItems = mapFilterForm.querySelectorAll('.map__filter, .map__features');
const map = L.map('map-canvas')
let cachedOffers = [];

const disableForm = function () {
  adForm.classList.add('ad-form--disabled');
  disableElements(adFormElements);
  mapFilterForm.classList.add('map__filters--disabled');
  disableElements(mapFilterItems);
};

const pinLocation = document.querySelector('#address');
const mapInitialize = function () {
  pinLocation.readOnly = true;

  map.on('load', function () {
    adForm.classList.remove('ad-form--disabled');
    activateElements(adFormElements);
    mapFilterForm.classList.remove('map__filters--disabled');
    activateElements(mapFilterItems);
    fillInAddressCoordinatesPin(mainPinMarker);
    getServerOffers(cacheOffers, showAlert);
    setUserFormSubmit();
  })
    .setView({
      lat: COORDINATE_MAIN_PIN_X,
      lng: COORDINATE_MAIN_PIN_Y,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: COORDINATE_MAIN_PIN_X,
    lng: COORDINATE_MAIN_PIN_Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

const fillInAddressCoordinatesPin = function (pin) {
  pinLocation.value = pin.getLatLng().lat.toFixed(NUMBER_AFTER_COMMA) + ', ' + pin.getLatLng().lng.toFixed(NUMBER_AFTER_COMMA);
};

mainPinMarker.on('moveend', function (evt) {
  fillInAddressCoordinatesPin(evt.target)
});


const resetCoordinates = function () {
  mainPinMarker.setLatLng([COORDINATE_MAIN_PIN_X, COORDINATE_MAIN_PIN_Y]);
  pinLocation.value = COORDINATE_MAIN_PIN_X + ', ' + COORDINATE_MAIN_PIN_Y;
};

const markers = new L.LayerGroup().addTo(map);
const clearMarkers = function () {
  markers.clearLayers();
};

const cacheOffers = function(offers) {
  cachedOffers = offers;
  renderOffersOnMap();
  setupFilters(reloadMarkers);
}

const reloadMarkers = _.debounce(function() {
  clearMarkers();
  renderOffersOnMap();
}, RERENDER_DELAY);

const renderOffersOnMap = function() {
  const sliceOffers = [...cachedOffers];
  const filterOffers = sliceOffers
    .filter(filterOffer)
    .slice(0, OFFERS_COUNT);

  filterOffers.forEach(function(item) {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markers)
      .bindPopup(
        renderOffer(item),
        {
          keepInView: true,
        },
      );
  });
}

