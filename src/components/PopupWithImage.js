import { Popup } from './Popup.js';
import { popupImage, popupTitle } from '../utils/constants.js'

export class PopupuWithImage extends Popup {
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