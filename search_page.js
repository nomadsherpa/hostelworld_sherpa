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
        hijackClick(element);
      }
    });
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
});

function hijackClick(element) {
  element
    .querySelector('.property-photos')
    .addEventListener('click', clickHandler);
  element
    .querySelector('.property-info-container')
    .addEventListener('click', clickHandler);
}

function clickHandler(e) {
  // Open the property in the current tab if the user is not holding the meta key
  if (!e.metaKey) return;

  e.stopPropagation();
  e.preventDefault();

  const url = document.querySelector(
    '.property-card-container.horizontal.selected'
  ).href;
  window.open(url, '_blank');
}
