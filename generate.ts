#!/usr/bin/env -S deno run -W=theme.json
// TODO: this has no reason to be ts, riir it

const COLORS: Record<string, [number, number, number]> = {};

// a lot of these colors are outside srgb space, so they get clamped
// 16c dark
COLORS.dk = [0.00, 0.00,   0];
COLORS.dr = [0.50, 0.20,  30];
COLORS.dy = [0.75, 0.25,  90];
COLORS.dg = [0.50, 0.25, 150];
COLORS.dc = [0.50, 0.20, 210];
COLORS.db = [0.50, 0.25, 270];
COLORS.dm = [0.50, 0.25, 340];
COLORS.dw = [0.75, 0.00,   0];
COLORS.lk = [0.40, 0.00,   0];
COLORS.lr = [0.70, 0.28,  30];
COLORS.ly = [0.95, 0.30,  90];
COLORS.lg = [0.65, 0.30, 150];
COLORS.lc = [0.65, 0.25, 210];
COLORS.lb = [0.65, 0.30, 270];
COLORS.lm = [0.65, 0.30, 340];
COLORS.lw = [1.00, 0.00,   0];
// theme colors
COLORS.tt = COLORS.lw;
COLORS.ts = COLORS.dk;
COLORS.ta = [0.4732, 0.3008, 273.59];
// brackets
COLORS.br = [0.65, 0.15,  60];
COLORS.bg = [0.65, 0.15, 150];
COLORS.bb = [0.65, 0.15, 270];
// syntax
COLORS.ss = [0.80, 0.28,  30];
COLORS.sp = [0.65, 0.25, 180];
COLORS.sm = [0.80, 0.30, 340];
COLORS.sf = [0.70, 0.30, 270];
COLORS.sc = [0.90, 0.15, 100];
COLORS.st = [0.70, 0.25, 210];

const COLOR_GRID = `
tt ta ts
dk dr dg dy db dm dc dw -- dr dy dg dc db dm dr
lk lr lg ly lb lm lc lw -- lr ly lg lc lb lm lr
-- ss sp sm sf sc st -- -- br bg bb
`.slice(1);

const deg2rad = Math.PI / 180;

const trans_buf = new ArrayBuffer(4);
const trans_f32 = new Float32Array(trans_buf);
const trans_u32 = new Uint32Array(trans_buf);
function f32_to_u32(v: number) {
	trans_f32[0] = v;
	return trans_u32[0];
}
function u32_to_f32(v: number) {
	trans_u32[0] = v;
	return trans_f32[0];
}

const TO_SRGB8_TABLE = [
    0x0073000d, 0x007a000d, 0x0080000d, 0x0087000d, 0x008d000d, 0x0094000d, 0x009a000d, 0x00a1000d,
    0x00a7001a, 0x00b4001a, 0x00c1001a, 0x00ce001a, 0x00da001a, 0x00e7001a, 0x00f4001a, 0x0101001a,
    0x010e0033, 0x01280033, 0x01410033, 0x015b0033, 0x01750033, 0x018f0033, 0x01a80033, 0x01c20033,
    0x01dc0067, 0x020f0067, 0x02430067, 0x02760067, 0x02aa0067, 0x02dd0067, 0x03110067, 0x03440067,
    0x037800ce, 0x03df00ce, 0x044600ce, 0x04ad00ce, 0x051400ce, 0x057b00c5, 0x05dd00bc, 0x063b00b5,
    0x06970158, 0x07420142, 0x07e30130, 0x087b0120, 0x090b0112, 0x09940106, 0x0a1700fc, 0x0a9500f2,
    0x0b0f01cb, 0x0bf401ae, 0x0ccb0195, 0x0d950180, 0x0e56016e, 0x0f0d015e, 0x0fbc0150, 0x10630143,
    0x11070264, 0x1238023e, 0x1357021d, 0x14660201, 0x156601e9, 0x165a01d3, 0x174401c0, 0x182401af,
    0x18fe0331, 0x1a9602fe, 0x1c1502d2, 0x1d7e02ad, 0x1ed4028d, 0x201a0270, 0x21520256, 0x227d0240,
    0x239f0443, 0x25c003fe, 0x27bf03c4, 0x29a10392, 0x2b6a0367, 0x2d1d0341, 0x2ebe031f, 0x304d0300,
    0x31d105b0, 0x34a80555, 0x37520507, 0x39d504c5, 0x3c37048b, 0x3e7c0458, 0x40a8042a, 0x42bd0401,
    0x44c20798, 0x488e071e, 0x4c1c06b6, 0x4f76065d, 0x52a50610, 0x55ac05cc, 0x5892058f, 0x5b590559,
    0x5e0c0a23, 0x631c0980, 0x67db08f6, 0x6c55087f, 0x70940818, 0x74a007bd, 0x787d076c, 0x7c330723,
];

// from https://docs.rs/fast-srgb8/
function f32_to_srgb8(f: number) {
	const MAXV_BITS = 0x3f7fffff;
	const MINV_BITS = 0x39000000;
	const maxv = u32_to_f32(MAXV_BITS);
	const minv = u32_to_f32(MINV_BITS);
	if (!(f > minv))
		f = minv;
	if (f > maxv)
		f = maxv;
	const fu = f32_to_u32(f);
	const entry = TO_SRGB8_TABLE[(fu - MINV_BITS) >>> 20];
	const bias = (entry >>> 16) << 9;
	const scale = entry & 0xffff;
	const t = (fu >>> 12) & 0xff;
	const res = (bias + scale * t) >>> 16;
	return res;
}

// https://bottosson.github.io/posts/oklab/
function oklab_to_linear_srgb([L, a, b]: [number, number, number]) {
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
	const l = l_ * l_ * l_;
	const m = m_ * m_ * m_;
	const s = s_ * s_ * s_;
	return [
		+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
	];
}

const COLORS_RGB: Record<string, [number, number, number]> = {};
const CX: Record<string, string> = {};

CX.tc = "#00000000";

for (const [id, [L, C, h]] of Object.entries(COLORS)) {
	const a = C * Math.cos(deg2rad * h);
	const b = C * Math.sin(deg2rad * h);
	// my browser seemingly just clamps the rgb values, so i do the same here
	const rgb = (oklab_to_linear_srgb([L, a, b])).map(f32_to_srgb8) as [number, number, number];
	COLORS_RGB[id] = rgb;
	const hex = "#" + rgb.map(v => v.toString(16).padStart(2, "0")).join("");
	CX[id] = hex;
	console.log(`${id} = ${hex}`);
}

let text = "";
for (let i = 0; i < COLOR_GRID.length; i += 3) {
	const id = COLOR_GRID.slice(i, i + 2);
	const separator = COLOR_GRID.slice(i + 2, i + 3);
	if (id === "--") {
		text += "   ";
	} else {
		const [r,g,b] = COLORS_RGB[id];
		text += `\x1b[48;2;${r};${g};${b}m   \x1b[0m`;
	}
	if (separator === "\n")
		text += "\n";
}
console.log(text.slice(0, -1));

const THEME = {
	$schema: "vscode://schemas/color-theme",
	name: "edark",
	colors: {
		"activityBar.activeBackground": CX.ta,
		"activityBar.background": CX.ts,
		"activityBar.border": CX.ta,
		"activityBar.foreground": CX.tt,
		"activityBar.inactiveForeground": CX.ta,
		"activityBarBadge.background": CX.tc,
		"button.background": CX.ta,
		"button.hoverBackground": CX.ta,
		"dropdown.background": CX.ts,
		"dropdown.border": CX.ta,
		"dropdown.listBackground": CX.ts,
		"editor.background": CX.ts,
		"editor.foreground": CX.tt,
		"editor.hoverHighlightBackground": CX.ta + "3f",
		"editor.lineHighlightBackground": CX.tc,
		"editor.lineHighlightBorder": CX.ta + "7f",
		"editor.selectionBackground": CX.ta + "7f",
		"editor.selectionHighlightBorder": CX.tc,
		"editorBracketHighlight.foreground1": CX.br,
		"editorBracketHighlight.foreground2": CX.bg,
		"editorBracketHighlight.foreground3": CX.bb,
		"editorBracketHighlight.unexpectedBracket.foreground": CX.tt,
		"editorGroupHeader.tabsBackground": CX.ts,
		"editorGutter.background": CX.ts,
		"editorIndentGuide.activeBackground1": CX.ta + "bf",
		"editorIndentGuide.background1": CX.ta + "7f",
		"editorInlayHint.background": CX.tc,
		"editorInlayHint.foreground": CX.ta + "7f",
		"editorLineNumber.activeForeground": CX.tt,
		"editorWhitespace.foreground": CX.ta,
		"editorWidget.background": CX.ts,
		"editorWidget.border": CX.ta,
		"focusBorder": CX.ta,
		"foreground": CX.tt,
		"input.background": CX.ts,
		"input.border": CX.ta,
		"inputOption.activeBorder": CX.ta,
		"list.activeSelectionBackground": CX.ta + "bf",
		"list.hoverBackground": CX.tc,
		"menu.background": CX.ts,
		"menu.border": CX.ta,
		"minimap.selectionHighlight": CX.ta + "7f",
		"notificationCenter.border": CX.ta,
		"notificationCenterHeader.background": CX.ta,
		"notifications.background": CX.ts,
		"notificationToast.border": CX.ta,
		"panelTitle.activeBorder": CX.ta,
		"quickInput.background": CX.ts,
		"scrollbar.shadow": CX.tc,
		"scrollbarSlider.activeBackground": CX.ta + "7f",
		"scrollbarSlider.background": CX.ta + "3f",
		"scrollbarSlider.hoverBackground": CX.ta + "bf",
		"sideBar.background": CX.ts,
		"sideBar.border": CX.ta,
		"sideBarSectionHeader.background": CX.ta,
		"sideBarTitle.foreground": CX.tt,
		"statusBar.background": CX.ta,
		"statusBar.border": CX.tc,
		"tab.activeBackground": CX.ta,
		"tab.activeBorder": CX.tc,
		"tab.border": CX.tc,
		"tab.hoverBackground": CX.tc,
		"tab.inactiveBackground": CX.ts,
		"titleBar.activeBackground": CX.ts,
		"titleBar.inactiveBackground": CX.ts,
		"window.activeBorder": CX.ta,
		"terminal.ansiBlack": CX.dk,
		"terminal.ansiRed": CX.dr,
		"terminal.ansiGreen": CX.dg,
		"terminal.ansiYellow": CX.dy,
		"terminal.ansiBlue": CX.db,
		"terminal.ansiMagenta": CX.dm,
		"terminal.ansiCyan": CX.dc,
		"terminal.ansiWhite": CX.dw,
		"terminal.ansiBrightBlack": CX.lk,
		"terminal.ansiBrightRed": CX.lr,
		"terminal.ansiBrightGreen": CX.lg,
		"terminal.ansiBrightYellow": CX.ly,
		"terminal.ansiBrightBlue": CX.lb,
		"terminal.ansiBrightMagenta": CX.lm,
		"terminal.ansiBrightCyan": CX.lc,
		"terminal.ansiBrightWhite": CX.lw,
	},
	tokenColors: [
		{
			name: "Structure",
			scope: [
				"constant.character.escape",
				"keyword",
				"meta.tag.xml",
				// no "punctuation" because of json's "punctuation.support" for keys
				"punctuation.terminator",
				"punctuation.definition",
				"punctuation.comma",
				"punctuation.eq",
				"punctuation.semi",
				"punctuation.separator",
				"punctuation.brackets",
				"storage.modifier",
				"storage.type",
			],
			settings: {
				"foreground": CX.ss,
			},
		},
		{
			name: "Prose",
			scope: [
				"comment",
				"punctuation.definition.comment",
			],
			settings: {
				"foreground": CX.tt,
			},
		},
		{
			name: "Place",
			scope: [
				"constant.other.caps",
				"entity.name.class",
				"entity.other.attribute-name.class.css",
				"entity.other.attribute-name.id.css",
				"meta.entry.toml",
				"meta.property-value.css",
				"string.unquoted",
				"variable",
				// formerly "property"
				"entity.other.attribute",
				"entity.other.attribute-name",
				"meta.object.member",
				"meta.object-literal.key",
				"support.type.property-name",
				"support.variable.property",
				"variable.other.property",
			],
			settings: {
				"foreground": CX.sp,
			},
		},
		{
			name: "Function",
			scope: [
				"entity.name.function",
				"entity.other.attribute-name.pseudo-class.css",
				"meta.attribute",
				"support.function",
			],
			settings: {
				"foreground": CX.sf,
			},
		},
		{
			name: "Type",
			scope: [
				"entity.name.type",
				"support.type",
				"markup.underline.link",
			],
			settings: {
				"foreground": CX.st,
			},
		},
		{
			name: "Module",
			scope: [
				"entity.name.namespace",
				"entity.name.tag",
				"meta.table.toml",
				"support.type.property-name.table.toml",
			],
			settings: {
				"foreground": CX.sm,
			},
		},
		{
			name: "Constant",
			scope: [
				"constant.character",
				"constant.language",
				"constant.numeric",
				"constant.other.color.rgb-value.hex",
				"markup.inline.raw.string",
				"punctuation.definition.char",
				"punctuation.definition.raw",
				"punctuation.definition.string",
				"string.quoted",
				"string.template",
			],
			settings: {
				"foreground": CX.sc,
			},
		},
	],
	semanticHighlighting: true,
	semanticTokenColors: {
		"selfKeyword:rust": CX.sp,
		"selfTypeKeyword:rust": CX.st,
		"enumMember:rust": CX.st,
		"lifetime:rust": CX.st,
		"namespace.attribute:rust": CX.sf,
		"*.mutable": {
			underline: true,
		},
	},
};

await Deno.writeTextFile("theme.json", JSON.stringify(THEME, null, "\t"));
console.log("saved");
