import './index.css';

import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupuWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { buttonEdit, formElementInfo, nameInput, jobInput, buttonAdd, formElementCards, cardListSection, popupCardSelector, popupPersInfoSelector, popupNewCardSelector, userNameSelector, userDescriptionSelector, initialCards } from '../utils/constants.js';

const userInfo = new UserInfo(userNameSelector, userDescriptionSelector);

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

// Создание функционала для попапа с картинкой + обработчики
const popupWithImage = new PopupuWithImage(popupCardSelector);
popupWithImage.setEventListeners();

// Создание карточек из основного массива
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

// добавление карточек из оснвного массива
cardList.renderItems();

// создание функционала экземпляра попапа с персональной информацией
const popupWithPersInfoForm = new PopupWithForm(
  popupPersInfoSelector,
  {handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    }
  },
  formInfoValidator.resetValidation.bind(formInfoValidator)
);

// + обработчики для попапа с персональной информацией
popupWithPersInfoForm.setEventListeners();

buttonEdit.addEventListener('click', () => {
  popupWithPersInfoForm.open.bind(popupWithPersInfoForm)();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().description;
});

// создание функционала экземпляра попапа с новой карточкой
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

// + обработчиков попапа с новой карточкой
popupWithNewCardForm.setEventListeners();

// Открытие попапа для добавления карточек
buttonAdd.addEventListener('click', popupWithNewCardForm.open.bind(popupWithNewCardForm));