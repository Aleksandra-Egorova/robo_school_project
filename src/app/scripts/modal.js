const openModalBtns = document.querySelectorAll('.teacher-info__more');
const closeModalBtn = document.querySelector('.modal__close-btn');
const modal = document.querySelector('.modal');
const tabButtons = document.querySelectorAll('.nav-tabs__btn');
const tabsContent = document.querySelectorAll('.tabs-content__info');

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
  };

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
      tabBtn.classList.remove('nav-tabs__btn--active')
    });

    const activeTabBtn = tabButton;
    activeTabBtn.classList.add('nav-tabs__btn--active');

    const activeTabsContent = document.querySelector(`#${tabButton.dataset.tab}`);
    activeTabsContent.classList.add('tabs-content__info--active');
  });
});

modal.addEventListener('click', handleCloseModalClick);
window.addEventListener('keydown', handleCloseModalClick);