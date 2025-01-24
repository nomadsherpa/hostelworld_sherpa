.PHONY: help
help:
	@echo "clean    - Remove all the docker containers, images, volumes and networks"
	@echo "lint     - Run the linter"
	@echo "lint_fix - Run the linter and fix the issues"
	@echo "test     - Run the test suite"

.PHONY: clean
clean:
	docker compose down --rmi all --volumes --remove-orphans

.PHONY: lint
lint:
	./bin/lint $(filter-out $@,$(MAKECMDGOALS))

.PHONY: lint_fix
lint_fix:
	./bin/lint --auto-correct-all

.PHONY: test
test:
	./bin/test $(filter-out $@,$(MAKECMDGOALS))
