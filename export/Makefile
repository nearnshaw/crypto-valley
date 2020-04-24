deploy:
	rm -r -f bin
	rm -r -f node_modules
	rm -f package-lock.json	
	npm install decentraland-ecs@next
	npm install
	npm run build
	dcl build
	dcl deploy -y