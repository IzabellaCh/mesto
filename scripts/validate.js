// включение валидации вызовом enableValidation
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active',
  editButtonSelector: '.profile__edit-button',
  addButtonSelector: '.profile__add-button'
});

//проверка валидности форм и их полей
function checkValidity(selectors, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(selectors, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(selectors, formElement, inputElement);
  }
}

//показать поле с ошибкой + вывести текст ошибки
function showInputError(selectors, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}
//скрыть поле с ошибкой
function hideInputError(selectors, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
}

//добавление обработчиков на все поля форм + перед открытием попапов
function setEventListeners(selectors, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  const editingButton = document.querySelector(selectors.editButtonSelector);
  const additionButton = document.querySelector(selectors.addButtonSelector);

// вызов инактивации кнопки при невалидности полей до ввода данных 
// (не работает, если открывать попап с созднием новой карточки несколько раз), 
// поэтому добавила слушатели на кнопки для открытия попапов с корректируемыми данными
//   toggleButtonState(selectors, inputList, buttonElement);

  //вызов инактивации кнопки при невалидности полей до ввода данных при открытии попапа с личной информацией
  editingButton.addEventListener('click', () => {
    toggleButtonState(selectors, inputList, buttonElement);
  });
  //вызов инактивации кнопки при невалидности полей до ввода данных при открытии попапа для создания новой карточки
  additionButton.addEventListener('click', () => {
    toggleButtonState(selectors, inputList, buttonElement);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(selectors, formElement, inputElement);
      //вызов инактивации кнопки при невалидности полей во время ввода данных
      toggleButtonState(selectors, inputList, buttonElement);
    });
  });
};

//создание массива форм для последующего добавление обработчиков
function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(selectors, formElement);
  });
};

//проверка всей формы на наличие хотя бы 1 поля с ошибкой
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//инактивация при невалидной форме/активация при валидной кнопки с 'submit' для отправки формы
function toggleButtonState(selectors, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};