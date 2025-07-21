# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

**Development**: `bun run dev`  
**Build**: `bun run build`  
**Test**: `npm run test`  
**Lint/Format**: `npm run lint && npm run format`  
**Type Check**: `npm run check`

## Tech Stack

**Framework**: SvelteKit v5 + TypeScript  
**UI**: shadcn-svelte + Tailwind CSS v4  
**Deployment**: Cloudflare  
**Package Manager**: Bun  
**Testing**: Vitest + Playwright

## Project Structure

```
src/lib/
├── api/configurations/     # Server/API configs
├── client/configurations/  # Client configs
├── components/            # UI components + shadcn-svelte
├── enums/                # Type definitions
├── hooks/                # Custom functionality
├── i18n/                 # Translations
├── models/               # TypeScript interfaces
├── resources/markdown/   # Localized content
└── stores.ts            # Global state

src/routes/
├── [[lang]]/            # Locale routing
└── api/                 # Server endpoints
```

## Core Systems

**i18n**: Route-based locale detection, RTL/LTR direction, translation keys  
**State**: Centralized Svelte stores for global state  
**Routes**: Import from `src/routes/api/index.ts`, ask about sitemap additions  
**SEO**: Store-based metadata management

## Development Rules

### Configuration-Driven Architecture
**NEVER hardcode data in components.**

- Create config objects in `src/lib/api/configurations/` (server) or `src/lib/client/configurations/` (client)
- Component configs go in `components/[name]/configurations/`
- Define interfaces first, then create typed config objects

### Translation Requirements
**ALL user-facing text MUST use translation keys.**

- Use `$t('key')` in templates, `t.get('key')` in TypeScript
- Store translations in JSON files by locale
- Use hierarchical keys: `common.actions.save`

### Component Standards
**Follow strict component patterns.**

```
components/[name]/
├── configurations/[config].ts
├── [name].svelte
└── index.ts (if needed)
```

- Define interfaces in `src/lib/models/`
- Use typed props and event-driven communication
- Import via aliases: `$lib/components/ui/button`

### State Management
**Centralized stores only.**

- Global state in `src/lib/stores.ts`
- Use stores for SEO metadata
- Type all store values

### File Organization
**Strict directory separation.**

- Constants in `src/lib/api/configurations/common.ts`
- Use enums for type safety
- No relative imports (`../../../`)

### Testing & Code Quality
**Consistent naming and structure.**

- Client tests: `[name].svelte.test.ts`
- Server tests: `[name].test.ts`
- Use Tailwind utilities with shadcn-svelte components
- Mobile-first responsive design
