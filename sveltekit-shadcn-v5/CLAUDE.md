# CLAUDE.md

Developer guidance for Claude Code when working with this SvelteKit template.

## Commands

```bash
# Development
bun run dev                     # Start dev server
bun run build                   # Build for production
bun run check                   # Type checking
bun run lint && bun run format  # Code quality

# Database
bun run local:db:up             # Start PostgreSQL container
bun run local:db:down           # Stop PostgreSQL container
bun run test:server             # Run database tests

# Scaffolding
bun run create:page <path>              # New page template
bun run create:md <filename>            # Markdown files for all locales
bun run create:api-controller <path>    # API endpoint template
```

## Tech Stack

- **SvelteKit v5** + TypeScript + Vite
- **shadcn-svelte** (bits-ui) + Tailwind CSS v4
- **Drizzle ORM** + PostgreSQL + Docker
- **sveltekit-i18n** (Hebrew/English with RTL/LTR)
- **Vitest** + Playwright for testing

## Features

- **Database Layer** - Abstract service pattern with CRUD operations
- **Internationalization** - Hebrew & English with RTL/LTR support
- **Theme System** - Dark/light mode with persistence
- **Cookie Management** - GDPR-compliant consent system
- **SEO Optimized** - Meta tags, structured data, sitemap

## Project Structure

```
src/lib/
├── server/database/         # Database services & tests
├── components/ui/           # shadcn-svelte components
├── client/configurations/   # Client configs (routes, themes)
├── api/configurations/      # Server configs
├── i18n/                   # Translations (en-US, he-IL)
└── resources/markdown/     # Localized content

src/routes/
├── [[lang]]/               # Internationalized routes
│   ├── (application)/      # App pages (example, health)
│   └── (site)/            # Content pages (policies)
└── api/                   # Server endpoints
```

## Database Layer

### Service Pattern

Use $lib/server/database/services/users.ts and src/routes/api/demo/users/+server.ts for best practices.

```typescript
import { serviceFactory } from '$lib/server/database/services/provider';

// Get service instance
const userService = serviceFactory.getService(users);

// CRUD operations
const user = await userService.create({ name: "John", email: "john@example.com" });
const allUsers = await userService.findAll({ limit: 20 });
const user = await userService.findById(1);
await userService.updateById(1, { name: "Jane" });
await userService.deleteById(1);

// Advanced queries
const activeUsers = await userService.find(
  (table) => eq(table.status, 'active'),
  { limit: 10, orderBy: desc(table.createdAt) }
);
```

### Query Utilities

```typescript
// Parse URL params into query conditions
const filters = getUrlFiltersUtil(url, {
  searchColumns: [users.name, users.email]
});

// Parse pagination from URL: ?limit=20&offset=40&orderBy=name,-createdAt
const options = getUrlOptionsUtil(url, users);

// Parse body filters
const bodyFilters = getBodyFiltersUtil(
  { ids: [1, 2, 3] },
  { ids: users.id }
);
```

## Internationalization

```typescript
// In templates
$t('common.navigation.home')

// In TypeScript
t.get('common.navigation.home')

// Translation files: src/lib/i18n/[locale]/[namespace].json
// Supported: en-US, he-IL (with RTL/LTR support)
```

## Component Patterns

```
components/[name]/
├── [name].svelte
└── configurations/ (optional)
    └── [config].ts

components/ui/[name]/           # shadcn-svelte
├── [name].svelte
├── index.ts
└── [additional-parts].svelte
```

## Scaffolding Examples

```bash
# Create dynamic product page
bun run create:page /products/[product_id]

# Create localized content
bun run create:md about-us.md

# Create nested API controller
bun run create:api-controller users/[user_id]/orders
```

## Important Notes

- **Template repository** - customize for your specific needs
- Hebrew (RTL) and English (LTR) preconfigured
- Policy pages are placeholder content
- Services are cached per table in singleton factory
- Use configuration-driven architecture for maintainable code
