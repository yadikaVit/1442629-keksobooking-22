export {getServerOffers, setUserFormSubmit};
import {showSuccessMessage, showErrorMessage, showAlert} from './form.js';

const OFFERS_COUNT = 10;

const getServerOffers = function (onSuccess) {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')

    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })

    .then((offers) => {
      onSuccess(offers.slice(0, OFFERS_COUNT));
    })
    .catch(() => {
      showAlert('Не удалось загрузить объявления поблизости. Перезагузите страницу');
    });
}


const adForm = document.querySelector('.ad-form');

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://22.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          showSuccessMessage();
          adForm.reset();
        } else {
          showErrorMessage();
        }
      })
      .catch(() => {
        showErrorMessage();
      });
  });
}
