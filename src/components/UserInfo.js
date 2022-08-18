export class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
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