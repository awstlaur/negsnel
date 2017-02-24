ESLINT        = eslint
ESLINT_CONFIG = .eslintrc.js
SOURCE_JS     = js/*.js js/tiling/*.js

.PHONY: lint
lint:
	$(ESLINT) --config $(ESLINT_CONFIG) $(SOURCE_JS)

.PHONY: lint-fix
lint-fix:
	$(ESLINT) --config $(ESLINT_CONFIG) $(SOURCE_JS) --fix
