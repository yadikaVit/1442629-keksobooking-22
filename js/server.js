'use strict';

export {getServerOffers, sendData};

const getServerOffers = function (onSuccess, onFail) {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')

    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })

    .then(function (offers) {
      onSuccess(offers);
    })
    .catch(function () {
      onFail('Не удалось загрузить объявления поблизости. Перезагузите страницу');
    });
};

const sendData = function (onSuccess, onFail, body) {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then(function (response) {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(function () {
      onFail();
    });
};
