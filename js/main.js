const getRandomFloatInclusive = (min, max, n) => {
  if (min < 0 || max < 0 || min > max) {
    return NaN;
  }
  const total = Math.random() * (max - min) + min;
  return total.toFixed(n);
}

const getRandomIntInclusive = (min, max) => {

  return getRandomFloatInclusive(Math.ceil(min), Math.floor(max), 0)
}

//author
const avatars = [];

const getArrayAvatars = (amount) => {

  for (let i = 1; i <= amount; i++)  {
    avatars[i] = 'img/avatars/user0'+ (i) +'.png';
  }
  return avatars;
};

let avatarsArray = getArrayAvatars(8);

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

// offer

const titles = ['Выгодное предложение', 'Семейный отель', 'Лучший вид', 'Самый высокий рейтинг'];
const types = ['palace', 'flat', 'house', 'bungalow'];
const checks = ['12:00', '13:00', '14:00'];
const descriptions = ['Уютная комната', 'Из номера прекрасный вид на горы', 'Рядом есть детская площадка', 'Просторная кухня']
const photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


const getRandomArrayLength = (firstArray, newArray, min, max) => {
  const n = getRandomIntInclusive (min, max);
  for (let i = 0; i <= n - 1; i++) {
    newArray[i] = getRandomArrayElement(firstArray);
  }
  return newArray;
}

const photosArrayNew = [];

const featuresArrayNew = [];
const featuresArrayWithDuplicates = getRandomArrayLength (featuresArray, featuresArrayNew, 1, 7);


const removeDuplicates = (ArrayWithDuplicates) => {
  let result = [];

  for (let item of ArrayWithDuplicates) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
};

const OFFERS_COUNT = 10;

const getArrayOffers = () => {
  return {
    author: {
      avatar: getRandomArrayElement(avatarsArray),
    },
    locationСoordinates : {
      x: Number(getRandomFloatInclusive (35.65000, 35.70000, 5)),
      y: Number(getRandomFloatInclusive (139.70000, 139.80000, 5)),
    },
    offer : {
      title: getRandomArrayElement(titles),
      address: 'location.' + getRandomIntInclusive(1, 20)  + ', ' +  'location.' + getRandomIntInclusive(1, 20),
      price: Number(getRandomIntInclusive(1000, 2000)),
      type: getRandomArrayElement(types),
      rooms: Number(getRandomIntInclusive(1, 4)),
      guests: Number(getRandomIntInclusive(1, 8)),
      checkin: getRandomArrayElement(checks),
      checkout: getRandomArrayElement(checks),
      description: getRandomArrayElement(descriptions),
      photos: getRandomArrayLength (photosArray, photosArrayNew, 1, 5),
      features: removeDuplicates (featuresArrayWithDuplicates),
    },
  }
};

const getArrayOffersNearby = new Array(OFFERS_COUNT).fill(null).map(() => getArrayOffers());
Number(getArrayOffersNearby);
