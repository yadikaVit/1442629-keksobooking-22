import {getArrayOffersNearby} from './data.js';

const offersElementList = document.querySelector('.map');

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarOffers = getArrayOffersNearby();
const offerListFragment = document.createDocumentFragment();

function translateType(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return type;
  }
}


// Контейнер для карточек
const PhotoList = cardTemplate.querySelector('.popup__photos');

const element = PhotoList.children;


const createPhotosFragment = function (offer) {
  const photosFragment = document.createDocumentFragment();
  for (let i = 1; i <= offer.photos.length; i++) {
    const clonedElement = element.cloneNode(true);
    clonedElement.src = offer[i];
    PhotoList.appendChild(clonedElement);
  }
  return photosFragment;
};




similarOffers.forEach(({offer, author}) => {
  const offersElement = cardTemplate.cloneNode(true);
  offersElement.querySelector('.popup__title').textContent = offer.title;
  offersElement.querySelector('.popup__text--address').textContent = offer.address;
  offersElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  offersElement.querySelector('.popup__type').textContent = translateType(offer.type);
  offersElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  offersElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  offersElement.querySelector('.popup__features').textContent = offer.features;
  offersElement.querySelector('.popup__description').textContent = offer.description;
  offersElement.querySelector('.popup__photos').appendChild(createPhotosFragment(offer.photos));
  offersElement.querySelector('.popup__avatar').src = author.avatar;
  offerListFragment.appendChild(offersElement);
});

offersElementList.appendChild(offerListFragment);
