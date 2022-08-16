import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupuWithImage } from "../components/PopupWithImage.js";

import { FormValidator } from '../components/FormValidator.js';

// //определение списка попапов
// const popups = document.querySelectorAll('.popup');

//определение объектов, связанных с личной информацией
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






// Это ушло в класс Popup
// // Основые функции открытия,закрытия попапов
// //функция-аргумет для добавления слушателя на нажатие Esc на открытый попап
// function closePopupByEsc(event) {
//   if (event.key === 'Escape') {
//     const popupOpen = document.querySelector('.popup_opened');
//     closePopup(popupOpen);
//   };
// }

// // внесла в добавление слушателей
// //добавление слушателя на нажатие Esc на открытый попап
// function addListenerEsc() {
//   document.addEventListener('keydown', closePopupByEsc);
// };

// // внесла просто в закрытие
// //удаление слушателя на нажатие Esc на открытый попап
// function removeListenerEsc() {
//   document.removeEventListener('keydown', closePopupByEsc);
// };

// // внесла в класс
// //общие функции для открытия/закрытия попапов, будут переиспользованы ниже для каждого попапа, в т.ч. внутри функции создания карточек
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   addListenerEsc(popup);
// };

// // внесла в класс
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   removeListenerEsc(popup);
// };


// // внесла в класс
// // общий универсальный слушатель на крестик для закрытия попапов + закрытие киком на оверлей
// popups.forEach((popup) => {
//   popup.addEventListener('click', (event) => {
//     if ((event.target.classList.contains('popup__close-button')) || (event.target === event.currentTarget)) {
//       closePopup(popup);
//       };
//     });
// });


const popupWithImage = new PopupuWithImage(popupCardSelector);


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

// Копия кода до изменения
// // Создание и вставка карточек из основного массива
// const cardList = new Section({
//   items: initialCards,
//   renderer: (card) => {
//     const cardObject = new Card(card, '.element-template_type_default', openPopupCard);
//     const cardElement = cardObject.generateCard();
//     return cardElement;
//   },
// },
// cardListSection
// );

// cardList.renderItems();



// // создание карточки со всеми слушателями без классов - старый код - пока оставила
// function createCard(card) {
//   const cardObject = new Card(card, '.element-template_type_default', openPopupCard);
//   const cardElement = cardObject.generateCard();
//   return cardElement;
// };

// // вставка карточки в список
// function renderCard(card) {
//   const cardItem = createCard(card);
//   cardListSection.prepend(cardItem);
// };

// //создание карточек из имеющегося массива
// initialCards.forEach(function (card) {
//   renderCard(card);
// });

//Открытие попапа с личной информацией
buttonEdit.addEventListener('click', openPopupInfo);

function openPopupInfo() {
  nameInput.value = namePlace.textContent;
  jobInput.value = descriptionPlace.textContent;
  // обнуление сообщений об ошибках перед открытием попапа
  formInfoValidator.resetValidation();
  openPopup(popupPersInfo);
};

//Изменение информации в профиле при помощи попапа
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  namePlace.textContent = nameInput.value;
  descriptionPlace.textContent = jobInput.value;
  closePopup(popupPersInfo);
};

formElementInfo.addEventListener('submit', handleProfileFormSubmit);

//Открытие попапа для добавления карточек
buttonAdd.addEventListener('click', openPopupCards);

function openPopupCards() {
  // обновление полей ввода
  formElementCards.reset();
  // обнуление сообщений об ошибках перед открытием попапа
  formCardsValidator.resetValidation();
  openPopup(popupCards);
};






// // старый код открытия попапа с картинкой
// // открытие попапа с изображеybем (используется в class Card)
// function openPopupCard(link, name) {
//   popupImage.src = link;
//   popupImage.alt = name + '.';
//   popupTitle.textContent = name;

//   openPopup(popupCard);
// }





//Добавление новых карточек
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  //объявление элемента с введенными пользователем данными
  const element = [{
      name: placeNameInput.value,
      link: linkImgInput.value,
    }]
  // добавление нового элемента
  const cardListAdd = new Section({
    items: element,
    renderer: (card) => {
      const cardObject = new Card(card, '.element-template_type_default', openPopupCard);
      const cardElement = cardObject.generateCard();
      return cardElement;
    },
  },
  cardListSection
  );

  cardListAdd.renderItems();

  // закрытие попапа
  closePopup(popupCards);
}

// //Добавление новых карточек без классов - старый код - пока оставила
// function handleCardFormSubmit(evt) {
//   evt.preventDefault();
//   //объявление элемента с введенными пользователем данными
//   const element = {
//       name: placeNameInput.value,
//       link: linkImgInput.value,
//     }
//   // добавлеине нового элемента
//   renderCard(element);
//   // закрытие попапа
//   closePopup(popupCards);
// }

formElementCards.addEventListener('submit', handleCardFormSubmit);

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