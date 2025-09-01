# @gantonl/templates

A CLI tool for scaffolding production-ready web application templates with modern tooling and best practices.

## Overview

This project provides a command-line interface for quickly generating web application templates that handle all the boring setup work. Instead of starting from scratch every time, get a fully-configured project with modern tools, proper architecture, and essential features already implemented.

## Installation

```bash
bun install -g @gantonl/templates
```

## Usage

### Create a new project
```bash
templates create my-app

or without installing
bunx @gantonl/templates create my-app
```

### List available templates
```bash
templates list

or without installing
bunx @gantonl/templates list
```

### Get template details
```bash
templates info <template-name>

or without installing
bunx @gantonl/templates info <template-name>
```

### Get help
```bash
templates --help

or without installing
bunx @gantonl/templates --help
```

## Available Templates

Currently includes:
- **SvelteKit + shadcn/ui v5** - Full-stack application starter with TypeScript, Drizzle ORM, PostgreSQL, i18n support, and comprehensive tooling

## Features

The CLI provides:
- **Interactive project creation** with prompts for customization
- **Smart file processing** with exclusion patterns and template copying
- **Package manager detection** - automatically uses npm, yarn, pnpm, or bun
- **Git initialization** for new projects
- **Post-installation guidance** with next steps
- **Update notifications** to keep the CLI current

## Requirements

- Node.js >= 18.0.0
- Your preferred package manager (npm, yarn, pnpm, or bun)

## Development

```bash
# Clone the repository
git clone <repo-url>
cd templates

# Install dependencies
bun install

# Link for local testing
bun link
templates --help

# Run CLI locally during development
bun cli/index.js <command>
```

## Architecture

The CLI uses a modular architecture with:
- **Dynamic command loading** via JSON configuration
- **Template registry** for managing available templates
- **Extensible plugin system** for adding new templates
- **Centralized error handling** and logging

## Roadmap

- **Improve** CLI UX, UI, DX
- **sveltekit-shadcn-v5** can act as the base template for future use-case-specific templates for common applications such as Blogs, eCommerce, News etc.
- **AI optimized** in terms of clear project structure and architecture.



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and how to add new templates or commands.

## License

MIT - See [LICENSE](LICENSE) for details.
