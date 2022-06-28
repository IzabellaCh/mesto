//общие функции для открытия/закрытия попапов, будут переиспользованы ниже для каждого попапа, в т.ч. внутри функции создания карточек
const popup = document.querySelectorAll('.popup');

function openPopup(arg) {
  arg.classList.add('popup_opened');
}

function closePopup(arg) {
  arg.classList.remove('popup_opened');
}

//определение области для вставки массива
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

//создание карточек из массива
initialCards.forEach(function (element) {
  createCard(element);
})

//создание шаблона карточки с кнопками
function createCard(element, position = "end") {
  //создание шаблона
  const elementTemplate = document.querySelector('#element-template').content;
  const card = elementTemplate.querySelector('.element').cloneNode(true);

  //заполнение шаблона
  const cardImage =  card.querySelector('.element__image');
  const cardName =  card.querySelector('.element__title');

  cardImage.src = element.link;
  cardName.textContent = element.name;

  //изменение состояния кнопки "like"
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

  //добавление popup для открытия изображения с названием
  //объявление объектов
  const popupCard = document.querySelector('.popup_type_card');
  const popupImage = document.querySelector('.popup__image');
  const popupTitle = document.querySelector('.popup__title');
  const closeButtonCard = document.querySelector('.popup__close-button_type_card');
  
  //открытие/закрытие попапа с картами
  cardImage.addEventListener('click', openPopupCard);
  closeButtonCard.addEventListener('click', closePopupCard);

  function openPopupCard() {
    popupImage.src = cardImage.src;
    popupTitle.textContent = cardName.textContent;
    openPopup(popupCard);
  }

  function closePopupCard() {
    closePopup(popupCard);
  }
}

//Объявление объектов, связанных с личной информацией
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

//Открытие/закрытие попапа с личной информацией
editButton.addEventListener('click', openPopupInfo);
closeButtonInfo.addEventListener('click', closePopupInfo);

function openPopupInfo() {
  nameInput.value = namePlace.textContent;
  jobInput.value = descriptionPlace.textContent;
  openPopup(popupPersInfo);
}

function closePopupInfo() {
  closePopup(popupPersInfo);
}

//Изменение информации в профиле
function formSubmitHandlerInfo(evt) {
  evt.preventDefault();
  namePlace.textContent = nameInput.value;
  descriptionPlace.textContent = jobInput.value;
  closePopupInfo();
}

formElementInfo.addEventListener('submit', formSubmitHandlerInfo);

//Объявление объектов, связанных с карточками
const popupCards = document.querySelector('.popup__type_add-new-cards');
const addButton = document.querySelector('.profile__add-button');
const closeButtonCards = document.querySelector('.popup__close-button_type_add-new-cards');
const saveButtonCards = popupCards.querySelector('.popup__save-button_type_add-new-cards');
const formElementCards = popupCards.querySelector('.popup__form_type_add-new-cards');
const placeNameInput = formElementCards.querySelector('.popup__field_type_place-name');
const linkImgInput = formElementCards.querySelector('.popup__field_type_link-img');

//Открытие/закрытие попапа для добавления карточек
addButton.addEventListener('click', openPopupCards);
closeButtonCards.addEventListener('click', closePopupCards);

function openPopupCards() {
  openPopup(popupCards);
}

function closePopupCards() {
  closePopup(popupCards);
}

//Добавление новых карточек
function formSubmitHandlerCards(evt) {
  evt.preventDefault();
//объявление элемента с введенными пользователем данными
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