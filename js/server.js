import {renderOffer} from './popup.js';

const OFFERS_COUNT = 10;

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
    console.log(offers);
    renderOffer(offers.slice(0, OFFERS_COUNT));
  });
