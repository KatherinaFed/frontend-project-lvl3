install: install-deps

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint ./src/

test:
	npm test

start:
	npx webpack serve --open

.PHONY: test