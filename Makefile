.PHONY: help
help:
	@echo "test        - Run the test suite"
	@echo "test_visual - Run the test suite with visual browser (http://localhost:7900/?autoconnect=1&resize=scale)"

.PHONY: test
test:
	./bin/test

.PHONY: test_visual
test_visual:
	./bin/test_visual

.PHONY: lint
lint:
	docker-compose run test_runner rubocop
