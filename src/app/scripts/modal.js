const openModalBtns = document.querySelectorAll('.teacher-info__more');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modal = document.querySelector('.modal');
const tabButtons = document.querySelectorAll('.nav-tabs__btn');
const tabsContent = document.querySelectorAll('.tabs-content__info');
const dropdownArrow = document.querySelector('.dropdown-btn__arrow');
let dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');
const closeMobileModalBtn = document.querySelector('.modal__close-btn--mobile');
const dropdownTabButtons = document.querySelectorAll('.dropdown-menu__btn');

const closeModal = () => {
  modal.classList.remove('modal--open');
  document.body.classList.remove('body--noscroll');

  tabsContent.forEach((tab) => {
    tab.classList.remove('tabs-content__info--active');
  });

  tabButtons.forEach((tabBtn) => {
    tabBtn.classList.remove('nav-tabs__btn--active');
  });
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
    closeDropdown();
  } else {
    openDropdown();
  };
});

closeMobileModalBtn.addEventListener('click', closeModal);

dropdownTabButtons.forEach((dropdownTabBtn) => {
  dropdownTabBtn.addEventListener('click', closeDropdown);
});

dropdownTabButtons.forEach((dropdownTabBtn) => {
  dropdownTabBtn.addEventListener('click', () => {
    tabsContent.forEach((tab) => {
      tab.classList.remove('tabs-content__info--active');
    });

    const activeTabBtn = dropdownTabBtn;
    const activeTabsContent = document.querySelector(`#${dropdownTabBtn.dataset.tab}`);

    activeTabsContent.classList.add('tabs-content__info--active');
  });
});

// Изменяем текст кнопки дропдауна на текст выбранного элемента
dropdownTabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const textSpan = dropdownBtn.querySelector('.dropdown-btn__text');
    textSpan.textContent = btn.textContent;
  });
});

//если элемент выбран, то он пропадает из списка дропдауна, и наоборт - если не выбран, то появляется:
let displayButton = dropdownTabButtons[0];

dropdownTabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (displayButton) {
      displayButton.style.display = 'block';
    };

    displayButton = button;
    displayButton.style.display = 'none';
  });
});

//для того чтобы вернуть дропдаун в дефолтное состояние
const dropdownBtnText = document.querySelector('.dropdown-btn__text');

const doDefaultDropdown = () => {
  dropdownBtnText.textContent = dropdownTabButtons[0].textContent;

  if (displayButton) {
    displayButton.style.display = 'block';
  };

  displayButton = dropdownTabButtons[0];
  displayButton.style.display = 'none';
};

openModalBtns.forEach((btn) => {
  btn.addEventListener('click', doDefaultDropdown);
});

closeMobileModalBtn.addEventListener('click', doDefaultDropdown);

// При клике вне селекта, если он открыт, он закрывается
const modalContent = document.querySelector('.modal__content');

const handleCLoseDropdownClick = (event) => {
  if (!event.target.closest('.dropdown')) {
    closeDropdown();
  };
};

modalContent.addEventListener('click', handleCLoseDropdownClick);
