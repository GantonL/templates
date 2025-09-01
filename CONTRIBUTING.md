# Contributing to Templates

Thank you for your interest in contributing to this template scaffolding CLI tool! We welcome contributions from the community.

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- Bun (recommended) or npm/yarn/pnpm

### Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/yourusername/templates.git
   cd templates
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Link the CLI for local testing:
   ```bash
   bun link
   templates --help  # Test the global command
   ```

## Project Structure

This project consists of two main components:

- **CLI Tool** (`/cli`): The command-line interface for template scaffolding
- **Templates** (e.g., `/sveltekit-shadcn-v5`): Individual project templates

## Making Changes

### CLI Development

For changes to the CLI tool:

1. Commands are defined in `cli/config/commands.json`
2. Command implementations go in `cli/commands/`
3. Template definitions are in `cli/config/templates.json`

Test your changes:
```bash
bun cli/index.js <command>  # Run locally
```

### Template Development

For the SvelteKit template:

```bash
cd sveltekit-shadcn-v5
bun run dev                     # Start dev server
bun run build                   # Build for production
bun run check                   # Type checking
bun run lint && bun run format  # Code quality
```

### Adding New Templates

1. Create a new template directory in the project root
2. Add template metadata to `cli/config/templates.json`
3. Include appropriate exclusion patterns and post-install steps
4. Test template generation with the CLI

### Adding New Commands

1. Define the command in `cli/config/commands.json`
2. Create the command implementation in `cli/commands/`
3. Commands are automatically loaded via `cli/utils/command-loader.js`

## Code Style

- Follow existing code conventions in each component
- Run linting and formatting before submitting PRs:
  ```bash
  bun run lint && bun run format
  ```

## Testing

- Test CLI commands locally before submitting
- For templates, ensure they build and run correctly after scaffolding
- Test with different package managers (npm, yarn, pnpm, bun)

## Submitting Changes

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/<issue_number>
   ```

2. Make your changes and commit with descriptive messages

3. Push your branch and create a Pull Request

4. Ensure your PR:
   - Has a clear description of changes
   - Includes any necessary documentation updates
   - Passes all checks
   - Follows the existing code style

## Reporting Issues

When reporting bugs or requesting features:

1. Use the GitHub issue templates
2. Provide clear reproduction steps for bugs
3. Include relevant system information (OS, Node.js version, etc.)
4. For template issues, specify which template and package manager

## Questions?

Feel free to open an issue for any questions about contributing or the codebase architecture.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
