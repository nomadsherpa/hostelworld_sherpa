# frozen_string_literal: true

require "capybara/rspec"
require "selenium-webdriver"
require "./spec/support/mitmdump_proxy"

Capybara.register_driver :remote_selenium_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument("--no-sandbox")
  options.add_argument("--disable-dev-shm-usage")
  options.add_argument("--start-maximized")
  options.add_argument("load-extension=/extension")

  options.add_preference("profile.managed_default_content_settings.images", 2)

  if ENV["HEADLESS"] != "false"
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
  end

  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    url: "http://selenium:4444/wd/hub",
    options: options
  )
end
Capybara.register_driver :remote_selenium_chrome_proxy do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument("--no-sandbox")
  options.add_argument("--disable-dev-shm-usage")
  options.add_argument("--start-maximized")
  options.add_argument("load-extension=/extension")
  options.add_argument("--proxy-server=test_runner:8080")
  options.add_argument("--ignore-certificate-errors") # Required for MITM proxy

  options.add_preference("profile.managed_default_content_settings.images", 2)

  if ENV["HEADLESS"] != "false"
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
  end

  Capybara::Selenium::Driver.new(
    app,
    browser: :remote,
    url: "http://selenium:4444/wd/hub",
    options: options
  )
end

Capybara.default_driver = :remote_selenium_chrome
Capybara.default_max_wait_time = ENV.fetch("CAPYBARA_TIMEOUT", 30).to_i

RSpec.configure do |config|
  config.around(:each, :proxy) do |example|
    MitmdumpProxy.use_cassette(build_cassette_name(example.metadata))

    Capybara.using_driver(:remote_selenium_chrome_proxy) do
      example.run
    end
  ensure
    MitmdumpProxy.eject_cassette
  end

  config.after do
    Capybara.current_session.driver.quit
  end

  if ENV["CI"] == "true"
    config.filter_run_excluding local_only: true
  else
    config.filter_run_excluding ci_only: true
  end

  # rspec-expectations config goes here. You can use an alternate
  # assertion/expectation library such as wrong or the stdlib/minitest
  # assertions if you prefer.
  config.expect_with :rspec do |expectations|
    # This option will default to `true` in RSpec 4. It makes the `description`
    # and `failure_message` of custom matchers include text for helper methods
    # defined using `chain`, e.g.:
    #     be_bigger_than(2).and_smaller_than(4).description
    #     # => "be bigger than 2 and smaller than 4"
    # ...rather than:
    #     # => "be bigger than 2"
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  # rspec-mocks config goes here. You can use an alternate test double
  # library (such as bogus or mocha) by changing the `mock_with` option here.
  config.mock_with :rspec do |mocks|
    # Prevents you from mocking or stubbing a method that does not exist on
    # a real object. This is generally recommended, and will default to
    # `true` in RSpec 4.
    mocks.verify_partial_doubles = true
  end

  # This option will default to `:apply_to_host_groups` in RSpec 4 (and will
  # have no way to turn it off -- the option exists only for backwards
  # compatibility in RSpec 3). It causes shared context metadata to be
  # inherited by the metadata hash of host groups and examples, rather than
  # triggering implicit auto-inclusion in groups with matching metadata.
  config.shared_context_metadata_behavior = :apply_to_host_groups
end

def build_cassette_name(example_metadata)
  if example_metadata[:proxy].is_a?(TrueClass)
    [
      example_metadata[:example_group][:description].gsub(" ", "_").downcase,
      example_metadata[:description].gsub(" ", "_").downcase
    ].join("__")
  else
    example_metadata[:proxy].to_s
  end
end
