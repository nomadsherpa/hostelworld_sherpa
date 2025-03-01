document.addEventListener('DOMContentLoaded', () => {
  const defaultCurrencyElement = document.getElementById('default-currency');
  const resetCurrencyButton = document.getElementById('reset-currency-button');

  // Fetch the default currency
  chrome.storage.local.get(['defaultCurrency'], (result) => {
    if (result.defaultCurrency) {
      defaultCurrencyElement.textContent = result.defaultCurrency;
      resetCurrencyButton.classList.remove('hidden');
    } else {
      defaultCurrencyElement.textContent = 'Not set';
    }
  });

  // Handle reset button click
  resetCurrencyButton.addEventListener('click', () => {
    chrome.storage.local.remove('defaultCurrency', () => {
      resetCurrencyButton.classList.add('hidden');
      defaultCurrencyElement.textContent = 'Not set';
    });
  });
});
