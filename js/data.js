import {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, getRandomArrayLength, removeDuplicates} from './util.js';
export {getArrayOffersNearby};

const TITLES = ['Выгодное предложение', 'Семейный отель', 'Лучший вид', 'Самый высокий рейтинг'];
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKS = ['12:00', '13:00', '14:00'];
const DESCRIPTIONS = ['Уютная комната', 'Из номера прекрасный вид на горы', 'Рядом есть детская площадка', 'Просторная кухня']
const PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFERS_COUNT = 10;


//author

const getArrayAvatars = (amount) => {
  const avatars = [];

  for (let i = 1; i <= amount; i++)  {
    avatars[i] = 'img/avatars/user0'+ (i) +'.png';
  }
  return avatars;
};


// offer

const getArrayOffers = () => {

  const photosArrayNewWithDuplicates = getRandomArrayLength (PHOTOS_ARRAY, 1, 5);
  const featuresArrayWithDuplicates = getRandomArrayLength (FEATURES_ARRAY, 1, 7);
  const coordinates = {
    x: getRandomFloatInclusive(35.65000, 35.70000, 5),
    y: getRandomFloatInclusive(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: getRandomArrayElement(getArrayAvatars(8)),
    },
    offer : {
      title: getRandomArrayElement(TITLES),
      address: Object.values(coordinates).join(', '),
      price: getRandomIntInclusive(1000, 2000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntInclusive(1, 4),
      guests: getRandomIntInclusive(1, 8),
      checkin: getRandomArrayElement(CHECKS),
      checkout: getRandomArrayElement(CHECKS),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos:removeDuplicates (photosArrayNewWithDuplicates),
      features: removeDuplicates (featuresArrayWithDuplicates),
    },
    location: coordinates,
  }

};

const getArrayOffersNearby = () => new Array(OFFERS_COUNT).fill(null).map(() => getArrayOffers());

