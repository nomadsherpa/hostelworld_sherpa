# frozen_string_literal: true

describe "Search page", type: :feature do
  scenario "Open property in a new tab from the map view", proxy: :search_page__new_tab do
    # Visit the search results page with map view
    visit "https://www.hostelworld.com/pwa/wds/s?q=Utila,%20Honduras&country=Honduras&city=Utila&type=city&id=13058&from=2025-05-01&to=2025-05-02&guests=1&display=map&page=1"

    # Open the first property on the map
    click_link_or_button(class: "pin-wrapper", match: :first)

    # Wait for the link to get its href attribute
    expect(page).to have_css(".map-container .property-card-container a[href]")

    property_card_link = first(".map-container a")

    # We generate the correct URL for the property card link
    expect(property_card_link.native.attribute(:href)).to eq("https://www.hostelworld.com/pwa/wds/hosteldetails.php/319581?from=2025-05-01&to=2025-05-02&guests=1")

    # Click on the property card while holding the command key
    page.driver.browser.action
        .key_down(:control)
        .move_to(property_card_link.native)
        .click
        .key_up(:control)
        .perform

    # The property details page should open in a new tab
    expect(windows.count).to eq(2)

    within_window(windows.last) do
      expect(page.current_url).to start_with("https://www.hostelworld.com/pwa/wds/hosteldetails.php")
    end
  end
end
