start:
	npx webpack serve --open

install:
	npm ci

build:
	npm run build

lint:
	npx eslint ./src/
