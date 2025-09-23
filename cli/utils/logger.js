import ora from "ora";
import { icons, typography, spacing, spinnerConfig } from "./theme.js";

export { icons } from "./theme.js";

export const logger = {
  // Status messages
  success: (message) => console.log(`${icons.success} ${typography.success(message)}`),
  error: (message) => console.log(`${icons.error} ${typography.error(message)}`),
  warning: (message) => console.log(`${icons.warning} ${typography.warning(message)}`),
  info: (message) => console.log(`${icons.info} ${typography.highlight(message)}`),
  log: (message) => console.log(message),

  // Special messages
  party: (message) => console.log(`${icons.party} ${typography.success(message)}`),
  step: (message) => console.log(`${typography.highlight(icons.arrow)} ${message}`),
  bullet: (message) => console.log(`${spacing.indent}${typography.muted(icons.bullet)} ${message}`),

  // Typography
  title: (message) => {
    spacing.newline();
    console.log(typography.title(message));
    console.log(spacing.separator(message.replace(/\p{Emoji}/gu, '').trim().length));
  },

  subtitle: (message) => {
    console.log(typography.subtitle(message));
  },

  // Layout
  newline: spacing.newline,

  // Loading states
  spinner: (text) => ora({
    text,
    color: spinnerConfig.color,
    spinner: spinnerConfig.spinner,
  }),
};

// Formatter functions using theme typography
export const formatCommand = typography.command;
export const formatPath = typography.path;
export const formatHighlight = typography.highlight;
export const formatSuccess = typography.success;
export const formatError = typography.error;
