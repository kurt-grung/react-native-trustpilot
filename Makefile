.DEFAULT_GOAL := help

.PHONY: install install-example build lint typecheck clean \
        start android ios web help

# Install root dependencies
install:
	npm install

# Install example app dependencies
install-example:
	npm install --prefix example

# Install all dependencies (root + example)
bootstrap: install install-example

# Build the library
build:
	npm run build

# Lint source files
lint:
	npm run lint

# Run TypeScript type checking
typecheck:
	npm run typecheck

# Build, lint, and typecheck in one shot
check: build lint typecheck

# Remove build artifacts
clean:
	rm -rf lib

# Start the Expo dev server
start:
	npm start --prefix example

# Start on Android
android:
	npm run android --prefix example

# Start on iOS
ios:
	npm run ios --prefix example

# Start on web
web:
	npm run web --prefix example

help:
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "  bootstrap       Install all dependencies (root + example)"
	@echo "  install         Install root dependencies"
	@echo "  install-example Install example app dependencies"
	@echo "  build           Build the library"
	@echo "  lint            Lint source files"
	@echo "  typecheck       Run TypeScript type checking"
	@echo "  check           Build + lint + typecheck"
	@echo "  clean           Remove build artifacts (lib/)"
	@echo "  start           Start the Expo dev server"
	@echo "  android         Start on Android"
	@echo "  ios             Start on iOS"
	@echo "  web             Start on web"
	@echo ""
