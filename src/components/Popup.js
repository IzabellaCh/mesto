export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBind);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseBind);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners(){
    this._popup.addEventListener('click', (event) => {
      if ((event.target.classList.contains('popup__close-button')) || (event.target === event.currentTarget)) {
        this.close();
      };
    });
  }
};