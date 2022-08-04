import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//определение списка попапов
const popups = document.querySelectorAll('.popup');
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

//определение области для вставки массива
const cardList = document.querySelector('.elements__list');

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

//функция-аргумет для добавления слушателя на нажатие Esc на открытый попап
function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  };
}

//добавление слушателя на нажатие Esc на открытый попап
function addListenerEsc() {
  document.addEventListener('keydown', closePopupByEsc);
};

//удаление слушателя на нажатие Esc на открытый попап
function removeListenerEsc() {
  document.removeEventListener('keydown', closePopupByEsc);
};

//общие функции для открытия/закрытия попапов, будут переиспользованы ниже для каждого попапа, в т.ч. внутри функции создания карточек
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addListenerEsc(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeListenerEsc(popup);
}

// общий универсальный слушатель на крестик для закрытия попапов + закрытие киком на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if ((event.target.classList.contains('popup__close-button')) || (event.target === event.currentTarget)) {
      closePopup(popup);
      };
    });
});

function renderCard(card) {
  const cardObject = new Card(card, '.element-template_type_default', openPopup);
  const cardElement = cardObject.generateCard();

  cardList.prepend(cardElement);
}

//создание карточек из имеющегося массива
initialCards.forEach(function (card) {
  renderCard(card);
})

//Открытие попапа с личной информацией
buttonEdit.addEventListener('click', openPopupInfo);

function openPopupInfo() {
  nameInput.value = namePlace.textContent;
  jobInput.value = descriptionPlace.textContent;
  openPopup(popupPersInfo);
}

//Изменение информации в профиле при помощи попапа
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  namePlace.textContent = nameInput.value;
  descriptionPlace.textContent = jobInput.value;
  closePopup(popupPersInfo);
}

formElementInfo.addEventListener('submit', handleProfileFormSubmit);

//Открытие попапа для добавления карточек
buttonAdd.addEventListener('click', openPopupCards);

function openPopupCards() {
  openPopup(popupCards);
}

//Добавление новых карточек
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  //объявление элемента с введенными пользователем данными
  const element = {
      name: placeNameInput.value,
      link: linkImgInput.value,
    }
  // добавлеине нового элемента
  renderCard(element);
  // обновлеине полей ввода
  formElementCards.reset();
  //закрытие попапа
  closePopup(popupCards);
}

formElementCards.addEventListener('submit', handleCardFormSubmit);

const formInfoValidator = new FormValidator ({
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active',
  editButtonSelector: '.profile__edit-button',
  addButtonSelector: '.profile__add-button'
}, formElementInfo);

formInfoValidator.enableValidation();

const formCardsValidator = new FormValidator ({
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active',
  editButtonSelector: '.profile__edit-button',
  addButtonSelector: '.profile__add-button'
}, formElementCards);

formCardsValidator.enableValidation();