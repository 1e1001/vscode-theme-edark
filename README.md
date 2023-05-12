# <p align="center">![image](./icon.png)<br/>edark</p>

Personal VSCode theme, solid black/blue/white with the vibrant syntax highlighting of [Dark Mint](https://marketplace.visualstudio.com/items?itemName=hugolcouto.dark-mint-vscode-theme)<sup>[[license?](#license)]</sup>.

## Colors
foreground `#ffffff`, background `#000000`, default accent color of `#3f00ff`, like in the logo

```
or install `nodejs`, `vsce`, and `racket` manually
$ nix-shell
first time setup only, currently requires installing via github (not on racket packages)
% raco pkg install tpl
% racket theme.tpl '#007fff'
% vsce pacakge
or whatever vscode derivative you happen to use
% code --install-extension ./edark-*.vsix
% rm ./edark-*.vsix
```

## Changelog
### v1.1.0
Add custom accent color support, add `tpl` for building

### v1.0.1
Add more colors, adjust syntax highlighting appearance

### v1.0.0
Initial Release

## License
[MIT License](./LICENSE)

The theme is derived from Dark Mint, which has no license file (but says MIT in the `package.json` so i'm going with that) but I'm [hopefully using this with permission](https://github.com/hugolcouto/dark-mint-vscode-theme/issues/1), I will relicense this if needed.
