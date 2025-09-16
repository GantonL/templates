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
- **better-auth** - Modern authentication library with OAuth & email/password
- **sveltekit-i18n** (Hebrew/English with RTL/LTR)
- **Vitest** + Playwright for testing

## Features

- **Authentication System** - better-auth with OAuth (Google) & email/password
- **Database Layer** - Abstract service pattern with CRUD operations
- **Internationalization** - Hebrew & English with RTL/LTR support
- **Theme System** - Dark/light mode with persistence
- **Cookie Management** - GDPR-compliant consent system
- **SEO Optimized** - Meta tags, structured data, sitemap

## Project Structure

```
src/lib/
├── server/
│   ├── database/           # Database services & tests
│   └── auth/              # better-auth configuration & handlers
├── client/
│   ├── auth/              # Client-side auth utilities
│   └── configurations/    # Client configs (routes, themes)
├── components/
│   ├── ui/                # shadcn-svelte components
│   ├── signin/            # Authentication components
│   └── signup/            # Registration components
├── api/configurations/     # Server configs
├── i18n/                  # Translations (en-US, he-IL)
└── resources/markdown/    # Localized content

src/routes/
├── [[lang]]/              # Internationalized routes
│   ├── (application)/     # App pages with auth routes
│   │   └── (auth)/        # Authentication pages (signin/signup)
│   └── (site)/           # Content pages (policies)
├── api/                   # Server endpoints
└── auth/                  # better-auth API endpoints
```

## Authentication System

### better-auth Integration

The template uses [better-auth](https://better-auth.com), a modern authentication library designed for TypeScript applications with excellent SvelteKit integration.

### Features

- **Email & Password Authentication** - Traditional signup/signin flow with email verification
- **OAuth Providers** - Google OAuth integration (configurable for additional providers)
- **Session Management** - Secure session handling with database persistence
- **Route Protection** - Automatic authentication middleware for protected routes
- **TypeScript Support** - Full type safety for user sessions and authentication state

### Configuration

#### Server Configuration (`src/lib/server/auth/config.ts`)

```typescript
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { user, session, account, verification }
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }
  },
  plugins: [sveltekitCookies(getRequestEvent)]
});
```

#### Client Configuration (`src/lib/client/auth/client.ts`)

```typescript
import { createAuthClient } from 'better-auth/svelte';

const client = createAuthClient();
export default client;
```

### Database Schema

The authentication system uses four main tables:

- **user** - User profiles with email, name, and verification status
- **session** - Active user sessions with expiration and metadata
- **account** - OAuth provider accounts linked to users
- **verification** - Email verification tokens and codes

### Usage Examples

#### Client-Side Authentication

```typescript
import authClient from '$lib/client/auth/client';

// Get current session (reactive)
const session = authClient.useSession();

// Sign in with email/password
await authClient.signIn.email({
  email: 'user@example.com',
  password: 'password'
});

// Sign in with Google OAuth
await authClient.signIn.social({
  provider: 'google',
  callbackURL: '/dashboard'
});

// Sign up new user
await authClient.signUp.email({
  email: 'user@example.com',
  password: 'password',
  name: 'User Name'
});

// Sign out
await authClient.signOut();
```

#### Server-Side Session Access

```typescript
// In +layout.server.ts or +page.server.ts
export async function load({ event }) {
  const session = event.locals.session;
  const user = event.locals.user;

  return {
    user: user ? { name: user.name, email: user.email } : null
  };
}
```

### Route Protection

Routes are automatically protected based on configuration in `src/lib/client/configurations/routes.ts`. Set `authenticationRequired: false` to make routes publicly accessible.

```typescript
// Protected route (default)
{ path: '/dashboard', authenticationRequired: true }

// Public route
{ path: '/about', authenticationRequired: false }
```

### Environment Variables

Required environment variables for authentication:

```bash
# For OAuth providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Database connection (already configured)
DATABASE_URL=postgresql://...
```

### Authentication Components

- **`src/lib/components/signin/signin.svelte`** - Complete signin form with OAuth and email/password options
- **`src/lib/components/signup/signup.svelte`** - User registration form
- **`src/lib/components/signin/providers/`** - Individual provider components (Google, email/password)

### Migration from Other Auth Libraries

When migrating from other authentication libraries:

1. Update imports from `better-auth/svelte`
2. Replace auth calls with better-auth equivalents
3. Update session access patterns in server code
4. Migrate database schema using provided auth tables

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

### Request Helper

Client-side API request utilities:

```typescript
import { GET, POST, PUT, DELETE } from '$lib/api/helpers/request';

// GET with query params
const users = await GET<User[]>('/api/users', {
  limit: 20,
  searchTerm: 'john',
  orderBy: 'name,-createdAt'
});

// POST to create
const user = await POST<CreateData, User>('/api/users', data);

// PUT to update with filters
const updated = await PUT<Data, Filters, User>('/api/users', data, filters);

// DELETE with filters
await DELETE<Filters, void>('/api/users', { ids: [1, 2, 3] });

// SSR with custom fetch
const serverData = await GET('/api/users', { fetch: event.fetch });
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
