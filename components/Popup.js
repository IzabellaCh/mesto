class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
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
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
};

export { Popup };