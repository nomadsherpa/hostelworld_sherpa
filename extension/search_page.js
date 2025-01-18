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

  // Open properties in new tab when they are clicked on the map while holding
  // the cmd key
  static hijackPropertyClickOnMap(propertyCardElement) {
    propertyCardElement
      .querySelector('.property-photos')
      .addEventListener('click', SearchPage.clickHandler);
    propertyCardElement
      .querySelector('.property-info-container')
      .addEventListener('click', SearchPage.clickHandler);
  }

  static clickHandler(e) {
    // Open the property in the current tab if the user is not holding the meta key
    if (!e.metaKey && !e.ctrlKey) return;

    e.stopPropagation();
    e.preventDefault();

    const url = document.querySelector(
      '.property-card-container.horizontal.selected'
    ).href;
    window.open(url, '_blank');
  }
}

SearchPage.up();
