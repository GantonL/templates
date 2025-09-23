# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### CLI Development
```bash
# Run the CLI locally
bun cli/index.js <command>

# Package and test CLI
bun install
bun link                    # Link globally for testing
templates --help            # Test global command
```

## Architecture

This is a **template scaffolding CLI tool** with two main components:

### 1. CLI Tool (`/cli`)
- **Entry Point**: `cli/index.js` - Commander.js-based CLI with dynamic command loading
- **Command Structure**: Commands defined in `cli/config/commands.json` and implemented in `cli/commands/`
- **Template Registry**: `cli/config/templates.json` defines available templates with metadata
- **Core Commands**:
  - `create` - Scaffold new projects from templates
  - `list` - Display available templates
  - `info` - Show template details

### 2. SvelteKit Template (`/sveltekit-shadcn-v5`)
Full-featured SvelteKit template with:
- **Framework**: SvelteKit v5 + TypeScript + Vite
- **UI**: shadcn-svelte (bits-ui) + Tailwind CSS v4
- **Database**: Drizzle ORM + PostgreSQL with Docker
- **i18n**: Hebrew/English with RTL/LTR support
- **Architecture**: Service pattern for database layer, configuration-driven components

## CLI Command System

### Adding New Commands
1. Define command in `cli/config/commands.json`
2. Create command file in `cli/commands/`
3. Commands are auto-loaded via `cli/utils/command-loader.js`

### Adding New Templates
1. Add template directory to repository root
2. Define template metadata in `cli/config/templates.json`
3. Include features, exclude patterns, and post-install steps

## Template Processing
The CLI uses `cli/utils/template-processor.js` to:
- Copy template files with exclusion patterns
- Handle package manager detection/installation
- Initialize git repositories
- Process post-installation steps

## Key Features

### CLI Tool
- **Dynamic Command Loading**: Commands configured via JSON, auto-loaded at runtime
- **Template Registry**: JSON-based template definitions with rich metadata
- **File Processing**: Smart template copying with exclusion patterns
- **Package Manager Support**: Auto-detection and installation (npm, yarn, pnpm, bun)
- **Update Notifications**: Built-in version checking via update-notifier

## Development Notes
- **Node.js**: Requires >= 18.0.0
- **Package Manager**: Primarily uses Bun for template development
- **CLI Distribution**: Published as `@gantonl/templates` npm package
- **Template Scope**: Currently includes one comprehensive SvelteKit template
- **Error Handling**: Centralized error handling via `cli/utils/error-handler.js`
