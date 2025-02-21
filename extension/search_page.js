class SearchPage {
  static up() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((element) => {
          if (
            element.classList &&
            element.classList.contains('property-card-container', 'compact')
          ) {
            SearchPage.addPropertyCardLinkAsync(element);
          }
        });
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }

  static addPropertyCardLinkAsync(propertyCardElement) {
    const imgElement = propertyCardElement.querySelector('img');

    // Wait for the image to have a src attribute
    const checkImgSrc = setInterval(() => {
      if (imgElement.src) {
        clearInterval(checkImgSrc);
        SearchPage.addPropertyCardLink(propertyCardElement, imgElement);
      }
    }, 100);
  }

  // Create a new anchor that wraps the entire card content
  static addPropertyCardLink(propertyCardElement, propertyCardImageElement) {
    const url = SearchPage.getPropertyUrl(propertyCardImageElement);

    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
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

          SearchPage.updatePropertyCardLinkAsync(anchorElement, node);
        });
      });
    });

    observer.observe(propertyCardElement, {
      childList: true,
      subtree: true,
    });
  }

  static updatePropertyCardLinkAsync(anchorElement, propertyCardImageElement) {
    // Wait for the image to have a src attribute
    const checkImgSrc = setInterval(() => {
      if (propertyCardImageElement.src) {
        clearInterval(checkImgSrc);
        anchorElement.href = SearchPage.getPropertyUrl(
          propertyCardImageElement
        );
      }
    }, 100);
  }

  static getPropertyUrl(propertyCardImageElement) {
    const propertyId = propertyCardImageElement.src.split('/').slice(-2, -1)[0];

    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    const to = urlParams.get('to');
    const guests = urlParams.get('guests');

    return `https://www.hostelworld.com/pwa/wds/hosteldetails.php/${propertyId}?from=${from}&to=${to}&guests=${guests}`;
  }
}
