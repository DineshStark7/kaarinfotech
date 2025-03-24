document.addEventListener('DOMContentLoaded', () => {
    const mainImages = document.querySelectorAll('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.querySelector('.nav-arrow.prev');
    const nextButton = document.querySelector('.nav-arrow.next');
    let currentIndex = 0;
  
    // Update Gallery
    function updateGallery(index) {
      // Update Main Image
      mainImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
  
      // Update Thumbnails
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
  
      currentIndex = index;
    }
  
    // Thumbnail Click
    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => updateGallery(index));
    });
  
    // Navigation Arrows
    prevButton.addEventListener('click', () => {
      const newIndex = (currentIndex - 1 + mainImages.length) % mainImages.length;
      updateGallery(newIndex);
    });
  
    nextButton.addEventListener('click', () => {
      const newIndex = (currentIndex + 1) % mainImages.length;
      updateGallery(newIndex);
    });
  
    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevButton.click();
      } else if (e.key === 'ArrowRight') {
        nextButton.click();
      }
    });
  });