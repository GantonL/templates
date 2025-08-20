# SvelteKit + shadcn-svelte Template

Modern full-stack web application template built with SvelteKit v5, shadcn-svelte, TypeScript, and PostgreSQL.

**Demo:** [https://ssv5.templates.guylahav.com/](https://ssv5.templates.guylahav.com/)

## Tech Stack

- **SvelteKit v5** - Full-stack framework with file-based routing
- **shadcn-svelte** - Customizable UI components built on bits-ui
- **Tailwind CSS v4** - Utility-first styling with Vite plugin
- **TypeScript** - Full type safety throughout
- **Drizzle ORM** - Type-safe SQL database toolkit
- **PostgreSQL** - Production-ready relational database
- **Vitest** - Fast unit testing with browser testing support
- **Playwright** - End-to-end testing framework
- **Docker** - Containerized database for local development

## Features

### Core Features
- **Application Shell** - Responsive layout with header, footer, and sidebar navigation
- **Theme System** - Dark/light mode with system preference detection and persistence
- **Internationalization** - Multi-language support with RTL/LTR layouts, provided with English & Hebrew
- **Cookie Management** - GDPR-compliant cookie preferences and consent system
- **SEO Optimized** - Meta tags, structured data, sitemap generation, and robots.txt
- **Policy Pages** - Pre-configured Terms, Privacy, Cookies, and Accessibility policies
- **Configuration-Driven** - Centralized configurations for maintainable code architecture

### Database & Backend
- **Database Abstraction Layer** - Generic service pattern with CRUD operations
- **Service Factory** - Singleton pattern for service management with caching
- **Query Utilities** - URL and body parameter parsing for filtering, pagination, and sorting
- **Docker Integration** - Local and test database environments

### Developer Experience
- **Comprehensive Testing** - Unit tests for all database services
- **Type Safety** - Full TypeScript coverage including database schemas
- **CLI Tools** - Automated scaffolding for pages, markdown files, and API controllers
- **mdsvex Integration** - Markdown processing with Svelte components
- **Cloudflare Ready** - Optimized for Cloudflare deployment

## Pages & Routes

- **Home (`/`)** - Landing page with feature overview and health status
- **Example (`/example`)** - Scrollable content demonstration
- **Health (`/health`)** - System health dashboard with database status
- **Error Pages** - Custom error boundaries and 404 handling
- **Cookie Manager** - User preferences for cookie consent
- **Policy Suite** - Complete legal page templates (Terms, Privacy, Accessibility)

## Development

### Quick Start

install Bun & Docker on your local machine.

```bash
# Install dependencies
bun install

# Start local database
bun run local:db:up

# Start development server
bun run dev

# Stop local database when done
bun run local:db:down
```

### Database Operations

```bash
# Local Development Database
bun run local:db:up        # Start PostgreSQL container
bun run local:db:down      # Stop PostgreSQL container

# Test Database
bun run test:db:up         # Start test PostgreSQL container
bun run test:db:down       # Stop test PostgreSQL container
bun run test:server        # Run server-side tests with test DB
```

### Build & Test

```bash
# Build for production
bun run build

# Type checking
bun run check

# Lint and format code
bun run lint && bun run format

# Run all tests
bun run test:server        # Database and service tests
```

### CLI Scaffolding Tools

```bash
# Create new page with template
bun run create:page <path>

# Create markdown files for all locales
bun run create:md <filename>

# Create API controller with CRUD template
bun run create:api-controller <path>
```

#### Examples

```bash
# Create a dynamic product page
bun run create:page /products/[product_id]

# Create localized about page content
bun run create:md about-us.md

# Create nested API controller
bun run create:api-controller users/[user_id]/orders
```

## Database Architecture

### Service Layer

The template includes a complete database abstraction layer:

```typescript
// Get service instance for any table
const userService = serviceFactory.getService(users);

// CRUD operations
const user = await userService.create({ name: "John", email: "john@example.com" });
const allUsers = await userService.findAll({ limit: 20, offset: 0 });
const user = await userService.findById(1);
await userService.updateById(1, { name: "Jane" });
await userService.deleteById(1);

// Advanced querying
const activeUsers = await userService.find(
  (table) => eq(table.status, 'active'),
  { limit: 10, orderBy: desc(table.createdAt) }
);
```

### Query Utilities

Built-in utilities for handling URL parameters and request body filters:

```typescript
// Parse URL search params into query conditions
const filters = getUrlFiltersUtil(url, {
  searchColumns: [users.name, users.email]
});

// Parse pagination and sorting from URL
const options = getUrlOptionsUtil(url, users);
// ?limit=20&offset=40&orderBy=name,-createdAt

// Parse body filters
const bodyFilters = getBodyFiltersUtil(
  { ids: [1, 2, 3] },
  { ids: users.id }
);
```

### Service Factory Pattern

Services are managed through a singleton factory:

```typescript
import { serviceFactory } from '$lib/server/database/services/provider';

// Services are cached per table
const userService1 = serviceFactory.getService(users);
const userService2 = serviceFactory.getService(users);
console.log(userService1 === userService2); // true

// Direct database access when needed
const db = serviceFactory.getDatabase();
const customQuery = await db.select().from(users).where(sql`custom condition`);
```

## Testing

### Test Coverage

Comprehensive test suite:

- **Abstract Service Tests** - All CRUD operations, pagination, filtering
- **Service Factory Tests** - Caching, memory management, concurrent access
- **Query Utils Tests** - URL parsing, body filters, edge cases
- **Integration Tests** - End-to-end database operations

### Test Architecture

```bash
src/lib/server/database/services/tests/
├── abstract.common.test.ts      # Common service functionality
├── abstract.create.test.ts      # Create operations
├── abstract.find.test.ts        # Find and query operations
├── abstract.update.test.ts      # Update operations
├── abstract.delete.test.ts      # Delete operations
├── factory.test.ts              # Service factory tests
├── utils.test.ts                # Query utilities tests
├── helper.ts                    # Test helpers and setup
├── test-client.ts               # Test database client
└── test-schema.ts               # Test table schemas
```

## Project Structure

```
src/lib/
├── server/database/
│   ├── client.ts                # Database connection
│   ├── schema.ts                # Drizzle schemas
│   └── services/
│       ├── abstract.ts          # Base service class
│       ├── factory.ts           # Service factory
│       ├── provider.ts          # Singleton provider
│       ├── utils.ts             # Query utilities
│       └── tests/               # Comprehensive test suite
├── components/                  # UI components
│   ├── ui/                      # shadcn-svelte components
│   └── [custom]/                # Application components
├── client/configurations/       # Client-side configs
├── api/configurations/          # Server-side configs
├── i18n/                        # Translation files
└── resources/markdown/          # Localized content
```

## Environment Setup

Create `.env.local` file for local development:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"

# Optional: Custom database settings
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

## Roadmap

### ✅ Completed
- Database abstraction layer with comprehensive service pattern
- Service factory with caching and memory management
- Query utilities for URL/body parameter parsing
- Comprehensive testing suite (100+ tests)
- Docker integration for local development
- Health check endpoints

### 🚧 In Progress
- Enhanced CLI tooling with database scaffolding
- Data table components with server-side filtering

### 📅 Planned
- **Authentication System** - JWT-based auth with role management
- **Advanced Query Builder** - Fluent interface for complex queries
- **Database Migrations** - Automated schema management
- **Accessibility Management** - Automated accessibility testing tools
