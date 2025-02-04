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

tabButtons.forEach((tabButton) => {
  tabButton.addEventListener('click', () => {
    tabsContent.forEach((tab) => {
      tab.classList.remove('tabs-content__info--active');
    });

    tabButtons.forEach((tabBtn) => {
      tabBtn.classList.remove('nav-tabs__btn--active');
    });

    const activeTabBtn = tabButton;
    activeTabBtn.classList.add('nav-tabs__btn--active');

    const activeTabsContent = document.querySelector(`#${tabButton.dataset.tab}`);
    activeTabsContent.classList.add('tabs-content__info--active');
  });
});

modal.addEventListener('click', handleCloseModalClick);
window.addEventListener('keydown', handleCloseModalClick);

//Dropdown
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
    return;
  };

  openDropdown();
});

dropdownTabButtons.forEach((dropdownTabBtn) => {
  dropdownTabBtn.addEventListener('click', closeDropdown);
});

const rermoveActiveTabsContent = (tabsContent) => {
  tabsContent.forEach((tab) => {
    tab.classList.remove('tabs-content__info--active');
  });
};

const removeActiveButtons = (dropdownTabButtons) => {
  dropdownTabButtons.forEach((dropdownTabBtn) => {
    dropdownTabBtn.classList.remove('dropdown-menu__btn--active');
  });
};

const addActiveButtons = (button) => {
  button.classList.add('dropdown-menu__btn--active');
};

const addActiveTabsContent = (button) => {
  const activeTabsContent = document.querySelector(`#${button.dataset.tab}`);
  activeTabsContent.classList.add('tabs-content__info--active');
};

dropdownTabButtons.forEach((dropdownTabBtn) => {
  dropdownTabBtn.addEventListener('click', () => {
    rermoveActiveTabsContent(tabsContent);
    removeActiveButtons(dropdownTabButtons);
    addActiveButtons(dropdownTabBtn);
    addActiveTabsContent(dropdownTabBtn);
  });
});

// Изменяем текст кнопки дропдауна на текст выбранного элемента
dropdownTabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    textSpan.textContent = btn.textContent;
  });
});

// При клике вне селекта, если он открыт, он закрывается
const handleCLoseDropdownClick = (event) => {
  if (!event.target.closest('.dropdown')) {
    closeDropdown();
  }
};

modalContent.addEventListener('click', handleCLoseDropdownClick);
