const slider = document.querySelector('.teachers__items'); 
const sliderButtons = document.querySelectorAll('.controls-buttons__arrow'); 
const sliderScrollBar = document.querySelector('.teachers-controls__scrollbar');
const scrollBarThumb = sliderScrollBar.querySelector('.teachers-controls__thumb');

let sliderMaxScrollLeft = slider.scrollWidth - slider.clientWidth;
scrollBarThumb.style.width = `${(slider.clientWidth/slider.scrollWidth) * 100}%`; 

sliderButtons.forEach(button => {
  button.addEventListener('click', () => { 
    const direction = button.id === 'btn-prev' ? -1 : 1;
    let scrollAmount = sliderScrollBar.clientWidth * direction; 
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' }); 
  });
});

const updateThumbPosition = () => { 
  const scrollPosition = slider.scrollLeft;
  const thumbPosition = (scrollPosition / sliderMaxScrollLeft) * (sliderScrollBar.clientWidth - scrollBarThumb.offsetWidth);

  scrollBarThumb.style.left = `${thumbPosition}px`;
};

slider.addEventListener('scroll', updateThumbPosition);

scrollBarThumb.addEventListener('mousedown', (event) => {
  const startX = event.clientX; 
  const thumbPosition = scrollBarThumb.offsetLeft;

  const handleMouseMove = event => {
    const deltaX = event.clientX - startX;
    const newThumbPosition = thumbPosition + deltaX;
    const maxThumbPosition = sliderScrollBar.offsetWidth - scrollBarThumb.offsetWidth;
    const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
    const scrollPosition = (boundedPosition / maxThumbPosition) * sliderMaxScrollLeft;

    scrollBarThumb.style.left = `${boundedPosition}px`;
    slider.scrollLeft = scrollPosition; 
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

window.addEventListener('resize', () => {
  sliderMaxScrollLeft = slider.scrollWidth - slider.clientWidth; 
  scrollBarThumb.style.width = `${(slider.clientWidth / slider.scrollWidth) * 100}%`;
});
