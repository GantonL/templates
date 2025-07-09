# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development Server
```bash
npm run dev
# or
bun run dev
```

### Building
```bash
npm run build
# or
bun run build
```

### Testing
```bash
npm run test:unit    # Run unit tests
npm run test         # Run all tests
```

### Code Quality
```bash
npm run lint         # Run ESLint and Prettier checks
npm run format       # Format code with Prettier
npm run check        # Run Svelte type checking
npm run check:watch  # Watch mode for type checking
```

## Architecture Overview

This is a SvelteKit v5 application with shadcn-svelte components and Tailwind CSS styling. The project is configured for deployment on Cloudflare.

### Key Technologies
- **SvelteKit v5**: Full-stack framework with file-based routing
- **shadcn-svelte**: Component library with customizable UI components
- **Tailwind CSS v4**: Utility-first CSS framework with Vite plugin
- **TypeScript**: Full type safety throughout the application
- **mdsvex**: Markdown processing for Svelte components
- **Vitest**: Testing framework with browser and server test configurations
- **mode-watcher**: Dark/light theme management

### Directory Structure
- `src/lib/`: Core library code
  - `components/`: Reusable components including shadcn-svelte UI components
  - `i18n/`: Internationalization setup with sveltekit-i18n
  - `stores.ts`: Svelte stores for global state management
  - `api/configurations/`: Application configuration and constants
  - `resources/markdown/`: Markdown content organized by locale
- `src/routes/`: File-based routing with layout hierarchy
  - `[[lang]]/`: Optional language parameter routing
  - `api/`: Server-side API endpoints
- `static/`: Static assets served at root

### Internationalization (i18n)
The app supports multiple languages with:
- Route-based locale detection (`[[lang]]` parameter)
- Cookie-based locale persistence
- RTL/LTR direction switching
- Localized markdown content in `src/lib/resources/markdown/`

### Component Architecture
- **shadcn-svelte**: UI components configured in `components.json`
- **Aliases**: Configured path aliases for clean imports (`$lib/components/ui`, etc.)
- **Resource Markdown**: Dynamic markdown component loading based on locale
- **SEO**: Centralized SEO component with store-based metadata management

### State Management
Global state is managed through Svelte stores:
- `direction`: Text direction (ltr/rtl)
- `title`: Page title with brand suffix
- `pageDescription`: SEO descriptions
- `article`: Article metadata
- `pageImage`: Page-specific images

### Testing Configuration
- **Vitest**: Configured with separate browser and server test projects
- **Playwright**: Browser testing provider
- **Test files**: `.svelte.test.ts` for client-side, `.test.ts` for server-side

### Development Notes
- Uses Bun as package manager (see `bun.lock`)
- Configured for Cloudflare deployment
- Markdown files are processed as Svelte components via mdsvex
- Theme switching handled by mode-watcher library
- Type definitions extended in `src/app.d.ts`