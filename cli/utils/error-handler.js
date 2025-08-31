import pc from 'picocolors';
import { logger } from './logger.js';

export function setupErrorHandling() {
  process.on('uncaughtException', (error) => {
    logger.error('Unexpected error occurred:');
    console.error(pc.dim(error.stack));
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled promise rejection:');
    console.error(pc.dim(reason));
    process.exit(1);
  });
}

export class CLIError extends Error {
  constructor(message, code = 1) {
    super(message);
    this.name = 'CLIError';
    this.code = code;
  }
}

export function handleError(error) {
  if (error instanceof CLIError) {
    logger.error(error.message);
    process.exit(error.code);
  } else {
    logger.error('An unexpected error occurred:');
    console.error(pc.dim(error.stack));
    process.exit(1);
  }
}