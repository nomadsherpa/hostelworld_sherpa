class DefaultCurrencyManager {
  static up() {
    chrome.storage.local.get(['defaultCurrency'], (result) => {
      if (
        result.defaultCurrency &&
        DefaultCurrencyManager.currencyCookie() !== result.defaultCurrency
      ) {
        DefaultCurrencyManager.changeToDefault(result.defaultCurrency);
      } else {
        DefaultCurrencyManager.setupChangeListener();
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

    // Are we on the property details or search page?
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
