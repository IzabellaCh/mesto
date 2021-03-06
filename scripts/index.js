//определение списка попапов
const popups = document.querySelectorAll('.popup');
//определение содержания шаблона для карточек
const elementTemplate = document.querySelector('#element-template').content;
//определение объектов для открытия большого изображения в popup 
const popupCard = document.querySelector('.popup_type_card');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__title');
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

//общий универсальный слушатель на крестик для закрытия попапов + закрытие киком на оверлей + закрытие при нажатии на Escape 
//(но в чек-листе сказано добавлять и удалять слушатель на esc при каждом открытии/закрытии, 
//поэтому переписала вторую часть данной функции на несколько, код выше)
// popups.forEach((popup) => {
//   popup.addEventListener('click', (event) => {
//     if ((event.target.classList.contains('popup__close-button')) || (event.target === event.currentTarget)) {
//       closePopup(popup);
//       };
//     });
//   document.addEventListener('keydown', function(event) {
//     if (event.key === 'Escape') {
//       closePopup(popup);
//     };
//   });
// });

// общий универсальный слушатель на крестик для закрытия попапов + закрытие киком на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if ((event.target.classList.contains('popup__close-button')) || (event.target === event.currentTarget)) {
      closePopup(popup);
      };
    });
});

//создание шаблона карточки с кнопками (like, trash) и popup для выведения большого изображения

function createCard(name, link) {
  //создание шаблона
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  //заполнение шаблона
  const cardImage =  cardElement.querySelector('.element__image');
  const cardName =  cardElement.querySelector('.element__title');
  cardImage.src = link;
  cardImage.alt = name + '.';
  cardName.textContent = name;
  //изменение состояния кнопки "like"
  const likeButton = cardElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like-button_type_active');
});
  //удаление карт
  const deleteButton = cardElement.querySelector('.element__trash-button');
  deleteButton.addEventListener('click', function (evt){
    evt.preventDefault();
    cardElement.remove();
  })
    //открытие попапа с картами
  cardImage.addEventListener('click', openPopupCard);
  function openPopupCard() {
    popupImage.src = cardImage.src;
    popupImage.alt = cardName.textContent + '.';
    popupTitle.textContent = cardName.textContent;
    openPopup(popupCard);
  }
  return cardElement;
}

function renderCard(card) {
  const cardElement = createCard(card.name, card.link);
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
