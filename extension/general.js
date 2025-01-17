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

class DefaultCurrencyManager {
  static up() {
    chrome.storage.local.get(['defaultCurrency'], (result) => {
      if (result.defaultCurrency) {
        if (
          DefaultCurrencyManager.currencyCookie() === result.defaultCurrency
        ) {
          DefaultCurrencyManager.setupChangeListener();
        } else {
          DefaultCurrencyManager.changeToDefault(result.defaultCurrency);
        }
      }
    });
  }

  static currencyCookie() {
    return document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('currency='))
      .split('=')[1];
  }

  static changeToDefault(defaultCurrency) {
    document.cookie = `currency=${defaultCurrency}; domain=.hostelworld.com; path=/; max-age=2147483647; SameSite=Strict`;

    // Are we on the hostel details or search page?
    if (
      window.location.pathname.includes('/hosteldetails.php') ||
      window.location.pathname.includes('/s')
    ) {
      window.stop();
      location.reload();
    }
  }

  static setupChangeListener() {
    cookieStore.addEventListener('change', (event) => {
      const currencyCookie = event.changed.find(
        (cookie) => cookie.name === 'currency'
      );

      if (!currencyCookie) return;

      chrome.storage.local.set({ defaultCurrency: currencyCookie.value });
    });
  }
}

DefaultCurrencyManager.up();
