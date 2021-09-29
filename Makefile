install: install-deps

install-deps:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack

lint:
	npx eslint ./src/

test:
	npm test -- --coverage --coverageProvider=v8

start:
	npx webpack serve --open

.PHONY: test