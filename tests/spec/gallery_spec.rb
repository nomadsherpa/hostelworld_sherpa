require "spec_helper"

RSpec.describe "Capybara Example", type: :feature do
  it "visits a page" do
    visit "https://example.com"
    expect(page).to have_content("Example Domain")
  end
end
