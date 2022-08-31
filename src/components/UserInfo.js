export class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
}

// загрузка начальной информации с сервера
  renderUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.about;
    this._avatar = data.avatar;
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

// старый код
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