// определение объектов, связанных с личной информацией
const popupPersInfo = document.querySelector('.popup_type_personal-information');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const formElementInfo = popupPersInfo.querySelector('.popup__form_type_personal-information');

// объекты, связанные с аватаром
export const avatar = document.querySelector('.profile__photo');
export const avatarOverlay = document.querySelector('.profile__avatar-overlay');
const popupAvatar = document.querySelector('.popup_type_avatar');
export const formAvatar = popupAvatar.querySelector('.popup__form_type_avatar');

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
export const popupDeleteSelector = '.popup_type_delete-card';
export const popupAvatarSelector = '.popup_type_avatar';

// селекторы личной информации
export const userNameSelector = '.profile__name';
export const userDescriptionSelector = '.profile__subtitle';
export const userAvatarSelector = '.profile__photo';

// селекторы для валидации форм
export const selectorsForValidator = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active',
}

// объект, в который после запроса информации о пользователе с сервера и вызова userInfo.renderUserInfo будет вписан ключ "id" с его значением 
export const userOwner = {};