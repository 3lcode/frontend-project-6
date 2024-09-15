const cardContainer = document.querySelector(".places__list");
// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content
const cardElement = cardTemplate.querySelector(".card");

// Модальныее окна
const imagePopup = document.querySelector(".popup_type_image");
imagePopup.classList.add("popup_is-animated");
const popupImageImage = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__caption");
const popupImageCloseButton = imagePopup.querySelector(".popup__close");
popupImageCloseButton.addEventListener('click', () => {
    closePopup(imagePopup);
});


function openPopup(popup) {      
    popup.classList.add('popup_is-opened');
}

function closePopup(popup) {      
    popup.classList.remove('popup_is-opened');
}


// Функция создания карточки
function createCard(title, imageLink) {
    const card = cardElement.cloneNode(true);
    
    card.querySelector(".card__title").textContent = title;
    const image = card.querySelector(".card__image");
    image.src = imageLink;
    image.alt = title;

    image.addEventListener('click', () => {
        popupImageImage.src = imageLink;
        popupImageImage.alt = title;
        popupImageCaption.textContent = title;
        openPopup(imagePopup);
    });

    const likeButton = card.querySelector(".card__like-button");
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle("card__like-button_is-active");
    });

    const cardDelete = card.querySelector(".card__delete-button");
    cardDelete.addEventListener('click', () => {
        card.remove();
    });


    return card;
}


// Вывести карточки на страницу
initialCards.forEach(element => {
    const card = createCard(element.name, element.link);
    cardContainer.append(card);
});


// Форма редактирования профиля пользователя
const profilePopup = document.querySelector(".popup_type_edit");
profilePopup.classList.add("popup_is-animated");
const profileNameElement =  document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(".profile__description");

const editProfileButton = document.querySelector(".profile__edit-button");
const popupProfileName = profilePopup.querySelector(".popup__input_type_name");
const popupProfileDescription = profilePopup.querySelector(".popup__input_type_description");

editProfileButton.addEventListener('click', () => {
    popupProfileName.value = profileNameElement.textContent;
    popupProfileDescription.value = profileDescriptionElement.textContent;
    openPopup(profilePopup);
});

const popupProfileCloseButton = profilePopup.querySelector(".popup__close");
const profileFormElement = profilePopup.querySelector(".popup__form");

popupProfileCloseButton.addEventListener('click', () => {
    closePopup(profilePopup);
});

profileFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = popupProfileName.value;
    const description = popupProfileDescription.value;

    profileNameElement.textContent = name;
    profileDescriptionElement.textContent = description;

    closePopup(profilePopup);
});


// Форма добавления карточки
const cardPopup = document.querySelector(".popup_type_new-card");
cardPopup.classList.add("popup_is-animated");
const addCardButton = document.querySelector(".profile__add-button");

const popupCardCloseButton = cardPopup.querySelector(".popup__close");
const popupCardFormElement = cardPopup.querySelector(".popup__form");

const popupCardName = cardPopup.querySelector(".popup__input_type_card-name");
const popupCardLink = cardPopup.querySelector(".popup__input_type_url");

addCardButton.addEventListener('click', () => {
    openPopup(cardPopup);
});

function closeCardPopup() {
    closePopup(cardPopup);
    popupCardName.value = "";
    popupCardLink.value = "";
}

popupCardCloseButton.addEventListener('click', closeCardPopup);

popupCardFormElement.addEventListener('submit', (e) => {
    e.preventDefault();

    const card = createCard(popupCardName.value, popupCardLink.value);
    cardContainer.prepend(card);
    closeCardPopup();
});