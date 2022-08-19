import { Popup } from './Popup.js';

export class PopupuWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__title');
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name + '.';
    this._popupTitle.textContent = name;
    
    super.open();
  }
};