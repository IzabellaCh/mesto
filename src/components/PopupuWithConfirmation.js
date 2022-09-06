import { Popup } from './Popup.js';

export class PopupuWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._yesButton = this._popup.querySelector('.popup__save-button');
  }

  open(handleYesButtonClick) {
    super.open();
    this._handleYesButtonClick = handleYesButtonClick;
  }

  setEventListeners() {
    super.setEventListeners();
    this._yesButton.addEventListener('click', () => {
      this._handleYesButtonClick();
      super.close();
    })
  }
}