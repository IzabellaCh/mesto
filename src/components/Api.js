export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  // запрос для получения информации о пользователе
  getServerUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-49/users/me', {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    // .catch((err) => {
    //   alert(`Ошибка при загрузке информации профиля: ${err}`);
    // })
  }

// запрос для создания массива карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    // .catch((err) => {
    //   alert(`Ошибка при загрузке массива карточек: ${err}`);
    // })
  }

//   запрос для изменения информации из формы
  changeUserInfo(newInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${newInfo.name}`,
        about: `${newInfo.description}`
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      alert(`Ошибка при обновлнии данных пользователя: ${err}`);
    })
  }

//   запрос для воздания новой карточки
  createNewCard(newCardInfo) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${newCardInfo.name}`,
        link: `${newCardInfo.link}`
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    // .catch((err) => {
    //   alert(`Ошибка при создании новой карточки: ${err}`);
    // })
  }

  // далее в методах DELETE и PUT, если использую this._baseUrl и/или this._headers, 
  // пока по непонятной мне причине, Chrome не отрисовывает кнопку удаления, 
  // не работают лайки, не меняестя их счетчик, поэтому не стала вставлять их, как ранее

  deleteCard(cardInfo) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${cardInfo}`, {
      method: 'DELETE',
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
      alert(`Ошибка при удалении карточки: ${err}`);
    })
  }

  addLike(cardInfo) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${cardInfo}/likes`, {
      method: 'PUT',
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
      alert(`Ошибка при добавлении лайка: ${err}`);
    })
  }

  deleteLike(cardInfo) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-49/cards/${cardInfo}/likes`, {
      method: 'DELETE',
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
      alert(`Ошибка при добавлении лайка: ${err}`);
    })
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${link}`
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      alert(`Ошибка при смене аватара: ${err}`);
    })
  }
}