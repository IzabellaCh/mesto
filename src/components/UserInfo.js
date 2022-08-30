// export class UserInfo {
//   constructor(nameSelector, descriptionSelector) {
//     this._userName = document.querySelector(nameSelector);
//     this._userDescription = document.querySelector(descriptionSelector);
// }

//   getUserInfo() {
//     const userInformation = {
//       name: this._userName.textContent,
//       description: this._userDescription.textContent
//     }
//     return userInformation;
//   }

//   setUserInfo(data) {
//     this._userName.textContent = data.name;
//     this._userDescription.textContent = data.description;
//   }
// }


export class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
}

  renderUserInfo() {
    fetch('https://nomoreparties.co/v1/cohort-49/users/me', {
      headers: {
        authorization: 'adc94622-2d1b-46ad-9b64-72eed6ee2b47'
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      this._userName.textContent = data.name;
      this._userDescription.textContent = data.about;
      this._avatarSelector.src = data.avatar;
    })
    .catch((err) => {
      alert(`Ошибка при загрузке информации профиля: ${err}`);
    })
  }

  getUserInfo() {
    const userInformation = {
      name: this._userName.textContent,
      description: this._userDescription.textContent
    }
    return userInformation;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.description;
  }
}