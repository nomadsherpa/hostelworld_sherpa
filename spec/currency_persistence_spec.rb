# frozen_string_literal: true

describe "Currency Persistence", type: :feature do
  let(:base_url) { "https://www.hostelworld.com" }

  scenario "Currency selection persists across sessions" do
    visit base_url

    # USD is not selected
    currency_container = all(".pill-content.menu-pill")[2]
    expect(currency_container.text).not_to eq("USD")

    # When the user selects USD
    currency_container.click
    find('[aria-label="US Dollar (USD)"]').click

    # Wait for the page to reload
    expect(page).to have_no_css(".modal-overlay")

    # When the user closes the browser and opens it again
    Capybara.reset_session!
    visit base_url

    # The currency should persist
    currency_container = all(".pill-content.menu-pill")[2]
    expect(currency_container).to have_text("USD")
  end
end
