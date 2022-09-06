export class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteButtonClick, userIdSelector, handleAddLike, handleDeleteLike) {
    this._link = data.link;
    this._name = data.name;

    // this._likes = data.likes;
    this._data = data;

    // id, который будет передаваться в переменную cardOpenId для дальнейшей идентификации карточки при открытии попапа для подтверждения удаления
    this._cardId = data._id;
    // id создателей карточек (приходят с сервера)
    this._cardOwnerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    // id пользователя, с которым будем сравнивать id создателей карточек
    this._userIdSelector = userIdSelector;
    // функция для +/- лайка
    this._handleDeleteLike = handleDeleteLike;
    this._handleAddLike = handleAddLike;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._cardName = this._element.querySelector('.element__title');
    this._deleteButton = this._element.querySelector('.element__trash-button');

    // проверка, является ли пользователь создателем карточки, для скрытия кнопки удаления у чужих карточек
    if (this._cardOwnerId !== this._userIdSelector) {
      this._deleteButton.classList.add('element__trash-button_type_hidden');
    }

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = `${this._name}.`;
    this._cardName.textContent = this._name;

    this._updateLikeCounter(this._data);

    return this._element;
  }

  // проверка карточки на наличие лайка пользователя
  _isLiked() {
    return this._likes.some((user) => {
      return user._id === this._userIdSelector;
    })
  }

  // обновление счетчика лайков
  _updateLikeCounter(info) {
    this._likes = info.likes;
    this._likeCounter.textContent = `${this._likes.length}`;
    if (this._isLiked()) {
      this._likeButton.classList.add('element__like-button_type_active');
    } else {
      this._likeButton.classList.remove('element__like-button_type_active');
    };
  }

  _handleLikeButton() {
    if (this._isLiked()) {
      this._handleDeleteLike(this._cardId)
      .then((data) => {
        this._updateLikeCounter(data);
      });
      } else {
        this._handleAddLike(this._cardId)
        .then((data) => {
          this._updateLikeCounter(data);
        });
      };
  }
  
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    }); 

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick(this._cardId, this._element);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}


// export class Card {
//   constructor(data, templateSelector, handleCardClick, handleDeleteButtonClick, userIdSelector, handleAddLike, handleDeleteLike) {
//     this._link = data.link;
//     this._name = data.name;
//     this._likes = data.likes;
//     // id, который будет передаваться в переменную cardOpenId для дальнейшей идентификации карточки при открытии попапа для подтверждения удаления
//     this._cardId = data._id;
//     // id создателей карточек (приходят с сервера)
//     this._cardOwnerId = data.owner._id;
//     this._templateSelector = templateSelector;
//     this._handleCardClick = handleCardClick;
//     this._handleDeleteButtonClick = handleDeleteButtonClick;
//     // id пользователя, с которым будем сравнивать id создателей карточек
//     this._userIdSelector = userIdSelector;
//     // функция для +/- лайка
//     this._handleDeleteLike = handleDeleteLike;
//     this._handleAddLike = handleAddLike;
//   }

//   _getTemplate() {
//     const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
//     return cardElement;
//   }

//   generateCard() {
//     this._element = this._getTemplate();
//     this._cardImage = this._element.querySelector('.element__image');
//     this._likeButton = this._element.querySelector('.element__like-button');
//     this._likeCounter = this._element.querySelector('.element__like-counter');
//     this._cardName = this._element.querySelector('.element__title');
//     this._deleteButton = this._element.querySelector('.element__trash-button');

//     // проверка, является ли пользователь создателем карточки, для скрытия кнопки удаления у чужих карточек
//     if (this._cardOwnerId !== this._userIdSelector) {
//       this._deleteButton.classList.add('element__trash-button_type_hidden');
//     }

//     this._setEventListeners();

//     this._cardImage.src = this._link;
//     this._cardImage.alt = `${this._name}.`;
//     this._cardName.textContent = this._name;

//     // обновление счетчика лайков при загрузке страницы
//     this._likeCounter.textContent = `${this._likes.length}`;

//     // проверка состояния лайка при загрузке страницы
//     if (this._isLiked()) {
//       this._likeButton.classList.add('element__like-button_type_active');
//     } else {
//       this._likeButton.classList.remove('element__like-button_type_active');
//     };

//     return this._element;
//   }

//   // проверка карточки на наличие лайка пользователя
//   _isLiked() {
//     return this._likes.some((user) => {
//       return user._id === this._userIdSelector;
//     })
//   }

//   // обновление счетчика лайков
//   _updateLikeCounter(info) {
//     this._likes = info.likes;
//     this._likeCounter.textContent = `${this._likes.length}`;
//     this._likeButton.classList.toggle('element__like-button_type_active');
//   }

//   _handleLikeButton() {
//     if (this._isLiked()) {
//       this._handleDeleteLike(this._cardId)
//       .then((data) => {
//         this._updateLikeCounter(data);
//       });
//       } else {
//         this._handleAddLike(this._cardId)
//         .then((data) => {
//           this._updateLikeCounter(data);
//         });
//       };
//   }
  
//   _setEventListeners() {
//     this._likeButton.addEventListener('click', () => {
//       this._handleLikeButton();
//     }); 

//     this._deleteButton.addEventListener('click', () => {
//       this._handleDeleteButtonClick(this._cardId, this._element);
//     });

//     this._cardImage.addEventListener('click', () => {
//       this._handleCardClick(this._link, this._name);
//     });
//   }
// }