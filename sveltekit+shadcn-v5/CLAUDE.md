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

### Directory Structure
- `src/lib/`: Core library code
  - `components/`: Reusable components including shadcn-svelte UI components
  - `i18n/`: Internationalization setup with sveltekit-i18n
  - `stores.ts`: Svelte stores for global state management
  - `api/configurations/`: Application configuration and constants
  - `client/configurations/`: Client-side configuration objects
  - `models/`: TypeScript interfaces and type definitions
  - `enums/`: Enumeration definitions (e.g., AvailableLocales)
  - `hooks/`: Custom hooks for functionality like locale management
  - `manage-cookies/`: Cookie management system
  - `resources/markdown/`: Markdown content organized by locale
- `src/routes/`: File-based routing with layout hierarchy
  - `[[lang]]/`: Optional language parameter routing
  - `api/`: Server-side API endpoints
- `static/`: Static assets served at root

### Internationalization (i18n)
The app supports multiple languages with:
- Route-based locale detection (`[[lang]]` parameter)
- Cookie-based locale persistence
- RTL/LTR direction switching using $direction store.
- Localized markdown content in `src/lib/resources/markdown/`
- JSON translation files organized by locale (`AvailableLocales`)
- Centralized translation keys using `sveltekit-i18n`

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
- `slug`: Current page slug
- `squareImage`: Default logo/brand image

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
- **API Routes**: Centralized route definitions in `src/routes/api/index.ts` - import route constants from here rather than hardcoding endpoints
- When adding new routes, always ask the developer if the route should be added to the sitemap.xml file

## Development Guidelines & Best Practices

### Configuration-Driven Development
This project follows a strict configuration-driven approach:

#### ✅ DO: Use Configuration Files
- **NEVER hardcode data directly in components**
- Create configuration objects in appropriate directories:
  - `src/lib/api/configurations/` for API/server configs
  - `src/lib/client/configurations/` for client-side configs
  - Component-specific configs in `components/[name]/configurations/`

#### Examples:
```typescript
// ✅ Good: Using configuration
import { AppRoutes } from '$lib/client/configurations/routes';
import { LanguageSelectorConfiguration } from './configurations/footer';

// ❌ Bad: Hardcoded data
const routes = [{ label: 'Home', path: '/' }];
```

#### Configuration Pattern Structure:
```typescript
// Define interface/model first
export interface ComboboxConfiguration {
  options: { value: string; label: string; }[];
  placeholder?: string;
  event?: string;
}

// Create configuration object
export const LanguageSelectorConfiguration: ComboboxConfiguration = {
  options: [
    { value: AvailableLocals.Hebrew, label: 'common.locales.he' },
    { value: AvailableLocals.English_US, label: 'common.locales.en' }
  ],
  placeholder: 'common.select_language',
  event: 'language_changed'
};
```

### Internationalization (i18n) Standards

#### ✅ DO: Proper Translation Usage
- **ALL user-facing text must use translation keys**
- Use descriptive, hierarchical translation keys
- Store translations in JSON files organized by locale
- Use $t(...) syntax in template
- Use t.get(...) in ts logic (non-temaplate code)

#### Examples:
```svelte
<!-- ✅ Good: Using translation keys -->
<h1>{$t('common.brand.name')}</h1>
<p>{$t('common.brand.description')}</p>

<!-- ❌ Bad: Hardcoded text -->
<h1>My Brand</h1>
<p>The best brand ever</p>
```

#### Translation Key Patterns:
```json
{
  "common": {
    "brand": {
      "name": "My Brand",
      "description": "The best brand that does amazing things"
    },
    "actions": {
      "save": "Save",
      "cancel": "Cancel"
    }
  }
}
```

### Component Development Patterns

#### ✅ DO: Follow Component Structure
```
components/
├── [component-name]/
│   ├── configurations/          # Component-specific configs
│   │   └── [config-name].ts
│   ├── [component-name].svelte  # Main component
│   └── index.ts                 # Barrel export (if needed)
```

#### ✅ DO: Use Type-Safe Props
```typescript
// Define interfaces in src/lib/models/
export interface Link {
  label: string;
  path: string;
  icon?: Component<IconProps>;
}

// Use in component
interface Props {
  configuration: ComboboxConfiguration;
  selectedOption?: string;
  event?: (data: any) => void;
}
```

#### ✅ DO: Event-Driven Communication
```typescript
// Configuration defines events
export const config = {
  event: 'language_changed'
};

// Component dispatches structured events
function handleLanguageChange(event: { type: string; data: string }) {
  if (event.type === 'language_changed') {
    changeLocale(event.data);
  }
}
```

### Data Management Standards

#### ✅ DO: Centralized Constants
```typescript
// src/lib/api/configurations/common.ts
export const AppName: string = 'My Brand';
export const SupportEmail: string = 'support@my-brand.com';
export const BaseUrl: string = 'https://my-brand.com';

// Usage throughout app
import { AppName, SupportEmail } from '$lib/api/configurations/common';
```

#### ✅ DO: Enum-Based Selections
```typescript
// src/lib/enums/available-locales.ts
export enum AvailableLocales {
  Hebrew = 'he',
  English_US = 'en-US'
}

// Use enums for type safety
const directionMap: Partial<Record<AvailableLocales, DirectionSetting>> = {
  [AvailableLocales.Hebrew]: 'rl',
  [AvailableLocales.English_US]: 'lr'
};
```

### State Management Patterns

#### ✅ DO: Use Centralized Stores
```typescript
// src/lib/stores.ts - Global state
export const direction = writable<DirectionSetting>('rl');
export const title = createTitle();

// Components access via store subscriptions
import { title, direction } from '$lib/stores';
```

#### ✅ DO: Store-Based Metadata
```typescript
// SEO and page metadata through stores
title.set('Page Title');
pageDescription.set('Page description for SEO');
```

### File Organization Standards

#### ✅ DO: Logical Directory Structure
```
src/lib/
├── api/configurations/          # Server/API configs
├── client/configurations/       # Client-side configs
├── components/                  # Reusable components
│   └── [name]/configurations/   # Component configs
├── enums/                       # Type enumerations
├── hooks/                       # Custom functionality
├── i18n/                        # Translation files
├── models/                      # TypeScript interfaces
├── resources/markdown/          # Content by locale
└── stores.ts                    # Global state
```

#### ✅ DO: Import Path Standards
```typescript
// Use configured aliases
import { Button } from '$lib/components/ui/button';
import type { Link } from '$lib/models/link';
import { AppRoutes } from '$lib/client/configurations/routes';

// NOT relative imports like '../../../'
```

### Testing Standards

#### ✅ DO: Test File Naming
- Client-side components: `[name].svelte.test.ts`
- Server-side logic: `[name].test.ts`
- Place tests alongside components when appropriate

### Styling Guidelines

#### ✅ DO: Tailwind + shadcn-svelte
- Use Tailwind utility classes for styling
- Leverage shadcn-svelte component variants
- Follow design system tokens from `components.json`

#### ✅ DO: Responsive Design
```svelte
<!-- Mobile-first responsive classes -->
<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
  <div class="col-span-1 md:col-span-2">
```

## Key Principles Summary

1. **Configuration Over Hardcoding**: Never hardcode data in components
2. **Translation First**: All user-facing text through i18n system
3. **Type Safety**: Use TypeScript interfaces and enums
4. **Centralized State**: Global state through Svelte stores
5. **Event-Driven**: Components communicate via structured events
6. **Modular Architecture**: Logical separation of concerns
7. **Import Aliases**: Use configured path aliases consistently
