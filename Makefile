JEKYLL:=bundle exec jekyll
NPM_RUN:=npm run

all: dev

dev:
	$(NPM_RUN) build
	$(JEKYLL) build

prod:
	$(NPM_RUN) build-prod
	$(JEKYLL) build

lint:
	$(NPM_RUN) lint

serve:
	$(JEKYLL) serve
