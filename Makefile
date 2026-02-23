#theme.json: template.json
#	sh template.sh $< $@

theme.json: generate.ts
	./generate.ts

edark.vsix: theme.json package.json icon.png
	vsce package
	mv edark-*.vsix edark.vsix

all: edark.vsix theme-zed.json

zed_install: theme-zed.json
	cp theme-zed.json ~/.config/zed/themes/edark.json

clean:
	rm edark.vsix theme.json
