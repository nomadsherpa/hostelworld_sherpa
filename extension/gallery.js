class Gallery {
  static up() {
    new Gallery().up();
  }

  constructor() {
    this.galleryContainer = document.querySelector('.gallery');
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  up() {
    this.setupArrowKeyNavigation();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains('modal-overlay')) {
            this.setUpPreviousAndNextImageLoading();
          }
        });
      });
    });

    observer.observe(this.galleryContainer, {
      childList: true,
      subtree: true,
    });
  }

  setUpPreviousAndNextImageLoading() {
    const thumbnailElements =
      this.galleryContainer.querySelectorAll('.modal-body img');
    this.galleryImageIDs = Array.from(thumbnailElements).map(
      (thumbnailElement) => {
        return thumbnailElement.getAttribute('src').split('/').pop();
      }
    );

    // Listen of navigation between images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName !== 'src') return;
        if (!mutation.target.classList.contains('lightbox-content')) return;

        this.loadNextAndPreviousImages(mutation.target.src);
      });
    });

    observer.observe(this.galleryContainer, {
      attributes: true,
      subtree: true,
      attributeFilter: ['src'],
    });
  }

  loadNextAndPreviousImages(currentImageUrl) {
    const currentImageID = currentImageUrl.split('/').pop();
    const currentImageIndex = this.galleryImageIDs.findIndex(
      (imageID) => imageID === currentImageID
    );

    const previousImageIndex = currentImageIndex - 1;
    const nextImageIndex = currentImageIndex + 1;

    if (previousImageIndex >= 0) {
      const previousImageID = this.galleryImageIDs[previousImageIndex];
      this.loadImage(currentImageUrl.replace(currentImageID, previousImageID));
    }

    if (nextImageIndex < this.galleryImageIDs.length) {
      const nextImageID = this.galleryImageIDs[nextImageIndex];
      this.loadImage(currentImageUrl.replace(currentImageID, nextImageID));
    }
  }

  loadImage(imageUrl) {
    const image = new Image();
    image.src = imageUrl;
  }

  setupArrowKeyNavigation() {
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
