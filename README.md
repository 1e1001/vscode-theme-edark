# <p align="center">![image](./icon.png)<br/>edark</p>

Personal VSCode theme, solid black/blue/white with the vibrant syntax highlighting of [Dark Mint](https://marketplace.visualstudio.com/items?itemName=hugolcouto.dark-mint-vscode-theme)<sup>[[license?](#license)]</sup>.

## Colors
Foreground `#ffffff`, background `#000000`, default accent color of `#3f00ff`, like in the logo. Colors are configurable when compiling.

## Install
Dependencies: `vsce`, `nodejs`, `gnumake`

Use the provided `Makefile` to compile the extension, and install it with your code-oss fork of choice (in my case, `code-server --install-extension edark.vsix`)

## Changelog
### v1.2.0
Replace racket-based compiler with a shell script

### v1.1.2
Reversed bracket colors for an RGB-kinda look

### v1.1.1
Fix inlay hint colors

### v1.1.0
Add custom accent color support, add `tpl` for building

### v1.0.1
Add more colors, adjust syntax highlighting appearance

### v1.0.0
Initial Release

## License
[MIT License](./LICENSE)

The theme is derived from Dark Mint, which has no license file (but says MIT in the `package.json` so i'm going with that) but I'm [hopefully using this with permission](https://github.com/hugolcouto/dark-mint-vscode-theme/issues/1), I will relicense this if needed.
