.PHONY: help
help:
	@echo "lint        - Run the linter"
	@echo "lint_fix    - Run the linter and fix the issues"
	@echo "test        - Run the test suite"
	@echo "test_visual - Run the test suite with visual browser (http://localhost:7900/?autoconnect=1&resize=scale)"

.PHONY: test
test:
	./bin/test $(filter-out $@,$(MAKECMDGOALS))

.PHONY: test_visual
test_visual:
	./bin/test_visual $(filter-out $@,$(MAKECMDGOALS))

.PHONY: lint
lint:
	./bin/lint $(filter-out $@,$(MAKECMDGOALS))

.PHONY: lint_fix
lint_fix:
	./bin/lint --auto-correct-all
