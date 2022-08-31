import './index.css';

import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupuWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { selectorsForValidator, buttonEdit, formElementInfo, buttonAdd, formElementCards, cardListSection, popupCardSelector, popupPersInfoSelector, popupNewCardSelector, userNameSelector, userDescriptionSelector, userAvatarSelector } from '../utils/constants.js';





// новая часть кода для работы с API:

import { Api } from '../components/Api.js';

const api = new Api();




const userInfo = new UserInfo(userNameSelector, userDescriptionSelector, userAvatarSelector);

// вставка личной информации с сервера
api.getServerUserInfo().then((data) => {
  userInfo.renderUserInfo(data);
});


// экземпляры классов валидации для форм
const formInfoValidator = new FormValidator (selectorsForValidator, formElementInfo);
formInfoValidator.enableValidation();

const formCardsValidator = new FormValidator (selectorsForValidator, formElementCards);
formCardsValidator.enableValidation();

// Создание функционала для попапа с картинкой + обработчики
const popupWithImage = new PopupuWithImage(popupCardSelector);
popupWithImage.setEventListeners();

// функция создания новой карточки
function createCard(card) {
  const cardObject = new Card(card, '.element-template_type_default', popupWithImage.open.bind(popupWithImage));
  const cardElement = cardObject.generateCard();
  return cardElement;
}

// Создание карточек из основного массива
const cardList = new Section(createCard, cardListSection);

// // добавление карточек из основного массива - старый код
// cardList.renderItems(initialCards);

// добавление карточек основного массива с помощью класса api и запроса на сервер
api.getInitialCards().then((data) => {
  cardList.renderItems(data);
})

// создание функционала экземпляра попапа с персональной информацией
const popupWithPersInfoForm = new PopupWithForm(
  popupPersInfoSelector,
  {handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    }
  }
);

// + обработчики для попапа с персональной информацией
popupWithPersInfoForm.setEventListeners();

buttonEdit.addEventListener('click', () => {
  // получение информации о пользователе со страницы
  const userInfoOnPage = userInfo.getUserInfo();
  // вставка данных пользователя в форму попапа
  popupWithPersInfoForm.setInputValues.bind(popupWithPersInfoForm)(userInfoOnPage);
  // скрытие прошлых ошибок
  formInfoValidator.resetValidation.bind(formInfoValidator)();
  // открытие попапа
  popupWithPersInfoForm.open.bind(popupWithPersInfoForm)();
});

// создание функционала экземпляра попапа с новой карточкой
const popupWithNewCardForm = new PopupWithForm(
  popupNewCardSelector,
  {handleFormSubmit: (formData) => {
    // создание элемента с данными пользователя
    const element = {
      name: formData.placename,
      link: formData.link,
    };
    const newCardElement = createCard(element);
    cardList.addItem(newCardElement);
    }
  }
);

// + обработчиков попапа с новой карточкой
popupWithNewCardForm.setEventListeners();

// Открытие попапа для добавления карточек
buttonAdd.addEventListener('click', () => {
  // скрытие прошлых ошибок
  formCardsValidator.resetValidation.bind(formCardsValidator)();
  // открытие попапа
  popupWithNewCardForm.open.bind(popupWithNewCardForm)();
});







