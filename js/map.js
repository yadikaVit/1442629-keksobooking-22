export {renderOfferOnMap, mapInitialize, disableForm};
import {renderOffer} from './popup.js';

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
/* global L:readonly */
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const mapFilterForm = document.querySelector('.map__filters');
const mapFilterItems = mapFilterForm.querySelectorAll('.map__filter, .map__features');
const map = L.map('map-canvas')

const disableForm = function () {
  adForm.classList.add('ad-form--disabled');
  disableElements(adFormElements);
  mapFilterForm.classList.add('map__filters--disabled');
  disableElements(mapFilterItems);
};



const mapInitialize = function () {
  const pinLocation = document.querySelector('#address');
  pinLocation.readOnly = true;

  map.on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    activateElements(adFormElements);
    mapFilterForm.classList.remove('map__filters--disabled');
    activateElements(mapFilterItems);
  })
    .setView({
      lat: 35.6895000,
      lng: 139.6917100,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.6895000,
      lng: 139.6917100,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  pinLocation.value = mainPinMarker.getLatLng().lat.toFixed(5) + ', ' + mainPinMarker.getLatLng().lng.toFixed(5);
  mainPinMarker.addTo(map);


  mainPinMarker.on('moveend', (evt) => {
    pinLocation.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5);
  });
};

const renderOfferOnMap = function(array) {
  array.forEach((item) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: item.location.x,
        lng: item.location.y,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        renderOffer(item),
        {
          keepInView: true,
        },
      );
  });
}
