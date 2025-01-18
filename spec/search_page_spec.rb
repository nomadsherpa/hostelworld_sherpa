# frozen_string_literal: true

describe "Search page - Open property in a new tab from the map view", type: :feature do
  scenario do
    # Visit the search results page
    visit "https://www.hostelworld.com/pwa/wds/s?q=Da%20Nang,%20Vietnam&country=Da%20Nang&city=Da%20Nang&type=city&id=716"

    # Open the map view
    click_on "Map"

    # Open the first property on the map
    within(first(".property-info-header")) do
      all(".property-pins button").last.click
    end

    # Click on the property card on the map while holding the command key
    property_card_on_map = first(".map-container img.active-slide")
    page.driver.browser.action
        .key_down(:meta)
        .move_to(property_card_on_map.native)
        .click
        .key_up(:meta)
        .perform

    # The property details page should open in a new tab
    expect(windows.count).to eq(2)

    within_window(windows.last) do
      expect(page.current_url).to start_with("https://www.hostelworld.com/pwa/wds/hosteldetails.php")
    end
  end
end
