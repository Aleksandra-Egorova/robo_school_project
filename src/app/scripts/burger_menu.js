const burgerMenu = document.querySelector('.burger-menu');
const openBurgerMenuBtn = document.querySelector('.mobile-btns__burger');
const closeBurgerMenuBtn = document.querySelector('.burger-menu__close');
const burgerMenuLinks = document.querySelectorAll('.list-item__link');
const sectionAbout = document.querySelector('.about');
const sectionTeachers = document.querySelector('.teachers');
const sectionPrices = document.querySelector('.prices');

const openBurgerMenu = () => {
  burgerMenu.classList.add('burger-menu--open');
  document.body.classList.add('body--noscroll');
  sectionAbout.classList.add('about__anchor-target');
  sectionTeachers.classList.add('teachers__anchor-target');
  sectionPrices.classList.add('prices__anchor-target');
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
