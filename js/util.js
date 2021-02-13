export {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, getRandomArrayLength, removeDuplicates};

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

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

const getRandomArrayLength = (firstArray, newArray, min, max) => {
  const n = getRandomIntInclusive (min, max);
  for (let i = 0; i <= n - 1; i++) {
    newArray[i] = getRandomArrayElement(firstArray);
  }
  return newArray;
}

const removeDuplicates = (ArrayWithDuplicates) => {
  let result = [];

  for (let item of ArrayWithDuplicates) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
};
