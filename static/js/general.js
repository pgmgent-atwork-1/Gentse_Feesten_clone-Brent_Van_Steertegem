const init = () => {
    cacheHeaderElements();
    registerListeners();
    randomizeHeader();
}

const cacheHeaderElements = () => {
  this.$menu = document.querySelector('#menu');
  this.$toggleMenuButton = document.querySelector('#toggle_menu');
  this.$toggleMenuImage = document.querySelector('#toggle_menu_img');
}

const registerListeners = () => {
  this.$toggleMenuButton.addEventListener('click', () => {
    if (!this.$menu.classList.contains('opened')){
      this.$menu.classList.add('opened');
      this.$toggleMenuImage.src = 'static/media/img/icons/cross.svg';
      document.body.classList.add('menu_opened');
    } else {
      this.$menu.classList.remove('opened');
      this.$toggleMenuImage.src = 'static/media/img/icons/hamburger.svg';
      document.body.classList.remove('menu_opened');
    }
  });
}

const randomizeHeader = () => {
    const num = Math.floor(Math.random() * 8) + 1;
    document.querySelector("header").querySelector("div").style.backgroundImage = `url("static/media/img/header_0${num}.jpg")`;
}

window.addEventListener("load", init);