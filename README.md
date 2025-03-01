# Hostelworld Sherpa

[![CI](https://github.com/nomadsherpa/hostelworld_sherpa/actions/workflows/ci.yml/badge.svg)](https://github.com/nomadsherpa/hostelworld_sherpa/actions/workflows/ci.yml)

This is a Chrome extension that improves the user experience of Hostelworld.

# Features and improvements

- Remember what currency you set after you close the browser.
- Map view of the search page
  - Enable to open properties on a new tab with ctrl/cmd+click or right click on the property card then Open link in new tab.
- Image gallery
  - Navigate between images with the arrow keys.
  - Preload the next and previous images to speed up scrolling.
  - Images don't jump when switching between the first and second or the last and penultimate images.
  - Close the gallery with the Escape key.
- Close dialogs and overlays with the Escape key.

# Original problems this extension solves

## Currency

After you close the browser Hostelworld forgets what currency you set and shows you the currency of the country you are in. Personally I don't like to convert the prices from whatever currency to a currency I'm familiar with every time I open the site.
This extension saves the currency you set and restores it when you open the site.

## Map view of the search page

The property cards are not links, so you can't open them in a new tab only in the current tab. Then when you go back the map is reset and you have to reposition it and zoom in again. This doesn't happen when you open the property in a new tab.

## Image gallery

Hostelworld does not load the next and previous images until you open them. This produces a glitch when you navigate to an image that is not loaded: the current image won't disappear until the new image is loaded giving you the feeling that the image is stuck.

Hostelworld forces you to click on those small arrows to navigate between images.

## Closing dialogs and overlays

Hostelworld forces you to click on those small close button to close dialogs and overlays.


# Local development

## Testing

To run the test suite, use the following command:

```sh
make test
```

### Viewing tests in a real browser

To see the tests running in a real browser, set the `HEADLESS` environment variable to `false` and run the tests:

```sh
HEADLESS=false make test
```

Then open this URL in your browser:

```sh
http://localhost:7900/?autoconnect=1&resize=scale
```
