import {renderOffer} from './popup.js';

const OFFERS_COUNT = 10;

fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
    console.log(offers);
    renderOffer(offers.slice(0, OFFERS_COUNT));
});


const adForm = document.querySelector('.ad-form');

adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://22.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    );
  });
