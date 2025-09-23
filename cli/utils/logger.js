import pc from "picocolors";
import ora from "ora";

export const icons = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
  rocket: "🚀",
  package: "📦",
  sparkle: "✨",
  gear: "⚙️",
  folder: "📁",
  file: "📄",
  link: "🔗",
  clock: "⏰",
  checkmark: "✓",
  cross: "✗",
  arrow: "→",
  bullet: "•",
  party: "🎉",
};

export const logger = {
  success: (message) => console.log(`${icons.success} ${pc.green(message)}`),
  error: (message) => console.log(`${icons.error} ${pc.red(message)}`),
  warning: (message) => console.log(`${icons.warning} ${pc.yellow(message)}`),
  info: (message) => console.log(`${icons.info} ${pc.blue(message)}`),
  log: (message) => console.log(message),
  party: (message) => console.log(`${icons.party} ${pc.green(message)}`),
  step: (message) => console.log(`${pc.cyan(icons.arrow)} ${message}`),
  bullet: (message) => console.log(`  ${pc.dim(icons.bullet)} ${message}`),

  title: (message) => {
    console.log();
    console.log(pc.bold(pc.magenta(message)));
    console.log(pc.dim("─".repeat(message.length)));
  },

  newline: () => console.log(),

  spinner: (text) =>
    ora({
      text,
      color: "cyan",
      spinner: "bouncingBar",
    }),
};

export const formatCommand = (command) => pc.cyan(command);
export const formatPath = (path) => pc.dim(path);
export const formatHighlight = (text) => pc.yellow(text);
export const formatSuccess = (text) => pc.green(text);
export const formatError = (text) => pc.red(text);
