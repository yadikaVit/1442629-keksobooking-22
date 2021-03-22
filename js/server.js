import {renderOfferOnMap} from './map.js';
export {getServerOffers};

const OFFERS_COUNT = 10;
const ALERT_SHOW_TIME = 5000;

const getServerOffers = function () {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')

    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })

    .then((offers) => {
      renderOfferOnMap(offers.slice(0, OFFERS_COUNT));
    })
    .catch(() => {
      showAlert('Не удалось загрузить объявления поблизости. Перезагузите страницу');
    });
}


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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = '30px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'orange';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}
