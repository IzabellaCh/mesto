export class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector, userId) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userId = userId;
}

// загрузка начальной информации с сервера
  renderUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.about;
    this._avatar.src = data.avatar;

    // добавление информации об id пользователя
    this._userId.id = data._id;
  }

  getUserInfo() {
    const userInformation = {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    }
    return userInformation;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.description;
  }
}
