export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
  
  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    }); 

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}