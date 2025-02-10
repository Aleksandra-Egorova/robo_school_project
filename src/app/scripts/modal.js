const openModalBtns = document.querySelectorAll('.teacher-info__more');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modal = document.querySelector('.modal');
const tabButtons = document.querySelectorAll('.nav-tabs__btn');
const tabsContent = document.querySelectorAll('.tabs-content__info');
const dropdownArrow = document.querySelector('.dropdown-btn__arrow');
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownTabButtons = document.querySelectorAll('.dropdown-menu__btn');
const dropdownBtnText = document.querySelector('.dropdown-btn__text');
const modalContent = document.querySelector('.modal__content');
const textSpan = dropdownBtn.querySelector('.dropdown-btn__text');

const closeModal = () => {
  modal.classList.remove('modal--open');
  document.body.classList.remove('body--noscroll');

  tabsContent.forEach((tab) => {
    tab.classList.remove('tabs-content__info--active');
  });

  tabButtons.forEach((tabBtn) => {
    tabBtn.classList.remove('nav-tabs__btn--active');
  });

  dropdownTabButtons.forEach((dropdownTabBtn) => {
    dropdownTabBtn.classList.remove('dropdown-menu__btn--active');
  });

  dropdownBtnText.textContent = dropdownTabButtons[0].textContent;
};

const handleCloseModalClick = (event) => {
  const isModalCloseNeeded = event.target === modal || event.code === 'Escape';

  if (!isModalCloseNeeded) {
    return;
  }

  closeModal();
};

closeModalBtn.addEventListener('click', closeModal);

const openModal = () => {
  modal.classList.add('modal--open');
  document.body.classList.add('body--noscroll');

  tabButtons[0].classList.add('nav-tabs__btn--active');
  tabsContent[0].classList.add('tabs-content__info--active');
  dropdownTabButtons[0].classList.add('dropdown-menu__btn--active');
};

openModalBtns.forEach((button) => {
  button.addEventListener('click', openModal);
});

modal.addEventListener('click', handleCloseModalClick);
window.addEventListener('keydown', handleCloseModalClick);

const openDropdown = () => {
  dropdownArrow.classList.add('dropdown-btn__arrow--open');
  dropdownMenu.classList.add('dropdown-menu--open');
};

const closeDropdown = () => {
  dropdownArrow.classList.remove('dropdown-btn__arrow--open');
  dropdownMenu.classList.remove('dropdown-menu--open');
};

dropdownBtn.addEventListener('click', () => {
  if (
    dropdownArrow.classList.contains('dropdown-btn__arrow--open') &&
    dropdownMenu.classList.contains('dropdown-menu--open')
  ) {
    closeDropdown();
    return;
  }

  openDropdown();
});

const removeActiveFromTabs = () => {
  tabsContent.forEach((tab) => {
    tab.classList.remove('tabs-content__info--active');
  });
};

const removeActiveFromTabButtons = ({ isDropdown }) => {
  if (isDropdown) {
    dropdownTabButtons.forEach((dropdownTabBtn) => {
      dropdownTabBtn.classList.remove('dropdown-menu__btn--active');
    });

    return;
  }

  tabButtons.forEach((tabBtn) => {
    tabBtn.classList.remove('nav-tabs__btn--active');
  });
};

const setActiveTabBtn = ({ tabButton, isDropdown }) => {
  if (isDropdown) {
    tabButton.classList.add('dropdown-menu__btn--active');
    return;
  }

  tabButton.classList.add('nav-tabs__btn--active');
};

const setActiveTabContent = (dataTab) => {
  const activeTabsContent = document.querySelector(`#${dataTab}`);
  activeTabsContent.classList.add('tabs-content__info--active');
};

const handleSelectTab = (tabButton) => () => {
  removeActiveFromTabs();
  removeActiveFromTabButtons({ isDropdown: false });
  setActiveTabBtn({ tabButton, isDropdown: false });
  setActiveTabContent(tabButton.dataset.tab);
};

tabButtons.forEach((tabButton) => {
  tabButton.addEventListener('click', handleSelectTab(tabButton));
});

const createSelectDropdownOptionHandler = (optionBtn) => () => {
  closeDropdown();
  textSpan.textContent = optionBtn.textContent;
  removeActiveFromTabs();
  removeActiveFromTabButtons({ isDropdown: true });
  setActiveTabBtn({ tabButton: optionBtn, isDropdown: true });
  setActiveTabContent(optionBtn.dataset.tab);
};

dropdownTabButtons.forEach((dropdownTabBtn) => {
  dropdownTabBtn.addEventListener(
    'click',
    createSelectDropdownOptionHandler(dropdownTabBtn),
  );
});

const handleCLoseDropdownClick = (event) => {
  if (!event.target.closest('.dropdown')) {
    closeDropdown();
  }
};

modalContent.addEventListener('click', handleCLoseDropdownClick);
