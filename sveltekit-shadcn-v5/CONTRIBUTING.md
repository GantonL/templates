# Contributing to SvelteKit shadcn Template

Thank you for your interest in contributing to this SvelteKit template! This guide will help you get started.

## Development Setup

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- Git
- Docker

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/templates.git
   cd temapltes/sveltekit-shadcn-v5
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Start the development server:
   ```bash
   bun run dev
   ```

5. Start local database container
  ```bash
  bun run local:db:up
  ```

## Development Workflow

### Code Quality

Before submitting changes, ensure your code passes all checks:

```bash
# Type checking
bun run check

# Linting and formatting
bun run lint && bun run format

# Run Server/DB tests
bun run test:server
```

### Project Structure

This template follows a configuration-driven architecture. Please review the [CLAUDE.md](./CLAUDE.md) file for detailed project structure and guidelines.

Key principles:
- **Configuration-driven**: Keep components flexible through configuration objects
- **i18n first**: All user-facing text must be translatable
- **Accessibility**: Follow WCAG guidelines
- **TypeScript**: Strong typing throughout

### Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the established patterns
3. Add tests for new functionality
4. Update translations if adding user-facing text
5. Run the quality checks above
6. Commit your changes with a descriptive message

### Translation Guidelines

When adding new user-facing text:

1. Add keys to both language files (or add new ones for additional locales):
   - `src/lib/i18n/en-US/[namespace].json`
   - `src/lib/i18n/he-IL/[namespace].json`

2. Prefer non-hierarchical keys: `common.thing`
3. Test both RTL (Hebrew) and LTR (English) layouts

### Component Development

Follow the established component patterns:

```
components/[name]/
├── [name].svelte
└── configurations/ (optional)
    └── [config].ts
```

- Use TypeScript interfaces for all configurations
- Follow accessibility best practices
- Support both light and dark themes
- Ensure mobile responsiveness

## Submitting Changes

### Pull Request Process

1. Push your changes to your fork
2. Create a pull request with:
   - Clear description of changes
   - Screenshots for UI changes
   - Testing instructions
   - Any breaking changes noted

3. Respond to review feedback promptly

### Pull Request Guidelines

- Keep PRs focused and atomic
- Write clear commit messages
- Include tests for new features
- Update documentation if needed
- Test in both Hebrew and English locales

## Types of Contributions

### Bug Reports

- Use the issue template
- Include reproduction steps
- Specify browser and OS versions
- Include relevant error messages

### Feature Requests

- Describe the use case
- Explain how it fits the template's purpose
- Consider i18n and accessibility implications

### Code Contributions

Areas where contributions are especially welcome:

- New shadcn-svelte component integrations
- Accessibility improvements
- Performance optimizations
- Additional language support
- Testing improvements
- Documentation enhancements
- Database abstraction enhancements

### Documentation

- Fix typos or unclear instructions
- Add examples or use cases
- Improve component documentation
- Update setup instructions

## Template Considerations

This is a **template repository** meant for starting new projects. Consider:

- Changes should benefit most users of the template
- Avoid specific business logic
- Keep dependencies minimal and well-justified
- Maintain flexibility for different use cases

## Getting Help

- Review existing issues and discussions
- Check the [CLAUDE.md](./CLAUDE.md) for project guidance
- Ask questions in issues or discussions

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming community
- Follow GitHub's Community Guidelines

Thank you for contributing to this project!
