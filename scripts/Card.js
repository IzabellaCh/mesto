class Card {
  constructor(data, templateSelector, openPopup) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._cardName = this._element.querySelector('.element__title');
    this._deleteButton = this._element.querySelector('.element__trash-button');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name + '.';
    this._cardName.textContent = this._name;

    return this._element;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('element__like-button_type_active');
  }
  
  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenPopupCard() {
    const popupCard = document.querySelector('.popup_type_card');
    const popupImage = document.querySelector('.popup__image');
    const popupTitle = document.querySelector('.popup__title');

    popupImage.src = this._link;
    popupImage.alt = this._name + '.';
    popupTitle.textContent = this._name;

    this._openPopup(popupCard);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    }); 

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopupCard();
    });
  }
}

export { Card };