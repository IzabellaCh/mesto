export class UserInfo {
  constructor( nameSelector, descriptionSelector ) {
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

  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }
}