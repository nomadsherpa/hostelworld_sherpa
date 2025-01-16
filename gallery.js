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

    // Hostelworld is using the same aria-label for both next and previous buttons
    // and it hides the previous button when we are on the first image
    // and the next button when we are on the one.
    const buttons = document.querySelectorAll('[aria-label="Next"]');
    let prevButton, nextButton;

    if (buttons.length === 1) {
      // The previous sibling of the next button is the image itself
      // when we are on the first image
      if (buttons[0].previousElementSibling) {
        prevButton = null;
        nextButton = buttons[0];
      } else {
        prevButton = buttons[0];
        nextButton = null;
      }
    } else {
      prevButton = buttons[0];
      nextButton = buttons[1];
    }

    switch (event.key) {
      case 'ArrowRight':
        if (nextButton) {
          nextButton.click();
          event.preventDefault();
        }
        break;
      case 'ArrowLeft':
        if (prevButton) {
          prevButton.click();
          event.preventDefault();
        }
        break;
    }
  }
}

Gallery.up();
