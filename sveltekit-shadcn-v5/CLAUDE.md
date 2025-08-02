# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this SvelteKit template repository focused on internationalization, accessibility, and modern web standards.

## Essential Commands

**Development**: `vite dev` or `bun run dev`
**Build**: `vite build` or `bun run build`
**Test**: `bun run test` (unit tests with Vitest)
**Lint/Format**: `bun run lint && bun run format`
**Type Check**: `bun run check`
**Create Page**: `bun run create:page <path>` - Creates new SvelteKit page with BasePage template
**Create Markdown**: `bun run create:md <path>` - Creates markdown files for all configured locales
**Create API Controller**: `bun run create:api-controller <path>` - Creates API endpoint templates

## Tech Stack

**Core**: SvelteKit v5, TypeScript, Vite
**UI**: shadcn-svelte (bits-ui), Tailwind CSS v4, Lucide icons
**i18n**: sveltekit-i18n with Hebrew/English support
**Deployment**: Cloudflare (adapter included)
**Package Manager**: Bun
**Testing**: Vitest with browser testing, Playwright
**SEO**: svelte-meta-tags, structured data, sitemap generation

## Project Architecture

This is a **template/starter project** for building multilingual SvelteKit applications with:

### Core Features

- **Internationalization**: Hebrew & English with RTL/LTR support
- **Accessibility**: WCAG compliant components and practices
- **Cookie Management**: GDPR-compliant cookie preferences
- **SEO Optimization**: Meta tags, structured data, sitemaps
- **Theme Management**: Light/dark mode with system preference detection
- **Mobile-First**: Responsive design with sidebar navigation

### Project Structure

```
src/lib/
├── api/configurations/     # Server/API configurations
├── client/configurations/  # Client-side configurations (routes, themes, meta)
├── components/
│   ├── [custom]/          # Application components
│   └── ui/               # shadcn-svelte components
├── enums/                # Type definitions and constants
├── hooks/                # Svelte runes and utilities
├── i18n/                 # Translation files (en-US, he-IL)
├── manage-cookies/       # Cookie consent system
├── models/               # TypeScript interfaces
├── resources/markdown/   # Localized content files
├── stores.ts            # Global Svelte stores
├── theme/               # Theme management utilities
└── utils.ts             # Shared utilities

src/routes/
├── [[lang]]/            # Internationalized routes
│   ├── (application)/   # App pages (example, settings)
│   └── (site)/         # Content pages (policies, accessibility)
├── api/                # Server endpoints
└── sitemap.xml/        # Dynamic sitemap generation
```

## Development Guidelines

### Configuration-Driven Architecture

**Keep components flexible through configuration objects.**

- Server configs: `src/lib/api/configurations/`
- Client configs: `src/lib/client/configurations/`
- Component configs: `components/[name]/configurations/`
- Use TypeScript interfaces for all configurations

### Internationalization (i18n)

**All user-facing text must be translatable.**

- Translation files: `src/lib/i18n/[locale]/[namespace].json`
- Template usage: `$t('namespace.key')`
- TypeScript usage: `t.get('namespace.key')`
- Hierarchical keys: `common.navigation.home`
- Current locales: `en-US`, `he-IL`

### Component Patterns

**Follow established component structure.**

Most components follow:

```
components/[name]/
├── [name].svelte
└── configurations/ (optional)
    └── [config].ts
```

shadcn-svelte components include:

```
components/ui/[name]/
├── [name].svelte
├── index.ts
└── [additional-parts].svelte
```

### Routing & Navigation

**Internationalized routing with grouped layouts.**

- Routes configuration: `src/lib/client/configurations/routes.ts`
- Locale detection: `[[lang]]` parameter
- Route groups: `(application)`, `(site)`
- Navigation: Sidebar with grouped routes

### State Management

**Centralized stores for global state.**

- Main store: `src/lib/stores.ts`
- Theme management: `src/lib/theme/manager.ts`
- Cookie preferences: `src/lib/manage-cookies/`
- Mobile detection: `src/lib/hooks/is-mobile.svelte.ts`

### Content Management

**Markdown-based content with localization.**

- Markdown files: `src/lib/resources/markdown/[locale]/`
- Content rendering: `resource-markdown` component
- Automated creation: `bun run create:md <filename>`

## Key Features Implementation

### Cookie Management

- GDPR-compliant consent system
- Preference management UI
- Server-side cookie handling

### SEO & Accessibility

- Meta tags management via stores
- Structured data configuration
- ARIA labels and semantic HTML
- Screen reader support

### Theme System

- Light/dark mode toggle
- System preference detection
- Persistent theme storage

### Mobile Experience

- Responsive sidebar navigation
- Touch-friendly interactions
- Mobile-first component design

## Scripts & Automation

Custom build scripts in `/scripts/`:

- `create-page.js` - Generate page templates
- `create-markdown.js` - Create localized markdown files
- `create-api-controller.js` - Generate API endpoints
- `utils.js` - Shared script utilities

## Important Notes

- This is a **template repository** - customize for your specific needs
- Hebrew (RTL) and English (LTR) are preconfigured
- All policies/legal pages are placeholder content
- Cookie management includes technical and preference cookies
- SEO configuration includes structured data for organizations
