const cardList = document.querySelector('.elements__list');
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

initialCards.forEach(function (element) {
  createCard(element);
})

function createCard(element, position = "end") {
  // создание шаблона
  const elementTemplate = document.querySelector('#element-template').content;
  const card = elementTemplate.querySelector('.element').cloneNode(true);

  // заполнение шаблона
  card.querySelector('.element__image').src = element.link;
  card.querySelector('.element__title').textContent = element.name;

  // изменение состояния кнопки "like"
  const likeButton = card.querySelector('.element__like-button');

  likeButton.addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like-button_type_active');
});

  //добавление карты в DOM
  if (position === 'end') {
    cardList.append(card);
  } else  cardList.prepend(card);

  //удаление карт
  const deleteButton = card.querySelector('.element__trash-button');

  deleteButton.addEventListener('click', function (evt){
    evt.preventDefault();
    card.remove();
  })
}

/*Объявление объектов, связанных с личной информацией*/
// const popup = document.querySelector('.popup');
const popupPersInfo = document.querySelector('.popup__type_personal-information');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonInfo = document.querySelector('.popup__close-button_type_personal-information');
const saveButtonInfo = popupPersInfo.querySelector('.popup__save-button');
const formElementInfo = popupPersInfo.querySelector('.popup__form_type_personal-information');
const nameInput = formElementInfo.querySelector('.popup__field_type_name');
const jobInput = formElementInfo.querySelector('.popup__field_type_description');
const namePlace = document.querySelector('.profile__name');
const descriptionPlace = document.querySelector('.profile__subtitle');

/*Открытие/закрытие попапа с личной информацией*/

editButton.addEventListener('click', openPopupInfo);
closeButtonInfo.addEventListener('click', closePopupInfo);

function openPopupInfo() {
  nameInput.value = namePlace.textContent;
  jobInput.value = descriptionPlace.textContent;
  popupPersInfo.classList.add('popup_opened');
}

function closePopupInfo() {
  popupPersInfo.classList.remove('popup_opened');
}

/*Изменение информации в профиле*/

function formSubmitHandlerInfo(evt) {
  evt.preventDefault();
  namePlace.textContent = nameInput.value;
  descriptionPlace.textContent = jobInput.value;
  closePopupInfo();
}

formElementInfo.addEventListener('submit', formSubmitHandlerInfo);

/*Объявление объектов, связанных с карточками*/

const popupCards = document.querySelector('.popup__type_add-new-cards');
const addButton = document.querySelector('.profile__add-button');
const closeButtonCards = document.querySelector('.popup__close-button_type_add-new-cards');
const saveButtonCards = popupCards.querySelector('.popup__save-button_type_add-new-cards');
const formElementCards = popupCards.querySelector('.popup__form_type_add-new-cards');
const placeNameInput = formElementCards.querySelector('.popup__field_type_place-name');
const linkImgInput = formElementCards.querySelector('.popup__field_type_link-img');

/*Открытие/закрытие попапа для добавления карточек*/

addButton.addEventListener('click', openPopupCards);
closeButtonCards.addEventListener('click', closePopupCards);

function openPopupCards() {
  popupCards.classList.add('popup_opened');
}

function closePopupCards() {
  popupCards.classList.remove('popup_opened');
}

/*Добавление новых карточек*/

function formSubmitHandlerCards(evt) {
  evt.preventDefault();
// объявление элемента с введенными пользователем данными
  const el = {
      name: placeNameInput.value,
      link: linkImgInput.value,
    }
// создание нового элемента
  createCard(el, "start");
// обновлеине полей ввода
  placeNameInput.value = '';
  linkImgInput.value = '';
//закрытие попапа
  closePopupCards();
}

formElementCards.addEventListener('submit', formSubmitHandlerCards);