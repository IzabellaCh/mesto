const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__field_type_name');
const jobInput = formElement.querySelector('.popup__field_type_description');
const namePlace = document.querySelector('.profile__name');
const descriptionPlace = document.querySelector('.profile__subtitle');

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = namePlace.textContent;
  jobInput.value = descriptionPlace.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  namePlace.textContent = nameInput.value;
  descriptionPlace.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);