export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  // запрос для получения информации о пользователе
  getServerUserInfo() {
    return fetch(`${this._baseUrl.slice(0, 8)}${this._baseUrl.slice(14)}/users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

// запрос для создания массива карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
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
    .then(this._checkResponse)
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
    .then(this._checkResponse)
  }

  deleteCard(cardInfo) {
    return fetch(`${this._baseUrl}/cards/${cardInfo}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(this._checkResponse)
    .catch((err) => {
      alert(`Ошибка при удалении карточки: ${err}`);
    })
  }

  addLike(cardInfo) {
    return fetch(`${this._baseUrl}/cards/${cardInfo}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(this._checkResponse)
  }

  deleteLike(cardInfo) {
    return fetch(`${this._baseUrl}/cards/${cardInfo}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
    .then(this._checkResponse)
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${link}`
      })
      })
    .then(this._checkResponse)
    .catch((err) => {
      alert(`Ошибка при смене аватара: ${err}`);
    })
  }
}