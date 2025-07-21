# SvelteKit + shadcn-svelte Template

Modern full-stack web application template built with SvelteKit v5, shadcn-svelte, and TypeScript.

**Demo:** [https://sveltekit-shadcn.templates.guylahav.com](https://sveltekit-shadcn.templates.guylahav.com)

## Tech Stack
- **SvelteKit v5** - Full-stack framework with file-based routing
- **shadcn-svelte** - Customizable UI components
- **Tailwind CSS v4** - Utility-first styling with Vite plugin
- **TypeScript** - Full type safety
- **Vitest** - Testing framework
- **mdsvex** - Markdown processing

## Features
- **Application Shell** - Responsive layout component
- **Theme Switching** - Dark/light mode with persistence
- **Internationalization** - Multi-language support (English/Hebrew) with route and dropdown configuration
- **Cookie Management** - GDPR-compliant cookie preferences and manager
- **SEO Optimized** - Pre-built SEO component, sitemap.xml, robots.txt
- **Policy Pages** - Pre-configured Terms, Privacy, Cookies, and Accessibility policies
- **Configuration-Driven** - Centralized configurations for maintainable code
- **State Management** - Svelte stores for global state
- **Testing Ready** - Vitest configured for unit and browser tests
- **Cloudflare Ready** - Optimized for Cloudflare deployment

## Pages
- **Home** - Landing page with feature overview
- **Example** - Scrollable content demonstration
- **Error** - Error boundary behavior showcase
- **View Transitions** - Smooth page transitions
- **Policy Suite** - Complete legal page templates

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Run tests
bun run test

# Type checking
bun run check

# Lint and format
bun run lint
bun run format
```

## Architecture

- **File-based routing** - `src/routes/[[lang]]/` with optional language parameter
- **Configuration-driven** - Centralized configs in `src/lib/api/configurations/` and `src/lib/client/configurations/`
- **Internationalization** - JSON translations with route and store-based locale management
- **Component structure** - shadcn-svelte components with custom configurations
- **State management** - Svelte stores for global application state

## Roadmap

- **Layout variants** - Configurable navigation layouts (collapsible, top bar, bottom menu)
- **Database abstraction** - ORM integration layer
- **CLI tooling** - Project scaffolding and configuration utilities
- **Premade generic components** - Data Table
- **Accessibility Managment tool**
