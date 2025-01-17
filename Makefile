.PHONY: help
help:
	@echo "test        - Run the test suite"
	@echo "test_visual - Run the test suite with visual browser (http://localhost:7900/?autoconnect=1&resize=scale)"

.PHONY: test
test:
	docker-compose run test_runner rspec

.PHONY: test_visual
test_visual:
	docker-compose run -e HEADLESS=false test_runner rspec
