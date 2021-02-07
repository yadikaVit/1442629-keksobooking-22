const getRandomFloatInclusive = function (min, max, n) {
  if (min < 0 || max < 0 || min > max) {
    return NaN;
  }
  const total = Math.random() * (max - min) + min;
  return total.toFixed(n);
}

const getRandomIntInclusive = function (min, max) {

  return getRandomFloatInclusive(Math.ceil(min), Math.floor(max), 0)
}

getRandomIntInclusive (3, 5);
