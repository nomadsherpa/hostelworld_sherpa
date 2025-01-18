class SearchPage {
  static up() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((element) => {
          if (
            element.classList &&
            element.classList.contains(
              'property-card-container',
              'compact',
              'horizontal'
            )
          ) {
            SearchPage.hijackPropertyClickOnMap(element);
          }
        });
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }

  // Open the property in a new tab if the user is holding the cmd/ctrl key or
  // using the middle mouse button. Otherwise, open the property in the
  // current tab.
  static hijackPropertyClickOnMap(propertyCardElement) {
    const photoElement = propertyCardElement.querySelector('.property-photos');
    const infoElement = propertyCardElement.querySelector(
      '.property-info-container'
    );

    // Add both click and mousedown event listeners
    ['click', 'mousedown'].forEach((eventType) => {
      photoElement.addEventListener(eventType, SearchPage.clickHandler);
      infoElement.addEventListener(eventType, SearchPage.clickHandler);
    });
  }

  static clickHandler(e) {
    if (!e.metaKey && !e.ctrlKey && !(e.type === 'mousedown' && e.button === 1))
      return;

    e.stopPropagation();
    e.preventDefault();

    const url = document.querySelector(
      '.property-card-container.horizontal.selected'
    ).href;
    window.open(url, '_blank');
  }
}

SearchPage.up();
