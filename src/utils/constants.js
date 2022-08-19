// определение объектов, связанных с личной информацией
const popupPersInfo = document.querySelector('.popup_type_personal-information');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const formElementInfo = popupPersInfo.querySelector('.popup__form_type_personal-information');

//Объявление объектов, связанных с карточками
const popupCards = document.querySelector('.popup_type_add-new-cards');
export const buttonAdd = document.querySelector('.profile__add-button');
export const formElementCards = popupCards.querySelector('.popup__form_type_add-new-cards');

//определение области для вставки массива
export const cardListSection = '.elements__list';

// селекторы попапов
export const popupCardSelector = '.popup_type_card';
export const popupPersInfoSelector = '.popup_type_personal-information';
export const popupNewCardSelector = '.popup_type_add-new-cards';

// селекторы личной информации
export const userNameSelector = '.profile__name';
export const userDescriptionSelector = '.profile__subtitle';

//определение начального массива
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const selectorsForValidator = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active',
}