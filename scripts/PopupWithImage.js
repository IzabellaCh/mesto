import { Popup } from './Popup.js';

const popupCard = document.querySelector('.popup_type_card');
const popupImage = popupCard.querySelector('.popup__image');
const popupTitle = popupCard.querySelector('.popup__title');


class PopupuWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    popupImage.src = link;
    popupImage.alt = name + '.';
    popupTitle.textContent = name;
    
    super.open();
  }
};

export { PopupuWithImage };