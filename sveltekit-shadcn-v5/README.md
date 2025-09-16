# SvelteKit + shadcn-svelte Template

Modern full-stack web application template built with SvelteKit v5, shadcn-svelte, TypeScript, and PostgreSQL.

**Demo:** [https://ssv5.templates.guylahav.com/](https://ssv5.templates.guylahav.com/)

## Tech Stack

- **SvelteKit v5** - Full-stack framework with file-based routing
- **shadcn-svelte** - Customizable UI components built on bits-ui
- **Tailwind CSS v4** - Utility-first styling with Vite plugin
- **TypeScript** - Full type safety throughout
- **better-auth** - Modern authentication with OAuth & email/password support
- **Drizzle ORM** - Type-safe SQL database toolkit
- **PostgreSQL** - Production-ready relational database
- **Vitest** - Fast unit testing with browser testing support
- **Playwright** - End-to-end testing framework
- **Docker** - Containerized database for local development

## Features

### Core Features
- **Authentication System** - Complete auth with better-auth, OAuth (Google), and email/password
- **Application Shell** - Responsive layout with header, footer, and sidebar navigation
- **Theme System** - Dark/light mode with system preference detection and persistence
- **Internationalization** - Multi-language support with RTL/LTR layouts, provided with English & Hebrew
- **Cookie Management** - GDPR-compliant cookie preferences and consent system
- **SEO Optimized** - Meta tags, structured data, sitemap generation, and robots.txt
- **Policy Pages** - Pre-configured Terms, Privacy, Cookies, and Accessibility policies
- **Configuration-Driven** - Centralized configurations for maintainable code architecture

### Database & Backend
- **Authentication Layer** - better-auth integration with secure session management and OAuth
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
- **Authentication (`/signin`, `/signup`)** - Complete auth flow with OAuth and email/password
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

# Make sure Docker deamon is running

# Start local database
bun run local:db:up

# Migrate to create the demo table
bun run db:migrate

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
bun run db:migrate         # Run database migrations

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

## Authentication Architecture

### better-auth Integration

The template includes a complete authentication system using [better-auth](https://better-auth.com), a modern TypeScript-first authentication library with excellent SvelteKit integration.

### Authentication Features

- **Multiple Auth Methods** - Email/password and OAuth (Google preconfigured)
- **Secure Session Management** - Database-backed sessions with automatic renewal
- **Route Protection** - Middleware-based authentication for protected routes
- **Type Safety** - Full TypeScript integration with reactive auth state
- **Email Verification** - Built-in email verification for new accounts

### Auth Configuration

#### Environment Variables

```bash
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:5173

# Required for OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Database (already configured)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```

#### Usage Examples

```typescript
import authClient from '$lib/client/auth/client';

const session = authClient.useSession();
```

#### Server-Side Session Access

```typescript
// In load functions (+page.server.ts, +layout.server.ts)
export async function load({ event }) {
  const { session, user } = event.locals;

  return {
    user: user ? { name: user.name, email: user.email } : null
  };
}
```

### Auth Database Schema

The system uses four core tables:
- **user** - User profiles and account data
- **session** - Active sessions with expiration
- **account** - OAuth provider connections
- **verification** - Email verification tokens

### Route Protection

Routes are automatically protected based on configuration in `src/lib/client/configurations/routes.ts`:

```typescript
// Protected by default
{ path: '/dashboard' }

// Public route
{ path: '/about', authenticationRequired: false }
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

### Request Helper

Unified API request helper for consistent client-side communication:

```typescript
import { GET, POST, PUT, DELETE } from '$lib/api/helpers/request';

// GET request with query parameters
const users = await GET<User[]>('/api/users', {
  limit: 20,
  offset: 0,
  searchTerm: 'john',
  orderBy: 'name,-createdAt'
});

// POST request to create data
const newUser = await POST<CreateUserData, User>(
  '/api/users',
  { name: 'John Doe', email: 'john@example.com' }
);

// PUT request to update data with filters
const updatedUser = await PUT<UpdateUserData, UserFilters, User>(
  '/api/users',
  { name: 'Jane Doe' },
  { id: 1 }
);

// DELETE request with filters
await DELETE<UserFilters, void>(
  '/api/users',
  { ids: [1, 2, 3] }
);

// Custom fetch function (useful for SSR)
const serverUsers = await GET<User[]>('/api/users', {
  fetch: event.fetch,
  limit: 10
});
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
├── server/
│   ├── database/
│   │   ├── client.ts            # Database connection
│   │   ├── schema.ts            # Drizzle schemas
│   │   ├── schemas/auth.ts      # Authentication tables
│   │   └── services/
│   │       ├── abstract.ts      # Base service class
│   │       ├── factory.ts       # Service factory
│   │       ├── provider.ts      # Singleton provider
│   │       ├── utils.ts         # Query utilities
│   │       └── tests/           # Comprehensive test suite
│   └── auth/
│       ├── config.ts            # better-auth configuration
│       └── handle.ts            # Auth middleware
├── client/
│   ├── auth/
│   │   └── client.ts            # Auth client utilities
│   └── configurations/          # Client-side configs
├── components/                  # UI components
│   ├── ui/                      # shadcn-svelte components
│   ├── signin/                  # Authentication components
│   ├── signup/                  # Registration components
│   └── [custom]/                # Application components
├── api/configurations/          # Server-side configs
├── i18n/                        # Translation files
└── resources/markdown/          # Localized content
```

## Environment Setup

Create `.env.local` file for local development:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"

BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:5173

# Authentication - OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Optional: Additional OAuth providers
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Optional: Custom database settings
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

## Roadmap

### ✅ Completed
- **Authentication System** - Complete better-auth integration with OAuth and email/password
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
- **Role-Based Access Control** - User roles and permissions system
- **Advanced Query Builder** - Fluent interface for complex queries
- **Database Migrations** - Automated schema management
- **Accessibility Management** - Automated accessibility testing tools
