export {getServerOffers, sendData};


const getServerOffers = function (onSuccess, onFail) {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')

    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })

    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      onFail('Не удалось загрузить объявления поблизости. Перезагузите страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
