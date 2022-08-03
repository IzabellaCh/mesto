
//переменные, используемые в классе Card
// const elementTemplate = document.querySelector('#element-template').content;
// const cardImage = elementTemplate.querySelector('.element__image');
// // const cardName = elementTemplate.querySelector('.element__title');
// const likeButton = elementTemplate.querySelector('.element__like-button');
// const deleteButton = elementTemplate.querySelector('.element__trash-button');

//Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:

class Card {
  //принимает в конструктор её данные и селектор её template-элемента
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name + '.';
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _handleLikeButton() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_type_active');
  }
  
  _handleDeleteButton() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeButton();
    }); 

    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._handleDeleteButton();
    });
  }
}

export { Card };

