document.addEventListener('keydown', handleEscapeKey);

function handleEscapeKey(event) {
  if (event.key !== 'Escape') return;

  // Close lightboxes
  // This has to come first to close only the open image and not the whole gallery
  const lightboxCloseButton = document.querySelector('.close-lightbox');

  if (lightboxCloseButton) {
    lightboxCloseButton.click();
    return;
  }

  // Close the gallery
  const galleryCloseButton = document.querySelector('.gallery .close');

  if (galleryCloseButton) {
    galleryCloseButton.click();
    return;
  }

  // Close modals
  const modalCloseButton = document.querySelector('.modal-overlay .close');

  if (modalCloseButton) {
    modalCloseButton.click();
    return;
  }
}
