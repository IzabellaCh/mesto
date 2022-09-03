import { Popup } from './Popup.js';

export class PopupuWithConfirmation extends Popup {
  constructor(popupSelector, handleYesButtonClick) {
    super(popupSelector);
    this._yesButton = this._popup.querySelector('.popup__save-button');
    this._handleYesButtonClick = handleYesButtonClick;
  }

  open(cardId, cardElement) {
    super.open();

    // присвоение id карты и ее элемента в данные попапа для удаления для последующего использования при подтверждении удаления
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();

    this._yesButton.addEventListener('click', () => {
      this._handleYesButtonClick(this._cardId);

      this._cardElement.remove();
      this._cardElement = null;
      super.close();
    })
  }
}



// export class PopupuWithConfirmation extends Popup {
//   constructor(popupSelector, handleYesButtonClick) {
//     super(popupSelector);
//     this._yesButton = this._popup.querySelector('.popup__save-button');
//     this._handleYesButtonClick = handleYesButtonClick;
//   }

//   open(cardId, cardElement) {
//     super.open();
//     this._setEventListeners(cardId, cardElement);
//   }

//   _setEventListeners(cardId, cardElement) {
//     super.setEventListeners();

//     this._yesButton.addEventListener('click', () => {
//       this._handleYesButtonClick(cardId);
//       console.log(cardId);
//       cardElement.remove();
//       cardElement = null;
//       super.close();
//     })
//   }
// }