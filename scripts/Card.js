
//переменные, используемые в классе Card
const elementTemplate = document.querySelector('#element-template').content;
// const cardImage = elementTemplate.querySelector('.element__image');
// const cardName = elementTemplate.querySelector('.element__title');
const likeButton = elementTemplate.querySelector('.element__like-button');
const deleteButton = elementTemplate.querySelector('.element__trash-button');

//Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:

class Card {
  //принимает в конструктор её данные и селектор её template-элемента
  constructor(name, link) {
    this._link = link;
    this._name = name;
  }

  _getTemplate() {
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name + '.';
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

export { Card };

