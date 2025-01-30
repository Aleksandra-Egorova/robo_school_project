const burgerMenu = document.querySelector('.burger-menu');
const openBurgerMenuBtn = document.querySelector('.mobile-btns__burger');
const closeBurgerMenuBtn = document.querySelector('.burger-menu__close');
const burgerMenuLinks = document.querySelectorAll('.list-item__link');

const openBurgerMenu = () => {
  burgerMenu.classList.add('burger-menu--open');
  document.body.classList.add('body--noscroll');
};

const closeBurgerMenu = () => {
  burgerMenu.classList.remove('burger-menu--open');
  document.body.classList.remove('body--noscroll');
};

openBurgerMenuBtn.addEventListener('click', openBurgerMenu);

closeBurgerMenuBtn.addEventListener('click', closeBurgerMenu);

burgerMenuLinks.forEach((link) => {
  link.addEventListener('click', closeBurgerMenu);
});
