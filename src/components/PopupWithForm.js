import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}, resetValidation, /*addPersonalInfo*/) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__field');

    this._handleFormSubmit = handleFormSubmit;
    this._resetValidation = resetValidation;
    // this._addPersonalInfo - addPersonalInfo;
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
        super.close();
    });
  }

// в задании сказано переписать close(), 
// а ранее в функции открытия попапов я добавляла фукнционал для очистки от ошибок, 
// оставленных после валидации - resetValidation(), если ее вызывать в close(),
// то при первом открытии попапа кнопка "сохранить" активна, если же ее добавлять в open(), 
// такой неточности нет, поэтому ниже закомментировала написанный по заданию close()
// и изменила родительский open(), чтобы не переписывать обе функции и не добавлять в open() только функцию toggleButtonState()
//   close() {
//     super.close();
//     this._form.reset();
//     this._resetValidation();
//   }

  open() {
    this._form.reset();
    this._resetValidation();
    super.open();
  }
};