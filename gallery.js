class Gallery {
  static up() {
    new Gallery().up();
  }

  constructor() {
    this.galleryContainer = document.querySelector('.gallery');
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  up() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    // Listen only for the arrow keys
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

    // Skip if the gallery is not open
    if (!this.galleryContainer.querySelector('.image-lightbox')) return;

    switch (event.key) {
      case 'ArrowLeft':
        this.showPreviousImage();
        break;
      case 'ArrowRight':
        this.showNextImage();
        break;
    }
  }

  showPreviousImage() {
    const previousImageButton = this.galleryContainer.querySelector(
      '.image-lightbox-container > button:first-child'
    );

    if (previousImageButton) {
      previousImageButton.click();
    }
  }

  showNextImage() {
    const nextImageButton = this.galleryContainer.querySelector(
      '.image-lightbox-container > button:last-child'
    );

    if (nextImageButton) {
      nextImageButton.click();
    }
  }
}

Gallery.up();
