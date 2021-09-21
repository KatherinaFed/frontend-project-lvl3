install: install-deps

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint ./src/	

start:
	npx webpack serve --open