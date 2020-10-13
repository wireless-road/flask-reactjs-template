ui-requirements:
	@echo "Installing UI requirements"
	@cd ui && npm install

ui-build:
	@echo "Building ui"
	@cd static_ && rm -rf *
	@cd ui && mkdir -p dist && npm run build
	@mv ui/dist/* static_ && rm -rf ui/dist
