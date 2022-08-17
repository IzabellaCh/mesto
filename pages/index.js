import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupuWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from '../components/PopupWithForm.js';

import { FormValidator } from '../components/FormValidator.js';

// //определение списка попапов - старый код
// const popups = document.querySelectorAll('.popup');

// определение объектов, связанных с личной информацией
const popupPersInfo = document.querySelector('.popup_type_personal-information');
const buttonEdit = document.querySelector('.profile__edit-button');
const formElementInfo = popupPersInfo.querySelector('.popup__form_type_personal-information');
const nameInput = formElementInfo.querySelector('.popup__field_type_name');
const jobInput = formElementInfo.querySelector('.popup__field_type_description');


const namePlace = document.querySelector('.profile__name');
const descriptionPlace = document.querySelector('.profile__subtitle');

//Объявление объектов, связанных с карточками
const popupCards = document.querySelector('.popup_type_add-new-cards');
const buttonAdd = document.querySelector('.profile__add-button');
const formElementCards = popupCards.querySelector('.popup__form_type_add-new-cards');
const placeNameInput = formElementCards.querySelector('.popup__field_type_place-name');
const linkImgInput = formElementCards.querySelector('.popup__field_type_link-img');


// //определение области для вставки массива - используется в старом коде по вставке карточек
// const cardListSection = document.querySelector('.elements__list');

//определение области для вставки массива
const cardListSection = '.elements__list';

// селекторы попапов
const popupCardSelector = '.popup_type_card';
const popupPersInfoSelector = '.popup_type_personal-information';
const popupNewCardSelector = '.popup_type_add-new-cards';

//определение начального массива
const initialCards = [
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

const formInfoValidator = new FormValidator ({
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active',
}, formElementInfo);

formInfoValidator.enableValidation();

const formCardsValidator = new FormValidator ({
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active',
}, formElementCards);

formCardsValidator.enableValidation();

// Создание функционала для попапа с картинкой
const popupWithImage = new PopupuWithImage(popupCardSelector);
popupWithImage.setEventListeners();

// Создание и вставка карточек из основного массива
const cardList = new Section({
  items: initialCards,
  renderer: (card) => {
    const cardObject = new Card(card, '.element-template_type_default', popupWithImage.open.bind(popupWithImage));
    const cardElement = cardObject.generateCard();
    return cardElement;
  },
},
cardListSection
);

cardList.renderItems();


const popupWithPersInfoForm = new PopupWithForm(
  popupPersInfoSelector,
  {handleFormSubmit: (formData) => {
    namePlace.textContent = formData.firstname;
    descriptionPlace.textContent = formData.description;
    }
  },
  formInfoValidator.resetValidation.bind(formInfoValidator)
);

popupWithPersInfoForm.setEventListeners();

buttonEdit.addEventListener('click', popupWithPersInfoForm.open.bind(popupWithPersInfoForm));


// //Открытие попапа с личной информацией
// buttonEdit.addEventListener('click', openPopupInfo);

// function openPopupInfo() {
//   nameInput.value = namePlace.textContent;
//   jobInput.value = descriptionPlace.textContent;
//   // обнуление сообщений об ошибках перед открытием попапа
//   formInfoValidator.resetValidation();
//   openPopup(popupPersInfo);
// };

// //Изменение информации в профиле при помощи попапа
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   namePlace.textContent = nameInput.value;
//   descriptionPlace.textContent = jobInput.value;
//   closePopup(popupPersInfo);
// };

// formElementInfo.addEventListener('submit', handleProfileFormSubmit);

const popupWithNewCardForm = new PopupWithForm(
  popupNewCardSelector,
  {handleFormSubmit: (formData) => {
    // создание элемента с данными пользователя
    const element = [{
        name: formData.placename,
        link: formData.link,
      }];

      // добавление нового элемента
    const cardListAdd = new Section({
        items: element,
        renderer: (card) => {
          // создание новой карточки
            const cardObject = new Card(card, '.element-template_type_default', popupWithImage.open.bind(popupWithImage));
            const cardElement = cardObject.generateCard();
            return cardElement;
          },
        },
        cardListSection
      );
      
      cardListAdd.renderItems();
    }
  },
  formCardsValidator.resetValidation.bind(formCardsValidator)
);

popupWithNewCardForm.setEventListeners();

// Открытие попапа для добавления карточек
buttonAdd.addEventListener('click', popupWithNewCardForm.open.bind(popupWithNewCardForm));

// //Открытие попапа для добавления карточек
// buttonAdd.addEventListener('click', openPopupCards);

// function openPopupCards() {
//   // обновление полей ввода
//   formElementCards.reset();
//   // обнуление сообщений об ошибках перед открытием попапа
//   formCardsValidator.resetValidation();
//   openPopup(popupCards);
// };

// //Добавление новых карточек
// function handleCardFormSubmit(evt) {
//   evt.preventDefault();
//   //объявление элемента с введенными пользователем данными
//   const element = [{
//       name: placeNameInput.value,
//       link: linkImgInput.value,
//     }]
//   // добавление нового элемента
//   const cardListAdd = new Section({
//     items: element,
//     renderer: (card) => {
//       const cardObject = new Card(card, '.element-template_type_default', openPopupCard);
//       const cardElement = cardObject.generateCard();
//       return cardElement;
//     },
//   },
//   cardListSection
//   );

//   cardListAdd.renderItems();

//   // закрытие попапа
//   closePopup(popupCards);
// }
// formElementCards.addEventListener('submit', handleCardFormSubmit);





// const formInfoValidator = new FormValidator ({
//   inputSelector: '.popup__field',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__field_type_error',
//   errorClass: 'popup__field-error_active',
// }, formElementInfo);

// formInfoValidator.enableValidation();

// const formCardsValidator = new FormValidator ({
//   inputSelector: '.popup__field',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__field_type_error',
//   errorClass: 'popup__field-error_active',
// }, formElementCards);

// formCardsValidator.enableValidation();