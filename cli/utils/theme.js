import pc from "picocolors";

export const colors = {
  primary: pc.cyan,
  secondary: pc.magenta,
  success: pc.green,
  warning: pc.yellow,
  error: pc.red,

  text: pc.white,
  muted: pc.gray,
  dim: pc.blackBright,

  primaryBg: pc.bgCyan,
  secondaryBg: pc.bgMagenta,
  successBg: pc.bgGreen,
  warningBg: pc.bgYellow,
  infoBg: pc.bgBlue,
  mutedBg: pc.bgBlackBright,
};

export const typography = {
  title: (text) => pc.bold(colors.primary(text)),
  subtitle: (text) => colors.secondary(text),
  highlight: (text) => colors.primary(text),
  command: (text) => colors.primary(text),
  path: (text) => colors.muted(text),
  success: (text) => colors.success(text),
  warning: (text) => colors.warning(text),
  error: (text) => colors.error(text),
  muted: (text) => colors.muted(text),
  dim: (text) => colors.dim(text),
  bold: (text) => pc.bold(text),
};

export const icons = {
  // Status icons
  success: "✓",
  error: "✗",
  warning: "⚠",
  info: "ℹ",

  // Action icons
  rocket: "🚀",
  sparkle: "✨",
  gear: "⚙",
  package: "📦",
  folder: "📁",

  // Navigation icons
  arrow: "→",
  bullet: "•",
  chevron: "›",

  // Interactive icons
  checkmark: "✓",
  cross: "✗",
  plus: "+",
  minus: "−",

  // Fun icons
  party: "🎉",
  fire: "🔥",
  star: "★",
};

// Box styling configurations
export const boxStyles = {
  primary: {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "cyan",
  },

  secondary: {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "magenta",
  },

  success: {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
  },

  warning: {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "yellow",
  },

  error: {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "red",
  },

  info: {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "blue",
  },
};

export const tags = {
  primary: (text) => colors.primaryBg(pc.black(` ${text} `)),
  secondary: (text) => colors.secondaryBg(pc.black(` ${text} `)),
  success: (text) => colors.secondaryBg(pc.black(` ${text} `)),
  warning: (text) => colors.warningBg(pc.black(` ${text} `)),
  info: (text) => colors.infoBg(pc.white(` ${text} `)),
  muted: (text) => colors.mutedBg(pc.white(` ${text} `)),
};

export const spinnerConfig = {
  color: "cyan",
  spinner: "aesthetic",
};

export const spacing = {
  newline: () => console.log(),
  separator: (length = 40) => colors.dim("─".repeat(length)),
  indent: "  ",
  bulletIndent: "    ",
};
