# frozen_string_literal: true

# Testing this feature requires the backend of Hostelworld to see if
# the selected currency is persisted after the user closes the browser
# This test tests only if we save the selected currency
# For the full test, see spec/currency_persistence_local_spec.rb
describe "Currency Persistence", :ci_only, :proxy, type: :feature do
  let(:base_url) { "https://www.hostelworld.com" }

  scenario "Currency selection persists across sessions" do
    visit base_url
    page.evaluate_script("document.body.classList.add('not-reloaded')")

    # USD is not selected
    currency_container = all(".pill-content.menu-pill")[2]
    expect(currency_container.text).not_to eq("USD")

    # Wait until JS builds the currency picker
    expect(page).to have_css(".currency-picker")
    # When the user selects USD
    currency_container.click
    find('[aria-label="US Dollar (USD)"]').click

    # It reloads the page
    expect(page).to have_no_css("body.not-reloaded")

    # And saves the selected currency to the local storage
    visit "chrome-extension://#{extension_id}/popup/index.html"

    stored_currency = page.evaluate_async_script(<<~JAVASCRIPT)
      const done = arguments[0];
      chrome.storage.local.get('defaultCurrency').then(result => {
        done(result['defaultCurrency']);
      });
    JAVASCRIPT

    expect(stored_currency).to eq("USD")
  end

  def extension_id
    visit("chrome://extensions/")
    extensions_manager = find(:css, "extensions-manager")
    extensions_list = extensions_manager.shadow_root.find("extensions-item-list")
    extensions_item = extensions_list.shadow_root.first("extensions-item")
    extensions_item[:id]
  end
end
