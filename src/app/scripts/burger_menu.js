const burgerMenu = document.querySelector('.burger-menu');
const openBurgerMenuBtn = document.querySelector('.mobile-btns__burger');
const closeBurgerMenuBtn = document.querySelector('.burger-menu__close');
const burgerMenuLinks = document.querySelectorAll('.list-item__link');

const openAndCloseBurgerMenu = () => {
  burgerMenu.classList.toggle('burger-menu--open');
  document.body.classList.toggle('body--noscroll');
};

openBurgerMenuBtn.addEventListener('click', openAndCloseBurgerMenu);

closeBurgerMenuBtn.addEventListener('click', openAndCloseBurgerMenu);

burgerMenuLinks.forEach((link) => {
  link.addEventListener('click', openAndCloseBurgerMenu);
});
