const disableElements = function (arrayElements) {
  arrayElements.forEach(function (arrayElement) {
    arrayElement.setAttribute("disabled", "disabled");
  });
};

const activateElements = function (arrayElements) {
  arrayElements.forEach(function (arrayElement) {
    arrayElement.removeAttribute("disabled", "disabled");
  });
}

const adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');

const adFormElements = adForm.querySelectorAll('fieldset');
const disableAdFormElements = disableElements(adFormElements);


const mapFilterForm = document.querySelector('.map__filters');
mapFilterForm.classList.add('map__filters--disabled');

const mapFilterItems = mapFilterForm.querySelectorAll('.map__filter, .map__features');

const disableMapFilterElements = disableElements(mapFilterItems);

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована');
    adForm.classList.remove('ad-form--disabled');
    activateElements(adFormElements);
    mapFilterForm.classList.remove('map__filters--disabled');
    activateElements(mapFilterItems);

  })
  .setView({
    lat: 35.6895000,
    lng: 139.6917100,
  }, 10);

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

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});
