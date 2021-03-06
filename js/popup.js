'use strict';

export {renderOffer};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const translateType = function (type) {
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

const createPhotosFragment = function (photos) {
  const popupPhoto = cardTemplate.querySelector('.popup__photo');
  const photosFragment = document.createDocumentFragment();

  photos.forEach(function (way) {
    const popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = way;
    photosFragment.appendChild(popupPhotoItem);
  });

  return photosFragment;
};



const getOfferFeatures = function (features, featureList) {

  let featureClass = '';

  if (features.length === 0) {
    featureList.style.display = 'none';
    return featureClass;
  }

  features.forEach(function(feature) {
    switch (feature) {
      case 'wifi':
        featureClass += '<li class="popup__feature popup__feature--wifi"></li>';
        break;
      case 'dishwasher':
        featureClass += '<li class="popup__feature popup__feature--dishwasher"></li>';
        break;
      case 'parking':
        featureClass += '<li class="popup__feature popup__feature--parking"></li>';
        break;
      case 'washer':
        featureClass += '<li class="popup__feature popup__feature--washer"></li>';
        break;
      case 'elevator':
        featureClass += '<li class="popup__feature popup__feature--elevator"></li>';
        break;
      case 'conditioner':
        featureClass += '<li class="popup__feature popup__feature--conditioner"></li>';
        break;
    }
  });
  return featureClass;
};



const renderOffer = function ({offer, author}) {
  const offersElement = cardTemplate.cloneNode(true);
  offersElement.querySelector('.popup__title').textContent = offer.title;
  offersElement.querySelector('.popup__text--address').textContent = offer.address;
  offersElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  offersElement.querySelector('.popup__type').textContent = translateType(offer.type);
  offersElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  offersElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  offersElement.querySelector('.popup__features').innerHTML = getOfferFeatures(offer.features, offersElement.querySelector('.popup__features'));
  offersElement.querySelector('.popup__description').textContent = offer.description;
  offersElement.querySelector('.popup__photos').removeChild(offersElement.querySelector('.popup__photo'));
  offersElement.querySelector('.popup__photos').appendChild(createPhotosFragment(offer.photos));
  offersElement.querySelector('.popup__avatar').src = author.avatar;

  return offersElement
}
