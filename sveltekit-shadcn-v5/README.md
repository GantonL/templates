# SvelteKit + shadcn-svelte Template

Modern full-stack web application template built with SvelteKit v5, shadcn-svelte, and TypeScript.

**Demo:** [https://ssv5.templates.guylahav.com/](https://ssv5.templates.guylahav.com/)

## Tech Stack
- **SvelteKit v5** - Full-stack framework with file-based routing
- **shadcn-svelte** - Customizable UI components
- **Tailwind CSS v4** - Utility-first styling with Vite plugin
- **TypeScript** - Full type safety

## Features
- **Application Shell** - Responsive layout component
- **Theme Switching** - Dark/light mode with persistence
- **Internationalization** - Multi-language support (English/Hebrew) with route and dropdown configuration
- **Cookie Management** - GDPR-compliant cookie preferences and manager
- **SEO Optimized** - Pre-built SEO component including meta tags and structured data, sitemap.xml, robots.txt
- **Policy Pages** - Pre-configured Terms, Privacy, Cookies, and Accessibility policies
- **Configuration-Driven** - Centralized configurations for maintainable code
- **Cloudflare Ready** - Optimized for Cloudflare deployment
- **mdsvex** - Markdown processing
- **Components**:
  - **Shell** - A basic application shell with header, footer, sidebar.
  - **BasePage** - All pages are wrapped with a base page component to centralizes seo handling via props. open for extensions.
  - **SEO** - Shell is wrapped with the SEO component that handles seo and structred data related logic.

## Pages
- **Home** - Landing page with feature overview
- **Example** - Scrollable content demonstration
- **Error** - Error boundary behavior showcase
- **Cookies Management** - Cookies preferences manager
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

# CLI Scripts
bun run create:page <path>   # Create new page with template
bun run create:md <path>     # Create markdown files for all locales

# Examples
bun run create:page /demo/[:demo_id]   # Creates demo page with dynamic ID parameter
bun run create:md demo.md                 # Creates demo.md files for all configured locales
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
- **Enhanced CLI tooling** - Extended scaffolding and utilities
- **Premade generic components** - Data Table
- **Accessibility Managment tool**
