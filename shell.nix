{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell rec {
	buildInputs = with pkgs; [
		vsce nodejs gnumake
	];
}
