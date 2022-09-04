import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__field');
    this._button = this._form.querySelector('.popup__save-button');
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    this._button.textContent = 'Сохранить';
    super.open();
  }

//  собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this._button.textContent = 'Сохранение...';
        this.close();
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
};