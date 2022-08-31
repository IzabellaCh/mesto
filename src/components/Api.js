export class Api {
//   constructor(baseUrl, userUnfoUrl) {
//     this._baseUrl = baseUrl;
//     this._userInfoUrl = userUnfoUrl;
//   }

// запрос для получения информации о пользователе
  getServerUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-49/users/me', {
      headers: {
        authorization: 'adc94622-2d1b-46ad-9b64-72eed6ee2b47'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert(`Ошибка при загрузке информации профиля: ${err}`);
    })
  }

//   getInitialCards() {
//     return fetch('https://mesto.nomoreparties.co/v1/cohortId/cards', {
//       headers: {
//         authorization: 'adc94622-2d1b-46ad-9b64-72eed6ee2b47'
//       }
//     })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Ошибка: ${res.status}`);
//     })
//     .then
//   }

}