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
            SearchPage.addPropertyCardLink(element);
          }
        });
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }

  // Create a new anchor that wraps the entire card content
  static addPropertyCardLink(propertyCardElement) {
    const url = document.querySelector(
      '.property-card-container.horizontal.selected'
    ).href;

    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      text-decoration: none;
      background: transparent;
    `;

    anchorElement.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey) {
        // Bypass Hostelworld's default click handler
        e.stopPropagation();
      } else {
        // Fall back to Hostelworld's default click handler
        e.preventDefault();
      }
    });

    propertyCardElement.style.position = 'relative';
    propertyCardElement.insertBefore(
      anchorElement,
      propertyCardElement.firstChild
    );

    SearchPage.updatePropertyCardLinkOnPropertyChange(
      propertyCardElement,
      anchorElement
    );
  }

  static updatePropertyCardLinkOnPropertyChange(
    propertyCardElement,
    anchorElement
  ) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName !== 'IMG') return;

          const newUrl = document.querySelector(
            '.property-card-container.horizontal.selected'
          ).href;

          if (newUrl) {
            anchorElement.href = newUrl;
          }
        });
      });
    });

    observer.observe(propertyCardElement, {
      childList: true,
      subtree: true,
    });
  }
}

SearchPage.up();
