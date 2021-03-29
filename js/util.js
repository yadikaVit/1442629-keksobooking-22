'use strict';

export {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, isEscEvent};

const getRandomFloatInclusive = function (min, max, n) {
  if (min < 0 || max < 0 || min > max) {
    return NaN;
  }
  const total = Math.random() * (max - min) + min;
  return Number(total.toFixed(n));
}

const getRandomIntInclusive = function (min, max) {
  return getRandomFloatInclusive(Math.ceil(min), Math.floor(max), 0)
}

const getRandomArrayElement = function (elements) {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

const isEscEvent = function (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
};
