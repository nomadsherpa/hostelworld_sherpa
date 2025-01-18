.PHONY: help
help:
	@echo "lint        - Run the linter"
	@echo "lint_fix    - Run the linter and fix the issues"
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
	./bin/lint

.PHONY: lint_fix
lint_fix:
	./bin/lint --auto-correct-all
