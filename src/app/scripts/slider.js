const teachersItems = document.querySelector('.teachers__items');
const slideButtons = document.querySelectorAll('.controls-buttons__arrow');
const sliderScrollBar = document.querySelector('.teachers__controls-scrollbar');
const scrollBarThumb = sliderScrollBar.querySelector('.teachers__controls-scrollbar__thumb');
let maxScrollLeft = teachersItems.scrollWidth - teachersItems.clientWidth;

slideButtons.forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.id === 'btn-prev' ? -1 : 1;
    let scrollAmount = 3 * sliderScrollBar.clientWidth * direction;
    teachersItems.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
});

const scrollThumbPosition = () => {
  const scrollPosition = teachersItems.scrollLeft;
  const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollBarThumb.offsetWidth);
  scrollBarThumb.style.left = `${thumbPosition}px`;
};

scrollBarThumb.addEventListener('mousedown', e => {
  const startX = e.clientX;
  const thumbPosition = scrollBarThumb.offsetLeft;

  const handleMouseMove = e => {
    const deltaX = e.clientX - startX;
    const newThumbPosition = thumbPosition + deltaX;
    const maxThumbPosition = sliderScrollBar.offsetWidth - scrollBarThumb.offsetWidth;
    const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
    const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

    scrollBarThumb.style.left = `${boundedPosition}px`;
    teachersItems.scrollLeft = scrollPosition;
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

teachersItems.addEventListener('scroll', () => {
  scrollThumbPosition();
});

window.addEventListener('resize', () => {
  maxScrollLeft = teachersItems.scrollWidth - teachersItems.clientWidth;
  scrollBarThumb.style.width = `${(teachersItems.clientWidth / teachersItems.scrollWidth) * 100}%`;

  slideButtons.forEach(button => {
    button.addEventListener('click', () => {
      const direction = button.id === 'btn-prev' ? -1 : 1;
      let scrollAmount = sliderScrollBar.clientWidth * direction;
      teachersItems.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
});
