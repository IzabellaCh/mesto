export class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteButtonClick, userIdSelector) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    // id, который будет передаваться в переменную cardOpenId для дальнейшей идентификации карточки при открытии попапа для подтверждения удаления
    this._cardId = data._id;
    // id создателей карточек (приходят с сервера)
    this._cardOwnerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    // id пользователя, с которым будем сравнивать id создателей карточек
    this._userIdSelector = userIdSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._cardName = this._element.querySelector('.element__title');
    this._deleteButton = this._element.querySelector('.element__trash-button');

    if (this._cardOwnerId !== this._userIdSelector) {
      this._deleteButton.classList.add('element__trash-button_type_hidden');
    }

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name + '.';
    this._cardName.textContent = this._name;

    this._likeCounter.textContent = `${this._likes.length}`;

    return this._element;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('element__like-button_type_active');
  }
  
  // handleDeleteButton() {
  //   this._element.remove();
  //   this._element = null;
  // }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    }); 

    // this._deleteButton.addEventListener('click', () => {
    //   this._handleDeleteButton();
    // });

    this._deleteButton.addEventListener('click', (evt) => {
      // this._cardSelectedId = this._cardId;
      // console.log(this._cardSelectedId);
      console.log(evt.currentTarget);
      console.log(evt.target);

      this._handleDeleteButtonClick(this._cardId, this._element);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}