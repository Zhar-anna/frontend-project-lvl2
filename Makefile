install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run

test-coverage:
	npm -- --coverage --coverageProvider=v8

test-watch:
	npm test -- --watch

