ESLINT        = eslint
ESLINT_CONFIG = .eslintrc.js
SOURCE_JS     = docs/js/*.js docs/js/tiling/*.js

.PHONY: run-server
run-server:
	bundle exec jekyll serve

.PHONY: lint
lint:
	$(ESLINT) --config $(ESLINT_CONFIG) $(SOURCE_JS)

.PHONY: lint-fix
lint-fix:
	$(ESLINT) --config $(ESLINT_CONFIG) $(SOURCE_JS) --fix
