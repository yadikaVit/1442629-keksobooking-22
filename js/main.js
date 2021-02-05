let getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || max < 0 || min > max) {
    return NaN;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
getRandomIntInclusive(3, 5);

const getRandomCoordinates = function (min, max, n) {
  if (min < 0 || max < 0 || min > max) {
    return NaN;
  }
  let total = Math.random() * (max - min + 1) + min;

  return total.toFixed(n);
};

getRandomCoordinates (4, 10 ,2);
