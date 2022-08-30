export class Api {
//   constructor(baseUrl, userUnfoUrl) {
//     this._baseUrl = baseUrl;
//     this._userInfoUrl = userUnfoUrl;
//   }

  getServerUserInfo(nameSelector, descriptionSelector, avatarSelector) {
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
    .then((data) => {
    //   console.log(data);
      document.querySelector(nameSelector).textContent = data.name;
      document.querySelector(descriptionSelector).textContent = data.about;
      document.querySelector(avatarSelector).src = data.avatar;
    })
    .catch((err) => {
      alert(`Ошибка при загрузке информации профиля: ${err}`);
    })
  }

}