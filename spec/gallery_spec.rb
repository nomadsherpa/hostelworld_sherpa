describe "Gallery - Arrow navigation", type: :feature do
  scenario do
    visit "https://www.hostelworld.com/pwa/wds/hosteldetails.php/Rom-Casa-Hostel-Da-Nang/Da-Nang/278390"

    # When the user opens an image in the gallery
    first(".gallery-slider-item").click
    first(".gallery-mosaic img").click
    # Then the first image in the gallery is shown
    expect(page).to have_css(".image-lightbox-container button", count: 1)

    # When the user presses the right arrow key
    page.driver.browser.action.send_keys(:arrow_right).perform
    # Then we show the next image
    expect(page).to have_css(".image-lightbox-container button", count: 2)

    # When the user presses the left arrow key
    page.driver.browser.action.send_keys(:arrow_left).perform
    # Then we show the previous image
    expect(page).to have_css(".image-lightbox-container button", count: 1)
  end
end
