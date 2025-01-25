DefaultCurrencyManager.up();

// Property details page?
if (document.querySelector('.property')) {
  Gallery.up();
}

// Search page?
if (
  document.querySelector('.search') &&
  document.querySelector('.search-header-filters')
) {
  SearchPage.up();
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (!node.classList) return;

      // Property details page?
      if (node.classList.contains('property')) {
        Gallery.up();
        return;
      }

      // Search page?
      if (
        node.classList.contains('search') &&
        node.childNodes[0].classList.contains('search-header-filters')
      ) {
        SearchPage.up();
      }
    });
  });
});

observer.observe(document, {
  childList: true,
  subtree: true,
});
