import {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, getRandomArrayLength, removeDuplicates} from './util.js';

//author
const avatars = [];

const getArrayAvatars = (amount) => {

  for (let i = 1; i <= amount; i++)  {
    avatars[i] = 'img/avatars/user0'+ (i) +'.png';
  }
  return avatars;
};

let avatarsArray = getArrayAvatars(8);


// offer

const titles = ['Выгодное предложение', 'Семейный отель', 'Лучший вид', 'Самый высокий рейтинг'];
const types = ['palace', 'flat', 'house', 'bungalow'];
const checks = ['12:00', '13:00', '14:00'];
const descriptions = ['Уютная комната', 'Из номера прекрасный вид на горы', 'Рядом есть детская площадка', 'Просторная кухня']
const photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const photosArrayNew = [];
const photosArrayNewWithDuplicates = getRandomArrayLength (photosArray, photosArrayNew, 1, 5);
const featuresArrayNew = [];
const featuresArrayWithDuplicates = getRandomArrayLength (featuresArray, featuresArrayNew, 1, 7);
const OFFERS_COUNT = 10;

const getArrayOffers = () => {
  return {
    author: {
      avatar: getRandomArrayElement(avatarsArray),
    },
    location: {
      x: Number(getRandomFloatInclusive (35.65000, 35.70000, 5)),
      y: Number(getRandomFloatInclusive (139.70000, 139.80000, 5)),
    },
    offer : {
      title: getRandomArrayElement(titles),
      address: getRandomFloatInclusive (35.65000, 35.70000, 5) + ', ' + getRandomFloatInclusive (139.70000, 139.80000, 5),
      price: Number(getRandomIntInclusive(1000, 2000)),
      type: getRandomArrayElement(types),
      rooms: Number(getRandomIntInclusive(1, 4)),
      guests: Number(getRandomIntInclusive(1, 8)),
      checkin: getRandomArrayElement(checks),
      checkout: getRandomArrayElement(checks),
      description: getRandomArrayElement(descriptions),
      photos:removeDuplicates (photosArrayNewWithDuplicates),
      features: removeDuplicates (featuresArrayWithDuplicates),
    },
  }
};

const getArrayOffersNearby = new Array(OFFERS_COUNT).fill(null).map(() => getArrayOffers());
Number(getArrayOffersNearby);
