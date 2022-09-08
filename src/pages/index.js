import './index.css';

import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupuWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupuWithConfirmation } from '../components/PopupuWithConfirmation.js';

import { selectorsForValidator, buttonEdit, avatar, avatarOverlay, formElementInfo, buttonAdd, formElementCards, formAvatar, cardListSection, popupCardSelector, popupPersInfoSelector, popupNewCardSelector, popupAvatarSelector, userNameSelector, userDescriptionSelector, userAvatarSelector, popupDeleteSelector, userOwner } from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: 'adc94622-2d1b-46ad-9b64-72eed6ee2b47',
    'Content-Type': 'application/json'
  },
});

// создание фукционала для работы с информацией о пользователе
const userInfo = new UserInfo(userNameSelector, userDescriptionSelector, userAvatarSelector, userOwner);

// экземпляры классов валидации для форм + запуск валидации всех форм
const formInfoValidator = new FormValidator (selectorsForValidator, formElementInfo);
formInfoValidator.enableValidation();

const formCardsValidator = new FormValidator (selectorsForValidator, formElementCards);
formCardsValidator.enableValidation();

const formAvatarValidator = new FormValidator (selectorsForValidator, formAvatar);
formAvatarValidator.enableValidation();

// Создание функционала для попапа с картинкой + обработчики
const popupWithImage = new PopupuWithImage(popupCardSelector);
popupWithImage.setEventListeners();


// создание функционала для попапа с подтверждением удаления + обработчики
const popupDelete = new PopupuWithConfirmation(popupDeleteSelector);
popupDelete.setEventListeners();


// функция создания новой карточки
function createCard(card) {
  const cardObject = new Card(
    card,
    '.element-template_type_default',
    userOwner.id,
    popupWithImage.open.bind(popupWithImage),
    popupDelete.open.bind(popupDelete),

    {
      handleDeleteCard: (cardId) => {
        api.deleteCard(cardId)
          .then(() => {
            cardObject.deleteCard();
          })
          .catch((err) => {
            alert(`Ошибка при удалении карточки: ${err}`);
          })
      },
      handleLikeButton: (cardId, like, updateLike) => {
        if (like) {
          api.deleteLike(cardId)
            .then((data) => {
            updateLike(data);
            })
            .catch((err) => {
              alert(`Ошибка при удалении лайка: ${err}`);
            })
        } else {
          api.addLike(cardId)
            .then((data) => {
                updateLike(data);
            })
            .catch((err) => {
              alert(`Ошибка при добавлении лайка: ${err}`);
            })
        };
      },
    },
  );
  const cardElement = cardObject.generateCard();
  return cardElement;
}

// Создание карточек из основного массива
const cardList = new Section({
    renderer: (data) => {
    cardList.addItem(createCard(data));
    }
    }, cardListSection
  );

// Отрисовка страницы после получения информации о пользователе и массиве созданных ранее карт
Promise.all([
  api.getServerUserInfo(), 
  api.getInitialCards()
])
.then(([dataUserInfo, dataInitialCards]) => {
  // получение информации о пользователе
  userInfo.renderUserInfo(dataUserInfo);
  // создание массива карочек из полученной информации
  cardList.renderItems(dataInitialCards);
})
.catch((errUserInfo, errInitialCards) => {
  alert(`Ошибка при загрузке информации профиля: ${errUserInfo}`);
  alert(`Ошибка при загрузке массива карточек: ${errInitialCards}`);
})

// создание функционала экземпляра попапа с персональной информацией
const popupWithPersInfoForm = new PopupWithForm(
  popupPersInfoSelector,
  {handleFormSubmit: (formData) => {
    // сохранение новой инфрмации о пользователе посредством запроса PATCH
    api.changeUserInfo(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        alert(`Ошибка при обновлнии данных пользователя: ${err}`);
      });
    }
  }
);

// + обработчики для попапа с персональной информацией
popupWithPersInfoForm.setEventListeners();

buttonEdit.addEventListener('click', () => {
  // получение информации о пользователе со страницы
  const userInfoOnPage = userInfo.getUserInfo();
  // вставка данных пользователя в форму попапа
  popupWithPersInfoForm.setInputValues(userInfoOnPage);
  // скрытие прошлых ошибок
  formInfoValidator.resetValidation();
  // открытие попапа
  popupWithPersInfoForm.open();
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
    // отправка запроса на сервер для создания новой карточки и ее добавление
    api.createNewCard(element)
      .then((data) => {
        cardList.addItem(createCard(data));
      })
      .catch((err) => {
        alert(`Ошибка при создании новой карточки: ${err}`);
      })
    }
  }
);

// добавление обработчиков попапа с новой карточкой
popupWithNewCardForm.setEventListeners();

// Открытие попапа для добавления карточек
buttonAdd.addEventListener('click', () => {
  // скрытие прошлых ошибок
  formCardsValidator.resetValidation();
  // открытие попапа
  popupWithNewCardForm.open();
});

// создание попапа для смены авататра
const popupNewAvatar = new PopupWithForm(popupAvatarSelector, 
  {handleFormSubmit: (formData) => {
    // отправка запроса на сервер для смены аватара
    api.changeAvatar(formData.link)
      .then((data) => {
        avatar.src = data.avatar;
      })
      .catch((err) => {
        alert(`Ошибка при смене аватара: ${err}`);
      });
    }
  }
);
// добавление обработчиков попапу со сменой авататра
popupNewAvatar.setEventListeners();

avatarOverlay.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  popupNewAvatar.open();
})