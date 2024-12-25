const slider = document.querySelector('.teachers__items'); 
const sliderButtons = document.querySelectorAll('.controls-buttons__arrow'); 
const sliderScrollbar = document.querySelector('.teachers-controls__scrollbar');
const scrollbarThumb = sliderScrollbar.querySelector('.teachers-controls__thumb');

let sliderMaxScrollLeft = slider.scrollWidth - slider.clientWidth;
scrollbarThumb.style.width = `${(slider.clientWidth/slider.scrollWidth) * 100}%`; 

sliderButtons.forEach(button => {
  button.addEventListener('click', () => { 
    const direction = button.id === 'btn-prev' ? -1 : 1;
    let scrollAmount = sliderScrollbar.clientWidth * direction; 
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' }); 
  });
});

const updateThumbPosition = () => { 
  const scrollPosition = slider.scrollLeft;
  const thumbPosition = (scrollPosition / sliderMaxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);

  scrollbarThumb.style.left = `${thumbPosition}px`;
};

slider.addEventListener('scroll', updateThumbPosition);

scrollbarThumb.addEventListener('mousedown', (event) => {
  const startX = event.clientX; 
  const thumbPosition = scrollbarThumb.offsetLeft;

  const handleMouseMove = event => {
    const deltaX = event.clientX - startX;
    const newThumbPosition = thumbPosition + deltaX;
    const maxThumbPosition = sliderScrollbar.offsetWidth - scrollbarThumb.offsetWidth;
    const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
    const scrollPosition = (boundedPosition / maxThumbPosition) * sliderMaxScrollLeft;

    scrollbarThumb.style.left = `${boundedPosition}px`;
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
  scrollbarThumb.style.width = `${(slider.clientWidth / slider.scrollWidth) * 100}%`;
});
