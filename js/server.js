export {getServerOffers};
import {isEscEvent} from './util.js';


const OFFERS_COUNT = 10;
const ALERT_SHOW_TIME = 5000;

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
setUserFormSubmit();

const resetButton = adForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click', function() {
  adForm.reset();
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

const main = document.querySelector('.main');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const showSuccessMessage = function () {
  const newMainSuccessElement = successTemplate.cloneNode(true);
  main.appendChild(newMainSuccessElement);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      newMainSuccessElement.remove();
    }
  });

  document.addEventListener('click', () => {
    newMainSuccessElement.remove();
  });
  document.removeEventListener('keydown');
  document.removeEventListener('click');
}

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showErrorMessage = function () {
  const newMainErrorElement = errorTemplate.cloneNode(true);
  main.appendChild(newMainErrorElement);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      newMainErrorElement.remove();
    }
  });

  document.addEventListener('click', () => {
    newMainErrorElement.remove();
  });
  document.removeEventListener('keydown');
  document.removeEventListener('click');
}
