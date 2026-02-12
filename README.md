# <p align="center">![image](./icon.png)<br/>edark</p>

Personal VSCode theme, solid black/blue/white with the vibrant syntax highlighting of [Dark Mint](https://marketplace.visualstudio.com/items?itemName=hugolcouto.dark-mint-vscode-theme)<sup>[[license?](#license)]</sup>.

[todo: editor screenshot]

## Why?
Every time I post a screenshot of my theme, someone always asks me why some of the text is so dim, among other things.

I develop on a small laptop in a variety of environments, so text must be readable at very small scale (~2mm tall characters), relatively far distance (~0.5m), and in a variety of ambient light conditions.
- The thin and sharp edges of GNU Unifont reduces the effect of "bloom"<sup>[what's the technical term?]</sup>. It also has fairly recognizable letter-shapes, and generally looks pretty good.
- The white-on-black contrast makes the screen dimmer in low-light conditions, and is always quite readable.
- White is used as the default color for prose, which helps differentiate it from code.
- <u>Dark blue is used for LSP inlay hints</u>, the color is chosen to be dark enough for me to automatically ignore them, but bright enough to read when needed, without needing to toggle a setting.
- Other colors are chosen carefully to be easily distinguishable and meaningful, information given by the LSP (e.g. variable source) is not included.
- I run VSCode directly in firefox, because chromium does not properly handle bitmap fonts (and it's more convenient for usage)

## Colors
|Name|Box|Value|Notes|
|-:|:-:|:-|
|Foreground| <span style="background-color:#ffffff">&nbsp;</span> |`#ffffff`||
|Background| <span style="background-color:#000000">&nbsp;</span> |`#000000`||
|Accent    | <span style="background-color:#3f00ff">&nbsp;</span> |`#3f00ff`|configurable, for some reason|
|Structure | <span style="background-color:#ff4466">&nbsp;</span> |`#ff4466`||
|Prose     | <span style="background-color:#ffffff">&nbsp;</span> |`#ffffff`|text in comments|
|Variable  | <span style="background-color:#00cc99">&nbsp;</span> |`#00cc99`||
|Function  | <span style="background-color:#5555ff">&nbsp;</span> |`#5555ff`||
|Type      | <span style="background-color:#00ccff">&nbsp;</span> |`#00ccff`|also used for Rust lifetimes|
|Namespace | <span style="background-color:#8888ff">&nbsp;</span> |`#8888ff`||
|Property  | <span style="background-color:#55bbdd">&nbsp;</span> |`#55bbdd`||
|Constant  | <span style="background-color:#ffdd00">&nbsp;</span> |`#ffdd00`|string escapes are Structure|

mistakes to be fixed:
- rust: `\u{A0}` renders the `{A0}` as string instead of symbol
- rust: make lifetimes render the entire `'name` as one Variable?
- kdl: something i forgot
- lua: `.` and `:` for property access has no scopes
- xml: `=` for element attributes has wrong scopes (workaround using `meta.tag.xml` scope)

## Install
Dependencies: `vsce`, `nodejs`, `gnumake`

Use the provided `Makefile` to compile the extension, and install it with your code-oss fork of choice (in my case, `code-server --install-extension edark.vsix`)

## Changelog
### v1.3.0
- Add custom text color scheme

### v1.2.0
- Replace racket-based compiler with a shell script

### v1.1.2
- Reversed bracket colors for an RGB-kinda look

### v1.1.1
- Fix inlay hint colors

### v1.1.0
- Add custom accent color support, add `tpl` for building

### v1.0.1
- Add more colors, adjust syntax highlighting appearance

### v1.0.0
- Initial Release

## License
[MIT License](./LICENSE)

The theme is derived from Dark Mint, which has no license file (but says MIT in the `package.json` so i'm going with that) but I'm [hopefully using this with permission](https://github.com/hugolcouto/dark-mint-vscode-theme/issues/1), I will relicense this if needed.
