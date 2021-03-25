export {sortOffers, getOfferRank, setType};

const filterHousingType = document.querySelector('#housing-type');


const setType = (cb) => {
  filterHousingType.addEventListener('change', (evt) => {
    filterHousingType.value = evt.target.value;
    cb();
  });
};


const getOfferRank = ({offer}) => {
  let rank = 0;
  if (filterHousingType.value === 'any') {
    rank += 1;
  } else if (offer.type === filterHousingType.value) {
    rank += 1;
  }

  return rank;
};


const sortOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
}

