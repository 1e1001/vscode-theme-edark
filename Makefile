THEME_FG = ffffff
THEME_BG = 000000
THEME_ACCENT = 3f00ff

theme.json: template.json
	sh template.sh "${THEME_FG}" "${THEME_BG}" "${THEME_ACCENT}"

edark.vsix: theme.json package.json icon.png
	vsce package
	mv edark-*.vsix edark.vsix

clean:
	rm edark.vsix theme.json
