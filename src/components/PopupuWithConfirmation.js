import { Popup } from './Popup.js';

export class PopupuWithConfirmation extends Popup {
  constructor(popupSelector, handleYesButtonClick) {
    super(popupSelector);
    this._yesButton = this._popup.querySelector('.popup__save-button');
    this._handleYesButtonClick = handleYesButtonClick;
  }

  open(cardId, cardElement) {
    super.open();
    this._setEventListeners(cardId, cardElement);
  }

  _setEventListeners(cardId, cardElement) {
    super.setEventListeners();

    this._yesButton.addEventListener('click', () => {
      this._handleYesButtonClick(cardId);
      console.log(cardId);
      cardElement.remove();
      cardElement = null;
      super.close();
    })
  }
}